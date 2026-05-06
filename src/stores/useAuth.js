// composables/useAuth.js
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const user = ref(null)

export function useAuth() {
  onMounted(() => {
    // Get initial session
    const session = supabase.auth.getSession()
    user.value = session?.user ?? null

    // Listen for auth changes (login/logout)
    supabase.auth.onAuthStateChange((_, session) => {
      user.value = session?.user ?? null
    })
  })

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('supabase.auth.token') // Clear token from localStorage
  }

  return { user, logout }
}
