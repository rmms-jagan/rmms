/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_APP_TITLE?: string;
    // add your custom env vars here 👇
    readonly VITE_I18N_DEFAULT_LANG?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  