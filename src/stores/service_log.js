import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useServiceLog = defineStore('service_log', () => {
  const serviceLog = ref()
  const serviceDetail = ref()
  let isLoading = ref(true)

  async function addService(newService) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('service_log').insert([newService])
      if (error) throw error
    } catch (error) {
      console.error('ERROR Add new service : ', error)
    } finally {
      alert('Add service suscess')
      isLoading.value = false
    }
  }

  async function fetchService() {
    try {
      const { data, error } = await supabase
        .from('service_log')
        .select(`*,service_type(*)`)
        .order('id', { ascending: false })
      serviceLog.value = data
      console.log('service log in store: ', serviceLog.value)
      if (error) throw error
      // console.log('service in store :', serviceLog)
    } catch (error) {
      console.error('Fetch Service Store error:', error)
    } finally {
      isLoading.value = false
    }
  }
  async function getServiceDetail(paramId) {
    if (paramId !== undefined) {
      try {
        const { data, error } = await supabase
          .from('service_log')
          .select(`*,service_type(*)`)
          .eq('asset_tag', paramId)
        serviceDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('Fetch service detail error:', error)
      } finally {
        isLoading.value = false
      }
    } else {
      console.log('parmaID is undefined')
      isLoading.value = false
    }
  }
  async function updateServiceState(list, itemID) {
    console.log('Updating service state:', list, itemID)
    try {
      const { error } = await supabase
        .from('service_log')
        .update({ state: list })
        .eq('id', itemID)
        .order('id', { ascending: false })
      if (error) throw error
    } catch (error) {
      console.error('UPDATE Service Log error:', error)
    } finally {
      isLoading.value = false
    }
  }
  fetchService()
  updateServiceState()
  getServiceDetail()
  return {
    serviceLog,
    serviceDetail,
    addService,
    fetchService,
    getServiceDetail,
    updateServiceState,
  }
})
