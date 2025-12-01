<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text container">
        <h4>Vue Responsive Nav Menu</h4>
        <hr />
        <h2>
          With Vue <br />
          Animations
        </h2>
        <hr />
      </div>
    </section>
    <section>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque at perspiciatis nisi
        quia maiores ab, minus inventore quas earum debitis, placeat repellendus voluptatem nobis
        adipisci quis porro ad dolor odit architecto pariatur ducimus veritatis vero magni omnis.
        Alias omnis eum vel modi dolorem! Explicabo expedita velit debitis eos! Molestias
        accusantium similique in dolorum ullam impedit voluptatibus eum aliquam. Libero temporibus
        quae assumenda repellat repudiandae! Ratione ut molestiae itaque dicta, perferendis harum
        consequatur aperiam dolor impedit temporibus quasi minus ad error, reprehenderit officiis
        esse ex repudiandae incidunt est eligendi! Quia sed soluta delectus fugiat quis assumenda
        commodi ab cum reiciendis non omnis accusantium id a perspiciatis eius quaerat quo, nam
        quibusdam expedita optio? Reprehenderit deserunt, reiciendis laudantium modi vero iste odit
        ab voluptatem voluptas nostrum rerum error molestias provident?
      </p>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.hero {
  background-image: url('../assets/hero-bg.png');
  background-attachment: fixed;
  position: relative;
  height: 100vh;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #2e04a1;

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
