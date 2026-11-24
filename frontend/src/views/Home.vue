
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>


<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <p class="eyebrow">YOUR NEXT JOURNEY STARTS HERE</p>

      <h1>
        Find your perfect<br />
        <span>place to stay.</span>
      </h1>

      <p class="hero-description">
        Discover comfortable hotels, beautiful destinations,
        and unforgettable experiences.
      </p>

      <RouterLink to="/hotels" class="primary-button">
        Explore Hotels →
      </RouterLink>
    </div>
  </section>

  <section class="welcome-section">
    <p class="eyebrow">WELCOME TO STAYFINDER</p>
    <h2>Your journey begins here.</h2>

    <p>
      Find the perfect hotel for your next adventure.
      Explore our collection of comfortable stays and beautiful destinations.
    </p>

    <RouterLink to="/hotels" class="secondary-button">
      Discover Hotels
    </RouterLink>
  </section>
</template>

<style scoped>
.hero {
  min-height: 480px;
  padding: 90px 10%;
  display: flex;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(12, 40, 43, .93), rgba(12, 40, 43, .48)),
    url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800') center/cover;
  color: white;
}

.hero-content {
  max-width: 620px;
}

.eyebrow {
  color: #dca34f;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.15;
  margin-bottom: 20px;
}

.hero h1 span {
  color: #e5a34b;
}

.hero-description {
  max-width: 460px;
  color: #e0e8e7;
  line-height: 1.8;
  margin-bottom: 30px;
}

.primary-button,
.secondary-button {
  display: inline-block;
  background: #e5a34b;
  color: #173d43;
  padding: 12px 22px;
  border-radius: 7px;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
}

.welcome-section {
  padding: 75px 10%;
  text-align: center;
  background: #f4f7f4;
}

.welcome-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #173d43;
  margin-bottom: 15px;
}

.welcome-section > p:not(.eyebrow) {
  color: #718085;
  max-width: 550px;
  margin: 0 auto 25px;
  line-height: 1.8;
}

@media (max-width: 650px) {
  .hero {
    padding: 70px 7%;
  }
}
</style>
