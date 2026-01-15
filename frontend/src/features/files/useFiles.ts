import { useState, useCallback, useMemo, useEffect } from "react";
import type { FileItem, FilesHookReturn } from "../../types";
import type { DriveFolder } from "./hooks/useDriveFolders";
import { flattenDriveFiles } from "./utils/flattenDriveFiles";


export function useFiles(driveFolders: DriveFolder[]): FilesHookReturn {
    const [files] = useState<FileItem[]>(() => flattenDriveFiles(driveFolders ?? []));
    return {
        files,
    };
}