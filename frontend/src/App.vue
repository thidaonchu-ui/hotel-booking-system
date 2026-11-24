
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <!-- Navbar -->
    <nav class="navbar">
      <RouterLink to="/" class="brand">
        Stay<span>Finder.</span>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/hotels" active-class="active">Hotels</RouterLink>
        <RouterLink to="/about" active-class="active">About</RouterLink>
      </div>

      <RouterLink to="/hotels" class="nav-button">
        Explore Hotels
      </RouterLink>
    </nav>

    <!-- Display the selected page -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer>
      <RouterLink to="/" class="brand">
        Stay<span>Finder.</span>
      </RouterLink>
      <p>© 2026 StayFinder. Hotel Booking System.</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', sans-serif;
  color: #172b35;
  background: #fff;
}

.navbar {
  height: 76px;
  padding: 0 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}

.brand {
  font-size: 25px;
  font-weight: 800;
  text-decoration: none;
  color: #173d43;
}

.brand span {
  color: #e5a34b;
}

.nav-links {
  display: flex;
  gap: 35px;
}

.nav-links a {
  text-decoration: none;
  color: #52636a;
  font-size: 14px;
  font-weight: 600;
}

.nav-links a.active {
  color: #e5a34b;
}

.nav-button {
  background: #e5a34b;
  color: #173d43;
  padding: 12px 22px;
  border-radius: 7px;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
}

footer {
  padding: 28px 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

footer p {
  color: #849094;
  font-size: 12px;
}

@media (max-width: 650px) {
  .navbar {
    padding: 0 5%;
  }

  .nav-links {
    gap: 12px;
  }

  .nav-links a {
    font-size: 12px;
  }

  .nav-button {
    padding: 9px 12px;
    font-size: 12px;
  }

  footer {
    flex-direction: column;
  }
}
</style>
