import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComputerStore = defineStore('useComputerStore', () => {
  const computer = ref(null)
  const computerDetail = ref(null)
  const isLoading = ref(false)

  async function getComputerByOffice(officeID) {
    if (officeID !== null && officeID !== '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('computer')
          .select(`*,employee(*)`)
          .eq('office_id', officeID)
          .order('id')
        computer.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error filter computer by office', error)
      } finally {
        isLoading.value = false
      }
    } else if (officeID == '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase.from('computer').select(`*, employee(*)`).order('id')
        computer.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get all computer', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function getComputerDetail(paramID) {
    const computerID = ref(paramID)
    if (computerID.value !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('computer')
          .select(`*,employee(*),office_name(*)`)
          .eq('id', computerID)
          .order('id')
        computerDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get computer detail :', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function addComputer(newComputer) {
    try {
      isLoading.value = true
      const computerToInsert = { ...newComputer }
      delete computerToInsert.id
      const { error } = await supabase.from('computer').insert([computerToInsert])
      if (error) throw error
    } catch (error) {
      console.error('ERROR Add new computer fail: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateComputer(computerID, updateData) {
    try {
      isLoading.value = true
      const { error } = await supabase
        .from('computer')
        .update(updateData)
        .eq('id', computerID)
        .select()
      if (error) throw error
    } catch (error) {
      console.error('update Computer Assets error: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function deleteComputer(paramID) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('computer').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('Detele Computer assets error :', error, paramID)
    } finally {
      isLoading.value = false
    }
  }

  getComputerByOffice('0')

  return {
    computer,
    isLoading,
    computerDetail,
    // computerByOffice,
    // getAllComputer,
    getComputerByOffice,
    getComputerDetail,
    addComputer,
    updateComputer,
    deleteComputer,
  }
})
