
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { API_URL } from '../api'

interface Hotel {
  _id: string
  name: string
  location: string
  pricePerNight: number
  image: string
}

const route = useRoute()

const hotel = ref<Hotel | null>(null)
const guestName = ref('')
const email = ref('')
const phone = ref('')
const checkIn = ref('')
const checkOut = ref('')
const guests = ref(1)

const loading = ref(true)
const submitting = ref(false)
const error = ref('')
const success = ref('')

const today = new Date().toLocaleDateString('en-CA')

const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0

  const start = new Date(checkIn.value)
  const end = new Date(checkOut.value)

  return Math.max(
    0,
    Math.ceil((end.getTime() - start.getTime()) / 86400000)
  )
})

const totalPrice = computed(() => {
  return nights.value * (hotel.value?.pricePerNight || 0)
})

async function fetchHotel() {
  try {
    const response = await fetch(
      `${API_URL}/api/hotels/${route.params.id}`
    )

    if (!response.ok) throw new Error('Hotel not found')

    hotel.value = await response.json()
  } catch {
    error.value = 'Unable to load hotel information.'
  } finally {
    loading.value = false
  }
}

async function submitBooking() {
  error.value = ''
  success.value = ''

  if (!hotel.value) return

  if (new Date(checkIn.value) < new Date(today)) {
    error.value = 'Check-in date cannot be in the past.'
    return
  }

  if (nights.value < 1) {
    error.value = 'Check-out must be after check-in.'
    return
  }

  try {
    submitting.value = true

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hotel: hotel.value._id,
        guestName: guestName.value,
        email: email.value,
        phone: phone.value,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        guests: guests.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Booking failed.')
    }

    success.value = 'Your booking was created successfully!'

    guestName.value = ''
    email.value = ''
    phone.value = ''
    checkIn.value = ''
    checkOut.value = ''
    guests.value = 1
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Booking failed.'
  } finally {
    submitting.value = false
  }
}

onMounted(fetchHotel)
</script>

<template>
  <section class="booking-section">
    <div v-if="loading" class="message">
      Loading hotel information...
    </div>

    <div v-else-if="!hotel" class="message error">
      {{ error }}
      <RouterLink to="/hotels">Back to Hotels</RouterLink>
    </div>

    <div v-else class="booking-container">
      <div class="hotel-summary">
        <img
          :src="hotel.image || 'https://placehold.co/600x400?text=Hotel'"
          :alt="hotel.name"
        />
        <div>
          <p class="eyebrow">YOUR STAY</p>
          <h2>{{ hotel.name }}</h2>
          <p>{{ hotel.location }}</p>
          <h3>${{ hotel.pricePerNight }} <span>/ night</span></h3>
        </div>
      </div>

      <form class="booking-form" @submit.prevent="submitBooking">
        <p class="eyebrow">RESERVE YOUR ROOM</p>
        <h1>Complete Your Booking</h1>

        <label>Guest Name</label>
        <input v-model="guestName" type="text" required placeholder="Enter your name" />

        <label>Email Address</label>
        <input v-model="email" type="email" required placeholder="Enter your email" />

        <label>Phone Number</label>
        <input v-model="phone" type="tel" required placeholder="Enter your phone number" />

        <div class="date-grid">
          <div>
            <label>Check-in</label>
            <input v-model="checkIn" type="date" :min="today" required />
          </div>

          <div>
            <label>Check-out</label>
            <input v-model="checkOut" type="date" :min="checkIn || today" required />
          </div>
        </div>

        <label>Number of Guests</label>
        <input v-model.number="guests" type="number" min="1" max="20" required />

        <div class="price-summary">
          <p>Price per night: ${{ hotel.pricePerNight }}</p>
          <p>Total nights: {{ nights }}</p>
          <h2>Total: ${{ totalPrice }}</h2>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <button type="submit" :disabled="submitting">
          {{ submitting ? 'Booking...' : 'Confirm Booking' }}
        </button>

        <RouterLink to="/hotels" class="back-link">
          ← Back to Hotels
        </RouterLink>
      </form>
    </div>
  </section>
</template>

<style scoped>
.booking-section {
  min-height: 650px;
  padding: 60px 8%;
  background: #f7f8f6;
}

.booking-container {
  max-width: 950px;
  margin: auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 30px;
  align-items: start;
}

.hotel-summary,
.booking-form {
  background: white;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(20, 50, 50, .06);
}

.hotel-summary img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.eyebrow {
  color: #dca34f;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

h1, h2 {
  color: #173d43;
  font-family: 'Playfair Display', serif;
}

.hotel-summary h2 {
  margin-bottom: 8px;
}

.hotel-summary p:not(.eyebrow) {
  color: #718085;
  margin-bottom: 15px;
}

.hotel-summary h3 {
  color: #173d43;
  font-size: 24px;
}

.hotel-summary h3 span {
  font-size: 13px;
  color: #849094;
}

.booking-form h1 {
  font-size: 30px;
  margin-bottom: 25px;
}

.booking-form label {
  display: block;
  margin: 15px 0 7px;
  color: #52636a;
  font-size: 13px;
  font-weight: 700;
}

.booking-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dfe5e3;
  border-radius: 6px;
  outline-color: #dca34f;
}

.date-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.price-summary {
  background: #f4f7f4;
  padding: 18px;
  border-radius: 8px;
  margin: 25px 0;
  color: #718085;
}

.price-summary h2 {
  margin-top: 12px;
}

.booking-form button {
  width: 100%;
  padding: 14px;
  background: #173d43;
  color: white;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
}

.booking-form button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 18px;
  color: #173d43;
  text-decoration: none;
}

.message {
  text-align: center;
  padding: 40px;
}

.error {
  color: #c0392b;
  margin: 12px 0;
}

.success {
  color: #218653;
  margin: 12px 0;
}

@media (max-width: 700px) {
  .booking-container {
    grid-template-columns: 1fr;
  }

  .booking-section {
    padding: 35px 5%;
  }
}
</style>
