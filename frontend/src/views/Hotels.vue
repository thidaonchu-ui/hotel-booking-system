
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
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

const hotels = ref<Hotel[]>([])
const loading = ref(true)
const error = ref('')

async function fetchHotels() {
  try {
    const response = await fetch(`${API_URL}/api/hotels`)

    if (!response.ok) {
      throw new Error('Unable to load hotels.')
    }

    hotels.value = await response.json()
  } catch (err) {
    error.value = 'Unable to connect to the server. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchHotels)
</script>

<template>
  <div class="hotels-page">
    <section class="hotels-hero">
      <p class="eyebrow">DISCOVER YOUR NEXT DESTINATION</p>
      <h1>Find Your Perfect Stay</h1>
      <p>
        Explore our collection of comfortable hotels
        and discover the perfect place for your journey.
      </p>
    </section>

    <section class="hotels-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">OUR COLLECTION</p>
          <h2>Explore Our Hotels</h2>
        </div>
        <p>{{ hotels.length }} Hotels Available</p>
      </div>

      <div v-if="loading" class="message">
        Loading hotels...
      </div>

      <div v-else-if="error" class="message error">
        {{ error }}
        <button @click="fetchHotels">Try Again</button>
      </div>

      <div v-else-if="hotels.length === 0" class="message">
        No hotels available at the moment.
      </div>

      <div v-else class="hotel-grid">
        <article
          v-for="hotel in hotels"
          :key="hotel._id"
          class="hotel-card"
        >
          <img
            :src="hotel.image || 'https://placehold.co/600x400?text=Hotel'"
            :alt="hotel.name"
            class="hotel-image"
          />

          <div class="hotel-info">
            <div class="hotel-rating">
              ★ {{ hotel.rating || 'New' }}
            </div>

            <h3>{{ hotel.name }}</h3>

            <p class="location">
              📍 {{ hotel.location }}
            </p>

            <p class="description">
              {{ hotel.description }}
            </p>

            <div class="hotel-bottom">
              <p class="price">
                ${{ hotel.pricePerNight }}
                <span>/ night</span>
              </p>

              <RouterLink
                :to="`/hotels/${hotel._id}`"
                class="book-button"
              >
                View Details
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hotels-hero {
  padding: 85px 8%;
  text-align: center;
  background:
    linear-gradient(rgba(12, 40, 43, .88), rgba(12, 40, 43, .88)),
    url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800')
    center/cover;
  color: white;
}

.eyebrow {
  color: #dca34f;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.hotels-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 5vw, 55px);
  margin-bottom: 18px;
}

.hotels-hero > p:last-child {
  color: #e0e8e7;
  max-width: 550px;
  margin: auto;
  line-height: 1.8;
}

.hotels-section {
  padding: 65px 8%;
  background: #f7f8f6;
  min-height: 500px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.section-heading h2 {
  color: #173d43;
  font-family: 'Playfair Display', serif;
  font-size: 32px;
}

.section-heading > p {
  color: #718085;
  font-size: 14px;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.hotel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(20, 50, 50, .07);
  transition: transform .25s ease;
}

.hotel-card:hover {
  transform: translateY(-5px);
}

.hotel-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
}

.hotel-info {
  padding: 22px;
}

.hotel-rating {
  color: #d69b37;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 10px;
}

.hotel-info h3 {
  color: #173d43;
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  margin-bottom: 8px;
}

.location {
  color: #718085;
  font-size: 13px;
  margin-bottom: 12px;
}

.description {
  color: #849094;
  font-size: 13px;
  line-height: 1.7;
  min-height: 44px;
}

.hotel-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
}

.price {
  color: #173d43;
  font-size: 21px;
  font-weight: 800;
}

.price span {
  color: #849094;
  font-size: 12px;
  font-weight: 400;
}

.book-button {
  display: inline-block;
  background: #e5a34b;
  color: #173d43;
  padding: 10px 15px;
  border-radius: 7px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
}

.message {
  text-align: center;
  padding: 40px;
  color: #718085;
  background: white;
  border-radius: 10px;
}

.error {
  color: #c0392b;
}

.message button {
  display: block;
  margin: 15px auto 0;
  padding: 10px 20px;
  background: #173d43;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 650px) {
  .hotels-section {
    padding: 40px 5%;
  }

  .section-heading {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
