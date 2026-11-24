
<template>
  <section class="about-hero">
    <p class="eyebrow">ABOUT STAYFINDER</p>
    <h1>Travel more. Worry less.</h1>
    <p>
      We help travelers discover comfortable hotels
      and make every journey memorable.
    </p>
  </section>

  <section class="about-content">
    <div class="about-card">
      <h2>Who We Are</h2>
      <p>
        StayFinder is a hotel booking platform designed to help
        travelers find suitable accommodation for their trips.
        We make exploring hotels simple and convenient.
      </p>
    </div>

    <div class="about-card">
      <h2>Our Mission</h2>
      <p>
        Our mission is to make hotel discovery easier by bringing
        hotel information together in one convenient place.
      </p>
    </div>

    <div class="about-card">
      <h2>Why Choose StayFinder?</h2>
      <p>
        Explore hotel information, compare prices, discover
        destinations, and find a comfortable place to stay.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about-hero {
  text-align: center;
  padding: 100px 20px;
  background: #173d43;
  color: white;
}

.eyebrow {
  color: #e5a34b;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.about-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(35px, 5vw, 55px);
  margin-bottom: 18px;
}

.about-hero p:last-child {
  color: #e0e8e7;
  max-width: 550px;
  margin: auto;
  line-height: 1.8;
}

.about-content {
  padding: 70px 8%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.about-card {
  padding: 30px;
  background: #f4f7f4;
  border-radius: 12px;
}

.about-card h2 {
  color: #173d43;
  font-family: 'Playfair Display', serif;
  margin-bottom: 15px;
}

.about-card p {
  color: #718085;
  line-height: 1.8;
}

</style>
