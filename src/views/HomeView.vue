<template>

  <div class="hero ">
    <div class="hero-text">
      <h4>Nexus Property Consultants.</h4>
      <hr />
      <h2>
        IT Service<br />
        Web Application
      </h2>
      <hr />
    </div>
  </div>

</template>

<script setup></script>

<style scoped>
  .hero {
    background-image: url("../images/hero-bg2.jpg");
    background-attachment: absolute;
    background-size: cover;
    position: absolute;
    /* height: 99vh; */
    inset: 0;

    .hero-text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #eaf3ff;
      margin-left: 8px;

      h4 {
        text-transform: uppercase;
        font-size: 22px;
        padding-bottom: 4px;
        margin-left: 8px;
      }

      h2 {
        font-size: 50px;
        margin-left: 8px;

        @media (min-width: 550px) {
          font-size: 80px;
        }
      }

      hr:nth-child(2) {
        max-width: 365px;
        margin-bottom: 16px;
        margin-left: 8px;
      }

      hr:nth-child(4) {
        height: 6px;
        background-color: #fff;
        border: none;
        max-width: 85px;
        margin-top: 16px;
        margin-left: 8px;
      }
    }
  }
</style>
