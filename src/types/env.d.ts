interface ImportMetaEnv {
    //env
    readonly VITE_APP_TITLE: string;
    readonly VITE_PORT: number;
    readonly VITE_API_BASE_URL: string;

    //basic settings
    readonly BASE_URL: string;
    readonly MODE: string;
}

interface BasicMetaHot {
    accept: any;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly hot: BasicMetaHot;
}