import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
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
  ArrowLeft,
  CreditCard,
  Briefcase,
  Phone,
  MapPin,
  AlertCircle,
  Shield,
  Eye,
  FileText,
  MessageCircle,
  ExternalLink,
  LifeBuoy
} from "lucide-react-native";

import { useTheme } from "@/constants/ThemeContext";
import { studentInfo } from "@/mocks/academic";

// Extended Mock Data for Personal Info
const extendedStudentInfo = {
  ...studentInfo,
  ritId: "770009926",
  dob: "July 30, 2004",
  phone: "+971 50-715-1802",
  campusAddress: "RIT Dubai New Campus Opposite to DSO Warehouses - Dubai Silicon Oasis - Dubai",
  homeAddress: "SS lootah 3, Al Nahda\nDubai, UAE",
  emergencyContact: {
    name: "Arshad Alam",
    relation: "Parent",
    phone: "+971 50-332-9827",
  },
  status: "Full-time Active",
  college: "Golisano College of Computing and Information Sciences"
};

export default function ProfileScreen() {
  const { colors, mode, setThemeMode } = useTheme();
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'personalInfo' | 'privacy' | 'help'
  
  // Mock state for toggles
  const [isProfilePublic, setIsProfilePublic] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const renderPersonalInfo = () => (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.subPageHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>Profile</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Personal Info</Text>
        <View style={{ width: 80 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <CreditCard size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Identity</Text>
          </View>
          <InfoItem label="Full Name" value={extendedStudentInfo.name} colors={colors} />
          <InfoItem label="University ID" value={extendedStudentInfo.ritId} colors={colors} />
          <InfoItem label="Date of Birth" value={extendedStudentInfo.dob} colors={colors} last />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <Briefcase size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Academic Profile</Text>
          </View>
          <InfoItem label="College" value={extendedStudentInfo.college} colors={colors} />
          <InfoItem label="Major" value={extendedStudentInfo.major} colors={colors} />
          <InfoItem label="Status" value={extendedStudentInfo.status} colors={colors} last />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <Phone size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Contact Details</Text>
          </View>
          <InfoItem label="RIT Email" value={extendedStudentInfo.email} colors={colors} />
          <InfoItem label="Mobile Phone" value={extendedStudentInfo.phone} colors={colors} last />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <MapPin size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Addresses</Text>
          </View>
          <InfoItem label="Campus Address" value={extendedStudentInfo.campusAddress} colors={colors} />
          <InfoItem label="Home Address" value={extendedStudentInfo.homeAddress} colors={colors} last />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <AlertCircle size={20} color={colors.error} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Emergency Contact</Text>
          </View>
          <InfoItem label="Name" value={extendedStudentInfo.emergencyContact.name} colors={colors} />
          <InfoItem label="Relationship" value={extendedStudentInfo.emergencyContact.relation} colors={colors} />
          <InfoItem label="Phone" value={extendedStudentInfo.emergencyContact.phone} colors={colors} last />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );

  const renderPrivacySecurity = () => (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.subPageHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>Profile</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy & Security</Text>
        <View style={{ width: 80 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>SECURITY</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity style={[styles.actionItem, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
            <View style={styles.actionItemLeft}>
              <Lock size={20} color={colors.text} />
              <Text style={[styles.actionItemText, { color: colors.text }]}>Change Password</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionItemLeft}>
              <Shield size={20} color={colors.text} />
              <Text style={[styles.actionItemText, { color: colors.text }]}>Two-Factor Authentication</Text>
            </View>
            <View style={styles.badgeContainer}>
               <Text style={[styles.badgeText, { color: colors.success }]}>On</Text>
               <ChevronRight size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: 24 }]}>PRIVACY</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.toggleItem, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
            <View style={styles.toggleItemLeft}>
              <Eye size={20} color={colors.text} />
              <View>
                <Text style={[styles.toggleItemText, { color: colors.text }]}>Public Profile</Text>
                <Text style={[styles.toggleItemSub, { color: colors.textSecondary }]}>Allow others to find you</Text>
              </View>
            </View>
            <Switch 
              value={isProfilePublic} 
              onValueChange={setIsProfilePublic} 
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          
          <View style={[styles.toggleItem, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
            <View style={styles.toggleItemLeft}>
              <View style={{width: 20}} /> 
              <View>
                <Text style={[styles.toggleItemText, { color: colors.text }]}>Online Status</Text>
                <Text style={[styles.toggleItemSub, { color: colors.textSecondary }]}>Show when you're active</Text>
              </View>
            </View>
            <Switch 
              value={showOnlineStatus} 
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.toggleItem}>
            <View style={styles.toggleItemLeft}>
              <FileText size={20} color={colors.text} />
              <View>
                <Text style={[styles.toggleItemText, { color: colors.text }]}>Data Sharing</Text>
                <Text style={[styles.toggleItemSub, { color: colors.textSecondary }]}>Share analytics with RIT</Text>
              </View>
            </View>
            <Switch 
              value={dataSharing} 
              onValueChange={setDataSharing}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderHelpSupport = () => (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.subPageHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>Profile</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
        <View style={{ width: 80 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Contact Support Section */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <MessageCircle size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Contact Support</Text>
          </View>
          <View style={styles.staticInfoItem}>
             <Text style={[styles.staticInfoLabel, { color: colors.textSecondary }]}>Website</Text>
             <Text style={[styles.staticInfoValue, { color: colors.text }]}>https://help.rit.edu/</Text>
          </View>
          <View style={styles.staticInfoItem}>
             <Text style={[styles.staticInfoLabel, { color: colors.textSecondary }]}>Email</Text>
             <Text style={[styles.staticInfoValue, { color: colors.text }]}>dubai@rit.edu</Text>
          </View>
           <View style={styles.staticInfoItem}>
             <Text style={[styles.staticInfoLabel, { color: colors.textSecondary }]}>Phone</Text>
             <Text style={[styles.staticInfoValue, { color: colors.text }]}>043712000</Text>
          </View>
           <View style={styles.staticInfoItem}>
             <Text style={[styles.staticInfoLabel, { color: colors.textSecondary }]}>Hours</Text>
             <Text style={[styles.staticInfoValue, { color: colors.text }]}>Mondays - Thursdays: 7:30am - 9:00pm EST</Text>
          </View>
        </View>

        {/* FAQs Section */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <HelpCircle size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
          </View>
          <View style={[styles.staticInfoItem, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
             <Text style={[styles.faqQuestion, { color: colors.text }]}>How do I reset my password?</Text>
             <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>Go to Privacy & Security {'>'} Change Password to update your credentials.</Text>
          </View>
          <View style={[styles.staticInfoItem, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
             <Text style={[styles.faqQuestion, { color: colors.text }]}>Where can I find my grades?</Text>
             <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>Navigate to the MyCourses tab, select a course, and tap on the 'Grades' section.</Text>
          </View>
           <View style={styles.staticInfoItem}>
             <Text style={[styles.faqQuestion, { color: colors.text }]}>How do I contact an advisor?</Text>
             <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>Go to the SIS tab, select 'Starfish', and choose an advisor to book an appointment.</Text>
          </View>
        </View>

        {/* RIT Service Center Section */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <View style={[styles.infoRowHeader, { borderBottomColor: colors.border }]}>
            <LifeBuoy size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>RIT Service Center</Text>
          </View>
          <View style={styles.staticInfoItem}>
             <Text style={[styles.staticInfoValue, { color: colors.text }]}>
                Visit help.rit.edu for comprehensive guides, service status updates, and to submit support tickets directly to ITS.
             </Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: 24 }]}>ABOUT</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border, padding: 16 }]}>
            <Text style={[styles.aboutText, { color: colors.text }]}>RIT Student Mobile App</Text>
            <Text style={[styles.aboutSub, { color: colors.textSecondary }]}>Version 1.0.0 (Build 245)</Text>
            <Text style={[styles.aboutSub, { color: colors.textSecondary, marginTop: 12 }]}>
               Designed to help students manage their academic life at Rochester Institute of Technology.
            </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );

  const renderMainProfile = () => (
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
            onPress={() => setCurrentView('personalInfo')}
          />
          <MenuItem
            icon={<Lock size={20} color={colors.text} />}
            label="Privacy & Security"
            colors={colors}
            onPress={() => setCurrentView('privacy')}
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
            onPress={() => setCurrentView('help')}
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

  switch (currentView) {
      case 'personalInfo': return renderPersonalInfo();
      case 'privacy': return renderPrivacySecurity();
      case 'help': return renderHelpSupport();
      default: return renderMainProfile();
  }
}

const InfoItem = ({ label, value, colors, last = false }) => (
  <View style={[styles.infoItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

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
  onPress,
  last = false,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    activeOpacity={0.7}
    onPress={onPress}
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
  
  // Sub Page Styles
  subPageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 80,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  infoRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoItem: {
    padding: 16,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  toggleItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  toggleItemSub: {
    fontSize: 13,
  },
  aboutText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutSub: {
    fontSize: 14,
    textAlign: 'center',
  },
  staticInfoItem: {
    padding: 16,
  },
  staticInfoLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  staticInfoValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
});