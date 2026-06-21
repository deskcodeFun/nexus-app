import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppNameStore = defineStore('useAppNameStore', () => {
  // const appName = ref(null)
  const appNameAll = ref('')
  const isLoading = ref(false)

  async function fetchAppNameAll() {
    try {
      isLoading.value = true
      const { data, error } = await supabase.from('application_name').select('*')

      appNameAll.value = data
      if (error) throw error
    } catch (error) {
      console.error('Fetch all Application Name error', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    // appName,
    appNameAll,
    fetchAppNameAll,
  }
})
