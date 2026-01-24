import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaffStore = defineStore('useStaffStore', () => {
  const staff = ref(null)
  const staffDetail = ref(null)
  // const staffByOffice = ref(null)
  const isLoading = ref(false)

  // async function getAllStaff() {
  //   try {
  //     isLoading.value = true
  //     const { data, error } = await supabase
  //       .from('staff')
  //       .select(`*,office_name(*)`)
  //       .order('office_id', { ascending: true })
  //     // const { data, error } = await supabase.from('staff').select(`id,name,short_name,office_name(id,name,short_name)`)
  //     staff.value = data
  //     if (error) throw error
  //   } catch (error) {
  //     console.error('Error get all staff', error)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }
  async function getStaffByOffice(officeID) {
    console.log('officeID parameter from staff store', officeID)
    if (officeID !== undefined && officeID !== '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('staff')
          .select('*, office_name(*)')
          .eq('office_id', officeID)
          .order('id', { ascending: true })
        staff.value = data
        if (error) throw error
      } catch (error) {
        console.log('Error filter user by office :', error)
      } finally {
        isLoading.value = false
      }
    } else {
      try {
        isLoading.value = true
        const { data, error } = await supabase.from('staff').select('*, office_name(*)')
        staff.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get all staff from staff store', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function getStaffDetail(paramID) {
    if (paramID !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('staff')
          .select('*,office_name(*)')
          .eq('id', paramID)
          .order('id', { ascending: true })
        staffDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('error get staff detail:', error)
      } finally {
        isLoading.value = false
      }
    } else {
      console.error('param id is undefined')
      isLoading.value = false
    }
  }

  async function addUser(newUser) {
    try {
      isLoading.value = true
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
      isLoading.value = true
      const { error } = await supabase.from('staff').update(updateData).eq('id', staffID).select()
      if (error) throw error
    } catch (error) {
      console.error('updat staff error: ', error)
    } finally {
      isLoading.value = false
    }
  }
  async function deleteUser(paramID) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('staff').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('Delete staff is Error: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // getAllStaff()
  getStaffByOffice(0)

  return {
    staff,
    staffDetail,
    isLoading,
    // staffByOffice,
    // getAllStaff,
    getStaffDetail,
    getStaffByOffice,
    addUser,
    updateUser,
    deleteUser,
  }
})
