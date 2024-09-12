/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


interface ImportMetaEnv {
  readonly VITE_CUSTOM_VAR: string;
  // Add other custom environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
