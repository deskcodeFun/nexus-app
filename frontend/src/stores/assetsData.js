import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssetStore = defineStore('useAssetStore', () => {
  const asset = ref(null)
  const assetDetail = ref(null)
  const isLoading = ref(false)

  async function getAssetByOffice(officeID) {
    if (officeID !== null && officeID !== '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('asset')
          .select(`*,employee(*),office_name(*)`)
          .eq('office_id', officeID)
          .order('id')
        asset.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error filter asstet by office', error)
      } finally {
        isLoading.value = false
      }
    } else if (officeID == '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('asset')
          .select(`*, employee(*),office_name(*)`)
          .order('id')
        asset.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get all asset', error)
      } finally {
        isLoading.value = false
      }
    }
    console.log('Asset data : ', asset)
  }

  async function getAssetDetail(paramID) {
    let assetID = paramID
    if (assetID !== undefined) {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('asset')
          .select(`*,employee(*),office_name(*)`)
          .eq('id', assetID)
          .order('id')
        assetDetail.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get asset detail :', error)
      } finally {
        isLoading.value = false
      }
    }
    console.log('Data getAssetDetail :', assetDetail)
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

  getAssetByOffice('0')
  getAssetDetail('1')

  return {
    asset,
    isLoading,
    assetDetail,
    // assetByOffice,
    // getAllasset,
    getAssetByOffice,
    getAssetDetail,
    addComputer,
    updateComputer,
    deleteComputer,
  }
})
