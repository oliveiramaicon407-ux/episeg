import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

// Substitua com os dados do seu painel no site do Supabase (Project Settings > API)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// ⭐ estado global reativo 

const session = ref(null) 

const loadingSession = ref(true) 

 

// pega sessão inicial 

supabase.auth.getSession().then(({ data }) => { 

  session.value = data.session 

  loadingSession.value = false 

}) 

 

// escuta mudanças 

supabase.auth.onAuthStateChange((_event, newSession) => { 

  session.value = newSession 

}) 

 

export function useSupabase() { 

  return { 

    supabase, 

    session, 

    loadingSession 

  } 

} 