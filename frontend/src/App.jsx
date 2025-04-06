import React, { useEffect } from 'react'
import Navbar from './components/navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {


  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  

  console.log("online users are",onlineUsers);
  useEffect(() => {
    console.log("Updated online users:", onlineUsers);
  }, [onlineUsers]);

  useEffect(()=>{
    checkAuth();
  }, [checkAuth] );


  // console.log(authUser);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(theme); //console log working
  }, [theme]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
    

  
    
    
    
  return (
    <div data-theme = {theme}>
      <Navbar  />

      <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster/>

    </div>

  )
}

export default App