import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bell,
  Check,
  ChevronRight,
  HelpCircle,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { studentInfo } from "@/mocks/academic";

export default function ProfileScreen() {
  const { colors, mode, setThemeMode } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {studentInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{studentInfo.name}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{studentInfo.email}</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {studentInfo.major} • {studentInfo.year}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{studentInfo.gpa.toFixed(2)}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>GPA</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{studentInfo.credits}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Credits</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Current</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThemeOption
            icon={<Sun size={20} color={colors.text} />}
            label="Light"
            selected={mode === "light"}
            onPress={() => setThemeMode("light")}
            colors={colors}
          />
          <ThemeOption
            icon={<Moon size={20} color={colors.text} />}
            label="Dark"
            selected={mode === "dark"}
            onPress={() => setThemeMode("dark")}
            colors={colors}
          />
          <ThemeOption
            icon={<Settings size={20} color={colors.text} />}
            label="System"
            selected={mode === "system"}
            onPress={() => setThemeMode("system")}
            colors={colors}
            last
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem
            icon={<User size={20} color={colors.text} />}
            label="Personal Information"
            colors={colors}
          />
          <MenuItem
            icon={<Bell size={20} color={colors.text} />}
            label="Notifications"
            colors={colors}
          />
          <MenuItem
            icon={<Lock size={20} color={colors.text} />}
            label="Privacy & Security"
            colors={colors}
            last
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem
            icon={<HelpCircle size={20} color={colors.text} />}
            label="Help & Support"
            colors={colors}
          />
          <MenuItem
            icon={<LogOut size={20} color={colors.error} />}
            label="Log Out"
            textColor={colors.error}
            colors={colors}
            last
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
        <Text style={[styles.copyright, { color: colors.textSecondary }]}>© 2025 RIT Student App</Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const ThemeOption = ({
  icon,
  label,
  selected,
  onPress,
  colors,
  last = false,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <View>{icon}</View>
      <Text style={[styles.menuItemText, { color: colors.text }]}>
        {label}
      </Text>
    </View>
    {selected && <Check size={20} color={colors.primary} />}
  </TouchableOpacity>
);

const MenuItem = ({
  icon,
  label,
  textColor,
  colors,
  last = false,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <View>{icon}</View>
      <Text style={[styles.menuItemText, { color: textColor || colors.text }]}>
        {label}
      </Text>
    </View>
    <ChevronRight size={20} color={colors.textSecondary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 32,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  menuCard: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  version: {
    fontSize: 13,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 13,
  },
});