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

export function useDriveFolders(
    onSelectAll?: () => void
){

};