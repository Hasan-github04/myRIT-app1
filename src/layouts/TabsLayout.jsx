import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Users,
  User,
  Bell,
} from "lucide-react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/constants/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();

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
        <Outlet />
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
                  <Icon
                    size={24}
                    color={isActive ? colors.tint : colors.text}
                  />
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
    overflow: "hidden",
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
});
