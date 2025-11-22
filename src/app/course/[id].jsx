import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  BookOpen,
  Calendar,
  Users,
  UsersRound,
  ClipboardList,
  MessageSquare,
  FileQuestion,
  GraduationCap,
  UserCheck,
  Video,
  ChevronRight,
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { courses, assignments } from "@/mocks/courses";

const menuItems = [
  { id: "content", label: "Content", icon: BookOpen },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "classlist", label: "Classlist", icon: Users },
  { id: "groups", label: "Groups", icon: UsersRound },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "discussions", label: "Discussions", icon: MessageSquare },
  { id: "quizzes", label: "Quizzes", icon: FileQuestion },
  { id: "grades", label: "Grades", icon: GraduationCap },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "zoom", label: "Zoom", icon: Video },
];

export default function CourseDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const course = courses.find((c) => c.id === id);
  const courseAssignments = assignments.filter((a) => a.courseId === id);

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Course not found
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: course.code,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: "700",
          },
          headerTintColor: colors.primary,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.colorBar,
              { backgroundColor: course.color },
            ]}
          />
          <View style={styles.headerContent}>
            <Text style={[styles.courseName, { color: colors.text }]}>
              {course.name}
            </Text>
            <Text style={[styles.instructor, { color: colors.textSecondary }]}>
              {course.instructor}
            </Text>
            <View style={styles.scheduleContainer}>
              <Text style={[styles.schedule, { color: colors.textSecondary }]}>
                {course.schedule.days.join(", ")} • {course.schedule.time}
              </Text>
              <Text style={[styles.room, { color: colors.textSecondary }]}>
                {course.room}
              </Text>
            </View>
          </View>
        </View>

        {courseAssignments.length > 0 && (
          <View style={styles.assignmentsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Assignments
            </Text>
            {courseAssignments.map((assignment) => {
              const formatDueDate = (date) => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
              };

              const getTypeColor = (type) => {
                switch (type) {
                  case "exam":
                    return {
                      bg: "#FEE2E2",
                      text: "#991B1B",
                      label: "Exam",
                    };
                  case "project":
                    return {
                      bg: "#DBEAFE",
                      text: "#1E40AF",
                      label: "Project",
                    };
                  case "quiz":
                    return {
                      bg: "#FEF3C7",
                      text: "#92400E",
                      label: "Quiz",
                    };
                  default:
                    return {
                      bg: "#F3E8FF",
                      text: "#6B21A8",
                      label: "Homework",
                    };
                }
              };

              const getStatusBadge = (status) => {
                switch (status) {
                  case "submitted":
                    return { bg: "#DBEAFE", text: "#1E40AF", label: "Submitted" };
                  case "graded":
                    return { bg: "#D1FAE5", text: "#065F46", label: "Graded" };
                  default:
                    return { bg: "#FEF3C7", text: "#92400E", label: "Pending" };
                }
              };

              const typeInfo = getTypeColor(assignment.type);
              const statusInfo = getStatusBadge(assignment.status);

              return (
                <TouchableOpacity
                  key={assignment.id}
                  style={[
                    styles.assignmentCard,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.assignmentHeader}>
                    <View style={styles.badgeRow}>
                      <View
                        style={[styles.typeBadge, { backgroundColor: typeInfo.bg }]}
                      >
                        <Text style={[styles.typeText, { color: typeInfo.text }]}>
                          {typeInfo.label}
                        </Text>
                      </View>
                      <View
                        style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}
                      >
                        <Text style={[styles.statusText, { color: statusInfo.text }]}>
                          {statusInfo.label}
                        </Text>
                      </View>
                    </View>
                    {assignment.grade !== undefined && (
                      <View style={[styles.gradeBadge, { backgroundColor: colors.primary + "20" }]}>
                        <Text style={[styles.gradeText, { color: colors.primary }]}>
                          {assignment.grade}%
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.assignmentTitle, { color: colors.text }]}>
                    {assignment.title}
                  </Text>
                  <Text style={[styles.dueDate, { color: colors.textSecondary }]}>
                    Due: {formatDueDate(assignment.dueDate)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.border,
                    borderBottomWidth: isLast ? 0 : 1,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  console.log(`Navigate to ${item.label} for course ${course.code}`);
                }}
              >
                <View style={styles.menuItemContent}>
                  <Icon size={22} color={colors.text} />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>
                    {item.label}
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
  },
  colorBar: {
    width: 6,
  },
  headerContent: {
    flex: 1,
    padding: 16,
  },
  courseName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  instructor: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  scheduleContainer: {
    gap: 4,
  },
  schedule: {
    fontSize: 14,
  },
  room: {
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  assignmentsSection: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  assignmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  assignmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  gradeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
  },
});