import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Clock, Star, HardDrive, Folder, FolderOpen, ChevronRight } from "lucide-react";
import type { FileItem } from "../../types";
import type { DriveFolder } from "../../features/files/hooks/useDriveFolders";
type CheckState = "checked" | "interminate" | "unchecked";

export default function ExplorerSidebar({
    driveFolders,
    activateTabDefault = "recent",
    onClose,
}: {
    driveFolders:DriveFolder[];
    activateTabDefault?: "recent" | "favorites" | "drive";
    onClose?: () => void;
}) {
    const [activateTab, setActiveTab] = useState<"recent" | "favorites" | "drive">(activateTabDefault);

    return (
        <div className="w-80 h-full">
            {/* 헤더 */}
            <div className="flex">
                <h2>탐색</h2>
                {onClose && (
                    <Button variant="ghost" size="sm" >
                        x
                    </Button>
                    
                )}
            </div>

            {/* 바디 */}
            <div>
                {/* 탭 */}
                <div>
                    <button>
                        <Clock />
                        <span>최근</span>
                    </button>
                    <button>
                        <Star />
                        <span>즐겨찾기</span>
                    </button>
                    <button>
                        <HardDrive />
                        <span>드라이브</span>
                    </button>
                </div>
                {/* 콘텐츠 */}
                {activateTab === "drive" ? (
                    <div className="flex-1">
                        {/* 선택 요약/버튼 */}
                        <div>
                            <span>선택된 폴더: </span>
                        </div>
                    </div>
                )  : (
                    //렌더 부분
                    <div></div>

                )}
            </div>
        </div>
    )
}