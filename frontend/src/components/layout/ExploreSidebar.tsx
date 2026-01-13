import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Clock, Star, HardDrive, Folder, FolderOpen, ChevronRight } from "lucide-react";

type CheckState = "checked" | "interminate" | "unchecked";

export default function ExplorerSidebar({
    onClose,
}: {
    onClose?: () => void;
}) {
    return (
        <div className="w-80 h-full">
            <div className="flex">
                <h2>탐색</h2>
                {onClose && (
                    <Button variant="ghost" size="sm" >
                        x
                    </Button>
                )}
            </div>
        </div>
    )
}