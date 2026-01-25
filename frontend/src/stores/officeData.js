import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useOfficeNameStore = defineStore('useOfficeNameStore', () => {
  let officeName = ref(null)
  const isLoading = ref(false)

  // get all office name from table office_name
  async function getAllOfficeName() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('office_name').select('*')
      officeName.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all office name: ', error)
    } finally {
      isLoading.value = false
    }
  }
  getAllOfficeName(0)
  return {
    officeName,
    isLoading,
    getAllOfficeName,
  }
})
