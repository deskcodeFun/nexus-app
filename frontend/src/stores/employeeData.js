import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('useEmployeeStore', () => {
  const employee = ref(null)
  const employeeDetail = ref(null)
  // const employeeByOffice = ref(null)
  const isLoading = ref(false)

  // async function getAllemployee() {
  //   try {
  //     isLoading.value = true
  //     const { data, error } = await supabase
  //       .from('employee')
  //       .select(`*,office_name(*)`)
  //       .order('office_id', { ascending: true })
  //     // const { data, error } = await supabase.from('employee').select(`id,name,short_name,office_name(id,name,short_name)`)
  //     employee.value = data
  //     if (error) throw error
  //   } catch (error) {
  //     console.error('Error get all employee', error)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }
  async function getEmployee(officeID) {
    console.log('officeID parameter from employee store', officeID)
    if (officeID !== undefined && officeID !== 0) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('employee')
          .select('*, office_name(*)')
          .eq('office_id', officeID)
          .order('id')
        employee.value = data
        if (error) throw error
      } catch (error) {
        console.log('Error filter Employee: ', error)
      } finally {
        isLoading.value = false
      }
    } else {
      isLoading.value = true
      const { data, error } = await supabase.from('employee').select('*, office_name(*)')
      employee.value = data
      console.log('employee with office 0 :', data)
      if (error) throw error
      isLoading.value = false
    }
  }

  async function getEmployeeDetail(paramID) {
    if (paramID !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('employee')
          .select('*,office_name(*)')
          .eq('id', paramID)
          .order('id', { ascending: true })
        employeeDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('error get Employee detail:', error)
      } finally {
        isLoading.value = false
      }
    } else {
      console.error('param id is undefined')
      isLoading.value = false
    }
  }

  async function addEmployee(newUser) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('employee').insert([newUser])
      if (error) throw error
    } catch (error) {
      console.error('ERROR Add new Employee: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateEmployee(employeeID, updateData) {
    console.log('updateData in employee.js: ', employeeID, updateData)
    try {
      isLoading.value = true
      const { error } = await supabase
        .from('employee')
        .update(updateData)
        .eq('id', employeeID)
        .select()
      if (error) throw error
    } catch (error) {
      console.error('ERROR update Employee: ', error)
    } finally {
      isLoading.value = false
    }
  }
  async function deleteEmployee(paramID) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('employee').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('ERROR Delete employee: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // getAllemployee()
  getEmployee(0)

  return {
    employee,
    employeeDetail,
    isLoading,
    // employeeByOffice,
    // getAllemployee,
    getEmployee,
    getEmployeeDetail,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  }
})
