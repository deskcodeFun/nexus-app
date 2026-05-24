import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const isInitialized = ref(false)

  //call this funciton once when app boots up
  async function initAuth() {
    //1 get initial session state
    const { data } = await supabase.auth.getSession()
    session.value = data.sessionuser.value = data.session?.user || null
    //2 listen for future chnages (loing, logout)
    supabase.auth.onAuthStateChange((_event, currentSession) => {
      session.value = currentSession
      user.value = currentSession?.user || null
    })
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }
  // handle logout
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    session.value = null
  }
  return {
    user,
    session,
    isInitialized,
    initAuth,
    login,
    logout,
  }
})
