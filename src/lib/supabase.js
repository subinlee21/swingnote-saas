// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fjfthpknmdaamsxmqowg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZnRocGtubWRhYW1zeG1xb3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NjgwMTYsImV4cCI6MjA2MjI0NDAxNn0.ItfCLCRHO1Pk5BwF665JxWH02L_GKkUHCJczpXRaTjQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
