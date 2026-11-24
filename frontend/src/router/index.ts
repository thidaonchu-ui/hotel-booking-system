
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Hotels from '../views/Hotels.vue'
import About from '../views/About.vue'
import HotelDetails from '../views/HotelDetails.vue'
import Booking from '../views/Booking.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: Hotels
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/hotels/:id',
    name: 'HotelDetails',
    component: HotelDetails
  },
  {
    path: '/hotels/:id/book',
    name: 'Booking',
    component: Booking
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
