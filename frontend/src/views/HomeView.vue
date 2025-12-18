<template>
  <div class="home">
    <section class="hero  absolute inset-0 bg-[url(../assets/hero-bg2.jpg)] bg-conver bg-center z-0">
      <div class="hero-text container ml-8">
        <h4>Nexus Property Consultants.</h4>
        <hr />
        <h2>
          IT Servive<br />
          Web Application
        </h2>
        <hr />
      </div>
    </section>

  </div>
</template>

<script setup></script>

<style scoped>
.hero {
  /* background-image: url('../assets/hero-bg.jpg'); */
  background-attachment: absolute;
  position: relative;
  height: 85vh;
/*
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  } */

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #eaf3ff;

    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }

    h2 {
      font-size: 50px;
      @media (min-width: 550px) {
        font-size: 80px;
      }
    }

    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }
    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}
</style>
