import {
    BookOpen,
    Users,
    UsersRound,
    ClipboardList,
    GraduationCap,
    UserCheck,
    Bookmark,
    FileText,
} from "lucide-react-native";

export const contentData = [
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark, type: "static" },
];

export const moduleData = [
    { id: "books", label: "Books", status: "completed", items: [] },
    {
        id: "w1",
        label: "Week 01",
        status: "completed",
        progress: { completed: 2, total: 2 },
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
            },
        ],
    },

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

export const classlistData = [
    {
        id: "1",
        name: "Akshaj Bitla",
        username: "ab4138",
        email: "ab4138@rit.edu",
    },
    {
        id: "2",
        name: "Almaz Alikhan",
        username: "aa3859",
        email: "aa3859@rit.edu",
    },
    {
        id: "3",
        name: "Amaan Amjad Khan",
        username: "aa3394",
        email: "aa3394@rit.edu",
    },
    {
        id: "4",
        name: "Ashton Pinto",
        username: "ap5476",
        email: "ap5476@rit.edu",
    },
    {
        id: "5",
        name: "Dimash Aidarbek",
        username: "da9990",
        email: "da9990@rit.edu",
    },
    {
        id: "6",
        name: "Fazilah Syed",
        username: "fs4723",
        email: "fs4723@rit.edu",
    },
    {
        id: "7",
        name: "Hasan Alam",
        username: "ha4402",
        email: "ha4402@rit.edu",
    },
    {
        id: "8",
        name: "Hashim Mohammed",
        username: "hhh8898",
        email: "hhh8898@rit.edu",
    },
    {
        id: "9",
        name: "Jamile Obeid",
        username: "jo4065",
        email: "jo4065@rit.edu",
    },
    {
        id: "10",
        name: "Jason Ivan Panganiban",
        username: "jp2236",
        email: "jp2236@rit.edu",
    },
    {
        id: "11",
        name: "Kelvin Jebastine Kingsly Daniel",
        username: "kj7411",
        email: "kj7411@rit.edu",
    },
    {
        id: "12",
        name: "Khalil Al Hussaeni",
        username: "kxacad",
        email: "kxacad@rit.edu",
    },
    {
        id: "13",
        name: "Kripa Susan Jacob",
        username: "ks2221",
        email: "ks2221@rit.edu",
    },
    {
        id: "14",
        name: "Lana Kendakji",
        username: "lk3501",
        email: "lk3501@rit.edu",
    },
    {
        id: "15",
        name: "Leen Abhari",
        username: "lha1823",
        email: "lha1823@rit.edu",
    },
    {
        id: "16",
        name: "Leen Alamm",
        username: "lma1558",
        email: "lma1558@rit.edu",
    },
    {
        id: "17",
        name: "Malak Alqaryouti",
        username: "moa7566",
        email: "moa7566@rit.edu",
    },
    {
        id: "18",
        name: "Nihar Gandhi",
        username: "nng9982",
        email: "nng9982@rit.edu",
    },
    {
        id: "19",
        name: "Nishok Arunjothi",
        username: "na3189",
        email: "na3189@rit.edu",
    },
    {
        id: "20",
        name: "Praislin Peter",
        username: "pp8489",
        email: "pp8489@rit.edu",
    },
    {
        id: "21",
        name: "Sandhli Arora",
        username: "sa3307",
        email: "sa3307@rit.edu",
    },
    {
        id: "22",
        name: "Sara Hijazi",
        username: "sh9570",
        email: "sh9570@rit.edu",
    },
    {
        id: "23",
        name: "Shaik Nadia Tabassum",
        username: "st9744",
        email: "st9744@rit.edu",
    },
    {
        id: "24",
        name: "Shiza Shaheem",
        username: "ss6719",
        email: "ss6719@rit.edu",
    },
    {
        id: "25",
        name: "Simrah Shabandri",
        username: "srs8745",
        email: "srs8745@rit.edu",
    },
    {
        id: "26",
        name: "Syed Wasti",
        username: "saw7340",
        email: "saw7340@rit.edu",
    },
    {
        id: "27",
        name: "Tanmay Patil",
        username: "tnp1210",
        email: "tnp1210@rit.edu",
    },
    {
        id: "28",
        name: "Zara Mahreen",
        username: "zm3057",
        email: "zm3057@rit.edu",
    },
];

export const groupsData = {
    groups: [
        { id: "g7", name: "Group 7", members: "3/3 (Full)", assignment: "6" },
    ],
    sections: [
        {
            id: "s1",
            name: "ISTE260601.2251DU1 DesigningTheUserExperience",
            members: "27/999",
            assignment: null,
        },
    ],
};

export const homeworkData = [
    {
        id: "hw1",
        title: "Group 7: Homework 1",
        dueDate: "Sep 16, 2025 11:30 PM",
        attachment: "Homework1.pdf (221.64 KB)",
        status: "1 Submission, 1 File",
        score: "90 / 100",
    },
    {
        id: "hw2",
        title: "Group 7: Homework 2",
        dueDate: "Oct 9, 2025 11:30 PM",
        attachment: "Homework2.pdf (185.85 KB)",
        status: "1 Submission, 1 File",
        score: "100 / 100",
        extra: "Ends December 25",
    },
    {
        id: "hw3",
        title: "Group 7: Homework 3",
        dueDate: "Nov 18, 2025 11:30 PM",
        attachment: "Homework3.pdf (164.96 KB)",
        status: "1 Submission, 1 File",
        score: "- / 100",
    },
    {
        id: "hw4",
        title: "Group 7: Homework 4",
        dueDate: "Nov 20, 2025 11:59 PM",
        attachment: "Homework4.pdf (501.02 KB)",
        status: "1 Submission, 1 File",
        score: "- / 100",
    },
];

export const gradesData = {
    final: { weightAchieved: "44 / 100" },
    items: [
        {
            id: "cat1",
            type: "category",
            name: "Homeworks",
            weightAchieved: "19 / 40",
        },
        {
            id: "g1",
            type: "item",
            name: "Homework 1",
            points: "90 / 100",
            weightAchieved: "9 / 10",
        },
        {
            id: "g2",
            type: "item",
            name: "Homework 2",
            points: "100 / 100",
            weightAchieved: "10 / 10",
        },
        {
            id: "g3",
            type: "item",
            name: "Homework 3",
            points: "0 / 100",
            weightAchieved: "0 / 10",
        },
        {
            id: "g4",
            type: "item",
            name: "Homework 4",
            points: "0 / 100",
            weightAchieved: "0 / 10",
        },
        {
            id: "cat2",
            type: "category",
            name: "Quizzes",
            weightAchieved: "7.5 / 10",
        },
        {
            id: "g5",
            type: "item",
            name: "Quiz 1",
            points: "0.7 / 1",
            weightAchieved: "3.5 / 5",
        },
        {
            id: "g6",
            type: "item",
            name: "Quiz 2",
            points: "24 / 30",
            weightAchieved: "4 / 5",
        },
        {
            id: "cat3",
            type: "category",
            name: "Exams",
            weightAchieved: "17.5 / 25",
        },
        {
            id: "g7",
            type: "item",
            name: "Midterm",
            points: "70 / 100",
            weightAchieved: "17.5 / 25",
        },
    ],
};

export const attendanceData = {
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
    ],
};

export const menuItems = [
    { id: "content", label: "Content", icon: BookOpen },
    { id: "classlist", label: "Classlist", icon: Users },
    { id: "groups", label: "Groups", icon: UsersRound },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "grades", label: "Grades", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: UserCheck },
];
