import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Calendar,
  MapPin,
  Megaphone,
  Users,
  MessageCircle,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { events } from "@/mocks/community";
import { courses } from "@/mocks/courses";

const mockMessages = [
  { id: 1, text: "Hey everyone! Has anyone started the assignment due Friday?", sender: "Syed Wasti", time: "10:30 AM", isMe: false, avatar: "SC" },
  { id: 2, text: "I just looked at it. Question 3 is confusing.", sender: "Hashim Mohammed", time: "10:32 AM", isMe: false, avatar: "MR" },
  { id: 3, text: "I think we need to use the formula from chapter 4.", sender: "Yousef Diago", time: "10:35 AM", isMe: false, avatar: "JP" },
  { id: 4, text: "Oh, that makes sense, Thanks.", sender: "Syed Wasti", time: "10:36 AM", isMe: false, avatar: "MR" },
  { id: 5, text: "I'm planning to work on it tonight if anyone wants to join a study session?", sender: "You", time: "10:40 AM", isMe: true, avatar: "ME" },
  { id: 6, text: "I'm down, Library at 6?", sender: "Syed Wasit", time: "10:42 AM", isMe: false, avatar: "SC" },
];

export default function CommunityScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState("all");
  const [activeChat, setActiveChat] = useState(null);

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

  if (activeChat) {
    return (
      <ChatView 
        course={activeChat} 
        onBack={() => setActiveChat(null)} 
        colors={colors} 
      />
    );
  }

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
            label="Discussions"
            active={filter === "discussions"}
            onPress={() => setFilter("discussions")}
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
        {filter === "discussions" ? (
          <View style={styles.courseList}>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={[styles.discussionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={() => setActiveChat(course)}
              >
                <View style={[styles.courseIcon, { backgroundColor: course.color }]}>
                  <Text style={styles.courseIconText}>{course.code.substring(0, 2)}</Text>
                </View>
                <View style={styles.discussionInfo}>
                  <Text style={[styles.discussionTitle, { color: colors.text }]}>{course.name}</Text>
                  <Text style={[styles.discussionSubtitle, { color: colors.textSecondary }]}>
                    {course.code} • {Math.floor(Math.random() * 5) + 1} new messages
                  </Text>
                </View>
                <MessageCircle size={20} color={colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          filteredEvents.map((event) => (
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
          ))
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function ChatView({ course, onBack, colors }) {
  const { mode } = useTheme(); // Destructure mode to detect light/dark
  const [messageText, setMessageText] = useState("");
  const scrollViewRef = useRef();

  // Theme Constants for Chat
  const isDark = mode === 'dark';
  const chatBgColor = isDark ? '#0B141A' : '#ECE5DD';
  const inputBgColor = isDark ? '#202C33' : '#F0F0F0';
  const inputFieldColor = isDark ? '#2A3942' : '#FFFFFF';
  const myBubbleColor = isDark ? '#005C4B' : '#DCF8C6';
  const otherBubbleColor = isDark ? '#202C33' : '#FFFFFF';
  const dateBadgeBg = isDark ? '#202C33' : '#D1D7DB';
  const dateBadgeText = isDark ? '#8696A0' : '#4B5563';
  const timeColor = isDark ? '#8696A0' : '#999';
  const iconColor = isDark ? '#8696A0' : '#808080';

  return (
    <View style={[styles.chatContainer, { backgroundColor: chatBgColor }]}> 
      
      {/* Header */}
      <View style={[styles.chatHeader, { backgroundColor: colors.primary }]}>
        <View style={styles.chatHeaderLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatTitle} numberOfLines={1}>{course.name}</Text>
            <Text style={styles.chatSubtitle}>{course.code} • 24 members</Text>
          </View>
        </View>
        <View style={styles.chatHeaderRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Video size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Phone size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <MoreVertical size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.chatMessages}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        <View style={styles.dateBadgeContainer}>
          <View style={[styles.dateBadge, { backgroundColor: dateBadgeBg }]}>
            <Text style={[styles.dateBadgeText, { color: dateBadgeText }]}>Today</Text>
          </View>
        </View>

        {mockMessages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageRow, 
              msg.isMe ? styles.messageRowRight : styles.messageRowLeft
            ]}
          >
            {!msg.isMe && (
              <View style={[styles.messageAvatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.messageAvatarText}>{msg.avatar}</Text>
              </View>
            )}
            <View 
              style={[
                styles.messageBubble, 
                { backgroundColor: msg.isMe ? myBubbleColor : otherBubbleColor }
              ]}
            >
              {!msg.isMe && <Text style={[styles.senderName, { color: colors.primary }]}>{msg.sender}</Text>}
              <Text style={[styles.messageText, { color: colors.text }]}>{msg.text}</Text>
              <Text style={[styles.messageTime, { color: timeColor }]}>{msg.time}</Text>
            </View>
          </View>
        ))}
        <View style={{height: 10}} />
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: inputBgColor }]}>
          <View style={[styles.inputFieldContainer, { backgroundColor: inputFieldColor }]}>
            <TouchableOpacity style={styles.inputIcon}>
              <Smile size={24} color={iconColor} />
            </TouchableOpacity>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="Type a message"
              placeholderTextColor={colors.textSecondary}
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.inputIcon}>
              <Paperclip size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.primary }]}>
            <Send size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  
  // Discussion / Course List Styles
  courseList: {
    gap: 12,
  },
  discussionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseIconText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  discussionInfo: {
    flex: 1,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  discussionSubtitle: {
    fontSize: 13,
  },

  // Chat Styles
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50, // Status bar padding
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 4,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  chatSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  chatHeaderRight: {
    flexDirection: 'row',
    gap: 20,
  },
  headerIcon: {
    padding: 4,
  },
  chatMessages: {
    flex: 1,
    padding: 16,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  dateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  messageAvatarText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  inputFieldContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  inputIcon: {
    padding: 4,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});