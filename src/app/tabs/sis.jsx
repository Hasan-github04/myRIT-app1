import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AlertCircle,
  BookOpen,
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock,
  GraduationCap,
  ShoppingCart,
  Trash2,
  Users,
  XCircle,
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import {
  advisors,
  cartCourses,
  currentGrades,
  studentHolds,
} from "@/mocks/academic";

export default function SISScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("records");

  const unreadHolds = studentHolds.filter((h) => !h.resolved).length;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View
        style={[
          styles.tabContainer,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TabButton
          icon={BookOpen}
          label="Academic Records"
          active={activeTab === "records"}
          onPress={() => setActiveTab("records")}
          colors={colors}
        />
        <TabButton
          icon={ShoppingCart}
          label="Cart"
          badge={cartCourses.length}
          active={activeTab === "cart"}
          onPress={() => setActiveTab("cart")}
          colors={colors}
        />
        <TabButton
          icon={Users}
          label="Starfish"
          active={activeTab === "starfish"}
          onPress={() => setActiveTab("starfish")}
          colors={colors}
        />
        <TabButton
          icon={AlertCircle}
          label="Tasks"
          badge={unreadHolds}
          active={activeTab === "tasks"}
          onPress={() => setActiveTab("tasks")}
          colors={colors}
          badgeColor={colors.error}
        />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentPadding}
      >
        {activeTab === "records" && <AcademicRecords colors={colors} />}
        {activeTab === "cart" && <ShoppingCartSection colors={colors} />}
        {activeTab === "starfish" && <StarfishSection colors={colors} />}
        {activeTab === "tasks" && <TasksSection colors={colors} />}
      </ScrollView>
    </View>
  );
}

