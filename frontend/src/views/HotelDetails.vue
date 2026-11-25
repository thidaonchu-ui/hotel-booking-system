
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { API_URL } from '../api'

interface Hotel {
  _id: string
  name: string
  location: string
  description: string
  pricePerNight: number
  image: string
  rating: number
}

const route = useRoute()
const hotel = ref<Hotel | null>(null)
const loading = ref(true)
const error = ref('')

async function fetchHotel() {
  try {
    const response = await fetch(
      `${API_URL}/api/hotels/${route.params.id}`
    )

    if (!response.ok) {
      throw new Error('Hotel not found')
    }

    hotel.value = await response.json()
  } catch {
    error.value = 'Unable to find this hotel.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchHotel)
</script>

<template>
  <section class="details-section">
    <div v-if="loading" class="message">
      Loading hotel details...
    </div>

    <div v-else-if="error" class="message error">
      {{ error }}
    </div>

    <div v-else-if="hotel" class="hotel-details">
      <img
        :src="hotel.image || 'https://placehold.co/900x500?text=Hotel'"
        :alt="hotel.name"
        class="hotel-image"
      />

      <div class="hotel-info">
        <p class="eyebrow">HOTEL INFORMATION</p>
        <h1>{{ hotel.name }}</h1>
        <p class="location">📍 {{ hotel.location }}</p>
        <p class="rating">★ {{ hotel.rating || 'New' }} Rating</p>
        <h2>About this hotel</h2>
        <p class="description">{{ hotel.description }}</p>

        <p class="price">
          ${{ hotel.pricePerNight }}
          <span>/ night</span>
        </p>

        <div class="action-buttons">
          <RouterLink
            :to="`/hotels/${hotel._id}/book`"
            class="book-button"
          >
            Book Now
          </RouterLink>

          <RouterLink to="/hotels" class="back-button">
            ← Back to Hotels
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-section {
  padding: 60px 8%;
  min-height: 600px;
}

.hotel-details {
  max-width: 1000px;
  margin: auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(20, 50, 50, .08);
}

.hotel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.hotel-info {
  padding: 35px;
}

.eyebrow {
  color: #dca34f;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

h1, h2 {
  color: #173d43;
  font-family: 'Playfair Display', serif;
  margin: 15px 0;
}

h1 {
  font-size: 36px;
}

.location, .description {
  color: #718085;
  margin: 12px 0;
  line-height: 1.8;
}

.rating {
  color: #d69b37;
  margin: 15px 0;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: #173d43;
  margin: 25px 0;
}

.price span {
  font-size: 14px;
  color: #849094;
  font-weight: 400;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.book-button {
  display: inline-block;
  background: #e5a34b;
  color: #173d43;
  padding: 12px 20px;
  border-radius: 7px;
  text-decoration: none;
  font-weight: 700;
}

.back-button {
  display: inline-block;
  background: #173d43;
  color: white;
  padding: 12px 20px;
  border-radius: 7px;
  text-decoration: none;
}

.message {
  padding: 35px;
  text-align: center;
  background: #f7f8f6;
  border-radius: 10px;
}

.error {
  color: #c0392b;
}

@media (max-width: 650px) {
  .details-section {
    padding: 35px 5%;
  }

  .hotel-image {
    height: 250px;
  }

  .hotel-info {
    padding: 22px;
  }
}
</style>
