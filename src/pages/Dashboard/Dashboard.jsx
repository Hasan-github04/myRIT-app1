import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";
import { assignments, courses } from "@/mocks/courses";

export default function MyCoursesScreen() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [showAllAssignments, setShowAllAssignments] = useState(false);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const upcomingAssignments = assignments
    .filter((a) => a.status === "pending")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const thisWeekAssignments = upcomingAssignments.filter(
    (a) => a.dueDate >= startOfWeek && a.dueDate < endOfWeek
  );

  const displayAssignments = showAllAssignments
    ? upcomingAssignments
    : thisWeekAssignments;

  const getWeekRange = () => {
    const start = new Date(startOfWeek);
    const end = new Date(endOfWeek);
    end.setDate(end.getDate() - 1);

    const formatDate = (date) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    if (days < 0) return "Overdue";
    return `Due in ${days} days`;
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

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <View style={styles.weekHeaderContainer}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {showAllAssignments ? "All Work to Do" : "Work to Do"}
            </Text>
            {!showAllAssignments && (
              <Text style={[styles.weekRange, { color: colors.textSecondary }]}>
                {getWeekRange()}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowAllAssignments(!showAllAssignments)}
            style={[
              styles.expandButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.expandButtonText, { color: colors.primary }]}>
              {showAllAssignments ? "Show This Week" : "Show All"}
            </Text>
            {showAllAssignments ? (
              <ChevronUp size={16} color={colors.primary} />
            ) : (
              <ChevronDown size={16} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
        {displayAssignments.length === 0 ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              🎉 No assignments this week!
            </Text>
          </View>
        ) : (
          displayAssignments.map((assignment) => {
            const course = courses.find((c) => c.id === assignment.courseId);
            const typeInfo = getTypeColor(assignment.type);
            const isUrgent =
              // eslint-disable-next-line react-hooks/purity
              assignment.dueDate.getTime() - Date.now() <
              2 * 24 * 60 * 60 * 1000;

            return (
              <TouchableOpacity
                key={assignment.id}
                style={[
                  styles.assignmentCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isUrgent && { borderColor: colors.error, borderWidth: 2 },
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.assignmentHeader}>
                  <View
                    style={[
                      styles.courseBadge,
                      { backgroundColor: course?.color || "#6B7280" },
                    ]}
                  />
                  <Text
                    style={[styles.courseCode, { color: colors.textSecondary }]}
                  >
                    {course?.code}
                  </Text>
                  <View
                    style={[styles.typeBadge, { backgroundColor: typeInfo.bg }]}
                  >
                    <Text style={[styles.typeText, { color: typeInfo.text }]}>
                      {typeInfo.label}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.assignmentTitle, { color: colors.text }]}>
                  {assignment.title}
                </Text>
                <Text
                  style={[
                    { color: colors.textSecondary },
                    isUrgent && { color: colors.error, fontWeight: "600" },
                  ]}
                >
                  {formatDueDate(assignment.dueDate)}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          My Courses
        </Text>
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            activeOpacity={0.7}
            onPress={() => navigate(`/course/${course.id}`)}
          >
            <View
              style={[styles.courseColorBar, { backgroundColor: course.color }]}
            />
            <View style={styles.courseContent}>
              <View style={styles.courseHeader}>
                <View>
                  <Text
                    style={[styles.courseCode, { color: colors.textSecondary }]}
                  >
                    {course.code}
                  </Text>
                  <Text style={[styles.courseName, { color: colors.text }]}>
                    {course.name}
                  </Text>
                </View>
                <View
                  style={[
                    styles.creditsContainer,
                    { backgroundColor: colors.backgroundSecondary },
                  ]}
                >
                  <Text style={[styles.creditsText, { color: colors.primary }]}>
                    {course.credits}
                  </Text>
                  <Text
                    style={[
                      styles.creditsLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    credits
                  </Text>
                </View>
              </View>
              <View style={styles.courseDetails}>
                <Text style={[styles.instructor, { color: colors.text }]}>
                  {course.instructor}
                </Text>
                <Text
                  style={[styles.schedule, { color: colors.textSecondary }]}
                >
                  {course.schedule.days.join(", ")} • {course.schedule.time}
                </Text>
                <Text style={[styles.room, { color: colors.textSecondary }]}>
                  {course.room}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  weekHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  weekRange: {
    fontSize: 14,
    marginTop: 2,
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
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
    marginBottom: 8,
    gap: 8,
  },
  courseBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: "600",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    flexDirection: "row",
  },
  courseColorBar: {
    width: 6,
  },
  courseContent: {
    flex: 1,
    padding: 16,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  creditsContainer: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: "700",
  },
  creditsLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  courseDetails: {
    gap: 4,
  },
  instructor: {
    fontSize: 14,
    fontWeight: "500",
  },
  schedule: {
    fontSize: 13,
  },
  room: {
    fontSize: 13,
  },
});
