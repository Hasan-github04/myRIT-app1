import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BookOpen,
  GraduationCap,
  Users,
  User,
  Bell,
} from "lucide-react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { initialNotifications } from "@/mocks/notifications";

export default function TabsLayout({ onLogout }) {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem("notifications");
        if (savedNotifications !== null) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    const saveNotifications = async () => {
      try {
        await AsyncStorage.setItem(
          "notifications",
          JSON.stringify(notifications)
        );
      } catch (error) {
        console.error("Failed to save notifications", error);
      }
    };

    saveNotifications();
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const tabs = [
    {
      name: "MyCourses",
      path: "/",
      icon: BookOpen,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      name: "SIS",
      path: "/sis",
      icon: GraduationCap,
    },
    {
      name: "Community",
      path: "/community",
      icon: Users,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Outlet context={{ onLogout, notifications, setNotifications }} />
      </View>
      <View
        style={[
          styles.tabBar,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              style={{ textDecoration: "none", flex: 1 }}
            >
              {({ isActive }) => (
                <View style={styles.tabItem}>
                  <View>
                    <Icon
                      size={24}
                      color={isActive ? colors.tint : colors.text}
                    />
                    {tab.badge && (
                      <View
                        style={[
                          styles.badge,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Text style={styles.badgeText}>{tab.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isActive ? colors.tint : colors.text },
                    ]}
                  >
                    {tab.name}
                  </Text>
                </View>
              )}
            </NavLink>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh",
  },
  content: {
    flex: 1,
    overflow: "hidden", // Force child ScrollView to handle scrolling
    width: "100%",
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "500",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
