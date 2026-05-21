interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}
interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
