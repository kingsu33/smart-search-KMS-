import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Eye, EyeOff, Sparkles } from "lucide-react";

interface LoginScreenProps {
    onLogin: () => void;
    onSignupClick: () => void;
}

export function LoginScreen ({
    onLogin,
    onSignupClick,
}: LoginScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8090/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, rememberMe }),
                credentials : "include"
            });

            if (!res.ok) {
                throw new Error("로그인 실패");
            }
            onLogin();
        } catch (error) {
            console.error(error);
            alert("이메일 또는 비밀번호를 확인하세요.");
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-background">
            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Smart Search
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        AI 스마트 파일 검색 플랫폼
                    </p>
                </div>

                <Card className="glass p-8 border-0 shadow-2xl rounded-[18px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-foreground"
                            >
                                이메일
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                                className="glass border-border bg-input h-12 text-base placeholder:text-mute-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-foreground"
                            >
                                비밀번호
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요."
                                    className="glass border-border bg-input h-12 text-base placeholder:text-muted-foreground pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mute-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                        
                                    ) : (
                                        <Eye className="w-5 h-5"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 mr-2"
                                    />
                                    <span className="text-muted-foreground">
                                        로그인 상태 유지
                                    </span>
                            </label>
                            <button
                                type="button"
                                className="text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                        
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-primary hover:shadow-lg btn-glow text-base font-semibold rounded-xl border-0 text-white"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>로그인 중...</span>
                                </div>
                            ) : (
                                "로그인"
                            )}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground">
                                    또는
                                </span>
                            </div>
                        </div>
                        
                        <div>
                            
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}