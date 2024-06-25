/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL_BASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
