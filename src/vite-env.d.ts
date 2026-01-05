/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLACEHOLDER_IMAGE: string
  readonly VITE_CALENDAR_IMAGES: string
  readonly VITE_COVER_IMAGES: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}