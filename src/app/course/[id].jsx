import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useParams, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Search,
  Bookmark,
  Presentation,
  Check,
  ChevronDown,
  Download,
  MoreHorizontal,
  FileText,
  ArrowUpDown,
  Shapes,
  Mail,
  Printer,
  HelpCircle,
  Calculator
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { courses, assignments } from "@/mocks/courses";

const contentData = [
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark, type: "static" }
];

const moduleData = [
  { id: "books", label: "Books", status: "completed", items: [] },
  { 
    id: "w1", 
    label: "Week 01", 
    status: "completed", 
    progress: { completed: 2, total: 2},
    items: [
      {
        id: "intro-key",
        title: "intro",
        type: "presentation",
        icon: FileText,
        completed: true,
      },
      {
        id: "ux-key",
        title: "UXprofession",
        type: "presentation",
        icon: FileText,
        completed: true,
      }
    ] },

  { id: "w2", label: "Week 02", status: "completed", items: [] },
  { id: "w3", label: "Week 03", status: "completed", items: [] },
  { id: "w4", label: "Week 04", status: "pending", count: 3, items: [] },
  { id: "w5", label: "Week 05", status: "completed", items: [] },
  { id: "w6", label: "Week 06", status: "pending", count: 3, items: [] },
  {
    id: "w7",
    label: "Week 07",
    status: "completed",
    progress: { completed: 1, total: 1 },
    items: [
      {
        id: "midterm-key",
        title: "Midterm Exam Fall 2025 ISTE 340 - Answer Key",
        type: "PDF document",
        icon: FileText,
        completed: true,
      },
    ],
  },
];

const classlistData = [
  { id: '1', name: 'Akshaj Bitla', username: 'ab4138', email: 'ab4138@rit.edu', role: 'Student' },
  { id: '2', name: 'Almaz Alikhan', username: 'aa3859', email: 'aa3859@rit.edu', role: 'Student' },
  { id: '3', name: 'Amaan Amjad Khan', username: 'aa3394', email: 'aa3394@rit.edu', role: 'Student' },
  { id: '4', name: 'Ashton Pinto', username: 'ap5476', email: 'ap5476@rit.edu', role: 'Student' },
  { id: '5', name: 'Dimash Aidarbek', username: 'da9990', email: 'da9990@rit.edu', role: 'Student' },
  { id: '6', name: 'Fazilah Syed', username: 'fs4723', email: 'fs4723@rit.edu', role: 'Student' },
  { id: '7', name: 'Hasan Alam', username: 'ha4402', email: 'ha4402@rit.edu', role: 'Student' },
  { id: '8', name: 'Hashim Mohammed', username: 'hhh8898', email: 'hhh8898@rit.edu', role: 'Student' },
  { id: '9', name: 'Jamile Obeid', username: 'jo4065', email: 'jo4065@rit.edu', role: 'Student' },
  { id: '10', name: 'Jason Ivan Panganiban', username: 'jp2236', email: 'jp2236@rit.edu', role: 'Student' },
  { id: '11', name: 'Kelvin Jebastine Kingsly Daniel', username: 'kj7411', email: 'kj7411@rit.edu', role: 'Student' },
  { id: '12', name: 'Khalil Al Hussaeni', username: 'kxacad', email: 'kxacad@rit.edu', role: 'Instructor' },
  { id: '13', name: 'Kripa Susan Jacob', username: 'ks2221', email: 'ks2221@rit.edu', role: 'Student' },
  { id: '14', name: 'Lana Kendakji', username: 'lk3501', email: 'lk3501@rit.edu', role: 'Student' },
  { id: '15', name: 'Leen Abhari', username: 'lha1823', email: 'lha1823@rit.edu', role: 'Student' },
  { id: '16', name: 'Leen Alamm', username: 'lma1558', email: 'lma1558@rit.edu', role: 'Student' },
  { id: '17', name: 'Malak Alqaryouti', username: 'moa7566', email: 'moa7566@rit.edu', role: 'Student' },
  { id: '18', name: 'Nihar Gandhi', username: 'nng9982', email: 'nng9982@rit.edu', role: 'Student' },
  { id: '19', name: 'Nishok Arunjothi', username: 'na3189', email: 'na3189@rit.edu', role: 'Student' },
  { id: '20', name: 'Praislin Peter', username: 'pp8489', email: 'pp8489@rit.edu', role: 'Student' },
  { id: '21', name: 'Sandhli Arora', username: 'sa3307', email: 'sa3307@rit.edu', role: 'Student' },
  { id: '22', name: 'Sara Hijazi', username: 'sh9570', email: 'sh9570@rit.edu', role: 'Student' },
  { id: '23', name: 'Shaik Nadia Tabassum', username: 'st9744', email: 'st9744@rit.edu', role: 'Student' },
  { id: '24', name: 'Shiza Shaheem', username: 'ss6719', email: 'ss6719@rit.edu', role: 'Student' },
  { id: '25', name: 'Simrah Shabandri', username: 'srs8745', email: 'srs8745@rit.edu', role: 'Student' },
  { id: '26', name: 'Syed Wasti', username: 'saw7340', email: 'saw7340@rit.edu', role: 'Student' },
  { id: '27', name: 'Tanmay Patil', username: 'tnp1210', email: 'tnp1210@rit.edu', role: 'Student' },
  { id: '28', name: 'Zara Mahreen', username: 'zm3057', email: 'zm3057@rit.edu', role: 'Student' },
];

