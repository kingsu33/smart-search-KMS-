import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { 
    X,
    Download,
    Star,
    MoreVertical,
    ExternalLink,
    Share2,
    Copy,
    Edit,
    Trash2,
    FileText,
    Calendar,
    User,

} from "lucide-react";
import type { FileItem } from "../../../types";


interface FilePreviewDrawerProps {
    file: FileItem;
    isOpen: boolean;
    onClose: () => void;
    onToggleFavorite: (fileId: string) => void;
    zIndex?: number;
}

export function FilePreviewDrawer({
    file,
    isOpen,
    onClose,
    onToggleFavorite,
    zIndex = 100,
}: FilePreviewDrawerProps) {
    const [showActions, setShowActions] = useState(false);
    const [creator, setCreator] = useState<string>('로딩중...');
    const [lastUpdater, setLastUpdator] = useState<string>('로딩중...');

    if (!isOpen) return null;

    const handleToggleFavorite = () => {
        onToggleFavorite(file.id);
    };

    const fileActions = [
        { icon: <Download className="w-4 h-4" />, label: '다운로드', action: () => {} },
        { icon: <ExternalLink className="w-4 h-4"/>, label: '새 탭에서 열기', action: () => {} },
        { icon: <Share2 className="w-4 h-4" />, label: '공유', action: () => {} },
        { icon: <Copy className="w-4 h-4" />, label: '링크 복사', action: () => {} },
        { icon: <Edit className="w-4 h-4" />, label: '편집', action: () => {} },
        { icon: <Trash2 className="w-4 h-4" />, label: '삭제', action: () => {}, danger: true },
    ]


    return (
        <div>
            {/* 배경 오버레이 */}
            <div
            
            />

            {/* 드로어 콘텐츠 */}
            <div>
                <div>
                    {/* 헤더 */}
                    <div>
                        <div>
                            <span></span>
                            <div>
                                <h2>

                                </h2>
                                <p>
                                    {file.type} • {(file.size / 1024 / 1024).toFixed(1)}MB
                                </p>
                            </div>
                        </div>

                        <div>
                            <Button>
                                <Star/>
                            </Button>
                            <div>
                                <Button
                                    className="w-10 h-10 p-0 text-muted-foreground hover:bg-accent rounded-xl"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </Button>

                                {showActions && (
                                    <div>
                                        <div>
                                            {fileActions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        action.action();
                                                        setShowActions(false);
                                                    }}
                                                    className={`w-full ${
                                                        action.danger
                                                        ? 'text-destructive hover:bg-destructive/10'
                                                        :'text-foreground hover:bg-accent'
                                                    }`}
                                                >
                                                    {action.icon}
                                                    <span className="text-sm">{action.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button>
                                <X className="w-5 h-5"/>
                            </Button>
                        </div>
                    </div>

                    {/* 콘텐츠 영역 */}
                    <div>
                        <div>
                            {/* 파일 미리보기 */}
                            <div>
                                <div>
                                    <FileText />
                                </div>
                                <h3>
                                    파일 미리보기
                                </h3>
                                <p>
                                    이 파일 형식의 미리보기를 지원하지 않습니다.
                                </p>
                                <div className="flex justify-center space-x-3">
                                    <Button>
                                        <Download className="w-4 h-4 mr-2"/>
                                        다운로드
                                    </Button>
                                    <Button>
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        열기
                                    </Button>
                                </div>
                            </div>

                            {/* 파일 정보 */}
                            <div>
                                <h3>파일 정보</h3>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <Calendar/>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">생성자</p>
                                                    <p>{creator}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <User/>
                                                <div>
                                                    <p></p>
                                                    <p>{file.createdAt ? new Date(file.createdAt).toLocaleString() : '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}