
import { supabase } from "./supabase.js";

/* =========================================
   coreI — ADMIN DASHBOARD
   Community, Reading Space and Support
========================================= */


/* =========================================
   1. PAGE ELEMENTS
========================================= */

// Main page
const loadingScreen = document.getElementById("adminLoading");
const adminApp = document.getElementById("adminApp");
const globalMessage = document.getElementById("globalMessage");

// Navigation
const pageTitle = document.getElementById("pageTitle");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

const navigationButtons = document.querySelectorAll("[data-section]");
const quickNavigationButtons = document.querySelectorAll("[data-go]");

// Main buttons
const themeToggleButton = document.getElementById("themeToggleButton");
const settingsThemeButton = document.getElementById("settingsThemeButton");
const refreshButton = document.getElementById("refreshButton");

const logoutButtons = [
    document.getElementById("logoutButton"),
    document.getElementById("sidebarLogoutButton"),
    document.getElementById("settingsLogoutButton")
].filter(Boolean);


// Overview
const totalMembersCount = document.getElementById("totalMembersCount");
const totalIdeasCount = document.getElementById("totalIdeasCount");
const publishedAnnouncementsCount =
    document.getElementById("publishedAnnouncementsCount");

const pendingCount = document.getElementById("pendingCount");
const overviewPending = document.getElementById("overviewPending");
const overviewApproved = document.getElementById("overviewApproved");
const overviewRejected = document.getElementById("overviewRejected");

const sidebarPendingCount = document.getElementById("sidebarPendingCount");
const overviewActivity = document.getElementById("overviewActivity");

const totalSupportIssuesCount =
    document.getElementById("totalSupportIssuesCount");

const overviewSupportIssues =
    document.getElementById("overviewSupportIssues");


// Members
const membersList = document.getElementById("membersList");
const memberSearch = document.getElementById("memberSearch");
const memberFilter = document.getElementById("memberFilter");


// Announcements
const announcementForm = document.getElementById("announcementForm");
const announcementTitle = document.getElementById("announcementTitle");
const announcementDescription =
    document.getElementById("announcementDescription");

const announcementEditId = document.getElementById("announcementEditId");
const announcementMessage = document.getElementById("announcementMessage");
const announcementFormHeading =
    document.getElementById("announcementFormHeading");

const publishAnnouncementButton =
    document.getElementById("publishAnnouncementButton");

const cancelAnnouncementEdit =
    document.getElementById("cancelAnnouncementEdit");

const announcementsList = document.getElementById("announcementsList");


// Ideas
const ideasList = document.getElementById("ideasList");
const ideaSearch = document.getElementById("ideaSearch");


// Notifications
const notificationForm = document.getElementById("notificationForm");
const notificationTitle = document.getElementById("notificationTitle");

const notificationMessageInput =
    document.getElementById("notificationMessage");

const notificationStatus = document.getElementById("notificationStatus");
const notificationRecipient =
    document.getElementById("notificationRecipient");

const sendNotificationButton =
    document.getElementById("sendNotificationButton");


// Activity
const activityList = document.getElementById("activityList");


// Analytics
const analyticsMembers = document.getElementById("analyticsMembers");
const analyticsIdeas = document.getElementById("analyticsIdeas");

const analyticsAnnouncements =
    document.getElementById("analyticsAnnouncements");

const weeklyChart = document.getElementById("weeklyChart");


// Password settings
const passwordForm = document.getElementById("passwordForm");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");

const updatePasswordButton =
    document.getElementById("updatePasswordButton");


// Theme settings
const adminThemePreference =
    document.getElementById("adminThemePreference");

const themePreferenceMessage =
    document.getElementById("themePreferenceMessage");


// Support navigation and statistics
const sidebarSupportCount =
    document.getElementById("sidebarSupportCount");

const supportTotalCount =
    document.getElementById("supportTotalCount");

const supportPendingCount =
    document.getElementById("supportPendingCount");

const supportProgressCount =
    document.getElementById("supportProgressCount");

const supportResolvedCount =
    document.getElementById("supportResolvedCount");


// Support search and filters
const supportIssuesList =
    document.getElementById("supportIssuesList");

const supportSearch =
    document.getElementById("supportSearch");

const supportStatusFilter =
    document.getElementById("supportStatusFilter");

const supportCategoryFilter =
    document.getElementById("supportCategoryFilter");

const refreshSupportIssues =
    document.getElementById("refreshSupportIssues");


// Support details
const supportIssueDetails =
    document.getElementById("supportIssueDetails");

const supportIssueDetailSubject =
    document.getElementById("supportIssueDetailSubject");

const supportIssueDetailStatus =
    document.getElementById("supportIssueDetailStatus");

const supportIssueMember =
    document.getElementById("supportIssueMember");

const supportIssueCategory =
    document.getElementById("supportIssueCategory");

const supportIssueDate =
    document.getElementById("supportIssueDate");

const supportIssueDescription =
    document.getElementById("supportIssueDescription");

const supportResponseForm =
    document.getElementById("supportResponseForm");

const supportIssueId =
    document.getElementById("supportIssueId");

const supportIssueStatus =
    document.getElementById("supportIssueStatus");

const supportAdminReply =
    document.getElementById("supportAdminReply");

const supportIssueMessage =
    document.getElementById("supportIssueMessage");

const saveSupportResponseButton =
    document.getElementById("saveSupportResponseButton");

const cancelSupportDetails =
    document.getElementById("cancelSupportDetails");


// Reading Space
const sidebarReadingPendingCount =
    document.getElementById("sidebarReadingPendingCount");

const readingTotalCount =
    document.getElementById("readingTotalCount");

const readingPendingCount =
    document.getElementById("readingPendingCount");

const readingPublishedCount =
    document.getElementById("readingPublishedCount");

const readingDraftCount =
    document.getElementById("readingDraftCount");

const readingFormHeading =
    document.getElementById("readingFormHeading");

const readingArticleForm =
    document.getElementById("readingArticleForm");

const readingArticleId =
    document.getElementById("readingArticleId");

const readingArticleTitle =
    document.getElementById("readingArticleTitle");

const readingArticleCategory =
    document.getElementById("readingArticleCategory");

const readingArticleLanguage =
    document.getElementById("readingArticleLanguage");

const readingArticleAuthor =
    document.getElementById("readingArticleAuthor");

const readingArticleEditor =
    document.getElementById("readingArticleEditor");

const readingArticleDescription =
    document.getElementById("readingArticleDescription");

const readingArticleCover =
    document.getElementById("readingArticleCover");

const readingArticleContent =
    document.getElementById("readingArticleContent");

const readingArticleSource =
    document.getElementById("readingArticleSource");

const readingArticlePublishedDate =
    document.getElementById("readingArticlePublishedDate");

const readingArticleFeatured =
    document.getElementById("readingArticleFeatured");

const readingArticleFormMessage =
    document.getElementById("readingArticleFormMessage");

const saveReadingDraftButton =
    document.getElementById("saveReadingDraftButton");

const publishReadingArticleButton =
    document.getElementById("publishReadingArticleButton");

const cancelReadingEditButton =
    document.getElementById("cancelReadingEditButton");

const newReadingArticleButton =
    document.getElementById("newReadingArticleButton");

const refreshReadingArticlesButton =
    document.getElementById("refreshReadingArticlesButton");

const readingArticleSearch =
    document.getElementById("readingArticleSearch");

const readingArticleStatusFilter =
    document.getElementById("readingArticleStatusFilter");

const readingArticleCategoryFilter =
    document.getElementById("readingArticleCategoryFilter");

const readingArticlesList =
    document.getElementById("readingArticlesList");


/* =========================================
   2. DASHBOARD DATA
========================================= */

let currentAdminId = null;

let allMembers = [];
let allIdeas = [];
let allAnnouncements = [];
let allSupportIssues = [];
let allReadingArticles = [];

let currentSupportIssue = null;

let currentSection = "overviewSection";
let dashboardStarted = false;

const SUPPORT_STATUSES = [
    "pending",
    "in_progress",
    "resolved"
];

const READING_STATUSES = [
    "draft",
    "pending",
    "published",
    "needs_revision",
    "rejected"
];

