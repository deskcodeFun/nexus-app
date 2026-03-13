<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <img src="@/assets/Logo.png" alt="" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink></li>
        <li><RouterLink class="link" :to="{ name: 'assets' }">Assets</RouterLink></li>
        <li><RouterLink class="link" :to="{ name: 'user' }">User</RouterLink></li>
        <li><RouterLink class="link" :to="{ name: 'service' }">Services</RouterLink></li>
        <li><RouterLink class="link" :to="{ name: 'about' }">About</RouterLink></li>
      </ul>

      <div class="icon">
        <i
          v-show="mobile"
          @click="toggleMobileNav"
          :class="{ 'icon-active': mobileNav }"
          class="far fa-bars"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink></li>
          <li><RouterLink class="link" :to="{ name: 'assets' }">Assets</RouterLink></li>
          <li><RouterLink class="link" :to="{ name: 'user' }">User</RouterLink></li>
          <li><RouterLink class="link" :to="{ name: 'service' }">Services</RouterLink></li>
          <li><RouterLink class="link" :to="{ name: 'about' }">About</RouterLink></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const scrolledNav = ref(null)
const mobileNav = ref(null)
const mobile = ref(null)
const windowWidth = ref(null)

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}
onMounted(() => {
  window.addEventListener('resize', checkScreen)
  window.addEventListener('scroll', updateScroll)
})
const checkScreen = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 750) {
    mobile.value = true
    return
  }
  mobile.value = false
  mobileNav.value = false
  return
}
const updateScroll = () => {
  const scrollPosition = window.scrollY
  if (scrollPosition > 50) {
    scrolledNav.value = true
    return
  }
  scrolledNav.value = false
  return
}
</script>

<style scoped>
header {
  background-color: rgb(0, 0, 0, 0.8);
  color: white;
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }
    ul,
    .link {
      font-weight: 500;
      color: white;
      list-style: none;
      text-decoration: none;
    }
    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }
    .link {
      font-size: 14px;
      transition: 0.05s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: aqua;
        border-color: aqua;
      }
    }
    .branding {
      display: flex;
      align-items: center;

      img {
        width: 50px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }
    .icon-active {
      transform: rotate(90deg);
    }
    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 250px;
      height: 100%;
      background-color: white;
      top: 80px;
      left: 0;
      li {
        margin-left: 0;
        .link {
          color: black;
        }
      }
    }

    .mobile-nav-enter-active {
      transition: 1s ease all;

    }
    .mobile-nav-leave-active {
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-50%);

      opacity: 0;
    }

    /* .mobile-nav-enter-active,
    .mobile-nav-leave-active {

      transition: 1s ease all;
    }
    .mobile-nav-enter-from .mobile-nav-leave-to {
      transform: translateX(0px);
    }
    .mobile-nav-enter-to {
      transform: translateX(250px);
    }
    .mobile-nav-leave-active {
      transition: 1s ease all;
    } */
  }
}
.scrolled-nav {
  background-color: black;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
  nav {
    padding: 8px 0;
    .branding {
      img {
        width: 40px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
