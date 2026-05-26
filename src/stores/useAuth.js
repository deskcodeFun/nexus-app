import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const isInitialized = ref(false)
  const isLoggedIn = ref(false)

  //call this funciton once when app boots up
  async function initAuth() {
    //1 get initial session state
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user || null
    isInitialized.value = true
    //2 listen for future chnages (loing, logout)
    supabase.auth.onAuthStateChange((event, currentSession) => {
      // console.log('Auth state changed:', event, currentSession)
      session.value = currentSession
      user.value = currentSession?.user || null
    })
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    isLoggedIn.value = true
    return data
  }
  // handle logout
  function logout() {
    // check session before trying to log out
    if (!session.value) return
    try {
      const { error } = supabase.auth.signOut()
      if (error && error.status === 403) throw error
      isLoggedIn.value = false
      user.value = null
      session.value = null
      window.localStorage.removeItem('supabase.auth.token') // Clear token from localStorage
      window.sessionStorage.removeItem('supabase.auth.token') // Clear token from sessionStorage
    } catch (error) {
      console.error('Logout error:', error.email)
    }
  }
  initAuth() // call it once when store is created
  return {
    user,
    isLoggedIn,
    session,
    isInitialized,
    initAuth,
    login,
    logout,
  }
})
