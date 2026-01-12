import { useState, useEffect } from "react";

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const applyDarkMode = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleDarkMode = (newValue: boolean) => {
        setIsDarkMode(newValue);
        applyDarkMode(newValue);
        localStorage.setItem('darkMode', newValue.toString());
    };

    useEffect(() => {
        document.documentElement.lang = 'ko';
        const metaCharset = document.querySelector('meta[charset]');
        if (!metaCharset) {
            const meta = document.createElement('meta');
            meta.setAttribute('charset', 'UTF-8');
            document.head.insertBefore(meta, document.head.firstChild);
        }

        const savedDarkMode = localStorage.getitem('darkMode');
        if (savedDarkMode !== null) {
            const isDark = savedDarkMode ==='true';
            setIsDarkMode(isDark);
            applyDarkMode(isDark);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            applyDarkMode(prefersDark);
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem('darkMode') === null) {
                setIsDarkMode(e.matches);
                applyDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);

    }, []);

    return {
        isDarkMode,
        toggleDarkMode
    };
}