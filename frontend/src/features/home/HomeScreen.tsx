import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import ExplorerSidebar from "../../components/layout/ExploreSidebar";
import { useNavigate } from "react-router-dom";
import { MessagesSquare, PanelLeft, Search } from "lucide-react";
import { useDriveFolders } from "../files/hooks/useDriveFolders";
import type { FileItem, ApiKey } from "../../types";

interface HomeScreenProps {
    onNavigateToChat: () => void;
    files: FileItem[];
    apiKeys: ApiKey[];

}

export function HomeScreen({
    files,
    apiKeys,

}: HomeScreenProps) {
    const {driveFolders} = useDriveFolders(apiKeys.find(k => k.isConnected)?.apiURL, files);


    return (
        <div>
            {/* 사이드바 */}
            <div>
                <ExplorerSidebar 
                    driveFolders={driveFolders}
                />
            </div>

            {/* 메인 */}
            <div>
                {/* 헤더 */}
                <header className="">
                    <div>
                        <div>
                            <Button>
                                <PanelLeft />
                            </Button>
                            <div>
                                <div>

                                </div>
                                <div>
                                    <h1>Smart Search</h1>
                                    <p>AI 키워드 파일 검색</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>

                {/* 메인 */}
                <main>
                    <div>
                        {/* 환영 섹션 */}
                        <div>
                            <h2>안녕하세요! 👋</h2>
                            <p>무엇을 찾고 계신가요?</p>
                        </div>

                        {/* 검색 바 */}
                        <div>
                            <div>
                                <div>
                                    <Search />
                                    <Input 
                                        type="text"
                                        placeholder="파일, 문서, 또는 내용을 검색하세요..."
                                        // value={}
                                        onChange={(e) => (e.target.value)}
                                        className=""
                                    />
                                    <Button
                                    // onClick={}
                                        className=""
                                    >
                                        검색
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 빠른 액션 */}
                        <div>
                            <Button>
                                <MessagesSquare/>
                                <div>
                                    <h3>AI 채팅</h3>
                                    <p className="text-sm text-muted-fore">AI와 대화하며 파일 검색</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}