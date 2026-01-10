/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_PROVIDER?: string
  readonly VITE_GROQ_API_KEY?: string
  readonly VITE_DEEPSEEK_API_KEY?: string
  readonly VITE_OPENAI_API_KEY?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
