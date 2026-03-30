<!-- <div class="w-full min-h-screen bg-linear-180 from-indigo-100 to-red-100"> -->
<template>
  <div class="fixed h-screen w-full">
    <div class="fixed top-0 left-0 right-0 z-1000">
      <TheTopbar />
    </div>
    <div class="h-screen  mt-18  sm:pl-8 sm:mr-8 z-0">
      <RouterView />
    </div>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import TheTopbar from '@/components/TheTopbar.vue'
  import { supabase } from './lib/supabaseClient.js'
  const isConnected = ref(false)
  const error = ref(null)

  async function checkConnection() {
    try {
      // Attempt a simple, lightweight request, like checking the current session
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession()
      if (authError) {
        throw authError
      }

      // If the request succeeds without throwing an error, the connection is working
      isConnected.value = true
      console.log('Supabase connection successful. User session:', session)
    } catch (err) {
      // This block catches network errors or auth errors
      isConnected.value = false
      error.value = err.message
      console.error('Supabase connection failed:', err.message)
      // Common errors might be "connection refused" or "network request failed"
    }
  }

  // Check connection when the component mounts
  checkConnection()
</script>