function TabButton({
  label,
  badge,
  active,
  onPress,
  colors,
  badgeColor,
  icon: Icon,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        { borderBottomColor: active ? colors.primary : "transparent" },
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.tabButtonContent}>
        <Icon
          size={20}
          color={active ? colors.primary : colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: active ? colors.primary : colors.textSecondary },
          ]}
        >
          {label}
        </Text>
        {badge !== undefined && badge > 0 && (
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColor || colors.primary },
            ]}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function AcademicRecords({ colors }) {
  const inProgress = currentGrades.filter((g) => g.status === "in-progress");
  const completed = currentGrades.filter((g) => g.status === "completed");

  const getGradeColor = (gradeStr) => {
    if (gradeStr.startsWith("A")) return colors.success;
    if (gradeStr.startsWith("B")) return colors.primary;
    if (gradeStr.startsWith("C")) return colors.warning;
    return colors.error;
  };

  return (
    <View>
      <View style={styles.sectionHeader}>
        <GraduationCap size={20} color={colors.text} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          In Progress
        </Text>
        <View
          style={[
            styles.countBadge,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          <Text style={[styles.countText, { color: colors.textSecondary }]}>
            {inProgress.length}
          </Text>
        </View>
      </View>

      {inProgress.map((grade) => (
        <View
          key={grade.courseId}
          style={[
            styles.gradeCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.gradeHeader}>
            <View>
              <Text
                style={[styles.courseCode, { color: colors.textSecondary }]}
              >
                {grade.courseCode}
              </Text>
              <Text style={[styles.courseName, { color: colors.text }]}>
                {grade.courseName}
              </Text>
            </View>
            <View
              style={[
                styles.gradeBadge,
                { backgroundColor: getGradeColor(grade.grade) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.gradeText,
                  { color: getGradeColor(grade.grade) },
                ]}
              >
                {grade.grade}
              </Text>
            </View>
          </View>
          <Text style={[styles.gradeInfo, { color: colors.textSecondary }]}>
            {grade.credits} credits • {grade.semester}
          </Text>
        </View>
      ))}

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <BookOpen size={20} color={colors.text} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Completed Courses
        </Text>
        <View
          style={[
            styles.countBadge,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          <Text style={[styles.countText, { color: colors.textSecondary }]}>
            {completed.length}
          </Text>
        </View>
      </View>

      {completed.map((grade) => (
        <View
          key={grade.courseId}
          style={[
            styles.gradeCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.gradeHeader}>
            <View>
              <Text
                style={[styles.courseCode, { color: colors.textSecondary }]}
              >
                {grade.courseCode}
              </Text>
              <Text style={[styles.courseName, { color: colors.text }]}>
                {grade.courseName}
              </Text>
            </View>
            <View
              style={[
                styles.gradeBadge,
                { backgroundColor: getGradeColor(grade.grade) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.gradeText,
                  { color: getGradeColor(grade.grade) },
                ]}
              >
                {grade.grade}
              </Text>
            </View>
          </View>
          <Text style={[styles.gradeInfo, { color: colors.textSecondary }]}>
            {grade.credits} credits • {grade.semester}
          </Text>
        </View>
      ))}
    </View>
  );
}

function ShoppingCartSection({ colors }) {
  const totalCredits = cartCourses.reduce((sum, c) => sum + c.credits, 0);

  const handleRemove = (course) => {
    Alert.alert("Remove Course", `Remove ${course.courseCode} from cart?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive" },
    ]);
  };

  return (
    <View>
      <View
        style={[
          styles.cartHeader,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.cartHeaderContent}>
          <View>
            <Text style={[styles.cartSemester, { color: colors.text }]}>
              Fall 2025
            </Text>
            <Text
              style={[styles.cartSubtitle, { color: colors.textSecondary }]}
            >
              {cartCourses.length} courses • {totalCredits} credits
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.enrollButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={styles.enrollButtonText}>Enroll All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {cartCourses.length === 0 ? (
        <View
          style={[
            styles.emptyCart,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ShoppingCart size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Add courses to plan your schedule
          </Text>
        </View>
      ) : (
        cartCourses.map((course) => (
          <View
            key={course.courseId}
            style={[
              styles.cartCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cartCardContent}>
              <View style={styles.cartCourseInfo}>
                <View style={styles.cartCourseHeader}>
                  <Text
                    style={[styles.courseCode, { color: colors.textSecondary }]}
                  >
                    {course.courseCode}
                  </Text>
                  <View
                    style={[
                      styles.creditsBadge,
                      { backgroundColor: colors.backgroundSecondary },
                    ]}
                  >
                    <Text style={[styles.creditsText, { color: colors.text }]}>
                      {course.credits} cr
                    </Text>
                  </View>
                </View>
                <Text style={[styles.courseName, { color: colors.text }]}>
                  {course.courseName}
                </Text>
                <View style={styles.cartDetails}>
                  <View style={styles.cartDetailRow}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.cartDetailText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.days.join(", ")} • {course.startTime}-
                      {course.endTime}
                    </Text>
                  </View>
                  <View style={styles.cartDetailRow}>
                    <Users size={14} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.cartDetailText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.instructor}
                    </Text>
                  </View>
                  <View style={styles.cartDetailRow}>
                    <CalendarDays size={14} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.cartDetailText,
                        {
                          color:
                            course.seats < 10
                              ? colors.error
                              : course.seats < 20
                              ? colors.warning
                              : colors.success,
                        },
                      ]}
                    >
                      {course.seats}/{course.maxSeats} seats available
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemove(course)}
                style={[
                  styles.removeButton,
                  { backgroundColor: colors.error + "15" },
                ]}
                activeOpacity={0.7}
              >
                <Trash2 size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

function StarfishSection({ colors }) {
  const handleBookAppointment = (advisor, slot) => {
    Alert.alert("Book Appointment", `Book with ${advisor.name} on ${slot}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", onPress: () => console.log("Appointment booked") },
    ]);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "academic":
        return "🎓";
      case "faculty":
        return "👨‍🏫";
      case "professor":
        return "📚";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "academic":
        return "Academic Advisor";
      case "faculty":
        return "Faculty Advisor";
      case "professor":
        return "Professor";
    }
  };

  const academicAdvisors = advisors.filter((a) => a.role === "academic");
  const facultyAdvisors = advisors.filter((a) => a.role === "faculty");
  const professors = advisors.filter((a) => a.role === "professor");

  return (
    <View>
      <Text style={[styles.starfishIntro, { color: colors.textSecondary }]}>
        Book appointments with your advisors and professors
      </Text>

      {academicAdvisors.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Academic Advisors
            </Text>
          </View>
          {academicAdvisors.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              colors={colors}
              onBook={handleBookAppointment}
              roleIcon={getRoleIcon(advisor.role)}
              roleLabel={getRoleLabel(advisor.role)}
            />
          ))}
        </>
      )}

      {facultyAdvisors.length > 0 && (
        <>
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Faculty Advisors
            </Text>
          </View>
          {facultyAdvisors.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              colors={colors}
              onBook={handleBookAppointment}
              roleIcon={getRoleIcon(advisor.role)}
              roleLabel={getRoleLabel(advisor.role)}
            />
          ))}
        </>
      )}

      {professors.length > 0 && (
        <>
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Current Professors
            </Text>
          </View>
          {professors.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              colors={colors}
              onBook={handleBookAppointment}
              roleIcon={getRoleIcon(advisor.role)}
              roleLabel={getRoleLabel(advisor.role)}
            />
          ))}
        </>
      )}
    </View>
  );
}

