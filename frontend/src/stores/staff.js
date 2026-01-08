import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaffStore = defineStore('useStaffStore', () => {
  let staff = ref(null)
  let staffDetail = ref(null)
  const isLoading = ref(true)

  async function getAllStaff() {
    try {
      let { data, error } = await supabase
        .from('staff')
        .select(`*,office_name(*)`)
        .order('id', { ascending: true })
      // const { data, error } = await supabase.from('staff').select(`id,name,short_name,office_name(id,name,short_name)`)
      staff.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all staff', error)
    } finally {
      isLoading.value = false
    }
  }
  async function getStaffDetail(paramID) {
    if (paramID !== undefined) {
      try {
        const { data, error } = await supabase
          .from('staff')
          .select('*,office_name(*)')
          .eq('id', paramID)
        staffDetail.value = data
        console.log('staffDetail in staff.js: ', staffDetail)
        if (error) throw error
      } catch (error) {
        console.error('error get staff detail:', error)
      }
    } else {
      console.error('param id is undefined')
      isLoading.value = false
    }
  }

  async function addUser(newUser) {
    try {
      const { error } = await supabase.from('staff').insert([newUser])
      if (error) throw error
    } catch (error) {
      console.error('Add new User ERROR: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateUser(staffID, updateData) {
    console.log('updateData in staff.js: ', staffID, updateData)
    try {
      const { error } = await supabase.from('staff').update(updateData).eq('id', staffID).select()

      if (error) throw error
    } catch (error) {
      console.error('updat staff error: ', error)
    }
  }
  async function deleteUser(paramID) {
    try {
      const { error } = await supabase.from('staff').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('Delete staff is Error: ', error)
    }
  }

  getAllStaff()

  return {
    staff,
    staffDetail,
    isLoading,
    getAllStaff,
    getStaffDetail,
    addUser,
    updateUser,
    deleteUser,
  }
})
