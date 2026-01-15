export type Screen = 'login' | 'signup' | 'onboarding' | 'home' | 'chat' | 'settings';

export interface FileItem {
    id: string;
    name: string;
    type: 'pdf' | 'word' | 'excel' |'powerpoint' | string;
    size: number;
    creator: string;
    createdAt: string;
    lastUpdater : string;
    updatedAt : string;
    path : string;
    icon?: string;
    isFavorite?: boolean;
}

export interface ApiKey {
    apiIdx: number;
    userIdx: number;
    apiTitle: string;
    apiURL: string;
    createdDate: string;
    lastUsed: string;
    isConnected: boolean;
}

export interface FilesHookReturn {
    files: FileItem[];
    // showPreviewDrawer: boolean;
    // selectedFile: FileItem | null;
    // onFileSelect: (file: FileItem) => void;
    // onToggleFavorite: (fileId: string) => void;
    // totalFiles: number;
    // favoriteFiles: FileItem[];
    // recentFiles: FileItem[];
    // favoriteCount: number;
}