function AdvisorCard({ advisor, colors, onBook, roleIcon, roleLabel }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={[
        styles.advisorCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.advisorHeader}
        activeOpacity={0.7}
      >
        <View style={styles.advisorInfo}>
          <View style={styles.advisorTitleRow}>
            <Text style={styles.advisorIcon}>{roleIcon}</Text>
            <View>
              <Text style={[styles.advisorName, { color: colors.text }]}>
                {advisor.name}
              </Text>
              <Text
                style={[styles.advisorRole, { color: colors.textSecondary }]}
              >
                {roleLabel} • {advisor.department}
              </Text>
            </View>
          </View>
        </View>
        <ChevronRight
          size={20}
          color={colors.textSecondary}
          style={{
            transform: [{ rotate: expanded ? "90deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={[styles.advisorSlots, { borderTopColor: colors.border }]}>
          <Text style={[styles.slotsTitle, { color: colors.textSecondary }]}>
            Available Times
          </Text>
          {advisor.availableSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onBook(advisor, slot)}
              style={[
                styles.slotButton,
                { backgroundColor: colors.backgroundSecondary },
              ]}
              activeOpacity={0.7}
            >
              <Calendar size={16} color={colors.primary} />
              <Text style={[styles.slotText, { color: colors.text }]}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function TasksSection({ colors }) {
  const activeHolds = studentHolds.filter((h) => !h.resolved);

  const getHoldIcon = (type) => {
    switch (type) {
      case "financial":
        return "💳";
      case "academic":
        return "📋";
      case "administrative":
        return "📄";
    }
  };

  const getHoldColor = (type) => {
    switch (type) {
      case "financial":
        return colors.error;
      case "academic":
        return colors.warning;
      case "administrative":
        return colors.primary;
    }
  };

  return (
    <View>
      {activeHolds.length === 0 ? (
        <View
          style={[
            styles.noHolds,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.noHoldsIcon,
              { backgroundColor: colors.success + "20" },
            ]}
          >
            <Text style={styles.noHoldsEmoji}>✓</Text>
          </View>
          <Text style={[styles.noHoldsTitle, { color: colors.text }]}>
            All Clear!
          </Text>
          <Text style={[styles.noHoldsText, { color: colors.textSecondary }]}>
            You have no active holds on your account
          </Text>
        </View>
      ) : (
        <>
          <View
            style={[
              styles.holdsWarning,
              {
                backgroundColor: colors.error + "15",
                borderColor: colors.error + "30",
              },
            ]}
          >
            <XCircle size={20} color={colors.error} />
            <View style={styles.holdsWarningContent}>
              <Text style={[styles.holdsWarningTitle, { color: colors.error }]}>
                Action Required
              </Text>
              <Text style={[styles.holdsWarningText, { color: colors.error }]}>
                You have {activeHolds.length} hold
                {activeHolds.length > 1 ? "s" : ""} that need attention
              </Text>
            </View>
          </View>

          {activeHolds.map((hold) => (
            <View
              key={hold.id}
              style={[
                styles.holdCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.holdHeader}>
                <View style={styles.holdTitleRow}>
                  <Text style={styles.holdIcon}>{getHoldIcon(hold.type)}</Text>
                  <View>
                    <Text style={[styles.holdTitle, { color: colors.text }]}>
                      {hold.title}
                    </Text>
                    <View
                      style={[
                        styles.holdTypeBadge,
                        { backgroundColor: getHoldColor(hold.type) + "20" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.holdTypeText,
                          { color: getHoldColor(hold.type) },
                        ]}
                      >
                        {hold.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={[
                  styles.holdDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {hold.description}
              </Text>
              <Text style={[styles.holdDate, { color: colors.textSecondary }]}>
                Posted:{" "}
                {new Date(hold.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
              <TouchableOpacity
                style={[
                  styles.resolveButton,
                  { backgroundColor: colors.primary },
                ]}
                activeOpacity={0.8}
              >
                <Text style={styles.resolveButtonText}>Resolve Hold</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
  },
  tabButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
  },
  gradeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  gradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 13,
    fontWeight: "600",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 18,
    fontWeight: "700",
  },
  gradeInfo: {
    fontSize: 13,
  },
  cartHeader: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cartHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartSemester: {
    fontSize: 18,
    fontWeight: "700",
  },
  cartSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  enrollButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  enrollButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyCart: {
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  cartCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cartCardContent: {
    flexDirection: "row",
    gap: 12,
  },
  cartCourseInfo: {
    flex: 1,
  },
  cartCourseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  creditsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  creditsText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cartDetails: {
    marginTop: 8,
    gap: 6,
  },
  cartDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cartDetailText: {
    fontSize: 13,
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  starfishIntro: {
    fontSize: 14,
    marginBottom: 24,
  },
  advisorCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  advisorHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  advisorInfo: {
    flex: 1,
  },
  advisorTitleRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  advisorIcon: {
    fontSize: 24,
  },
  advisorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  advisorRole: {
    fontSize: 13,
    marginTop: 2,
  },
  advisorSlots: {
    borderTopWidth: 1,
    padding: 16,
  },
  slotsTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  slotButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  slotText: {
    fontSize: 14,
    fontWeight: "500",
  },
  noHolds: {
    padding: 32,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  noHoldsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  noHoldsEmoji: {
    fontSize: 24,
  },
  noHoldsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  noHoldsText: {
    fontSize: 14,
    textAlign: "center",
  },
  holdsWarning: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  holdsWarningContent: {
    flex: 1,
  },
  holdsWarningTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  holdsWarningText: {
    fontSize: 14,
  },
  holdCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  holdHeader: {
    marginBottom: 12,
  },
  holdTitleRow: {
    flexDirection: "row",
    gap: 12,
  },
  holdIcon: {
    fontSize: 24,
  },
  holdTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  holdTypeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  holdTypeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  holdDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  holdDate: {
    fontSize: 12,
    marginBottom: 16,
  },
  resolveButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resolveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
