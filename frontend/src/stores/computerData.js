import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComputerStore = defineStore('useComputerStore', () => {
  let computer = ref(null)
  // let computerByOffice = ref(null)
  let computerDetail = ref(null)
  const isLoading = ref(false)

  // async function getAllComputer() {
  //   try {
  //     isLoading.value = true
  //     let { data, error } = await supabase
  //       .from('computer')
  //       .select(`*,staff(*)`)
  //       .order('id', { ascending: true })
  //     computer.value = data
  //     if (error) throw error
  //   } catch (error) {
  //     console.log('Error get all Computer', error)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  async function getComputerByOffice(officeID) {
    if (officeID !== undefined && officeID !== '0') {
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
        console.log('Error filter computer by office', error)
      } finally {
        isLoading.value = false
      }
    } else {
      try {
        isLoading.value = true
        let { data, error } = await supabase.from('computer').select(`*, employee(*)`).order('id')
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
    let computerID = paramID
    if (computerID !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('computer')
          // .select(`*,staff(*,...office_name!inner(*))`)
          .select(`*,employee(fname,lname),office_name(name)`)
          .eq('id', computerID)
          .order('id')
        computerDetail.value = data
        console.log('computer detail from store:', computerDetail)
        if (error) throw error
      } catch (error) {
        console.error('Error get computer detail :', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function updateComputer(computerID, updateData) {
    console.log('updataData in computerData.js', computerID, updateData)
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
      isLoading.value = false
      const { error } = await supabase.from('computer').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('Detele Computer assets error :', error, paramID)
    } finally {
      isLoading.value = false
    }
  }

  getComputerByOffice()

  return {
    computer,
    isLoading,
    computerDetail,
    // computerByOffice,
    // getAllComputer,
    getComputerByOffice,
    getComputerDetail,
    updateComputer,
    deleteComputer,
  }
})
