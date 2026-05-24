import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(supabase.auth.user() ? supabase.auth.session() : null)
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
    supabase.auth.onAuthStateChange((_event, session) => {
      session.value = session
      user.value = session?.user || null
    })
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    isLoggedIn.value = true
    return data
  }
  // handle logout
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    isLoggedIn.value = false
    user.value = null
    session.value = null
  }
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
