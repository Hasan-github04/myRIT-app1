import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeProvider } from "@/context/ThemeContext";
import TabsLayout from "@/layouts/TabsLayout";
import Login from "@/pages/Auth/Login";
// Screens
import Dashboard from "@/pages/Dashboard/Dashboard";
import Notifications from "@/pages/Notifications/Notifications";
import SIS from "@/pages/SIS/SIS";
import Community from "@/pages/Community/Community";
import Profile from "@/pages/Profile/Profile";
import CourseDetail from "@/pages/Course/CourseDetail";

const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const status = await AsyncStorage.getItem("isAuthenticated");
      if (status === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving login status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error removing login status:", error);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TabsLayout onLogout={handleLogout} />}>
                <Route index element={<Dashboard />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="sis" element={<SIS />} />
                <Route path="community" element={<Community />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
