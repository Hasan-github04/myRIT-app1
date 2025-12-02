import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { courses } from "@/mocks/courses";
import { RotateCcw } from "lucide-react-native";

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { notifications, setNotifications } = useOutletContext();
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [undoData, setUndoData] = useState(null);
  const undoTimeoutRef = useRef(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "grade":
        return { icon: "📊", color: "#10B981" };
      case "assignment":
        return { icon: "📝", color: "#3B82F6" };
      case "announcement":
        return { icon: "📢", color: "#F59E0B" };
      default:
        return { icon: "📌", color: "#6B7280" };
    }
  };

  const formatNotificationTime = (date) => {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleReadStatus = (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      const newReadStatus = !notification.isRead;
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: newReadStatus } : n))
      );

      if (newReadStatus) {
        setUndoData({ id, wasRead: false });

        if (undoTimeoutRef.current) {
          clearTimeout(undoTimeoutRef.current);
        }
        undoTimeoutRef.current = setTimeout(() => {
          setUndoData(null);
        }, 4000);
      } else {
        setUndoData(null);
        if (undoTimeoutRef.current) {
          clearTimeout(undoTimeoutRef.current);
        }
      }
    }
  };

  const undoMarkAsRead = () => {
    if (undoData) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === undoData.id ? { ...n, isRead: undoData.wasRead } : n
        )
      );
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
      setUndoData(null);
    }
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case "assignments":
        return notifications.filter((n) => n.type === "assignment");
      case "grades":
        return notifications.filter((n) => n.type === "grade");
      case "others":
        return notifications.filter((n) => n.type === "announcement");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View
        style={[
          styles.filterContainer,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <FilterButton
            label="All"
            active={activeFilter === "all"}
            onPress={() => setActiveFilter("all")}
            colors={colors}
          />
          <FilterButton
            label="Assignments"
            active={activeFilter === "assignments"}
            onPress={() => setActiveFilter("assignments")}
            colors={colors}
          />
          <FilterButton
            label="Grades"
            active={activeFilter === "grades"}
            onPress={() => setActiveFilter("grades")}
            colors={colors}
          />
          <FilterButton
            label="Others"
            active={activeFilter === "others"}
            onPress={() => setActiveFilter("others")}
            colors={colors}
          />
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            course={courses.find((c) => c.id === notification.courseId)}
            notifInfo={getNotificationIcon(notification.type)}
            isExpanded={expandedId === notification.id}
            onToggleExpanded={() => toggleExpanded(notification.id)}
            onToggleRead={() => toggleReadStatus(notification.id)}
            formatTime={formatNotificationTime}
            colors={colors}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {undoData && (
        <View style={[styles.snackbar, { backgroundColor: colors.text }]}>
          <Text style={[styles.snackbarText, { color: colors.background }]}>
            Marked as read
          </Text>
          <TouchableOpacity onPress={undoMarkAsRead} style={styles.undoButton}>
            <RotateCcw size={16} color={colors.primary} />
            <Text style={[styles.undoText, { color: colors.primary }]}>
              Undo
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const NotificationItem = ({
  notification,
  course,
  notifInfo,
  isExpanded,
  onToggleExpanded,
  onToggleRead,
  formatTime,
  colors,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const lastSwipeTime = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        if (now - lastSwipeTime.current < 300) {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          return;
        }

        if (gestureState.dx > 100) {
          lastSwipeTime.current = now;
          Animated.timing(translateX, {
            toValue: 500,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onToggleRead();
            translateX.setValue(0);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.notificationWrapper}>
      <Animated.View
        style={[
          styles.notificationCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            transform: [{ translateX }],
          },
          !notification.isRead && {
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.notificationTouchable}
          activeOpacity={0.7}
          onPress={onToggleExpanded}
        >
          <View style={styles.notificationIconContainer}>
            <Text style={styles.notificationIcon}>{notifInfo.icon}</Text>
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>
                {notification.title}
              </Text>
              {!notification.isRead && (
                <View
                  style={[
                    styles.unreadBadge,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </View>
            {isExpanded && (
              <Text
                style={[
                  styles.notificationMessage,
                  { color: colors.textSecondary },
                ]}
              >
                {notification.message}
              </Text>
            )}
            <View style={styles.notificationFooter}>
              <Text
                style={[
                  styles.notificationCourse,
                  { color: course?.color || colors.textSecondary },
                ]}
              >
                {course?.code}
              </Text>
              <Text
                style={[
                  styles.notificationTime,
                  { color: colors.textSecondary },
                ]}
              >
                {formatTime(notification.timestamp)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const FilterButton = ({ label, active, onPress, colors }) => (
  <TouchableOpacity
    style={[
      styles.filterButton,
      {
        backgroundColor: colors.backgroundSecondary,
        borderColor: colors.border,
      },
      active && {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.filterButtonText,
        { color: colors.text },
        active && { color: "#FFFFFF" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    borderBottomWidth: 1,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },

  notificationWrapper: {
    marginBottom: 12,
  },
  notificationCard: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
  },
  notificationTouchable: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    gap: 12,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 4,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  notificationCourse: {
    fontSize: 13,
    fontWeight: "600",
  },
  notificationTime: {
    fontSize: 12,
  },

  snackbar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  snackbarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  undoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  undoText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
