import { reactive, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useOfficeNameStore = defineStore('useOfficeNameStore', () => {
  let officeName = ref(null)
  let officeAllName = ref(null)
  let emailGroupName = ref(null)
  const isLoading = ref(false)
  const office_address = reactive({
    phone: '+66 2286 8899',
    fax: '+66 2286 2863',
    address: '31st Floor, Bangkok Insurance Building/Y.W.C.A. 25 South Sathorn Road, Thungmahamek',
    city: 'Sathorn',
    state: 'Bangkok',
    zip: '10120',
  })
  async function getGroupEmail() {
    try {
      isLoading.value = true
      const { data, error } = await supabase.from('email_group').select('*')
      emailGroupName.value = data
      // console.log('email group name', emailGroupName)
      if (error) throw error
    } catch (error) {
      console.error('ERROR: get email group name', error)
    } finally {
      isLoading.value = false
    }
  }
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
    office_address,
    emailGroupName,
    officeAllName,
    isLoading,
    getAllOffice,
    getOfficeName,
    getGroupEmail,
  }
})