const groupsData = {
  groups: [
    { id: 'g7', name: 'Group 7', members: '3/3 (Full)', assignment: '6' }
  ],
  sections: [
    { id: 's1', name: 'ISTE260601.2251DU1 DesigningTheUserExperience', members: '27/999', assignment: null }
  ]
};

const homeworkData = [
  {
    id: 'hw1',
    title: 'Group 7: Homework 1',
    dueDate: 'Sep 16, 2025 11:30 PM',
    attachment: 'Homework1.pdf (221.64 KB)',
    status: '1 Submission, 1 File',
    score: '90 / 100'
  },
  {
    id: 'hw2',
    title: 'Group 7: Homework 2',
    dueDate: 'Oct 9, 2025 11:30 PM',
    attachment: 'Homework2.pdf (185.85 KB)',
    status: '1 Submission, 1 File',
    score: '100 / 100',
    extra: 'Ends December 25'
  },
  {
    id: 'hw3',
    title: 'Group 7: Homework 3',
    dueDate: 'Nov 18, 2025 11:30 PM',
    attachment: 'Homework3.pdf (164.96 KB)',
    status: '1 Submission, 1 File',
    score: '- / 100'
  },
  {
    id: 'hw4',
    title: 'Group 7: Homework 4',
    dueDate: 'Nov 20, 2025 11:59 PM',
    attachment: 'Homework4.pdf (501.02 KB)',
    status: '1 Submission, 1 File',
    score: '- / 100'
  }
];

const gradesData = {
  final: { weightAchieved: "44 / 100" },
  items: [
    { id: 'cat1', type: 'category', name: 'Homeworks', weightAchieved: '19 / 40' },
    { id: 'g1', type: 'item', name: 'Homework 1', points: '90 / 100', weightAchieved: '9 / 10' },
    { id: 'g2', type: 'item', name: 'Homework 2', points: '100 / 100', weightAchieved: '10 / 10' },
    { id: 'g3', type: 'item', name: 'Homework 3', points: '0 / 100', weightAchieved: '0 / 10' },
    { id: 'g4', type: 'item', name: 'Homework 4', points: '0 / 100', weightAchieved: '0 / 10' },
    { id: 'cat2', type: 'category', name: 'Quizzes', weightAchieved: '7.5 / 10' },
    { id: 'g5', type: 'item', name: 'Quiz 1', points: '0.7 / 1', weightAchieved: '3.5 / 5' },
    { id: 'g6', type: 'item', name: 'Quiz 2', points: '24 / 30', weightAchieved: '4 / 5' },
    { id: 'cat3', type: 'category', name: 'Exams', weightAchieved: '17.5 / 25' },
    { id: 'g7', type: 'item', name: 'Midterm', points: '70 / 100', weightAchieved: '17.5 / 25' },
  ]
};

const attendanceData = {
  percentage: "72",
  summary: { present: "20 Present (=100%)", absent: "8 Absent (=0%)" },
  sessions: [
    { date: "8/25", status: "Present" },
    { date: "8/27", status: "Present" },
    { date: "9/1", status: "Present" },
    { date: "9/3", status: "Absent" },
    { date: "9/8", status: "Present" },
    { date: "9/10", status: "Present" },
    { date: "9/15", status: "Present" },
    { date: "9/17", status: "Present" },
    { date: "9/22", status: "Present" },
    { date: "9/24", status: "Present" },
    { date: "9/29", status: "Present" },
    { date: "10/1", status: "Present" },
    { date: "10/6", status: "Present" },
    { date: "10/8", status: "Absent" },
    { date: "10/13", status: "Present" },
    { date: "10/15", status: "Present" },
    { date: "10/20", status: "Present" },
    { date: "10/22", status: "Absent" },
    { date: "10/27", status: "Present" },
    { date: "10/29", status: "Absent" },
    { date: "11/3", status: "Absent" },
    { date: "11/5", status: "Absent" },
    { date: "11/10", status: "Present" },
    { date: "11/12", status: "Absent" },
    { date: "11/17", status: "Present" },
    { date: "11/19", status: "Present" },
    { date: "11/24", status: "Present" },
    { date: "11/26", status: "Absent" },
  ]
};