const READING_CATEGORIES = [
    "Love & Relationships",
    "Friendship & Family",
    "Life & Meaning",
    "Philosophy & Wisdom",
    "Personal Growth & Motivation",
    "Psychology & Emotions",
    "Technology & Innovation",
    "Science & Discovery",
    "History & Civilization",
    "World & Society",
    "Creativity & Imagination",
    "Education & Knowledge",
    "Nature & Environment",
    "Culture, Travel & Lifestyle"
];


/* =========================================
   3. GENERAL HELPERS
========================================= */

function setMessage(message, type = "") {
    if (!globalMessage) return;

    globalMessage.textContent = message;
    globalMessage.className = "global-message";

    if (type) globalMessage.classList.add(type);
}


function setFormMessage(element, message, type = "") {
    if (!element) return;

    element.textContent = message;
    element.className = "form-message";

    if (type) element.classList.add(type);
}


function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);

    if (className) element.className = className;

    if (text !== "") element.textContent = text;

    return element;
}


function formatDate(dateValue) {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


function formatDateTime(dateValue) {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });
}


function showEmptyState(container, message) {
    if (!container) return;

    container.replaceChildren(
        createElement("p", "empty-state", message)
    );
}


function getInitial(name) {
    return (name || "M").trim().charAt(0).toUpperCase();
}


function getErrorMessage(error) {
    return error?.message || "An unexpected error occurred.";
}


function formatStatus(status) {
    const names = {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        in_progress: "In progress",
        resolved: "Resolved",
        draft: "Draft",
        published: "Published",
        needs_revision: "Needs revision"
    };

    return names[status] || "Unknown";
}


function formatCategory(category) {
    const names = {
        technical: "Technical",
        account: "Account",
        bug: "Bug report",
        suggestion: "Suggestion",
        other: "Other"
    };

    return names[category] || "Other";
}


function isValidOptionalUrl(value) {
    if (!value) return true;

    try {
        const url = new URL(value);

        return (
            url.protocol === "https:" ||
            url.protocol === "http:"
        );
    } catch {
        return false;
    }
}


/* =========================================
   4. THEME SYSTEM
========================================= */

const THEME_KEY = "coreI-theme";

let systemThemeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
);


function getSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (["system", "light", "dark"].includes(savedTheme)) {
        return savedTheme;
    }

    return "system";
}


function getActualTheme(preference) {
    if (preference === "system") {
        return systemThemeQuery.matches ? "dark" : "light";
    }

    return preference;
}


function applyTheme(preference) {
    const actualTheme = getActualTheme(preference);
    const isDark = actualTheme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    document.documentElement.dataset.theme = actualTheme;

    if (themeToggleButton) {
        themeToggleButton.textContent = isDark ? "☀" : "◐";

        themeToggleButton.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggleButton.title =
            isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    if (adminThemePreference) {
        adminThemePreference.value = preference;
    }
}


function saveThemePreference(preference) {
    if (!["system", "light", "dark"].includes(preference)) {
        preference = "system";
    }

    localStorage.setItem(THEME_KEY, preference);
    applyTheme(preference);
}


function toggleTheme() {
    const actualTheme = getActualTheme(getSavedTheme());

    saveThemePreference(
        actualTheme === "dark" ? "light" : "dark"
    );

    if (adminThemePreference) {
        adminThemePreference.value = getSavedTheme();
    }

    setFormMessage(
        themePreferenceMessage,
        "Theme updated successfully.",
        "success"
    );
}


applyTheme(getSavedTheme());

systemThemeQuery.addEventListener("change", () => {
    if (getSavedTheme() === "system") {
        applyTheme("system");
    }
});

themeToggleButton?.addEventListener("click", toggleTheme);

settingsThemeButton?.addEventListener("click", () => {
    saveThemePreference(adminThemePreference?.value || "system");

    setFormMessage(
        themePreferenceMessage,
        "Your theme preference has been saved.",
        "success"
    );
});


/* =========================================
   5. ADMIN ACCESS VERIFICATION
========================================= */

async function checkAdminAccess() {
    try {
        const {
            data: userData,
            error: userError
        } = await supabase.auth.getUser();

        if (userError || !userData.user) {
            window.location.replace("./login.html");
            return false;
        }

        currentAdminId = userData.user.id;

        const {
            data: profile,
            error: profileError
        } = await supabase
            .from("profiles")
            .select("role, status")
            .eq("id", currentAdminId)
            .single();

        if (profileError || !profile) {
            console.error("Admin profile error:", profileError);
            window.location.replace("./login.html");
            return false;
        }

        if (
            profile.role !== "admin" ||
            profile.status !== "approved"
        ) {
            window.location.replace("./main.html");
            return false;
        }

        const {
            data: adminCheck,
            error: adminError
        } = await supabase.rpc("is_corei_admin");

        if (adminError || adminCheck !== true) {
            console.error("Admin verification failed:", adminError);
            window.location.replace("./main.html");
            return false;
        }

        return true;

    } catch (error) {
        console.error("Admin access error:", error);
        window.location.replace("./login.html");
        return false;
    }
}


/* =========================================
   6. PAGE NAVIGATION
========================================= */

const pageNames = {
    overviewSection: "Overview",
    membersSection: "Members",
    readingSection: "Reading Articles",
    supportIssuesSection: "Support Issues",
    announcementsSection: "Announcements",
    ideasSection: "Community ideas",
    notificationsSection: "Notifications",
    activitySection: "Activity",
    analyticsSection: "Analytics",
    settingsSection: "Settings"
};


function openSection(sectionId) {
    const target = document.getElementById(sectionId);

    if (
        !target ||
        !target.classList.contains("dashboard-section")
    ) {
        return;
    }

    currentSection = sectionId;

    document.querySelectorAll(".dashboard-section").forEach(section => {
        section.classList.remove("active");
    });

    target.classList.add("active");

    navigationButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.section === sectionId
        );
    });

    if (pageTitle) {
        pageTitle.textContent =
            pageNames[sectionId] || "Admin Dashboard";
    }

    sidebar?.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
        openSection(button.dataset.section);
    });
});


quickNavigationButtons.forEach(button => {
    button.addEventListener("click", () => {
        openSection(button.dataset.go);
    });
});


menuToggle?.addEventListener("click", () => {
    const isOpen = sidebar?.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(Boolean(isOpen))
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});


document.addEventListener("click", event => {
    if (
        window.innerWidth <= 760 &&
        sidebar?.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuToggle?.contains(event.target)
    ) {
        sidebar.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }
});


/* =========================================
   7. LOAD MEMBERS
========================================= */

