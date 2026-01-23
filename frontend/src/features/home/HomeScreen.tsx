import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ExplorerSidebar from "../../components/layout/ExploreSidebar";
import { useNavigate } from "react-router-dom";
import { AlertCircle, FileText, Filter, Grid, List, MessagesSquare, PanelLeft, Plus, Search, SidebarOpen, Star } from "lucide-react";
import { useFiles } from "../files/useFiles";
import { useDriveFolders } from "../files/hooks/useDriveFolders";
import type { FileItem, ApiKey } from "../../types";
import { useFileData } from "../files/hooks/useFileData";
import { FileSearchModal } from "../files/hooks/FileSearchModal";
import { FilePreviewDrawer } from "../files/hooks/FilePreviewDrawer";

interface HomeScreenProps {
    onNavigateToChat: () => void;
    files: FileItem[];
    onToggleFavorite: (fileId: string) => void;
    apiKeys: ApiKey[];
    onFileSelect?: (file: FileItem) => void;

}

export function HomeScreen({
    files,
    onToggleFavorite,
    apiKeys,
    onFileSelect,

}: HomeScreenProps) {
    const [SidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFileModal, setShowFileModal] = useState(false);
    const { recentFiles } = useFileData(files);
    const { driveFolders } = useDriveFolders(apiKeys.find(k => k.isConnected)?.apiURL, files);
    const filesHook = useFiles(driveFolders);
    const[selectedFile, setselectedFile] = useState<FileItem | null>(null);
    const showPreviewDrawer = !!selectedFile;
    const handleClosePreview = () => setselectedFile(null);

    const [sortOption, setSortOption] =useState<'recent' | 'oldest' | 'name' | 'favorite'>('recent');
    const [showSortDropdown, setShowSrotDropdown] =useState(false);

    const recentFilesForMain = files.slice(0, 8);

    const getTime = (d?: string) => (d ? new Date(d).getTime() : 0);

    const sortedFiles = [...recentFilesForMain].sort((a, b) => {
        switch (sortOption) {
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return getTime(b.updatedAt) - getTime(a.updatedAt);
        }
    });

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (apiDrop)
    //     }
    // })

    const handleFileSelect = (file: FileItem) => {
        setselectedFile(file);
    }

    return (
        <div className="h-screen flex bg-background overflow-hidden">
            {/* 사이드바 */}
            <div
                className={`${SidebarOpen ? 'w-80' : 'w-0'
                } transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <ExplorerSidebar 
                    driveFolders={driveFolders}
                    onClose={() => setSidebarOpen(false)}
                />
            </div>

            {/* 메인 */}
            <div className="flex-1 flex flex-col">
                {/* 헤더 */}
                <header className="bg-background border-b-2 border-border p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-10 h-10 p-0 hover:bg-accent rounded-xl border border-border"
                                onClick={()=> setSidebarOpen(!SidebarOpen)}
                            >
                                <PanelLeft className="w-5 h-5 text-muted-foreground" />
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center border border-border">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-foreground">Smart Search</h1>
                                    <p className="text-sm text-mutede-foreground">AI 키워드 파일 검색</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button>

                                <span>API 설정 관리</span>
                            </button>
                        </div>

                    </div>
                </header>

                {/* 메인 */}
                <main className="flex-1 p-8 overflow-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* 환영 섹션 */}
                        <div className="text-center space-y-4 py-8">
                            <h2 className="text-4xl font-bold text-foreground mb-4">안녕하세요! 👋</h2>
                            <p className="text-xl text-muted-foreground mb-8">무엇을 찾고 계신가요?</p>
                        </div>

                        {/* 검색 바 */}
                        <div className="relative w-full">
                            <div className="bg-background border-2 border-border p-2 rounded-2xl shadow-clean-md">
                                <div className="flex items-center space-x-3">
                                    <Search className="w-5 h-5 text-muted-foreground ml-4"/>
                                    <Input 
                                        type="text"
                                        placeholder="파일, 문서, 또는 내용을 검색하세요..."
                                        // value={}
                                        onChange={(e) => (e.target.value)}
                                        className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus:ring-0 h-14"
                                    />
                                    <Button
                                    // onClick={}
                                        className="bg-gradient-primary hover:shadow-lg btn-glow text-white font-semibold px-6 h-12 rounded-xl border border-blue-600"
                                    >
                                        검색
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 빠른 액션 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <Button
                                className="bg-background border-2 border-border p-6 h-auto flex flex-col items-center space-y-3 hover:bg-accent text-foreground card-hover shadow-clean-md"
                                variant="ghost"
                            >
                                <MessagesSquare className="w-8 h-8 text-primary"/>
                                <div className="text-center">
                                    <h3 className="font-semibold text-foreground">AI 채팅</h3>
                                    <p className="text-sm text-muted-foreground mt-1">AI와 대화하며 파일 검색</p>
                                </div>
                            </Button>
                            <Button
                                className="bg-background border-2 border-border p-6 h-auto flex flex-col items-center space-y-3 hover:bg-accent text-foreground card-hover shadow-clean-md"
                                variant="ghost"
                            >
                                <Plus className="w-8 h-8 text-primary" />
                                <div className="text-center">
                                    <h3 className="font-semibold text-foreground">파일 업로드</h3>
                                    <p className="text-sm text-muted-foreground mt-1">새 파일 추가하기</p>
                                </div>
                            </Button>
                            <Button
                                className="bg-background border-2 border-border p-6 h-auto flex flex-col items-center space-y-3 hover:bg-accent text-foreground card-hover shadow-clean-md"
                                variant="ghost"
                            >
                                <Search className="w-8 h-8 text-primary"/>
                                <div className="text-center">
                                    <h3 className="font-semibold text-foreground">고급 검색</h3>
                                    <p className="text-sm text-muted-foreground mt-1">필터와 함께 검색</p>
                                </div>
                            </Button>
                        </div>

                        {(
                            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-destructive"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">API 키 설정이 필요합니다</h3>
                                        <p className="text-muted-foreground mb-4">
                                            AI 기반 검색 기능을 사용하려면 API 키를 설정해야 합니다. 설정에서 API 키를 추가해 주세요
                                        </p>
                                        <Button
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            설정으로 이동
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 최근 파일 */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-semibold text-foreground">최근 파일</h3>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                        className="border border-border hover:bg-accent"
                                    >
                                        {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4"/>}
                                    </Button>

                                    {/* 정렬 드롭다운 */}
                                    <div className="relative">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="border border-border hover:bg-accent"
                                            onClick={() => setShowSrotDropdown(!showSortDropdown)}
                                        >
                                            <Filter className="w-4 h-4"/>
                                        </Button>

                                        {showSortDropdown && (
                                            <div className="">
                                                <button onClick={() => {setSortOption('recent'); setShowSrotDropdown(false); }}
                                                className="block w-full text-left px-4 py-2 hover:bg-accent">최신순</button>
                                                <button onClick={() => {setSortOption('oldest'); setShowSrotDropdown(false); }}
                                                className="block w-full text-left px-4 py-2 hover:bg-accent">오래된순</button>
                                                <button onClick={() => {setSortOption('name'); setShowSrotDropdown(false); }}
                                                className="block w-full text-left px-4 py-2 hover:bg-accent">이름순</button>
                                                <button onClick={() => {setSortOption('favorite'); setShowSrotDropdown(false); }}
                                                className="block w-full text-left px-4 py-2 hover:bg-accent">즐겨찾기 우선</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`grid gap-4 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1'
                                }`}
                            >
                                {recentFiles.slice(0, 8).map((file) => (
                                    <div
                                        key={file.id}
                                        onClick={() => {
                                            onFileSelect?.(file);
                                        }}
                                        className="group bg-background border-2 border-border rounded-xl p-4"
                                    >
                                        <div>
                                            <div>
                                                <span>{file.icon}</span>
                                                <div>
                                                    <h4>
                                                        {file.name}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground truncate">{file.type}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleFavorite(file.id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0 hover:bg-accent flex-shrink-0"
                                            >
                                                <Star
                                                    className={`w-4 h-4 ${file.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground hover:text-yellow-500'
                                                    }`}
                                                />
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
                                            <span className="truncate flex-1">{file.lastUpdater}</span>
                                            <span className="flex=shrink-0">{file.updatedAt ? new Date(file.updatedAt).toLocaleString() : '-'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {(
                <FileSearchModal 
                    isOpen ={showFileModal}
                    onClose={() => setShowFileModal(false)}
                    files = {filesHook.files}
                    onFileSelect={handleFileSelect}
                    onToggleFavorite={onToggleFavorite}
                    zIndex={50}
                    disableBackdropClick={!!selectedFile}
                />
            )}
            {selectedFile && (
                <FilePreviewDrawer
                    isOpen={showPreviewDrawer}
                    file={selectedFile}
                    onClose={handleClosePreview}
                    onToggleFavorite={onToggleFavorite}
                    zIndex={100}
                />
            )}
        </div>
    );
}