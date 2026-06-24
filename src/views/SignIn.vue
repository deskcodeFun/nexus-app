<template>
  <div class="absolute bg-[url('@/images/hero-bg2.jpg')] bg-cover inset-0 z-0">
    <div class="flex flex-col md:flex-row mx-auto md:justify-between md:items-center h-screen">
      <div
        class="mt-36 md:mt-0 md:h-full flex flex-col justify-center text-left text-white px-2 z-10"
      >
        <p class="lg:text-[22px] uppercase font-semibold pb-2 ml-2">Nexus Property Consultants.</p>
        <hr class="max-w-91.25 ml-1" />
        <div class="text-4xl sm:text-[80px]">
          <p class="lg:mb-8">IT Service</p>
          <p class="lg:mb-4">Application</p>
        </div>
        <hr class="border-2 max-w-30 mt-4 ml-1" />
      </div>
      <!-- Sign In Form -->
      <div class="mx-4 mt-8 lg:w-120 rounded-3xl bg-white/30 backdrop-blur-2xl">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSignin">
          <p class="text-3xl text-center text-blue-900 font-semibold pb-8">Sign In</p>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 hover:bg-white focus:bg-white focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              v-model="email"
            />
          </div>
          <!-- icon -->
          <div class="relative h-fit">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input
                class="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-white/60 hover:bg-white focus:bg-white"
                id="password"
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="*********"
                v-model="password"
              />
              <span class="absolute inset-y-0 right-0 pr-2 flex mt-2.5 cursor-pointer">
                <EyeIcon
                  v-if="!passwordVisible"
                  class="h-5 w-5 text-red-900"
                  @click="togglePassword"
                />
                <EyeSlashIcon v-else class="h-5 w-5 text-red-900" @click="togglePassword" />
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-light text-sm text-blue-900 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <div class="flex flex-col font-light text-xs text-slate-300 items-center justify-center">
          <p>&copy; 2026 All rights reserved.</p>
          <p>Nexus Web Application.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index'
import { supabase } from '@/lib/supabaseClient'

import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
// Pre-filled credentials for testing purposes. In production, these should be removed or handled securely.
// const email = ref('panya.korkusol@gmail.com')
// const password = ref('pkok4050')
// Pre-filled credentials for production purposes. In development, these should be removed or handled securely.
const email = ref('')
const password = ref('')
const passwordVisible = ref(false)

const handleSignin = async () => {
  try {
    // Use the Supabase provided method to handle the signin
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/assets')
  } catch (error) {
    alert(error.error_description || error.message)
  }
}

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>
<style scoped>
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
      justify-content: center;
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
</style>
