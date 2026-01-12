import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
    Search,
    FileText,
    MessageSquare,
    Shield,
    Zap,
    Users,
    ChevronRight,
    Check,
    Sparkle,
} from "lucide-react"

interface OnboardingScreenProps {
    onComplete: () => void;
}

export function OnboardingScreen({
    onComplete,
}: OnboardingScreenProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Smart Search에 오신 것을 환영합니다!",
            icon: <Sparkle className="w-16 h-16 text-white" />
        }
    ]

    const skipOnboarding = () => {
        onComplete();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-background">
            <div className="">
                <div></div>

                <div></div>
            </div>

            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                {steps[currentStep].icon}
                            </div>
                        </div>

                        <div className="space-y-4">
                            { }

                        </div>
                    </div>
                </div>
            </div>
            <div>
                {currentStep === 0 && (
                    <div>
                        <div>
                            <FileText className="w-8" />
                            <p>
                                문서
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Button
                    variant="ghost"
                    onClick={skipOnboarding}
                >
                    건너뛰기
                </Button>
            </div>
        </div >
    );
} 