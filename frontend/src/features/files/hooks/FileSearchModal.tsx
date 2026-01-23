import React, { useEffect, useState } from "react";
import type { FileItem } from "../../../types";
// import { Dialog } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../../../components/ui/dialog";


interface FileSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFileSelect: (file: FileItem) => void;
    files: FileItem[];
    onToggleFavorite: (fileId: string) => void;
    zIndex?: number;
}

export function FileSearchModal({
    isOpen,
    onClose,
    onFileSelect,
    files,
    onToggleFavorite,
    zIndex = 50,
    disableBackdropClick = false,
}: FileSearchModalProps & {disableBackdropClick?: boolean }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [fileType, setFileType] = useState('all');
    const [owner, setOwner] = useState('all');
    return(
        <Dialog open={isOpen}>
            <DialogContent></DialogContent>
        </Dialog>
    )
}