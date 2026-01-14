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