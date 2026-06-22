import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNasStore = defineStore('useNasStore', () => {
  // const appName = ref(null)
  const nasNameAll = ref('')
  const allNas = ref('')
  const isLoading = ref(false)

  async function getAllNas() {
    try {
      isLoading.value = true
      const { data, error } = await supabase
        .from('nas_name')
        .select('*')
        .order('office_id', { ascending: true })
      allNas.value = data
      console.log('allNas', allNas)
      if (error) throw error
    } catch (error) {
      console.log('errror in getAllNas', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchNasNameAll(officeID) {
    if (officeID !== null && officeID !== 0) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('nas_name')
          .select('*')
          .eq('office_id', officeID)
        nasNameAll.value = data
        if (error) throw error
      } catch (error) {
        console.log('error fecthNasAll wiht office = 0', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  return {
    allNas,
    nasNameAll,
    isLoading,
    getAllNas,
    fetchNasNameAll,
  }
})