async function loadMembers() {
    if (!currentAdminId) return;

    showEmptyState(membersList, "Loading members...");

    const { data, error } = await supabase
        .from("profiles")
        .select(`
            id,
            display_name,
            member_code,
            status,
            role,
            bio,
            avatar_url,
            created_at
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Member loading error:", error);

        showEmptyState(
            membersList,
            "Could not load members: " + error.message
        );

        throw error;
    }

    allMembers = (data || []).filter(
        member => member.role !== "admin"
    );

    updateMemberStatistics();
    displayMembers();
    updateNotificationRecipients();
}


function updateMemberStatistics() {
    const pending = allMembers.filter(
        member => member.status === "pending"
    ).length;

    const approved = allMembers.filter(
        member => member.status === "approved"
    ).length;

    const rejected = allMembers.filter(
        member => member.status === "rejected"
    ).length;

    if (totalMembersCount) totalMembersCount.textContent = allMembers.length;
    if (pendingCount) pendingCount.textContent = pending;
    if (overviewPending) overviewPending.textContent = pending;
    if (overviewApproved) overviewApproved.textContent = approved;
    if (overviewRejected) overviewRejected.textContent = rejected;
    if (sidebarPendingCount) sidebarPendingCount.textContent = pending;

    const pendingStat = document.getElementById("memberPendingStat");
    const approvedStat = document.getElementById("memberApprovedStat");
    const rejectedStat = document.getElementById("memberRejectedStat");

    if (pendingStat) pendingStat.textContent = pending;
    if (approvedStat) approvedStat.textContent = approved;
    if (rejectedStat) rejectedStat.textContent = rejected;
}


function displayMembers() {
    if (!membersList) return;

    membersList.replaceChildren();

    const filter = memberFilter?.value || "pending";
    const search = memberSearch?.value.trim().toLowerCase() || "";

    const filteredMembers = allMembers.filter(member => {
        const matchesFilter =
            filter === "all" || member.status === filter;

        const matchesSearch =
            (member.display_name || "").toLowerCase().includes(search) ||
            (member.member_code || "").toLowerCase().includes(search);

        return matchesFilter && matchesSearch;
    });

    if (filteredMembers.length === 0) {
        showEmptyState(
            membersList,
            "No members match your selected filter."
        );
        return;
    }

    filteredMembers.forEach(member => {
        const card = createElement("article", "member-card");
        const details = createElement("div", "member-details");

        const avatar = createElement(
            "div",
            "member-avatar",
            getInitial(member.display_name)
        );

        const info = createElement("div", "member-info");

        const name = createElement(
            "h3",
            "",
            member.display_name || "New member"
        );

        const date = createElement(
            "p",
            "",
            "Joined: " + formatDate(member.created_at)
        );

        const status = createElement(
            "span",
            "member-status " + (member.status || ""),
            formatStatus(member.status)
        );

        info.append(name, date, status);
        details.append(avatar, info);
        card.append(details);

        if (member.status === "pending") {
            const actions = createElement("div", "member-actions");

            const approveButton = createElement(
                "button",
                "approve-button",
                "✓ Approve"
            );

            const rejectButton = createElement(
                "button",
                "reject-button",
                "✕ Reject"
            );

            approveButton.type = "button";
            rejectButton.type = "button";

            approveButton.addEventListener("click", () => {
                updateMemberStatus(member.id, "approved");
            });

            rejectButton.addEventListener("click", () => {
                updateMemberStatus(member.id, "rejected");
            });

            actions.append(approveButton, rejectButton);
            card.append(actions);
        }

        membersList.append(card);
    });
}


memberSearch?.addEventListener("input", displayMembers);
memberFilter?.addEventListener("change", displayMembers);


/* =========================================
   8. APPROVE OR REJECT MEMBERS
========================================= */

async function updateMemberStatus(memberId, newStatus) {
    if (!["approved", "rejected"].includes(newStatus)) return;

    const member = allMembers.find(item => item.id === memberId);

    if (!member || member.status !== "pending") {
        setMessage(
            "This membership request is no longer pending.",
            "error"
        );

        await loadMembers();
        return;
    }

    const action = newStatus === "approved" ? "approve" : "reject";

    if (!window.confirm(
        `Are you sure you want to ${action} this member?`
    )) {
        return;
    }

    setMessage("Updating membership...");

    try {
        const { data, error } = await supabase.rpc(
            "admin_update_member_status",
            {
                p_member_id: memberId,
                p_new_status: newStatus
            }
        );

        if (error) throw error;

        if (data !== true) {
            setMessage(
                "The request was not changed. It may already have been updated.",
                "error"
            );

            await loadMembers();
            return;
        }

        setMessage(
            newStatus === "approved"
                ? "Member approved successfully."
                : "Membership request rejected successfully.",
            "success"
        );

        await loadMembers();

    } catch (error) {
        console.error("Membership update error:", error);

        setMessage(
            "Could not update membership: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   9. LOAD ANNOUNCEMENTS
========================================= */

async function loadAnnouncements() {
    if (!announcementsList) return;

    showEmptyState(announcementsList, "Loading announcements...");

    const { data, error } = await supabase
        .from("announcements")
        .select(`
            id,
            title,
            description,
            question,
            created_by,
            created_at,
            is_published
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Announcement loading error:", error);

        showEmptyState(
            announcementsList,
            "Could not load announcements: " + error.message
        );

        throw error;
    }

    allAnnouncements = data || [];

    displayAnnouncements();
    updateAnnouncementStatistics();
}


function updateAnnouncementStatistics() {
    const published = allAnnouncements.filter(
        item => item.is_published === true
    ).length;

    if (publishedAnnouncementsCount) {
        publishedAnnouncementsCount.textContent = published;
    }

    if (analyticsAnnouncements) {
        analyticsAnnouncements.textContent = published;
    }
}


/* =========================================
   10. DISPLAY ANNOUNCEMENTS
========================================= */

function displayAnnouncements() {
    if (!announcementsList) return;

    announcementsList.replaceChildren();

    if (allAnnouncements.length === 0) {
        showEmptyState(
            announcementsList,
            "No announcements have been created yet."
        );
        return;
    }

    allAnnouncements.forEach(item => {
        const card = createElement("article", "content-card");

        const title = createElement(
            "h3",
            "",
            item.title || "Untitled announcement"
        );

        const description = createElement(
            "p",
            "",
            item.description || ""
        );

        const date = createElement(
            "div",
            "content-meta",
            "Created: " + formatDateTime(item.created_at)
        );

        const status = createElement(
            "span",
            "content-status",
            item.is_published ? "Published" : "Unpublished"
        );

        const actions = createElement("div", "content-actions");

        const editButton = createElement("button", "", "Edit");

        const toggleButton = createElement(
            "button",
            "",
            item.is_published ? "Unpublish" : "Publish"
        );

        const deleteButton = createElement(
            "button",
            "delete-button",
            "Delete"
        );

        editButton.type = "button";
        toggleButton.type = "button";
        deleteButton.type = "button";

        editButton.addEventListener("click", () => editAnnouncement(item));
        toggleButton.addEventListener("click", () => toggleAnnouncement(item));
        deleteButton.addEventListener("click", () => deleteAnnouncement(item));

        actions.append(editButton, toggleButton, deleteButton);
        card.append(title, description, date, status, actions);

        announcementsList.append(card);
    });
}


/* =========================================
   11. CREATE OR EDIT ANNOUNCEMENT
========================================= */

function resetAnnouncementForm() {
    announcementForm?.reset();

    if (announcementEditId) announcementEditId.value = "";

    if (announcementFormHeading) {
        announcementFormHeading.textContent = "New announcement";
    }

    if (publishAnnouncementButton) {
        publishAnnouncementButton.textContent = "Publish announcement";
    }

    if (cancelAnnouncementEdit) cancelAnnouncementEdit.hidden = true;

    setFormMessage(announcementMessage, "");
}


function editAnnouncement(item) {
    if (
        !announcementEditId ||
        !announcementTitle ||
        !announcementDescription
    ) return;

    announcementEditId.value = item.id;
    announcementTitle.value = item.title || "";
    announcementDescription.value = item.description || "";

    announcementFormHeading.textContent = "Edit announcement";
    publishAnnouncementButton.textContent = "Save changes";
    cancelAnnouncementEdit.hidden = false;

    openSection("announcementsSection");
    announcementTitle.focus();
}


cancelAnnouncementEdit?.addEventListener("click", resetAnnouncementForm);


announcementForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const title = announcementTitle.value.trim();
    const description = announcementDescription.value.trim();
    const editingId = announcementEditId.value;

    if (!title || !description) {
        setFormMessage(
            announcementMessage,
            "Please enter a title and description.",
            "error"
        );
        return;
    }

    publishAnnouncementButton.disabled = true;
    publishAnnouncementButton.textContent = "Saving...";

    try {
        let result;

        if (editingId) {
            result = await supabase
                .from("announcements")
                .update({ title, description })
                .eq("id", editingId);
        } else {
            result = await supabase
                .from("announcements")
                .insert({
                    title,
                    description,
                    question: "",
                    created_by: currentAdminId,
                    is_published: true
                });
        }

        if (result.error) throw result.error;

        resetAnnouncementForm();

        setFormMessage(
            announcementMessage,
            editingId
                ? "Announcement updated successfully."
                : "Announcement published successfully.",
            "success"
        );

        await loadAnnouncements();

    } catch (error) {
        console.error("Announcement save error:", error);

        setFormMessage(
            announcementMessage,
            "Could not save announcement: " + getErrorMessage(error),
            "error"
        );

    } finally {
        publishAnnouncementButton.disabled = false;

        publishAnnouncementButton.textContent =
            announcementEditId.value
                ? "Save changes"
                : "Publish announcement";
    }
});


