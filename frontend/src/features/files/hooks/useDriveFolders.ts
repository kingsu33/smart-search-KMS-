import { useState, useEffect, useMemo } from "react";
import type { FileItem } from "../../../types";

export interface DriveFolder {
    id: string;
    name: string;
    driveId?: string;
    isExpanded: boolean;
    files: FileItem[];
    folders?: DriveFolder[];
    icon?: string;
}

type CheckState = 'checked' | 'indeterminate' | 'unchecked';

export function useDriveFolders(
    apiToken: string | undefined,
    initialFiles: FileItem[],
    onSelectAll?: () => void
) {
    const [driveFolders, setDriverFolders] = useState<DriveFolder[]>(() => {
        try {
            const saved = localStorage.getItem('drive:folders');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    return {
        driveFolders,
    }
};