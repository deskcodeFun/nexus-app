import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComputerStore = defineStore('useComputerStore', () => {
  let computer = ref(null)
  const isLoading = ref(false)

  async function getAllComputer() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('computer').select(`*,staff(*)`)
      computer.value = data
      console.log('Computer value from computerData.js', computer)
      if (error) throw error
    } catch (error) {
      console.log('Error get all Computer', error)
    } finally {
      isLoading.value = false
    }
  }
  getAllComputer()
  return {
    computer,
    isLoading,
    getAllComputer,
  }
})
