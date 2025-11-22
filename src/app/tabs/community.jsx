import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Calendar,
  MapPin,
  Megaphone,
  Users,
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { events } from "@/mocks/community";

export default function CommunityScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((e) =>
    filter === "all" ? true : e.type === filter
  );

  const formatDate = (date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days < 0) {
      const absDays = Math.abs(days);
      return absDays === 1 ? "Yesterday" : `${absDays} days ago`;
    }
    return `In ${days} days`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "event":
        return <Calendar size={18} color={colors.primary} />;
      case "announcement":
        return <Megaphone size={18} color={colors.warning} />;
      case "club":
        return <Users size={18} color={colors.success} />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "event":
        return colors.primary;
      case "announcement":
        return colors.warning;
      case "club":
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.filterContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <FilterButton
            label="All"
            active={filter === "all"}
            onPress={() => setFilter("all")}
            colors={colors}
          />
          <FilterButton
            label="Events"
            active={filter === "event"}
            onPress={() => setFilter("event")}
            colors={colors}
          />
          <FilterButton
            label="Announcements"
            active={filter === "announcement"}
            onPress={() => setFilter("announcement")}
            colors={colors}
          />
          <FilterButton
            label="Clubs"
            active={filter === "club"}
            onPress={() => setFilter("club")}
            colors={colors}
          />
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.eventHeader}>
              <View style={styles.eventTypeContainer}>
                {getTypeIcon(event.type)}
                <Text
                  style={[
                    styles.eventType,
                    { color: getTypeColor(event.type) },
                  ]}
                >
                  {event.type.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.eventDate, { color: colors.textSecondary }]}>{formatDate(event.date)}</Text>
            </View>

            <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
            <Text style={[styles.eventDescription, { color: colors.textSecondary }]} numberOfLines={3}>
              {event.description}
            </Text>

            <View style={styles.eventFooter}>
              <View style={styles.eventDetails}>
                {event.location && (
                  <View style={styles.eventDetailItem}>
                    <MapPin size={14} color={colors.textSecondary} />
                    <Text style={[styles.eventDetailText, { color: colors.textSecondary }]}>
                      {event.location}
                    </Text>
                  </View>
                )}
                <View style={styles.eventDetailItem}>
                  <Users size={14} color={colors.textSecondary} />
                  <Text style={[styles.eventDetailText, { color: colors.textSecondary }]}>
                    {event.organizer}
                  </Text>
                </View>
              </View>
              {event.attendees && (
                <View style={[styles.attendeesContainer, { backgroundColor: colors.backgroundSecondary }]}>
                  <Text style={[styles.attendeesText, { color: colors.text }]}>
                    {event.attendees} attending
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const FilterButton = ({
  label,
  active,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    style={[
      styles.filterButton,
      { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
      active && { backgroundColor: colors.primary, borderColor: colors.primary },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.filterButtonText,
      { color: colors.text },
      active && { color: "#FFFFFF" },
    ]}>
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
  eventCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventType: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  eventDate: {
    fontSize: 13,
    fontWeight: "500",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
  },
  eventDetails: {
    flex: 1,
    gap: 6,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventDetailText: {
    fontSize: 13,
    fontWeight: "500",
  },
  attendeesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  attendeesText: {
    fontSize: 12,
    fontWeight: "600",
  },
});