import React, {useState} from "react";

interface SignupScreenProps {
    onSignup: () => void;
    onBackToLogin: () => void;
}

export function SignupScreen({ onSignup , onBackToLogin }: SignupScreenProps) {
    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    return (
        <div>
            
        </div>
    )
}