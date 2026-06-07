import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useDepartmentStore = defineStore('useDepartmentStore', () => {
  const departmentName = ref(null)
  const departmentAllName = ref(null)

  const isLoading = ref(false)

  async function getAllDepartment() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('department_name').select('*')
      departmentAllName.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all department name: ', error)
    } finally {
      isLoading.value = false
    }
  }
  async function getDepartmnetName() {
    try {
      isLoading.value = true
      let { data, error } = await supabase.from('deparment_name').select('*').neq('id', 0)
      departmentName.value = data
      if (error) throw error
    } catch (error) {
      console.error('Error get all office name: ', error)
    } finally {
      isLoading.value = false
    }
  }
  getAllDepartment()
  getDepartmnetName()
  return {
    departmentName,
    departmentAllName,
    isLoading,
    getAllDepartment,
    getDepartmnetName,
  }
})
