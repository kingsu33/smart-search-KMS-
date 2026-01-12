import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

interface HomeScreenProps {
    onNavigateToChat: () => void;

}

export function HomeScreen({

}: HomeScreenProps) {


    return (
        <div>
            <h1>hello, world!</h1>
        </div>
    );
}