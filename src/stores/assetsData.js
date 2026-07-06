import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssetStore = defineStore('useAssetStore', () => {
  const asset = ref(null)

  const assetByEmployee = ref(null)
  const assetDetail = ref(null)
  const isLoading = ref(false)

  async function fetchAsset() {
    try {
      isLoading.value = true
      const { data, error } = await supabase.from('asset').select(`*,employee(*),office_name(*)`)

      asset.value = data
      if (error) throw error
    } catch (error) {
      console.error('Fetch all asset error', error)
    } finally {
      isLoading.value = false
    }
  }
  async function getAssetByEmployee(employeeID) {
    if (employeeID !== null && employeeID !== '0') {
      // console.log('getAssetByEmployee employeeID: ', employeeID)
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('asset')
          .select(`*,employee(*),office_name(*)`)
          .eq('user_id', employeeID)
        assetByEmployee.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error filter asstet by employee', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function getAssetByOffice(officeID) {
    if (officeID !== null && officeID !== '0') {
      try {
        isLoading.value = true
        const { data, error } = await supabase
          .from('asset')
          .select(`*,employee(*),office_name(*)`)
          .eq('office_id', officeID)
          .order('asset_tag', { ascending: true })
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
          .order('office_id')
        asset.value = data
        if (error) throw error
      } catch (error) {
        console.error('Error get all asset', error)
      } finally {
        isLoading.value = false
      }
    }
  }

  async function getAssetDetail(paramID) {
    let assetID = paramID
    if (assetID !== undefined || null) {
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
  }

  async function addAsset(newAsset) {
    try {
      isLoading.value = true
      const { error } = await supabase
        .from('asset')
        .insert([
          {
            ...newAsset,
            office_id: newAsset.office_id || null,
            user_id: newAsset.user_id || null,
            image: newAsset.image || null,
            spec: newAsset.spec,
          },
        ])
        .select()
      if (error) throw error
    } catch (error) {
      console.error('ERROR Add new computer fail: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateAsset(assetID, updateData) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('asset').update(updateData).eq('id', assetID).select()
      if (error) throw error
    } catch (error) {
      console.error('update  Assets error: ', error)
    } finally {
      isLoading.value = false
    }
  }
  // async function updateAsset(assetID, updateData) {
  //   try {
  //     isLoading.value = true

  //     // Convert empty strings to null to avoid PostgreSQL date syntax errors
  //     const sanitizedData = Object.fromEntries(
  //       Object.entries(updateData).map(([key, value]) => [key, value === '' ? null : value]),
  //     )

  //     const { error } = await supabase
  //       .from('asset')
  //       .update(sanitizedData)
  //       .eq('id', assetID)
  //       .select()
  //     if (error) throw error
  //   } catch (error) {
  //     console.error('update  Assets error: ', error)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  async function deleteAsset(paramID) {
    try {
      isLoading.value = true
      const { error } = await supabase.from('asset').delete().eq('id', paramID).select()
      if (error) throw error
    } catch (error) {
      console.error('Detele Computer assets error :', error, paramID)
    } finally {
      isLoading.value = false
    }
  }

  // .select(`*`)
  async function searchAsset(searchQuery) {
    try {
      isLoading.value = true
      const { data, error } = await supabase
        .from('asset')
        .select(`*,office_name(*),employee:user_id (*)`)
        .ilike('asset_tag', `%${searchQuery}%`)
        .order('asset_tag', { ascending: true })
      asset.value = data
      console.log('search asset in store: ', data)
      if (error) throw error
    } catch (error) {
      console.error('Error search asset: ', error)
    } finally {
      isLoading.value = false
    }
  }
  // async function searchAsset(searchQuery) {
  //   try {
  //     isLoading.value = true
  //     const { data, error } = await supabase
  //       .from('asset')
  //       .select(`*, office_name(*), employee(name)`)
  //       .ilike('asset_tag', `%${searchQuery}%`)
  //       .order('asset_tag', { ascending: true })
  //     asset.value = data
  //     console.log('search asset in store: ', data)
  //     if (error) throw error
  //   } catch (error) {
  //     console.error('Error search asset: ', error)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  getAssetByOffice('0')
  fetchAsset()

  return {
    asset,
    isLoading,
    assetDetail,
    assetByEmployee,
    // assetByOffice,
    // getAllasset,
    fetchAsset,
    getAssetByOffice,
    getAssetByEmployee,
    getAssetDetail,
    addAsset,
    updateAsset,
    deleteAsset,
    searchAsset,
  }
})
