<template>
  <div class="absolute bg-[url('@/images/hero-bg2.jpg')] bg-cover inset-0">
    <div class="mt-40 max-w-sm mx-auto rounded-3xl bg-white/10 backdrop-blur-2xl p-8">
      <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSignin">
        <p class="text-xl text-center text-blue-900 font-bold pb-8">Sign In</p>
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
          <input
            class="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-white/60 hover:bg-white focus:bg-white"
            id="password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="*********"
            v-model="password"
          />
          <span class="absolute inset-y-0 right-0 pr-2 flex mt-2.5 cursor-pointer">
            <EyeIcon v-if="!passwordVisible" class="h-5 w-5 text-red-900" @click="togglePassword" />
            <EyeSlashIcon v-else class="h-5 w-5 text-red-900" @click="togglePassword" />
          </span>
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
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index'
import { supabase } from '@/lib/supabaseClient'

import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

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
