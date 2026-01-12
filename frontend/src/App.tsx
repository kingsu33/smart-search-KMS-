import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { LoginScreen } from './features/auth/LoginScreen';
import { SignupScreen } from './features/auth/SignupScreen';
import { OnboardingScreen } from './features/home/OnboardingScreen';
import { HomeScreen } from './features/home/HomeScreen';
import { useMobile } from './hooks/useMobile';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  const { isMobile } = useMobile();

  if (isMobile) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route
            path="/login"
            element={
              <LoginScreen
                onLogin={() => navigate('/onboarding')}
                onSignupClick={() => navigate('/signup')}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupScreen
                onSignup={() => navigate('/onboarding')}
                onBackToLogin={() => navigate('/login')}
              />
            }
          />
          <Route path="/onboarding" element={<OnboardingScreen onComplete={() => navigate('/home')} />} />
          <Route path="/home" />

        </Routes>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoginScreen
              onLogin={() => navigate('/onboarding')}
              onSignupClick={() => navigate('/signup')}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupScreen
              onSignup={() => navigate('/onboarding')}
              onBackToLogin={() => navigate('/signup')}
            />
          }
        />
        <Route path='/onboarding' element={<OnboardingScreen onComplete={() => navigate('/home')} />} />
        <Route
          path='/home'
          element={
            <HomeScreen
              onNavigateToChat={() => navigate('/chat')}

            />
          }
        />
      </Routes>

    </>
  );
}