import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNasStore = defineStore('useNasStore', () => {
  // const appName = ref(null)
  const nasNameAll = ref('')
  const isLoading = ref(false)

  async function fetchNasNameAll(officeID) {
    if (officeID !== null && officeID !== 0) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('nas_name')
          .select('*')
          .eq('office_id', officeID)
        nasNameAll.value = data
        console.log('nasNameAll in store', nasNameAll)
        if (error) throw error
      } catch (error) {
        console.error('Fetch all Application Name error', error)
      } finally {
        isLoading.value = false
      }
    } else {
      if (officeID == '0') {
        try {
          isLoading.value = true
          const { data, error } = await supabase.from('nas_name').select('*')
          nasNameAll.value = data
          if (error) throw error
        } catch (error) {
          console.log('error fecthNasAll wiht office = 0', error)
        } finally {
          isLoading
        }
      }
    }
  }
  return {
    // appName,
    nasNameAll,
    isLoading,
    fetchNasNameAll,
  }
})
