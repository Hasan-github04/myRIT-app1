import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/constants/ThemeContext";
import TabsLayout from "@/layouts/TabsLayout";

// Screens
import MyCoursesScreen from "@/app/tabs/layout";
import NotificationsScreen from "@/app/tabs/notifications";
import SISScreen from "@/app/tabs/sis";
import CommunityScreen from "@/app/tabs/community";
import ProfileScreen from "@/app/tabs/profile";
import CourseDetailScreen from "@/app/course/[id]";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TabsLayout />}>
              <Route index element={<MyCoursesScreen />} />
              <Route path="notifications" element={<NotificationsScreen />} />
              <Route path="sis" element={<SISScreen />} />
              <Route path="community" element={<CommunityScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
            </Route>
            <Route path="/course/:id" element={<CourseDetailScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