const menuItems = [
  { id: "content", label: "Content", icon: BookOpen },
  { id: "classlist", label: "Classlist", icon: Users },
  { id: "groups", label: "Groups", icon: UsersRound },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "grades", label: "Grades", icon: GraduationCap },
  { id: "attendance", label: "Attendance", icon: UserCheck },
];

export default function CourseDetailScreen() {
  const { colors } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentView, setCurrentView] = useState("dashboard");
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [classlistTab, setClasslistTab] = useState("All");
  
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

  const handleBack = () => {
    if (currentView !== "dashboard") {
      setCurrentView("dashboard");
      setExpandedModuleId(null);
    } else {
      navigate(-1);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case "content": return "Content";
      case "classlist": return "Classlist";
      case "groups": return "Groups";
      case "assignments": return "Assignments";
      case "grades": return "Grades";
      case "attendance": return "Attendance";
      default: return course.code;
    }
  };

  // --- Render Functions ---

  const renderDashboard = () => (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.colorBar, { backgroundColor: course.color }]} />
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
            Schedule
          </Text>
          {courseAssignments.map((assignment) => {
            const formatDueDate = (date) => {
              const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
              ];
              const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              return `${days[date.getDay()]}, ${
                months[date.getMonth()]
              } ${date.getDate()}`;
            };

            const getTypeColor = (type) => {
              switch (type) {
                case "exam": return { bg: "#FEE2E2", text: "#991B1B", label: "Exam" };
                case "project": return { bg: "#DBEAFE", text: "#1E40AF", label: "Project" };
                case "quiz": return { bg: "#FEF3C7", text: "#92400E", label: "Quiz" };
                default: return { bg: "#F3E8FF", text: "#6B21A8", label: "Homework" };
              }
            };

            const getStatusBadge = (status) => {
              switch (status) {
                case "submitted": return { bg: "#DBEAFE", text: "#1E40AF", label: "Submitted" };
                case "graded": return { bg: "#D1FAE5", text: "#065F46", label: "Graded" };
                default: return { bg: "#FEF3C7", text: "#92400E", label: "Pending" };
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
                    <View style={[styles.typeBadge, { backgroundColor: typeInfo.bg }]}>
                      <Text style={[styles.typeText, { color: typeInfo.text }]}>
                        {typeInfo.label}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
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
                if (item.id === "content") {
                  setCurrentView("content");
                } else if (item.id === "classlist") {
                  setCurrentView("classlist");
                } else if (item.id === "groups") {
                  setCurrentView("groups");
                } else if (item.id === "assignments") {
                    setCurrentView("assignments");
                } else if (item.id === "grades") {
                    setCurrentView("grades");
                } else if (item.id === "attendance") {
                    setCurrentView("attendance");
                } else {
                  console.log(`Maps to ${item.label} for course ${course.code}`);
                }
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
  );

  const renderContent = () => {
    const expandedModule = moduleData.find(m => m.id === expandedModuleId);

    return (
    <View style={[styles.contentContainer, { backgroundColor: colors.backgroundSecondary }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { borderColor: colors.border }]}>
          <TextInput 
            placeholder="Search Topics" 
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text }]}
          />
          <Search size={20} color={colors.textSecondary} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Static Items */}
        <View style={[styles.contentSection, { backgroundColor: colors.background }]}>
          {contentData.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.contentItem}
                activeOpacity={0.7}
              >
                <View style={styles.contentItemLeft}>
                  <Icon size={24} color={colors.text} strokeWidth={1.5} />
                  <Text style={[styles.contentItemText, { color: colors.text }]}>{item.label}</Text>
                </View>
                {item.badge && (
                  <View style={[styles.contentBadge, { backgroundColor: "#213547" }]}>
                    <Text style={[styles.contentBadgeText, { color: "#1E40AF" }]}>{item.badge}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Table of Contents Header */}
        <View style={[styles.tocHeader, { backgroundColor: colors.background }]}>
          <Text style={[styles.tocTitle, { color: colors.text }]}>Table of Contents</Text>
          <View style={[styles.tocBadge, { backgroundColor: "#213547" }]}>
            <Text style={[styles.tocBadgeText, { color: colors.text }]}>14</Text>
          </View>
        </View>

        {/* Modules List */}
        <View style={[styles.modulesList, { backgroundColor: colors.background }]}>
          {moduleData.map((module, index) => {
            const isLast = index === moduleData.length - 1;
            const isExpanded = module.id === expandedModuleId;
            return (
              <TouchableOpacity
                key={module.id}
                style={[
                  styles.moduleItem,
                  { borderBottomColor: colors.border, borderBottomWidth: isLast && !isExpanded ? 0 : 1 }
                ]}
                activeOpacity={0.7}
                onPress={() => toggleModule(module.id)}
              >
                <Text style={[styles.moduleText, { color: colors.text }]}>{module.label}</Text>
                <View style={styles.moduleRight}>
                  {module.status === 'completed' ? (
                    <Check size={24} color={colors.text} strokeWidth={2.5} />
                  ) : (
                    <View style={[styles.moduleCountBadge, { backgroundColor: "#213547" }]}>
                      <Text style={[styles.moduleCountText, { color: colors.text }]}>{module.count}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Expanded Module Content */}
        {expandedModule && (
          <View style={[styles.expandedModuleContainer, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.expandedHeader}>
              <TouchableOpacity 
                style={styles.expandedTitleContainer} 
                onPress={() => setExpandedModuleId(null)}
                activeOpacity={0.7}
              >
                <Text style={[styles.expandedTitle, { color: colors.text }]}>
                  {expandedModule.label}
                </Text>
                <ChevronDown size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MoreHorizontal size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Download Button */}
            <TouchableOpacity style={[styles.downloadButton, { backgroundColor: colors.backgroundSecondary }]}>
              <Download size={18} color={colors.text} />
              <Text style={[styles.downloadText, { color: colors.text }]}>Download</Text>
            </TouchableOpacity>

            {/* Progress Bar */}
            {expandedModule.progress && (() => {
              const { completed, total } = expandedModule.progress;
              const percent = (completed / total) * 100;
              return (
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                    <View style={[styles.progressBarFill, { width: `${percent}%`, backgroundColor: colors.primary }]} />
                  </View>
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    <Text style={{ fontWeight: '700', color: colors.text }}>{percent}% </Text>
                    {completed} of {total} topics complete
                  </Text>
                </View>
              );
            })()}

            {/* File List */}
            <View style={styles.fileList}>
              {expandedModule.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <View key={item.id} style={styles.fileItem}>
                    <View style={styles.fileItemContent}>
                      <View style={styles.fileIconContainer}>
                        <ItemIcon size={24} color={colors.text} strokeWidth={1.5} />
                      </View>
                      <View style={styles.fileInfo}>
                        <Text style={[styles.fileTitle, { color: colors.primary }]}>{item.title}</Text>
                        <Text style={[styles.fileType, { color: colors.textSecondary }]}>{item.type}</Text>
                      </View>
                    </View>
                    <View style={styles.fileActions}>
                      <TouchableOpacity style={styles.iconButton}>
                        <ArrowUpDown size={20} color={colors.text} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <Shapes size={20} color={colors.text} />
                      </TouchableOpacity>
                      {item.completed && <Check size={24} color={colors.text} strokeWidth={2.5} />}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )};

  const renderClasslist = () => (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
      <View style={styles.clHeaderContainer}>
        <View style={styles.clHeaderRow}>
             <TouchableOpacity style={[
                styles.emailClassListBtn, 
                { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }
             ]}>
                <Text style={[styles.emailClassListBtnText, { color: colors.text }]}>Email Classlist</Text>
             </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.clTabs}>
            {["All", "Staff", "Students"].map((tab) => (
                <TouchableOpacity 
                    key={tab} 
                    style={[
                        styles.clTab, 
                        classlistTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 3 }
                    ]}
                    onPress={() => setClasslistTab(tab)}
                >
                    <Text style={[
                        styles.clTabText, 
                        { color: classlistTab === tab ? colors.text : colors.textSecondary, fontWeight: classlistTab === tab ? '600' : '400' }
                    ]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* Search and Filter */}
        <View style={styles.clFilterContainer}>
            <View style={styles.clViewByRow}>
                <Text style={{color: colors.text}}>View By:</Text>
                <View style={[styles.clDropdown, { borderColor: colors.border }]}>
                    <Text style={{color: colors.text}}>User</Text>
                    <ChevronDown size={16} color={colors.text} />
                </View>
                <TouchableOpacity style={[
                    styles.clApplyBtn, 
                    { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }
                ]}>
                    <Text style={{color: colors.text}}>Apply</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.clSearchRow}>
                <View style={[styles.clSearchBar, { borderColor: colors.border }]}>
                    <TextInput 
                        placeholder="Search For..." 
                        placeholderTextColor={colors.textSecondary}
                        style={{flex: 1, color: colors.text}} 
                    />
                    <Search size={18} color={colors.textSecondary} />
                </View>
                <TouchableOpacity>
                    <Text style={{color: colors.primary, marginLeft: 12}}>Show Search Options</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Action Icons */}
        <View style={styles.clActionRow}>
            <TouchableOpacity style={styles.clActionItem}>
                <Mail size={16} color={colors.primary} />
                <Text style={{color: colors.primary, fontWeight: '600'}}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clActionItem}>
                <Printer size={16} color={colors.primary} />
                <Text style={{color: colors.primary, fontWeight: '600'}}>Print</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.clTableContainer}>
            {/* Header */}
            <View style={[styles.clTableRow, styles.clTableHeader, { borderBottomColor: colors.border }]}>
                <View style={[styles.clColName, { flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                    <Text style={[styles.clHeadText, { color: colors.text }]}>Name</Text>
                    <ArrowUpDown size={14} color={colors.text} />
                </View>
                <Text style={[styles.clColUser, styles.clHeadText, { color: colors.text }]}>Username</Text>
                <Text style={[styles.clColEmail, styles.clHeadText, { color: colors.text }]}>Email</Text>
                <Text style={[styles.clColRole, styles.clHeadText, { color: colors.text }]}>Role</Text>
            </View>

            {/* Rows */}
            <ScrollView style={{flex: 1}}>
                {classlistData.map((student) => (
                    <View key={student.id} style={[styles.clTableRow, { borderBottomColor: colors.border }]}>
                         <View style={styles.clColName}>
                            <Text style={{color: colors.primary, fontWeight: '500'}}>{student.name}</Text>
                        </View>
                        <Text style={[styles.clColUser, { color: colors.text }]}>{student.username}</Text>
                        <Text style={[styles.clColEmail, { color: colors.text }]}>{student.email}</Text>
                        <Text style={[styles.clColRole, { color: colors.text }]}>{student.role}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
      </ScrollView>
    </View>
  );

  const renderGroups = () => (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <View style={styles.grpContainer}>
            {/* Top Button */}
            <TouchableOpacity style={[styles.grpHeaderBtn, { backgroundColor: '#006FA3' }]}>
                <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>View Available Groups</Text>
            </TouchableOpacity>

            <Text style={[styles.grpTitle, { color: colors.text }]}>My Groups</Text>

            {/* Groups Table */}
            <View style={[styles.grpTable, { borderColor: colors.border }]}>
                {/* Header Row */}
                <View style={[styles.grpHeaderRow, { borderBottomColor: colors.border, backgroundColor: colors.card }]}>
                    <View style={[styles.grpCell, { flex: 2 }]}>
                        <Text style={[styles.grpHeaderText, { color: colors.text }]}>Groups</Text>
                    </View>
                    <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                        <Text style={[styles.grpHeaderText, { color: colors.text }]}>Members</Text>
                    </View>
                    <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                        <Text style={[styles.grpHeaderText, { color: colors.text }]}>Assignment</Text>
                    </View>
                </View>

                {/* Sub Header: Groups */}
                <View style={[styles.grpSubHeaderRow, { borderBottomColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>Groups</Text>
                </View>

                {/* Groups Data */}
                {groupsData.groups.map(g => (
                    <View key={g.id} style={[styles.grpRow, { borderBottomColor: colors.border }]}>
                        <View style={[styles.grpCell, { flex: 2 }]}>
                            <Text style={{ color: '#006FA3', fontWeight: '500' }}>{g.name}</Text>
                        </View>
                        <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                            <Text style={{ color: '#006FA3' }}>{g.members}</Text>
                        </View>
                        <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                            <Text style={{ color: '#006FA3' }}>{g.assignment}</Text>
                        </View>
                    </View>
                ))}

                {/* Sub Header: Sections */}
                <View style={[styles.grpSubHeaderRow, { borderBottomColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>Sections</Text>
                </View>

                {/* Sections Data */}
                {groupsData.sections.map(s => (
                    <View key={s.id} style={[styles.grpRow, { borderBottomColor: colors.border, borderBottomWidth: 0 }]}>
                         <View style={[styles.grpCell, { flex: 2 }]}>
                            <Text style={{ color: colors.text }}>{s.name}</Text>
                        </View>
                        <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                            <Text style={{ color: '#006FA3' }}>{s.members}</Text>
                        </View>
                        <View style={[styles.grpCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                            <Text style={{ color: colors.text }}></Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    </View>
  );

  const renderAssignments = () => (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
      <View style={styles.grpContainer}>
        <View style={[styles.assignTable, { borderColor: colors.border }]}>
          {/* Main Header */}
          <View style={[styles.assignHeaderRow, { borderBottomColor: colors.border, backgroundColor: colors.card }]}>
             <View style={[styles.assignCell, { flex: 3 }]}>
               <Text style={[styles.assignHeaderText, { color: colors.text }]}>Assignment</Text>
             </View>
             <View style={[styles.assignCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
               <Text style={[styles.assignHeaderText, { color: colors.text }]}>Completion Status</Text>
             </View>
             <View style={[styles.assignCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border }]}>
               <Text style={[styles.assignHeaderText, { color: colors.text }]}>Score</Text>
             </View>
          </View>

          {/* Sub Header */}
          <View style={[styles.assignSubHeader, { borderBottomColor: colors.border }]}>
             <Text style={[styles.assignSubHeaderText, { color: colors.text }]}>Homework Assignments</Text>
          </View>

          {/* Assignment Rows */}
          {homeworkData.map((item, index) => {
             const isLast = index === homeworkData.length - 1;
             return (
               <View key={item.id} style={[styles.assignRow, { borderBottomColor: colors.border, borderBottomWidth: isLast ? 0 : 1 }]}>
                  {/* Col 1: Details */}
                  <View style={[styles.assignCell, { flex: 3, alignItems: 'flex-start' }]}>
                     <TouchableOpacity>
                       <Text style={styles.assignTitle}>{item.title} <UsersRound size={14} color="#000" /> <Printer size={14} color="#000" /></Text>
                     </TouchableOpacity>
                     
                     <Text style={[styles.assignDue, { color: colors.text }]}>Due on {item.dueDate}</Text>
                     
                     {item.extra && (
                       <Text style={[styles.assignExtra, { color: colors.textSecondary, textDecorationLine: 'underline', borderBottomStyle: 'dotted' }]}>{item.extra}</Text>
                     )}

                     <Text style={[styles.assignLabel, { color: colors.text, marginTop: 12 }]}>Attachments</Text>
                     <TouchableOpacity style={styles.assignAttachment}>
                        <FileText size={16} color={colors.text} />
                        <Text style={styles.assignFileText}>{item.attachment}</Text>
                     </TouchableOpacity>
                  </View>

                  {/* Col 2: Status */}
                  <View style={[styles.assignCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border, justifyContent: 'center' }]}>
                     <TouchableOpacity>
                        <Text style={styles.assignStatusLink}>1 Submission,</Text>
                        <Text style={styles.assignStatusLink}>1 File</Text>
                     </TouchableOpacity>
                  </View>

                  {/* Col 3: Score */}
                  <View style={[styles.assignCell, { flex: 1, borderLeftWidth: 1, borderLeftColor: colors.border, justifyContent: 'center' }]}>
                     <Text style={[styles.assignScore, { color: colors.text }]}>{item.score}</Text>
                  </View>
               </View>
             );
          })}
        </View>
      </View>
    </View>
  );

  const renderGrades = () => (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
      <View style={styles.grpContainer}>
        {/* Header Section */}
        <View style={styles.finalGradeContainer}>
            <Text style={[styles.finalGradeTitle, { color: colors.text }]}>Final Calculated Grade</Text>
            
            <View style={{marginTop: 12}}>
                <Text style={[styles.finalGradeSubtitle, { color: colors.text }]}>Weight Achieved</Text>
                <View style={styles.finalGradeValueRow}>
                    <Text style={[styles.finalGradeValue, { color: colors.text }]}>{gradesData.final.weightAchieved}</Text>
                    <Calculator size={18} color={colors.text} style={{marginLeft: 8}} />
                </View>
            </View>
        </View>

        {/* Grades Table */}
        <View style={[styles.gradesTable, { borderColor: colors.border }]}>
            {/* Table Header */}
            <View style={[styles.gradesHeaderRow, { backgroundColor: '#213547', borderBottomColor: colors.border }]}>
                <View style={[styles.gradesCell, { flex: 2.5 }]}>
                    <Text style={[styles.gradesHeaderText, { color: colors.text }]}>Grade Item</Text>
                </View>
                <View style={[styles.gradesCell, { flex: 1 }]}>
                    <Text style={[styles.gradesHeaderText, { color: colors.text, textAlign: 'center' }]}>Points</Text>
                </View>
                <View style={[styles.gradesCell, { flex: 1.2 }]}>
                    <Text style={[styles.gradesHeaderText, { color: colors.text, textAlign: 'center' }]}>Weight Achieved</Text>
                </View>
                <View style={[styles.gradesCell, { flex: 0.8 }]}>
                    <Text style={[styles.gradesHeaderText, { color: colors.text, textAlign: 'center' }]}>Grade</Text>
                </View>
            </View>
            
            {/* Rows */}
            {gradesData.items.map((item, index) => {
                const isLast = index === gradesData.items.length - 1;
                const isCategory = item.type === 'category';

                return (
                    <View key={item.id} style={[styles.gradesRow, { borderBottomColor: colors.border, borderBottomWidth: isLast ? 0 : 1 }]}>
                        {/* Name Column */}
                        <View style={[styles.gradesCell, { flex: 2.5, paddingLeft: isCategory ? 16 : 32 }]}>
                            <Text style={{ 
                                color: colors.text, 
                                fontSize: 14,
                                fontWeight: isCategory ? '500' : '400' 
                            }}>
                                {item.name}
                            </Text>
                            {/* If it's a specific item, maybe add line breaks if needed, but flex wrap handles it */}
                        </View>
                        
                        {/* Points Column */}
                        <View style={[styles.gradesCell, { flex: 1 }]}>
                            <Text style={{ color: colors.text, textAlign: 'center' }}>{item.points || ''}</Text>
                        </View>
                        
                        {/* Weight Achieved Column */}
                        <View style={[styles.gradesCell, { flex: 1.2 }]}>
                            <Text style={{ color: colors.text, textAlign: 'center' }}>{item.weightAchieved}</Text>
                        </View>
                        
                        {/* Grade Column (Empty placeholder for now as per image logic) */}
                        <View style={[styles.gradesCell, { flex: 0.8 }]}>
                             <Text style={{ color: colors.text, textAlign: 'center' }}></Text>
                        </View>
                    </View>
                )
            })}
        </View>
      </View>
    </View>
  );

  const renderAttendance = () => (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grpContainer}>
            {/* Attendance Header Summary */}
            <View style={styles.attendContainer}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.attendLabel, { color: colors.text }]}>% Attendance:</Text>
                    <Text style={[styles.attendValue, { color: colors.text }]}>{attendanceData.percentage}</Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.attendLabel, { color: colors.text }]}>Attendance Summary:</Text>
                    <Text style={[styles.attendSummary, { color: colors.text }]}>{attendanceData.summary.present}</Text>
                    <Text style={[styles.attendSummary, { color: colors.text }]}>{attendanceData.summary.absent}</Text>
                </View>
            </View>

            {/* Sessions Table */}
            <View style={[styles.attendTable, { borderColor: colors.border }]}>
                {/* Table Header */}
                <View style={[styles.attendHeaderRow, { borderBottomColor: colors.border, backgroundColor: '#213547' }]}>
                    <View style={[styles.attendCell, { flex: 1, borderRightWidth: 1, borderRightColor: colors.border }]}>
                        <Text style={[styles.attendHeaderText, { color: colors.text, textAlign: 'left' }]}>Sessions</Text>
                    </View>
                    <View style={[styles.attendCell, { flex: 2 }]}>
                        <Text style={[styles.attendHeaderText, { color: colors.text, textAlign: 'right' }]}>Attendance Status</Text>
                    </View>
                </View>

                {/* Table Rows */}
                {attendanceData.sessions.map((session, index) => {
                    const isLast = index === attendanceData.sessions.length - 1;
                    return (
                        <View key={index} style={[styles.attendRow, { borderBottomColor: colors.border, borderBottomWidth: isLast ? 0 : 1 }]}>
                            <View style={[styles.attendCell, { flex: 1, borderRightWidth: 1, borderRightColor: colors.border }]}>
                                <Text style={{ color: colors.text }}>{session.date}</Text>
                            </View>
                            <View style={[styles.attendCell, { flex: 2, alignItems: 'flex-end' }]}>
                                <Text style={{ color: colors.text }}>{session.status}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );

  const renderView = () => {
    switch (currentView) {
        case "content": return renderContent();
        case "classlist": return renderClasslist();
        case "groups": return renderGroups();
        case "assignments": return renderAssignments();
        case "grades": return renderGrades();
        case "attendance": return renderAttendance();
        default: return renderDashboard();
    }
  };

  return (
    <>
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>
            {currentView !== "dashboard" ? "Course" : "Back"}
          </Text>
        </TouchableOpacity>
        
        <View style={{flex: 1, alignItems: 'center', marginRight: 40}}>
             <Text style={[styles.headerTitle, { color: colors.text }]}>
            {getHeaderTitle()}
            </Text>
        </View>
        
        {currentView === 'classlist' && (
            <View style={{flexDirection: 'row', gap: 12}}>
                <TouchableOpacity>
                    <Printer size={20} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <HelpCircle size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>
        )}
      </View>

      {renderView()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    zIndex: 10,
    justifyContent: 'space-between'
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  // Dashboard Styles
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

  // Content View Styles
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginRight: 8,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  contentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contentItemText: {
    fontSize: 16,
    fontWeight: '400',
  },
  contentBadge: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tocHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  tocTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  tocBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tocBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modulesList: {
    paddingLeft: 20, 
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 20,
  },
  moduleText: {
    fontSize: 16,
    fontWeight: '400',
  },
  moduleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleCountBadge: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleCountText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Expanded Module Styles
  expandedModuleContainer: {
    padding: 20,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },
  expandedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  expandedTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandedTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  downloadText: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  fileList: {
    gap: 24,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fileItemContent: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
  },
  fileIconContainer: {
    marginTop: 2,
  },
  fileInfo: {
    flex: 1,
  },
  fileTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 22,
  },
  fileType: {
    fontSize: 14,
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 16,
  },
  iconButton: {
    padding: 4,
  },

  // Classlist Styles
  clHeaderContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  clHeaderRow: {
    marginBottom: 16,
  },
  emailClassListBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  emailClassListBtnText: {
    fontWeight: '500',
  },
  clTabs: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#213547',
    marginBottom: 16,
  },
  clTab: {
    paddingBottom: 8,
  },
  clTabText: {
    fontSize: 16,
  },
  clFilterContainer: {
    gap: 12,
    marginBottom: 16,
  },
  clViewByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: 100,
  },
  clApplyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clSearchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  clActionRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  clActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clTableContainer: {
    minWidth: '100%',
    paddingHorizontal: 20,
  },
  clTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    minWidth: 600, // Ensure horizontal scroll triggers
  },
  clTableHeader: {
    backgroundColor: '#213547',
    borderTopWidth: 1,
    borderTopColor: '#213547',
  },
  clHeadText: {
    fontWeight: '600',
    fontSize: 14,
  },
  clColName: {
    width: 200,
    paddingRight: 10,
  },
  clColUser: {
    width: 120,
    paddingRight: 10,
  },
  clColEmail: {
    width: 200,
    paddingRight: 10,
  },
  clColRole: {
    width: 80,
  },

  // Groups Styles
  grpContainer: {
    padding: 16,
  },
  grpHeaderBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  grpTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  grpTable: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  grpHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  grpHeaderText: {
    textAlign: 'center',
    fontWeight: '600',
    padding: 12,
  },
  grpSubHeaderRow: {
    padding: 12,
    borderBottomWidth: 1,
  },
  grpRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  grpCell: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Assignments Styles
  assignTable: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#213547',
  },
  assignHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  assignHeaderText: {
    textAlign: 'center',
    fontWeight: '600',
    paddingVertical: 12,
  },
  assignSubHeader: {
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: '#213547',
  },
  assignSubHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  assignRow: {
    flexDirection: 'row',
  },
  assignCell: {
    padding: 12,
  },
  assignTitle: {
    color: '#006FA3',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  assignDue: {
    fontSize: 13,
    marginBottom: 8,
  },
  assignExtra: {
    fontSize: 13,
    marginBottom: 8,
  },
  assignLabel: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 13,
  },
  assignAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  assignFileText: {
    color: '#006FA3',
    textDecorationLine: 'underline',
  },
  assignStatusLink: {
    color: '#006FA3',
    textAlign: 'center',
    marginBottom: 4,
  },
  assignScore: {
    textAlign: 'center',
    fontSize: 15,
  },

  // Grades Styles
  finalGradeContainer: {
    marginBottom: 24,
  },
  finalGradeTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  finalGradeSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  finalGradeValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  finalGradeValue: {
    fontSize: 24,
    fontWeight: '400',
  },
  gradesTable: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#213547',
  },
  gradesHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  gradesHeaderText: {
    fontWeight: '600',
    paddingVertical: 12,
    fontSize: 13,
  },
  gradesRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  gradesCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },

  // Attendance Styles
  attendContainer: {
    marginBottom: 24,
  },
  attendLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  attendValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  attendSummary: {
    fontSize: 15,
    marginTop: 2,
  },
  attendTable: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  attendHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  attendHeaderText: {
    fontWeight: '600',
    fontSize: 14,
    padding: 12,
  },
  attendRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  attendCell: {
    padding: 12,
    justifyContent: 'center',
  }
});