/* =========================================
   12. PUBLISH / UNPUBLISH ANNOUNCEMENT
========================================= */

async function toggleAnnouncement(item) {
    const nextStatus = !item.is_published;
    const action = nextStatus ? "publish" : "unpublish";

    if (!window.confirm(
        `Are you sure you want to ${action} this announcement?`
    )) return;

    try {
        const { error } = await supabase
            .from("announcements")
            .update({ is_published: nextStatus })
            .eq("id", item.id);

        if (error) throw error;

        setMessage(
            nextStatus
                ? "Announcement published."
                : "Announcement unpublished.",
            "success"
        );

        await loadAnnouncements();

    } catch (error) {
        console.error("Announcement status error:", error);

        setMessage(
            "Could not update announcement: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   13. DELETE ANNOUNCEMENT
========================================= */

async function deleteAnnouncement(item) {
    if (!window.confirm(
        `Delete "${item.title}" permanently? This cannot be undone.`
    )) return;

    try {
        const { error } = await supabase
            .from("announcements")
            .delete()
            .eq("id", item.id);

        if (error) throw error;

        setMessage("Announcement deleted successfully.", "success");

        await loadAnnouncements();

    } catch (error) {
        console.error("Announcement delete error:", error);

        setMessage(
            "Could not delete announcement: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   14. LOAD IDEAS
========================================= */

async function loadIdeas() {
    if (!ideasList) return;

    showEmptyState(ideasList, "Loading community ideas...");

    const { data, error } = await supabase
        .from("ideas")
        .select(`
            id,
            title,
            content,
            member_id,
            created_at,
            profiles!ideas_member_id_fkey (
                display_name
            )
        `)
        .order("created_at", { ascending: false })
        .limit(100);

    if (error) {
        console.error("Ideas loading error:", error);

        showEmptyState(
            ideasList,
            "Could not load ideas: " + error.message
        );

        throw error;
    }

    allIdeas = data || [];

    if (totalIdeasCount) totalIdeasCount.textContent = allIdeas.length;
    if (analyticsIdeas) analyticsIdeas.textContent = allIdeas.length;

    displayIdeas();
}


/* =========================================
   15. DISPLAY IDEAS
========================================= */

function displayIdeas() {
    if (!ideasList) return;

    ideasList.replaceChildren();

    const search = ideaSearch?.value.trim().toLowerCase() || "";

    const filteredIdeas = allIdeas.filter(item => {
        return (
            (item.title || "").toLowerCase().includes(search) ||
            (item.content || "").toLowerCase().includes(search) ||
            (item.profiles?.display_name || "").toLowerCase().includes(search)
        );
    });

    if (filteredIdeas.length === 0) {
        showEmptyState(ideasList, "No matching ideas were found.");
        return;
    }

    filteredIdeas.forEach(item => {
        const card = createElement("article", "content-card");

        const title = createElement(
            "h3",
            "",
            item.title || "Untitled idea"
        );

        const content = createElement("p", "", item.content || "");

        const author = item.profiles?.display_name || "Member";

        const meta = createElement(
            "div",
            "content-meta",
            "Shared by " + author + " · " + formatDateTime(item.created_at)
        );

        const actions = createElement("div", "content-actions");

        const deleteButton = createElement(
            "button",
            "delete-button",
            "Delete idea"
        );

        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => deleteIdea(item));

        actions.append(deleteButton);
        card.append(title, content, meta, actions);

        ideasList.append(card);
    });
}


ideaSearch?.addEventListener("input", displayIdeas);


/* =========================================
   16. DELETE IDEA
========================================= */

async function deleteIdea(item) {
    if (!window.confirm(
        `Delete the idea "${item.title}" permanently?`
    )) return;

    try {
        const { error } = await supabase
            .from("ideas")
            .delete()
            .eq("id", item.id);

        if (error) throw error;

        setMessage("Idea deleted successfully.", "success");

        await loadIdeas();

    } catch (error) {
        console.error("Idea deletion error:", error);

        setMessage(
            "Could not delete idea: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   17. NOTIFICATION RECIPIENTS
========================================= */

function updateNotificationRecipients() {
    if (!notificationRecipient) return;

    const previousValue = notificationRecipient.value;

    notificationRecipient.replaceChildren();

    const allOption = createElement(
        "option",
        "",
        "All approved members"
    );

    allOption.value = "all";
    notificationRecipient.append(allOption);

    const approvedMembers = allMembers.filter(
        member => member.status === "approved"
    );

    approvedMembers.forEach(member => {
        const option = createElement(
            "option",
            "",
            member.display_name || "Member"
        );

        option.value = member.id;
        notificationRecipient.append(option);
    });

    const stillExists = Array.from(
        notificationRecipient.options
    ).some(option => option.value === previousValue);

    if (stillExists) {
        notificationRecipient.value = previousValue;
    }
}


/* =========================================
   18. SEND NOTIFICATIONS
========================================= */

notificationForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const title = notificationTitle.value.trim();
    const message = notificationMessageInput.value.trim();

    if (!title || !message) {
        setFormMessage(
            notificationStatus,
            "Please enter a notification title and message.",
            "error"
        );
        return;
    }

    const approvedMembers = allMembers.filter(
        member => member.status === "approved"
    );

    if (approvedMembers.length === 0) {
        setFormMessage(
            notificationStatus,
            "There are no approved members to notify.",
            "error"
        );
        return;
    }

    const recipient = notificationRecipient.value;

    const recipients = recipient === "all"
        ? approvedMembers
        : approvedMembers.filter(member => member.id === recipient);

    if (recipients.length === 0) {
        setFormMessage(
            notificationStatus,
            "No valid recipients were found.",
            "error"
        );
        return;
    }

    if (!window.confirm(
        `Send this notification to ${recipients.length} member(s)?`
    )) return;

    sendNotificationButton.disabled = true;
    sendNotificationButton.textContent = "Sending...";

    try {
        const notificationRows = recipients.map(member => ({
            user_id: member.id,
            title,
            message,
            type: "announcement",
            is_read: false
        }));

        const { error } = await supabase
            .from("notifications")
            .insert(notificationRows);

        if (error) throw error;

        notificationForm.reset();

        setFormMessage(
            notificationStatus,
            `Notification sent to ${recipients.length} member(s).`,
            "success"
        );

    } catch (error) {
        console.error("Notification sending error:", error);

        setFormMessage(
            notificationStatus,
            "Could not send notifications: " + getErrorMessage(error),
            "error"
        );

    } finally {
        sendNotificationButton.disabled = false;
        sendNotificationButton.textContent = "Send notification";
    }
});


/* =========================================
   19. SUPPORT ISSUE SYSTEM
========================================= */

async function loadSupportIssues() {
    if (!supportIssuesList) return;

    showEmptyState(supportIssuesList, "Loading support issues...");

    const { data, error } = await supabase
        .from("support_issues")
        .select(`
            id,
            member_id,
            subject,
            category,
            description,
            status,
            admin_reply,
            created_at,
            updated_at
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Support issue loading error:", error);

        showEmptyState(
            supportIssuesList,
            "Could not load support issues: " + error.message
        );

        throw error;
    }

    const issues = data || [];

    const memberIds = [
        ...new Set(issues.map(issue => issue.member_id).filter(Boolean))
    ];

    let profilesById = {};

    if (memberIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
            .from("profiles")
            .select("id, display_name, member_code")
            .in("id", memberIds);

        if (profilesError) {
            console.error("Support member information error:", profilesError);
        } else {
            profilesById = Object.fromEntries(
                (profiles || []).map(profile => [
                    profile.id,
                    profile
                ])
            );
        }
    }

    allSupportIssues = issues.map(issue => ({
        ...issue,
        memberProfile: profilesById[issue.member_id] || null
    }));

    updateSupportStatistics();
    displaySupportIssues();
    displayOverviewSupportIssues();
}


function updateSupportStatistics() {
    const total = allSupportIssues.length;

    const pending = allSupportIssues.filter(
        issue => issue.status === "pending"
    ).length;

    const inProgress = allSupportIssues.filter(
        issue => issue.status === "in_progress"
    ).length;

    const resolved = allSupportIssues.filter(
        issue => issue.status === "resolved"
    ).length;

    if (totalSupportIssuesCount) totalSupportIssuesCount.textContent = total;
    if (supportTotalCount) supportTotalCount.textContent = total;
    if (supportPendingCount) supportPendingCount.textContent = pending;
    if (supportProgressCount) supportProgressCount.textContent = inProgress;
    if (supportResolvedCount) supportResolvedCount.textContent = resolved;

    if (sidebarSupportCount) {
        sidebarSupportCount.textContent = pending + inProgress;
    }
}


function displaySupportIssues() {
    if (!supportIssuesList) return;

    supportIssuesList.replaceChildren();

    const search = supportSearch?.value.trim().toLowerCase() || "";
    const statusFilter = supportStatusFilter?.value || "all";
    const categoryFilter = supportCategoryFilter?.value || "all";

    const filteredIssues = allSupportIssues.filter(issue => {
        const matchesSearch =
            (issue.subject || "").toLowerCase().includes(search) ||
            (issue.description || "").toLowerCase().includes(search) ||
            (issue.memberProfile?.display_name || "").toLowerCase().includes(search) ||
            (issue.memberProfile?.member_code || "").toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "all" || issue.status === statusFilter;

        const matchesCategory =
            categoryFilter === "all" || issue.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (filteredIssues.length === 0) {
        showEmptyState(
            supportIssuesList,
            "No support issues match your search or filters."
        );
        return;
    }

    filteredIssues.forEach(issue => {
        const card = createElement(
            "article",
            "content-card support-issue-card"
        );

        const heading = createElement("div", "support-issue-heading");
        const titleArea = createElement("div");

        const title = createElement(
            "h3",
            "",
            issue.subject || "Untitled issue"
        );

        const memberName =
            issue.memberProfile?.display_name || "Member";

        const memberCode =
            issue.memberProfile?.member_code || "Code unavailable";

        const member = createElement(
            "p",
            "content-meta",
            memberName + " · " + memberCode
        );

        titleArea.append(title, member);

        const status = createElement(
            "span",
            "status-badge " + (issue.status || "pending"),
            formatStatus(issue.status)
        );

        heading.append(titleArea, status);

        const description = createElement(
            "p",
            "support-card-description",
            issue.description || "No description provided."
        );

        const metadata = createElement(
            "div",
            "content-meta",
            formatCategory(issue.category) +
            " · " +
            formatDateTime(issue.created_at)
        );

        const actions = createElement("div", "content-actions");

        const viewButton = createElement(
            "button",
            "primary-button",
            "View and respond"
        );

        viewButton.type = "button";
        viewButton.addEventListener("click", () => openSupportIssue(issue.id));

        actions.append(viewButton);
        card.append(heading, description, metadata, actions);

        supportIssuesList.append(card);
    });
}


function displayOverviewSupportIssues() {
    if (!overviewSupportIssues) return;

    overviewSupportIssues.replaceChildren();

    const recentIssues = allSupportIssues.slice(0, 5);

    if (recentIssues.length === 0) {
        showEmptyState(
            overviewSupportIssues,
            "There are no support issues yet."
        );
        return;
    }

    recentIssues.forEach(issue => {
        const item = createElement(
            "article",
            "content-card support-overview-item"
        );

        const information = createElement("div");

        const title = createElement(
            "h3",
            "",
            issue.subject || "Untitled issue"
        );

        const memberName =
            issue.memberProfile?.display_name || "Member";

        const details = createElement(
            "p",
            "content-meta",
            memberName + " · " + formatDate(issue.created_at)
        );

        information.append(title, details);

        const status = createElement(
            "span",
            "status-badge " + (issue.status || "pending"),
            formatStatus(issue.status)
        );

        const viewButton = createElement("button", "text-button", "Open →");

        viewButton.type = "button";

        viewButton.addEventListener("click", () => {
            openSection("supportIssuesSection");
            openSupportIssue(issue.id);
        });

        item.append(information, status, viewButton);
        overviewSupportIssues.append(item);
    });
}


function openSupportIssue(issueId) {
    const issue = allSupportIssues.find(item => item.id === issueId);

    if (!issue) {
        setMessage("This support issue could not be found.", "error");
        return;
    }

    currentSupportIssue = issue;

    if (supportIssueDetails) supportIssueDetails.hidden = false;
    if (supportIssueId) supportIssueId.value = issue.id;

    if (supportIssueDetailSubject) {
        supportIssueDetailSubject.textContent =
            issue.subject || "Untitled issue";
    }

    if (supportIssueDetailStatus) {
        supportIssueDetailStatus.textContent = formatStatus(issue.status);
        supportIssueDetailStatus.className =
            "status-badge " + (issue.status || "pending");
    }

    if (supportIssueMember) {
        const name = issue.memberProfile?.display_name || "Member";
        const code = issue.memberProfile?.member_code || "Code unavailable";

        supportIssueMember.textContent = `${name} (${code})`;
    }

    if (supportIssueCategory) {
        supportIssueCategory.textContent = formatCategory(issue.category);
    }

    if (supportIssueDate) {
        supportIssueDate.textContent = formatDateTime(issue.created_at);
    }

    if (supportIssueDescription) {
        supportIssueDescription.textContent =
            issue.description || "No description provided.";
    }

    if (supportIssueStatus) {
        supportIssueStatus.value =
            SUPPORT_STATUSES.includes(issue.status)
                ? issue.status
                : "pending";
    }

    if (supportAdminReply) {
        supportAdminReply.value = issue.admin_reply || "";
    }

    setFormMessage(supportIssueMessage, "");

    supportIssueDetails?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function closeSupportDetails() {
    currentSupportIssue = null;

    if (supportIssueDetails) supportIssueDetails.hidden = true;

    supportResponseForm?.reset();

    if (supportIssueId) supportIssueId.value = "";

    setFormMessage(supportIssueMessage, "");
}


cancelSupportDetails?.addEventListener("click", closeSupportDetails);

supportSearch?.addEventListener("input", displaySupportIssues);
supportStatusFilter?.addEventListener("change", displaySupportIssues);
supportCategoryFilter?.addEventListener("change", displaySupportIssues);


refreshSupportIssues?.addEventListener("click", async () => {
    refreshSupportIssues.disabled = true;
    refreshSupportIssues.textContent = "Loading...";

    try {
        await loadSupportIssues();
        setMessage("Support inbox refreshed.", "success");
    } catch (error) {
        console.error("Support refresh error:", error);
    } finally {
        refreshSupportIssues.disabled = false;
        refreshSupportIssues.textContent = "↻ Refresh";
    }
});


/* =========================================
   20. SAVE ADMIN SUPPORT RESPONSE
========================================= */

supportResponseForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const issueId = supportIssueId?.value;
    const newStatus = supportIssueStatus?.value;
    const reply = supportAdminReply?.value.trim() || "";

    if (!issueId) {
        setFormMessage(
            supportIssueMessage,
            "Please select a support issue first.",
            "error"
        );
        return;
    }

    if (!SUPPORT_STATUSES.includes(newStatus)) {
        setFormMessage(
            supportIssueMessage,
            "Please select a valid issue status.",
            "error"
        );
        return;
    }

    if (reply.length > 3000) {
        setFormMessage(
            supportIssueMessage,
            "Your response is too long.",
            "error"
        );
        return;
    }

    saveSupportResponseButton.disabled = true;
    saveSupportResponseButton.textContent = "Saving...";

    try {
        const { error } = await supabase
            .from("support_issues")
            .update({
                status: newStatus,
                admin_reply: reply || null,
                updated_at: new Date().toISOString()
            })
            .eq("id", issueId);

        if (error) throw error;

        setFormMessage(
            supportIssueMessage,
            "Your response and issue status have been saved.",
            "success"
        );

        setMessage("Support issue updated successfully.", "success");

        await loadSupportIssues();
        openSupportIssue(issueId);

    } catch (error) {
        console.error("Support response error:", error);

        setFormMessage(
            supportIssueMessage,
            "Could not save your response: " + getErrorMessage(error),
            "error"
        );

    } finally {
        saveSupportResponseButton.disabled = false;
        saveSupportResponseButton.textContent = "Save response";
    }
});


/* =========================================
   21. READING SPACE — LOAD ARTICLES
========================================= */

async function loadReadingArticles() {
    if (!readingArticlesList) return;

    showEmptyState(
        readingArticlesList,
        "Loading reading articles..."
    );

    const { data, error } = await supabase
        .from("reading_articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Reading articles loading error:", error);

        showEmptyState(
            readingArticlesList,
            "Could not load articles: " + error.message
        );

        throw error;
    }

    allReadingArticles = data || [];

    updateReadingStatistics();
    displayReadingArticles();
}


/* =========================================
   22. READING SPACE — STATISTICS
========================================= */

function updateReadingStatistics() {
    const total = allReadingArticles.length;

    const pending = allReadingArticles.filter(
        article => article.status === "pending"
    ).length;

    const published = allReadingArticles.filter(
        article => article.status === "published"
    ).length;

    const drafts = allReadingArticles.filter(
        article => article.status === "draft"
    ).length;

    if (readingTotalCount) readingTotalCount.textContent = total;
    if (readingPendingCount) readingPendingCount.textContent = pending;
    if (readingPublishedCount) readingPublishedCount.textContent = published;
    if (readingDraftCount) readingDraftCount.textContent = drafts;

    if (sidebarReadingPendingCount) {
        sidebarReadingPendingCount.textContent = pending;
    }
}


/* =========================================
   23. READING SPACE — DISPLAY ARTICLES
========================================= */

function displayReadingArticles() {
    if (!readingArticlesList) return;

    readingArticlesList.replaceChildren();

    const search =
        readingArticleSearch?.value.trim().toLowerCase() || "";

    const statusFilter =
        readingArticleStatusFilter?.value || "all";

    const categoryFilter =
        readingArticleCategoryFilter?.value || "all";

    const filteredArticles = allReadingArticles.filter(article => {
        const matchesSearch =
            (article.title || "").toLowerCase().includes(search) ||
            (article.author_name || "").toLowerCase().includes(search) ||
            (article.description || "").toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "all" || article.status === statusFilter;

        const matchesCategory =
            categoryFilter === "all" || article.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (filteredArticles.length === 0) {
        showEmptyState(
            readingArticlesList,
            "No articles match your search or selected filters."
        );
        return;
    }

    filteredArticles.forEach(article => {
        const card = createElement(
            "article",
            "content-card reading-article-card"
        );

        const heading = createElement("div", "reading-article-heading");

        const titleArea = createElement("div");

        const title = createElement(
            "h3",
            "",
            article.title || "Untitled article"
        );

        const author = createElement(
            "p",
            "content-meta",
            "By " + (article.author_name || "Unknown author")
        );

        titleArea.append(title, author);

        const status = createElement(
            "span",
            "status-badge " + (article.status || "draft"),
            formatStatus(article.status)
        );

        heading.append(titleArea, status);
        card.append(heading);

        if (article.is_featured) {
            card.append(
                createElement(
                    "span",
                    "reading-featured-label",
                    "★ Featured article"
                )
            );
        }

        card.append(
            createElement(
                "p",
                "reading-article-description",
                article.description || ""
            )
        );

        card.append(
            createElement(
                "div",
                "reading-article-meta",
                `${article.category || "Uncategorised"} · ` +
                `${article.language || "English"} · ` +
                `Created ${formatDate(article.created_at)}`
            )
        );

        const actions = createElement(
            "div",
            "reading-article-actions content-actions"
        );

        const editButton = createElement("button", "", "Edit article");
        editButton.type = "button";
        editButton.addEventListener("click", () => {
            editReadingArticle(article);
        });

        actions.append(editButton);

        if (article.status === "pending") {
            actions.append(
                createReadingActionButton(
                    "Publish",
                    "primary-button",
                    () => updateReadingArticleStatus(article, "published")
                ),
                createReadingActionButton(
                    "Request revision",
                    "",
                    () => updateReadingArticleStatus(article, "needs_revision")
                ),
                createReadingActionButton(
                    "Reject",
                    "delete-button",
                    () => updateReadingArticleStatus(article, "rejected")
                )
            );
        }

        if (article.status === "published") {
            actions.append(
                createReadingActionButton(
                    "Unpublish",
                    "",
                    () => updateReadingArticleStatus(article, "draft")
                )
            );
        }

        if (article.status === "needs_revision") {
            actions.append(
                createReadingActionButton(
                    "Move to draft",
                    "",
                    () => updateReadingArticleStatus(article, "draft")
                )
            );
        }

        const featureButton = createElement(
            "button",
            "",
            article.is_featured ? "Remove featured" : "Feature article"
        );

        featureButton.type = "button";

        featureButton.addEventListener("click", () => {
            toggleReadingFeatured(article);
        });

        actions.append(featureButton);

        const deleteButton = createElement(
            "button",
            "delete-button",
            "Delete"
        );

        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => {
            deleteReadingArticle(article);
        });

        actions.append(deleteButton);
        card.append(actions);

        readingArticlesList.append(card);
    });
}


function createReadingActionButton(label, className, callback) {
    const button = createElement("button", className, label);

    button.type = "button";
    button.addEventListener("click", callback);

    return button;
}


readingArticleSearch?.addEventListener(
    "input",
    displayReadingArticles
);

readingArticleStatusFilter?.addEventListener(
    "change",
    displayReadingArticles
);

readingArticleCategoryFilter?.addEventListener(
    "change",
    displayReadingArticles
);


/* =========================================
   24. READING SPACE — FORM RESET
========================================= */

function resetReadingArticleForm() {
    readingArticleForm?.reset();

    if (readingArticleId) readingArticleId.value = "";

    if (readingArticleFeatured) {
        readingArticleFeatured.value = "false";
    }

    if (readingFormHeading) {
        readingFormHeading.textContent = "Create a new article";
    }

    if (publishReadingArticleButton) {
        publishReadingArticleButton.textContent = "Publish article";
    }

    if (saveReadingDraftButton) {
        saveReadingDraftButton.textContent = "Save as draft";
    }

    if (cancelReadingEditButton) {
        cancelReadingEditButton.hidden = true;
    }

    setFormMessage(readingArticleFormMessage, "");
}


/* =========================================
   25. READING SPACE — NEW ARTICLE
========================================= */

newReadingArticleButton?.addEventListener("click", () => {
    resetReadingArticleForm();

    openSection("readingSection");

    readingArticleTitle?.focus();

    readingArticleForm?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


cancelReadingEditButton?.addEventListener(
    "click",
    resetReadingArticleForm
);


/* =========================================
   26. READING SPACE — EDIT ARTICLE
========================================= */

function editReadingArticle(article) {
    if (!article) return;

    readingArticleId.value = article.id;

    readingArticleTitle.value = article.title || "";
    readingArticleCategory.value = article.category || "";
    readingArticleLanguage.value = article.language || "English";
    readingArticleAuthor.value = article.author_name || "";
    readingArticleEditor.value = article.editor_name || "";
    readingArticleDescription.value = article.description || "";
    readingArticleCover.value = article.cover_url || "";
    readingArticleContent.value = article.content || "";
    readingArticleSource.value = article.source_url || "";
    readingArticlePublishedDate.value = article.published_at || "";

    readingArticleFeatured.value =
        article.is_featured ? "true" : "false";

    if (readingFormHeading) {
        readingFormHeading.textContent = "Edit reading article";
    }

    if (publishReadingArticleButton) {
        publishReadingArticleButton.textContent =
            article.status === "published"
                ? "Save changes"
                : "Save and publish";
    }

    if (saveReadingDraftButton) {
        saveReadingDraftButton.textContent = "Save changes as draft";
    }

    if (cancelReadingEditButton) {
        cancelReadingEditButton.hidden = false;
    }

    setFormMessage(
        readingArticleFormMessage,
        `Editing article · Current status: ${formatStatus(article.status)}`
    );

    openSection("readingSection");

    readingArticleForm?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    readingArticleTitle?.focus();
}


/* =========================================
   27. READING SPACE — VALIDATE FORM
========================================= */

function getReadingArticleFormData(status) {
    const title = readingArticleTitle?.value.trim() || "";
    const category = readingArticleCategory?.value || "";
    const language = readingArticleLanguage?.value || "";
    const author = readingArticleAuthor?.value.trim() || "";
    const editor = readingArticleEditor?.value.trim() || "";
    const description = readingArticleDescription?.value.trim() || "";
    const cover = readingArticleCover?.value.trim() || "";
    const content = readingArticleContent?.value.trim() || "";
    const source = readingArticleSource?.value.trim() || "";
    const publishedDate = readingArticlePublishedDate?.value || "";

    if (title.length < 3 || title.length > 180) {
        throw new Error("Title must contain between 3 and 180 characters.");
    }

    if (!READING_CATEGORIES.includes(category)) {
        throw new Error("Please choose a valid article category.");
    }

    if (!["English", "Nepali", "Both"].includes(language)) {
        throw new Error("Please choose a valid article language.");
    }

    if (!author || author.length > 150) {
        throw new Error("Please enter an author name (maximum 150 characters).");
    }

    if (editor.length > 150) {
        throw new Error("Editor name must be 150 characters or fewer.");
    }

    if (description.length < 10 || description.length > 350) {
        throw new Error(
            "Description must contain between 10 and 350 characters."
        );
    }

    if (!content) {
        throw new Error("Please write the article content.");
    }

    if (!isValidOptionalUrl(cover)) {
        throw new Error("Cover image must be a valid HTTP or HTTPS URL.");
    }

    if (!isValidOptionalUrl(source)) {
        throw new Error("Source must be a valid HTTP or HTTPS URL.");
    }

    if (!READING_STATUSES.includes(status)) {
        throw new Error("Please choose a valid article status.");
    }

    const data = {
        title,
        category,
        language,
        author_name: author,
        editor_name: editor || null,
        description,
        cover_url: cover || null,
        content,
        source_url: source || null,
        published_at: publishedDate || null,
        status,
        is_featured: readingArticleFeatured?.value === "true"
    };

    // Give newly published articles today's date if no date was selected.
    if (status === "published" && !data.published_at) {
        data.published_at = new Date().toISOString().slice(0, 10);
    }

    return data;
}


/* =========================================
   28. READING SPACE — SAVE ARTICLE
========================================= */

async function saveReadingArticle(status) {
    if (!currentAdminId) {
        setFormMessage(
            readingArticleFormMessage,
            "Administrator access is required.",
            "error"
        );
        return;
    }

    let articleData;

    try {
        articleData = getReadingArticleFormData(status);
    } catch (error) {
        setFormMessage(
            readingArticleFormMessage,
            error.message,
            "error"
        );
        return;
    }

    const editingId = readingArticleId?.value || "";

    const buttons = [
        saveReadingDraftButton,
        publishReadingArticleButton
    ].filter(Boolean);

    buttons.forEach(button => {
        button.disabled = true;
    });

    setFormMessage(
        readingArticleFormMessage,
        editingId ? "Updating article..." : "Saving article..."
    );

    try {
        let result;

        if (editingId) {
            // Do not change created_by when editing an existing article.
            result = await supabase
                .from("reading_articles")
                .update(articleData)
                .eq("id", editingId);
        } else {
            result = await supabase
                .from("reading_articles")
                .insert({
                    ...articleData,
                    created_by: currentAdminId
                });
        }

        if (result.error) throw result.error;

        resetReadingArticleForm();

        setFormMessage(
            readingArticleFormMessage,
            status === "published"
                ? "Article published successfully."
                : "Article saved as a draft.",
            "success"
        );

        setMessage(
            status === "published"
                ? "Reading article published."
                : "Reading article saved.",
            "success"
        );

        await loadReadingArticles();

    } catch (error) {
        console.error("Reading article save error:", error);

        setFormMessage(
            readingArticleFormMessage,
            "Could not save article: " + getErrorMessage(error),
            "error"
        );

    } finally {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
}


/* =========================================
   29. READING SPACE — FORM BUTTONS
========================================= */

saveReadingDraftButton?.addEventListener("click", () => {
    saveReadingArticle("draft");
});


readingArticleForm?.addEventListener("submit", async event => {
    event.preventDefault();

    await saveReadingArticle("published");
});


/* =========================================
   30. READING SPACE — UPDATE STATUS
========================================= */

async function updateReadingArticleStatus(article, newStatus) {
    if (!READING_STATUSES.includes(newStatus)) return;

    const actionMessages = {
        published: "publish",
        draft: "move this article to drafts",
        needs_revision: "request revisions for",
        rejected: "reject"
    };

    const action = actionMessages[newStatus] || "update";

    if (!window.confirm(
        `Are you sure you want to ${action} "${article.title}"?`
    )) return;

    const updateData = {
        status: newStatus
    };

    if (newStatus === "published" && !article.published_at) {
        updateData.published_at = new Date().toISOString().slice(0, 10);
    }

    try {
        const { error } = await supabase
            .from("reading_articles")
            .update(updateData)
            .eq("id", article.id);

        if (error) throw error;

        setMessage(
            `Article status changed to ${formatStatus(newStatus)}.`,
            "success"
        );

        await loadReadingArticles();

    } catch (error) {
        console.error("Article status update error:", error);

        setMessage(
            "Could not update article: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   31. READING SPACE — FEATURE ARTICLE
========================================= */

async function toggleReadingFeatured(article) {
    const nextValue = !article.is_featured;

    try {
        const { error } = await supabase
            .from("reading_articles")
            .update({
                is_featured: nextValue
            })
            .eq("id", article.id);

        if (error) throw error;

        setMessage(
            nextValue
                ? "Article added to featured content."
                : "Article removed from featured content.",
            "success"
        );

        await loadReadingArticles();

    } catch (error) {
        console.error("Featured article update error:", error);

        setMessage(
            "Could not update featured article: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   32. READING SPACE — DELETE ARTICLE
========================================= */

async function deleteReadingArticle(article) {
    if (!window.confirm(
        `Delete "${article.title}" permanently? This cannot be undone.`
    )) return;

    try {
        const { error } = await supabase
            .from("reading_articles")
            .delete()
            .eq("id", article.id);

        if (error) throw error;

        if (readingArticleId?.value === article.id) {
            resetReadingArticleForm();
        }

        setMessage("Reading article deleted successfully.", "success");

        await loadReadingArticles();

    } catch (error) {
        console.error("Reading article deletion error:", error);

        setMessage(
            "Could not delete article: " + getErrorMessage(error),
            "error"
        );
    }
}


/* =========================================
   33. READING SPACE — REFRESH
========================================= */

refreshReadingArticlesButton?.addEventListener("click", async () => {
    refreshReadingArticlesButton.disabled = true;
    refreshReadingArticlesButton.textContent = "Loading...";

    try {
        await loadReadingArticles();
        setMessage("Reading articles refreshed.", "success");
    } catch (error) {
        console.error("Reading articles refresh error:", error);
    } finally {
        refreshReadingArticlesButton.disabled = false;
        refreshReadingArticlesButton.textContent = "↻ Refresh";
    }
});


/* =========================================
   34. RECENT ACTIVITY
========================================= */

function buildActivity() {
    const events = [];

    allMembers.forEach(member => {
        if (!member.created_at) return;

        events.push({
            title: "New member registered",
            description: member.display_name || "A new member joined coreI.",
            date: member.created_at,
            icon: "♙"
        });
    });

    allIdeas.forEach(item => {
        if (!item.created_at) return;

        events.push({
            title: "New community idea",
            description: item.title || "A member shared an idea.",
            date: item.created_at,
            icon: "✧"
        });
    });

    allAnnouncements.forEach(item => {
        if (!item.created_at) return;

        events.push({
            title: "Announcement created",
            description: item.title || "A new announcement was created.",
            date: item.created_at,
            icon: "◈"
        });
    });

    allSupportIssues.forEach(issue => {
        if (!issue.created_at) return;

        events.push({
            title: "New support issue",
            description: issue.subject || "A member reported an issue.",
            date: issue.created_at,
            icon: "✉"
        });
    });

    allReadingArticles.forEach(article => {
        if (!article.created_at) return;

        events.push({
            title: "Reading article created",
            description: article.title || "A reading article was created.",
            date: article.created_at,
            icon: "▤"
        });
    });

    events.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return events;
}


function displayActivity(container, limit = 30) {
    if (!container) return;

    container.replaceChildren();

    const events = buildActivity().slice(0, limit);

    if (events.length === 0) {
        showEmptyState(container, "No recent activity is available.");
        return;
    }

    events.forEach(event => {
        const item = createElement("article", "activity-item");

        const icon = createElement("div", "activity-icon", event.icon);
        const content = createElement("div");

        const title = createElement("strong", "", event.title);
        const description = createElement("p", "", event.description);
        const date = createElement("time", "", formatDateTime(event.date));

        content.append(title, description, date);
        item.append(icon, content);

        container.append(item);
    });
}


/* =========================================
   35. ANALYTICS CHART
========================================= */

function displayWeeklyChart() {
    if (!weeklyChart) return;

    weeklyChart.replaceChildren();

    const days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        const memberTotal = allMembers.filter(member => {
            if (!member.created_at) return false;

            const created = new Date(member.created_at);

            return created >= date && created < nextDay;
        }).length;

        const ideaTotal = allIdeas.filter(item => {
            if (!item.created_at) return false;

            const created = new Date(item.created_at);

            return created >= date && created < nextDay;
        }).length;

        days.push({
            label: date.toLocaleDateString(undefined, {
                weekday: "short"
            }),
            memberTotal,
            ideaTotal
        });
    }

    const maximum = Math.max(
        1,
        ...days.map(day => Math.max(
            day.memberTotal,
            day.ideaTotal
        ))
    );

    days.forEach(day => {
        const column = createElement("div", "chart-day");
        const bars = createElement("div", "chart-bars");

        const memberBar = createElement("div", "chart-bar members");
        const ideaBar = createElement("div", "chart-bar ideas");

        memberBar.style.height =
            Math.max(3, (day.memberTotal / maximum) * 120) + "px";

        ideaBar.style.height =
            Math.max(3, (day.ideaTotal / maximum) * 120) + "px";

        memberBar.title = `Members: ${day.memberTotal}`;
        ideaBar.title = `Ideas: ${day.ideaTotal}`;

        bars.append(memberBar, ideaBar);

        const label = createElement("span", "", day.label);

        column.append(bars, label);
        weeklyChart.append(column);
    });
}


/* =========================================
   36. DASHBOARD STATISTICS
========================================= */

async function loadOverviewStats() {
    const results = await Promise.all([
        supabase
            .from("ideas")
            .select("id", {
                count: "exact",
                head: true
            }),

        supabase
            .from("announcements")
            .select("id", {
                count: "exact",
                head: true
            })
            .eq("is_published", true)
    ]);

    const ideasResult = results[0];
    const announcementsResult = results[1];

    if (ideasResult.error) {
        console.error("Idea count error:", ideasResult.error);

        if (totalIdeasCount) totalIdeasCount.textContent = "—";
    } else if (totalIdeasCount) {
        totalIdeasCount.textContent = ideasResult.count ?? 0;
    }

    if (announcementsResult.error) {
        console.error("Announcement count error:", announcementsResult.error);

        if (publishedAnnouncementsCount) {
            publishedAnnouncementsCount.textContent = "—";
        }
    } else if (publishedAnnouncementsCount) {
        publishedAnnouncementsCount.textContent =
            announcementsResult.count ?? 0;
    }
}


function updateAnalytics() {
    if (analyticsMembers) {
        analyticsMembers.textContent = allMembers.length;
    }

    if (analyticsIdeas) {
        analyticsIdeas.textContent = allIdeas.length;
    }

    updateAnnouncementStatistics();
    displayWeeklyChart();
}


/* =========================================
   37. PASSWORD SETTINGS
========================================= */

passwordForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const password = newPassword.value;
    const confirmation = confirmPassword.value;

    if (password.length < 8) {
        setFormMessage(
            passwordMessage,
            "Your new password must contain at least 8 characters.",
            "error"
        );
        return;
    }

    if (password !== confirmation) {
        setFormMessage(
            passwordMessage,
            "The passwords do not match.",
            "error"
        );
        return;
    }

    updatePasswordButton.disabled = true;
    updatePasswordButton.textContent = "Updating...";

    try {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) throw error;

        passwordForm.reset();

        setFormMessage(
            passwordMessage,
            "Your password was updated successfully.",
            "success"
        );

    } catch (error) {
        console.error("Password update error:", error);

        setFormMessage(
            passwordMessage,
            "Could not update password: " + getErrorMessage(error),
            "error"
        );

    } finally {
        updatePasswordButton.disabled = false;
        updatePasswordButton.textContent = "Update password";
    }
});


/* =========================================
   38. SIGN OUT
========================================= */

async function signOut() {
    if (!window.confirm("Are you sure you want to sign out?")) return;

    logoutButtons.forEach(button => {
        button.disabled = true;
        button.textContent = "Signing out...";
    });

    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        window.location.replace("./login.html");

    } catch (error) {
        console.error("Sign-out error:", error);

        setMessage(
            "Could not sign out: " + getErrorMessage(error),
            "error"
        );

        logoutButtons.forEach(button => {
            button.disabled = false;
            button.textContent = "Sign out";
        });
    }
}


logoutButtons.forEach(button => {
    button.addEventListener("click", signOut);
});


/* =========================================
   39. REFRESH DASHBOARD
========================================= */

async function refreshDashboard() {
    if (!dashboardStarted) return;

    if (refreshButton) {
        refreshButton.disabled = true;
        refreshButton.textContent = "Refreshing...";
    }

    setMessage("Refreshing dashboard data...");

    try {
        await loadAllDashboardData();

        setMessage("Dashboard updated successfully.", "success");

    } catch (error) {
        console.error("Dashboard refresh error:", error);

        setMessage(
            "Some dashboard information could not be refreshed.",
            "error"
        );

    } finally {
        if (refreshButton) {
            refreshButton.disabled = false;
            refreshButton.textContent = "↻ Refresh data";
        }
    }
}


refreshButton?.addEventListener("click", refreshDashboard);


document.getElementById("refreshAnnouncements")
    ?.addEventListener("click", async () => {
        try {
            await loadAnnouncements();
            setMessage("Announcements refreshed.", "success");
        } catch (error) {
            console.error(error);
        }
    });


document.getElementById("refreshIdeas")
    ?.addEventListener("click", async () => {
        try {
            await loadIdeas();
            setMessage("Community ideas refreshed.", "success");
        } catch (error) {
            console.error(error);
        }
    });


document.getElementById("refreshActivity")
    ?.addEventListener("click", () => {
        displayActivity(activityList);
        displayActivity(overviewActivity, 5);
    });


/* =========================================
   40. LOAD ALL DASHBOARD DATA
========================================= */

async function loadAllDashboardData() {
    await loadMembers();

    await Promise.all([
        loadAnnouncements(),
        loadIdeas(),
        loadOverviewStats(),
        loadSupportIssues(),
        loadReadingArticles()
    ]);

    displayActivity(activityList);
    displayActivity(overviewActivity, 5);

    updateAnalytics();
}


/* =========================================
   41. START DASHBOARD
========================================= */

async function startDashboard() {
    const isAdmin = await checkAdminAccess();

    if (!isAdmin) return;

    dashboardStarted = true;

    if (loadingScreen) {
        loadingScreen.hidden = true;
    }

    if (adminApp) {
        adminApp.hidden = false;
    }

    openSection("overviewSection");

    setMessage("Administrator access verified.");

    try {
        await loadAllDashboardData();

        setMessage(
            "Your admin dashboard is ready.",
            "success"
        );

    } catch (error) {
        console.error("Dashboard loading error:", error);

        setMessage(
            "Some dashboard data could not be loaded. Check the browser console for details.",
            "error"
        );
    }
}


// Start the application.
startDashboard();
