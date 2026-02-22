import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePrinterStore = defineStore('usePrinterStore', () => {
  const printer = ref(null)
  const printerDetail = ref(null)
  const isLoading = ref(false)

  async function getPrinterByOffice(officeID) {
    if (officeID !== null && officeID !== '0') {
      try {
        isLoading.value - true
        const { data, error } = await supabase
          .from('printer')
          .select('*,employee(*)')
          .eq('office_id', officeID)
          .order('id')
        printer.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error Filter printer by office', error)
      } finally {
        isLoading.value = false
      }
    } else if (officeID == '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase.from('printer').select('*, employee(*)').order('id')
        printer.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get all Printer', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function getPrinterDetail(paramID) {
    let printerID = paramID
    if (printerID !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('printer')
          .select(`*, employee(*),office_name(*)`)
          .eq('id', printerID)
          .order('id')
        printerDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get Printer Detail ', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function addPrinter(newPrinter) {
    try {
      isLoading.value = true
      const printerToInsert = { ...newPrinter }
      delete printerToInsert.paramID
      const { error } = await supabase.from('printer').insert([printerToInsert])
      if (error) throw error
    } catch (error) {
      console.error('ERROR Add New Printer fail: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updatePrinter(printerID, updateData) {
    try {
      isLoading.value = true
      const { error } = await supabase
        .from('printer')
        .update(updateData)
        .eq('id', printerID)
        .select()
      if (error) throw error
    } catch (error) {
      console.error('UPDATE Printer fail : ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function deletePrinter(paramID) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('printer').delete().eq('id', paramID)
      if (error) throw error
    } catch (error) {
      console.error('Delete Printer Fail : ', error)
    } finally {
      isLoading.value = false
    }
  }
  getPrinterByOffice('0')

  return {
    printer,
    isLoading,
    printerDetail,
    getPrinterByOffice,
    getPrinterDetail,
    addPrinter,
    updatePrinter,
    deletePrinter,
  }
})
