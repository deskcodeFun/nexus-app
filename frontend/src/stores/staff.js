import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const useStaffStore = defineStore('useStaffStore',()=> {
  let staff = ref(null)
  const isLoading = ref(true)

  async function getAllStaff() {
    try {
      let { data, error } = await supabase.from('staff').select(`*,office_name(*)`)
      // const { data, error } = await supabase.from('staff').select(`id,name,short_name,office_name(id,name,short_name)`)
      staff.value = data
      if (error) throw error
      console.log('data staff in stores folder:',staff)
    } catch (error) {
      console.error('Error get all staff',error)
    } finally {
      isLoading.value = false
    }
  }

  getAllStaff()
  return {
    staff,
    isLoading,
    getAllStaff
  }
})
