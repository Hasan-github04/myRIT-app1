import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import {
  AlertCircle,
  BookOpen,
  Calendar,
  CalendarDays,
  ChevronRight,
  ChevronDown,
  Clock,
  GraduationCap,
  ShoppingCart,
  Trash2,
  Users,
  XCircle,
  ChevronUp,
  Search,
  CheckSquare,
  Square,
  Video,
  MapPin,
} from "lucide-react-native";

import { useTheme } from "@/context/ThemeContext";
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
  icon,
}) {
  const Icon = icon;
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
        <View>
          <Icon
            size={20}
            color={active ? colors.primary : colors.textSecondary}
          />
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
        <Text
          style={[
            styles.tabLabel,
            { color: active ? colors.primary : colors.textSecondary },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function AcademicRecords({ colors }) {
  const [showAll, setShowAll] = useState(false);
  const inProgress = currentGrades.filter((g) => g.status === "in-progress");
  const completed = currentGrades.filter((g) => g.status === "completed");

  const displayedCompleted = showAll ? completed : completed.slice(0, 4);

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

      <View
        style={[
          styles.sectionHeader,
          { marginTop: 24, justifyContent: "space-between" },
        ]}
      >
        <View style={styles.headerTitleGroup}>
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

        {completed.length > 4 && (
          <TouchableOpacity
            onPress={() => setShowAll(!showAll)}
            style={styles.headerToggleButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.headerToggleText, { color: colors.primary }]}>
              {showAll ? "Collapse" : "Show All"}
            </Text>
            {showAll ? (
              <ChevronUp size={16} color={colors.primary} />
            ) : (
              <ChevronDown size={16} color={colors.primary} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {displayedCompleted.map((grade) => (
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
  const [selectedIndices, setSelectedIndices] = useState([]); // Use an array for multiple selections
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const totalCredits = cartCourses.reduce((sum, c) => sum + c.credits, 0);

  const toggleSelection = (index) => {
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Deselect if already selected
      } else {
        return [...prev, index]; // Select if not selected
      }
    });
  };

  const handleRemove = (course) => {
    Alert.alert("Remove Course", `Remove ${course.courseCode} from cart?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive" },
    ]);
  };

  const handleVerify = () => {
    Alert.alert("Verify Courses", "Checking course requirements...");
  };

  const initiateEnroll = () => {
    if (selectedIndices.length === 0) {
      Alert.alert("Enroll", "Please select at least one course to enroll.");
      return;
    }
    setModalVisible(true);
  };

  const confirmEnroll = () => {
    setModalVisible(false);
    console.log("Enrolled in indices:", selectedIndices);
    // Logic to actually enroll
  };

  const selectedCoursesText =
    selectedIndices.length > 0
      ? selectedIndices.map((i) => cartCourses[i].courseCode).join(", ")
      : "";

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
              2025-26 Spring (2255) Undergraduate
            </Text>
            <Text
              style={[styles.cartSubtitle, { color: colors.textSecondary }]}
            >
              {cartCourses.length} courses • {totalCredits} credits
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.cartSearchBar,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            style={[styles.cartSearchInput, { color: colors.text }]}
            placeholder="Search courses..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.cartSearchButton}>
            <Search size={20} color={colors.primary} />
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
        <>
          {cartCourses.map((course, index) => (
            <View
              key={index}
              style={[
                styles.cartCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.cartCardContent}>
                <View style={styles.cartCourseInfo}>
                  <View style={styles.cartCourseHeader}>
                    <Text
                      style={[
                        styles.courseCode,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.courseCode}
                    </Text>
                    <View
                      style={[
                        styles.creditsBadge,
                        { backgroundColor: colors.backgroundSecondary },
                      ]}
                    >
                      <Text
                        style={[styles.creditsText, { color: colors.text }]}
                      >
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

                <View style={styles.cartActions}>
                  <TouchableOpacity
                    onPress={() => toggleSelection(index)}
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    {selectedIndices.includes(index) ? (
                      <CheckSquare size={24} color={colors.primary} />
                    ) : (
                      <Square size={24} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleRemove(course)}
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Trash2 size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.cartFooter}>
            <TouchableOpacity
              style={[
                styles.footerButton,
                styles.verifyButton,
                { borderColor: colors.primary },
              ]}
              onPress={handleVerify}
            >
              <Text
                style={[styles.footerButtonText, { color: colors.primary }]}
              >
                Verify Courses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.footerButton,
                styles.enrollActionButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={initiateEnroll}
            >
              <Text style={[styles.footerButtonText, { color: "#fff" }]}>
                Enroll
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Confirmation Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Confirm Enrollment
                </Text>
                <Text
                  style={[styles.modalText, { color: colors.textSecondary }]}
                >
                  Are you sure you want to enroll in the selected{" "}
                  {selectedIndices.length > 1 ? "courses" : "course"}?
                  {"\n\n" + selectedCoursesText}
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalCancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text
                      style={[styles.modalButtonText, { color: colors.text }]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={confirmEnroll}
                  >
                    <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

function StarfishSection({ colors }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleBookAppointment = (advisor, slot) => {
    setSelectedAppointment({ advisor, slot });
    setModalVisible(true);
  };

  const confirmAppointment = (type) => {
    console.log(
      `Appointment booked: ${type} with ${selectedAppointment?.advisor.name} at ${selectedAppointment?.slot}`
    );
    setModalVisible(false);
    setSelectedAppointment(null);
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

      {/* Appointment Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Confirm Appointment
            </Text>
            {selectedAppointment && (
              <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                Schedule a meeting with {selectedAppointment.advisor.name} on{" "}
                {selectedAppointment.slot}?
              </Text>
            )}

            <View style={styles.appointmentOptions}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { borderColor: colors.primary, borderWidth: 1 },
                ]}
                onPress={() => confirmAppointment("Online")}
              >
                <Video size={24} color={colors.primary} />
                <Text style={[styles.optionText, { color: colors.primary }]}>
                  Online Meeting
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { borderColor: colors.primary, borderWidth: 1 },
                ]}
                onPress={() => confirmAppointment("In Person")}
              >
                <MapPin size={24} color={colors.primary} />
                <Text style={[styles.optionText, { color: colors.primary }]}>
                  In Person
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelLink}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={[
                  styles.modalCancelText,
                  { color: colors.textSecondary },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
  },
  tabButtonContent: {
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    zIndex: 1,
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
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    marginBottom: 12,
  },
  cartSemester: {
    fontSize: 18,
    fontWeight: "700",
  },
  cartSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  cartSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  cartSearchInput: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  cartSearchButton: {
    padding: 4,
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
  headerToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerToggleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cartFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  verifyButton: {
    backgroundColor: "transparent",
  },
  enrollActionButton: {
    borderWidth: 0,
  },
  cartActions: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 60, // Increased gap from 24 to 32
    // bg color set inline
  },
  footerButtonText: {
    fontWeight: "700",
    fontSize: 15,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "350px",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "300px",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalButtonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  appointmentOptions: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    width: "100%",
  },
  optionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  optionText: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  modalCancelLink: {
    marginTop: 8,
    padding: 8,
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
