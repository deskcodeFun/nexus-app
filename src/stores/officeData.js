import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useOfficeNameStore = defineStore('useOfficeNameStore', () => {
  let officeName = ref(null)
  let officeAllName = ref(null)
  const isLoading = ref(false)

  // get all office name from table office_name
  // getAllOffice use in dropdown selected with 'ALL'
  async function getAllOffice() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('office_name').select('*')
      officeAllName.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all office name: ', error)
    } finally {
      isLoading.value = false
    }
  }
  async function getOfficeName() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('office_name').select('*').neq('id', 0)
      officeName.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all office name: ', error)
    } finally {
      isLoading.value = false
    }
  }

  getAllOffice()
  getOfficeName()
  return {
    officeName,
    officeAllName,
    isLoading,
    getAllOffice,
    getOfficeName,
  }
})
