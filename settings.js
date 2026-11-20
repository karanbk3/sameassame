
import { supabase } from "./supabase.js";

// =============================================
// coreI — COMPLETE SETTINGS SYSTEM
// Connected to Supabase
// =============================================


// =============================================
// 1. PAGE ELEMENTS
// =============================================

// Personal information
const profileForm = document.getElementById("profileSettingsForm");
const displayNameInput = document.getElementById("displayName");
const bioInput = document.getElementById("bio");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const profileMessage = document.getElementById("profileMessage");
const saveProfileButton = document.getElementById("saveProfileButton");

// Email
const emailForm = document.getElementById("emailSettingsForm");
const newEmailInput = document.getElementById("newEmail");
const emailMessage = document.getElementById("emailMessage");
const updateEmailButton = document.getElementById("updateEmailButton");

// Password
const passwordForm = document.getElementById("passwordSettingsForm");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");
const updatePasswordButton = document.getElementById("updatePasswordButton");

// Account information
const memberCodeElement = document.getElementById("settingsMemberCode");
const memberStatusElement = document.getElementById("settingsMemberStatus");

// Sign out
const logoutButton = document.getElementById("logoutButton");
const logoutMessage = document.getElementById("logoutMessage");

// Search and navigation
const settingsSearch = document.getElementById("settingsSearch");
const clearSettingsSearch = document.getElementById("clearSettingsSearch");
const navigation = document.getElementById("settingsNavigation");

const navigationLinks = document.querySelectorAll(
    ".settings-menu-link"
);

const settingsSections = document.querySelectorAll(
    ".settings-content .settings-section"
);

// Notifications
const ideaNotifications = document.getElementById("ideaNotifications");
const announcementNotifications = document.getElementById("announcementNotifications");
const accountNotifications = document.getElementById("accountNotifications");

const saveNotificationSettings = document.getElementById(
    "saveNotificationSettings"
);

const notificationMessage = document.getElementById(
    "notificationMessage"
);

// Privacy
const profileVisibility = document.getElementById("profileVisibility");
const showBio = document.getElementById("showBio");

const savePrivacySettings = document.getElementById(
    "savePrivacySettings"
);

const privacyMessage = document.getElementById("privacyMessage");

// Appearance
const themeOptions = document.querySelectorAll(
    'input[name="themePreference"]'
);

const themeMessage = document.getElementById("themeMessage");

// Activity
const myIdeasCount = document.getElementById("myIdeasCount");
const myNotificationsCount = document.getElementById("myNotificationsCount");
const activityList = document.getElementById("activityList");
const activityMessage = document.getElementById("activityMessage");

// Data management
const exportDataButton = document.getElementById("exportDataButton");
const exportMessage = document.getElementById("exportMessage");

const accountDeletionInfoButton = document.getElementById(
    "accountDeletionInfoButton"
);

const accountDeletionInfo = document.getElementById(
    "accountDeletionInfo"
);

// Support
const supportForm = document.getElementById("supportForm");
const supportSubject = document.getElementById("supportSubject");
const supportCategory = document.getElementById("supportCategory");
const supportMessageInput = document.getElementById("supportMessage");
const supportFormMessage = document.getElementById("supportFormMessage");
const submitSupportButton = document.getElementById("submitSupportButton");


// =============================================
// 2. SETTINGS
// =============================================

const DEFAULT_AVATAR = "./images/default-profile.png";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const STORAGE_KEYS = {
    notifications: "coreI_notification_preferences",
    privacy: "coreI_privacy_preferences",
    theme: "coreI-theme"
};

const ALLOWED_SUPPORT_CATEGORIES = [
    "technical",
    "account",
    "bug",
    "suggestion",
    "other"
];

let currentUser = null;
let currentProfile = null;

let currentAvatarUrl = "";
let selectedPhoto = null;
let previewObjectUrl = null;


// =============================================
// 3. HELPER FUNCTIONS
// =============================================

// Display messages
function showMessage(element, message, success = false) {
    if (!element) return;

    element.textContent = message;

    element.style.color = success
        ? "#16866F"
        : "#B42318";
}


// Button loading state
function setButtonLoading(button, loading, loadingText) {
    if (!button) return;

    if (loading) {
        if (!button.dataset.originalText) {
            button.dataset.originalText = button.textContent.trim();
        }

        button.disabled = true;
        button.textContent = loadingText;

    } else {
        button.disabled = false;

        if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
    }
}


// Read saved browser settings
function readLocalSettings(key, fallback) {
    try {
        const saved = localStorage.getItem(key);

        return saved ? JSON.parse(saved) : fallback;

    } catch (error) {
        console.error("Settings reading error:", error);

        return fallback;
    }
}


// Save browser settings
function saveLocalSettings(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));

        return true;

    } catch (error) {
        console.error("Settings saving error:", error);

        return false;
    }
}


// Format dates
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


// Create safe HTML text elements
function createTextElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    element.textContent = text || "";

    return element;
}


// =============================================
// 4. THEME SYSTEM
// Light | Dark | System
// =============================================

const systemThemeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
);


// Read the saved theme
function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(
            STORAGE_KEYS.theme
        );

        if (["light", "dark", "system"].includes(savedTheme)) {
            return savedTheme;
        }

    } catch (error) {
        console.error("Theme reading error:", error);
    }

    return "system";
}


// Apply theme to the page
function applyTheme(preference) {
    if (!["light", "dark", "system"].includes(preference)) {
        preference = "system";
    }

    const darkMode =
        preference === "dark" ||
        (
            preference === "system" &&
            systemThemeQuery.matches
        );

    document.body.classList.toggle(
        "dark-theme",
        darkMode
    );

    // Update theme selection
    themeOptions.forEach(option => {
        option.checked = option.value === preference;
    });

    // Update browser theme colour
    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeColor) {
        themeColor.setAttribute(
            "content",
            darkMode ? "#101A1A" : "#F3F6F4"
        );
    }
}


// Load saved theme
function loadThemePreference() {
    applyTheme(getSavedTheme());
}


// Save selected theme
themeOptions.forEach(option => {
    option.addEventListener("change", () => {
        if (!option.checked) return;

        const preference = option.value;

        try {
            localStorage.setItem(
                STORAGE_KEYS.theme,
                preference
            );

            applyTheme(preference);

            showMessage(
                themeMessage,
                `Your ${preference} theme has been selected.`,
                true
            );

        } catch (error) {
            console.error("Theme saving error:", error);

            showMessage(
                themeMessage,
                "Could not save your theme preference."
            );
        }
    });
});


// Follow device theme when System is selected
function handleSystemThemeChange() {
    if (getSavedTheme() === "system") {
        applyTheme("system");
    }
}

if (systemThemeQuery.addEventListener) {
    systemThemeQuery.addEventListener(
        "change",
        handleSystemThemeChange
    );
} else {
    // Compatibility with older browsers
    systemThemeQuery.addListener(handleSystemThemeChange);
}


// Apply theme immediately
loadThemePreference();


// =============================================
// 5. LOAD LOGGED-IN USER
// =============================================

async function loadSettings() {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            window.location.replace("./login.html");
            return;
        }

        currentUser = data.user;

        await loadUserProfile();

        loadNotificationSettings();
        loadPrivacySettings();

        await Promise.all([
            loadActivity(),
            loadMySupportIssues()
        ]);

    } catch (error) {
        console.error("Settings loading error:", error);

        showMessage(
            profileMessage,
            "Could not load your settings. Please refresh the page."
        );
    }
}


// =============================================
// 6. LOAD USER PROFILE
// =============================================

async function loadUserProfile() {
    const { data: profile, error } = await supabase
        .from("profiles")
        .select(`
            display_name,
            member_code,
            status,
            bio,
            avatar_url,
            name_last_changed_at
        `)
        .eq("id", currentUser.id)
        .single();

    if (error) {
        console.error("Profile loading error:", error);

        showMessage(
            profileMessage,
            "Could not load your profile information."
        );

        return;
    }

    currentProfile = profile;

    currentAvatarUrl = profile.avatar_url || "";

    if (displayNameInput) {
        displayNameInput.value = profile.display_name || "";
    }

    if (bioInput) {
        bioInput.value = profile.bio || "";
    }

    if (avatarPreview) {
        avatarPreview.src = currentAvatarUrl || DEFAULT_AVATAR;
    }

    if (memberCodeElement) {
        memberCodeElement.textContent =
            profile.member_code || "Not assigned";
    }

    if (memberStatusElement) {
        memberStatusElement.textContent =
            profile.status || "Unknown";
    }

    if (newEmailInput) {
        newEmailInput.placeholder =
            currentUser.email || "Enter your new email";
    }
}


// =============================================
// 7. PROFILE PHOTO PREVIEW
// =============================================

if (avatarInput) {
    avatarInput.addEventListener("change", () => {
        const file = avatarInput.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            showMessage(
                profileMessage,
                "Please choose a JPG, PNG or WEBP image."
            );

            avatarInput.value = "";
            selectedPhoto = null;

            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            showMessage(
                profileMessage,
                "Your photo must be smaller than 5 MB."
            );

            avatarInput.value = "";
            selectedPhoto = null;

            return;
        }

        selectedPhoto = file;

        if (previewObjectUrl) {
            URL.revokeObjectURL(previewObjectUrl);
        }

        previewObjectUrl = URL.createObjectURL(file);

        if (avatarPreview) {
            avatarPreview.src = previewObjectUrl;
        }

        showMessage(
            profileMessage,
            "Photo selected. Save your changes to upload it.",
            true
        );
    });
}


// =============================================
// 8. UPLOAD PROFILE PHOTO
// =============================================

async function uploadProfilePhoto() {
    if (!selectedPhoto) {
        return currentAvatarUrl;
    }

    const extension =
        selectedPhoto.type === "image/png"
            ? "png"
            : selectedPhoto.type === "image/webp"
                ? "webp"
                : "jpg";

    const filePath =
        `${currentUser.id}/avatar-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, selectedPhoto, {
            contentType: selectedPhoto.type,
            cacheControl: "3600",
            upsert: false
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(filePath);

    return data.publicUrl;
}


// =============================================
// 9. SAVE PROFILE INFORMATION
// =============================================

if (profileForm) {
    profileForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (!currentUser || !currentProfile) {
            showMessage(
                profileMessage,
                "Your profile is not ready yet. Refresh the page."
            );

            return;
        }

        const displayName =
            displayNameInput?.value.trim() || "";

        const bio =
            bioInput?.value.trim() || "";

        if (!displayName) {
            showMessage(
                profileMessage,
                "Please enter your display name."
            );

            return;
        }

        if (displayName.length > 40) {
            showMessage(
                profileMessage,
                "Your display name must be 40 characters or fewer."
            );

            return;
        }

        setButtonLoading(
            saveProfileButton,
            true,
            "Saving..."
        );

        try {
            const avatarUrl = await uploadProfilePhoto();

            const { error } = await supabase
                .from("profiles")
                .update({
                    display_name: displayName,
                    bio: bio,
                    avatar_url: avatarUrl
                })
                .eq("id", currentUser.id);

            if (error) throw error;

            currentAvatarUrl = avatarUrl;

            currentProfile.display_name = displayName;
            currentProfile.bio = bio;
            currentProfile.avatar_url = avatarUrl;

            selectedPhoto = null;

            if (previewObjectUrl) {
                URL.revokeObjectURL(previewObjectUrl);
                previewObjectUrl = null;
            }

            if (avatarInput) {
                avatarInput.value = "";
            }

            if (avatarPreview) {
                avatarPreview.src =
                    avatarUrl || DEFAULT_AVATAR;
            }

            showMessage(
                profileMessage,
                "Your profile has been updated successfully!",
                true
            );

        } catch (error) {
            console.error("Profile update error:", error);

            showMessage(
                profileMessage,
                error.message || "Could not save your profile."
            );

        } finally {
            setButtonLoading(
                saveProfileButton,
                false,
                "Saving..."
            );
        }
    });
}


// =============================================
// 10. UPDATE EMAIL
// =============================================

if (emailForm) {
    emailForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (!currentUser || !newEmailInput) return;

        const newEmail = newEmailInput.value.trim();

        if (!newEmail) {
            showMessage(
                emailMessage,
                "Please enter your new email address."
            );

            return;
        }

        if (
            newEmail.toLowerCase() ===
            currentUser.email?.toLowerCase()
        ) {
            showMessage(
                emailMessage,
                "This is already your email address."
            );

            return;
        }

        setButtonLoading(
            updateEmailButton,
            true,
            "Updating..."
        );

        try {
            const { error } = await supabase.auth.updateUser({
                email: newEmail
            });

            if (error) throw error;

            showMessage(
                emailMessage,
                "Email change requested. Check your inbox for confirmation.",
                true
            );

            newEmailInput.value = "";

        } catch (error) {
            console.error("Email update error:", error);

            showMessage(
                emailMessage,
                error.message || "Could not update your email."
            );

        } finally {
            setButtonLoading(
                updateEmailButton,
                false,
                "Updating..."
            );
        }
    });
}


// =============================================
// 11. CHANGE PASSWORD
// =============================================

if (passwordForm) {
    passwordForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (!currentUser) return;

        const password = newPasswordInput?.value || "";

        const confirmPassword =
            confirmPasswordInput?.value || "";

        if (password.length < 8) {
            showMessage(
                passwordMessage,
                "Your password must contain at least 8 characters."
            );

            return;
        }

        if (password !== confirmPassword) {
            showMessage(
                passwordMessage,
                "Your passwords do not match."
            );

            return;
        }

        setButtonLoading(
            updatePasswordButton,
            true,
            "Updating..."
        );

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            showMessage(
                passwordMessage,
                "Your password has been changed successfully.",
                true
            );

            passwordForm.reset();

        } catch (error) {
            console.error("Password update error:", error);

            showMessage(
                passwordMessage,
                error.message || "Could not change your password."
            );

        } finally {
            setButtonLoading(
                updatePasswordButton,
                false,
                "Updating..."
            );
        }
    });
}


// =============================================
// 12. SETTINGS SEARCH
// =============================================

function filterSettings() {
    const searchText =
        settingsSearch?.value.trim().toLowerCase() || "";

    settingsSections.forEach(section => {
        const searchableText = (
            (section.dataset.search || "") +
            " " +
            section.textContent
        ).toLowerCase();

        section.hidden =
            searchText !== "" &&
            !searchableText.includes(searchText);
    });

    navigationLinks.forEach(link => {
        const targetId =
            link.getAttribute("href")?.slice(1);

        const targetSection =
            document.getElementById(targetId);

        if (targetSection) {
            link.hidden = targetSection.hidden;
        }
    });

    const visibleSections = [...settingsSections].filter(
        section => !section.hidden
    );

    const sidebar = navigation?.closest(".settings-sidebar");

    if (sidebar) {
        sidebar.hidden =
            searchText !== "" &&
            visibleSections.length === 0;
    }

    if (clearSettingsSearch) {
        clearSettingsSearch.hidden = searchText === "";
    }

    if (searchText && visibleSections.length > 0) {
        const firstSection = visibleSections[0];

        navigationLinks.forEach(link => {
            const id = link.getAttribute("href")?.slice(1);

            link.classList.toggle(
                "active",
                id === firstSection.id
            );
        });
    }
}

if (settingsSearch) {
    settingsSearch.addEventListener("input", filterSettings);
}

if (clearSettingsSearch) {
    clearSettingsSearch.addEventListener("click", () => {
        if (!settingsSearch) return;

        settingsSearch.value = "";

        filterSettings();

        settingsSearch.focus();
    });
}


// =============================================
// 13. SETTINGS NAVIGATION
// =============================================

navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
        const targetId =
            link.getAttribute("href")?.slice(1);

        const targetSection =
            document.getElementById(targetId);

        if (!targetSection || targetSection.hidden) {
            event.preventDefault();
            return;
        }

        navigationLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// =============================================
// 14. HIGHLIGHT CURRENT SECTION
// =============================================

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                if (entry.target.hidden) return;

                const sectionId = entry.target.id;

                navigationLinks.forEach(link => {
                    const linkId =
                        link.getAttribute("href")?.slice(1);

                    if (!link.hidden) {
                        link.classList.toggle(
                            "active",
                            linkId === sectionId
                        );
                    }
                });
            });
        },
        {
            rootMargin: "-15% 0px -70% 0px"
        }
    );

    settingsSections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });
}


// =============================================
// 15. NOTIFICATION PREFERENCES
// =============================================

function loadNotificationSettings() {
    const defaults = {
        ideas: true,
        announcements: true,
        account: true
    };

    const preferences = readLocalSettings(
        STORAGE_KEYS.notifications,
        defaults
    );

    if (ideaNotifications) {
        ideaNotifications.checked =
            preferences.ideas ?? defaults.ideas;
    }

    if (announcementNotifications) {
        announcementNotifications.checked =
            preferences.announcements ?? defaults.announcements;
    }

    if (accountNotifications) {
        accountNotifications.checked =
            preferences.account ?? defaults.account;
    }
}

if (saveNotificationSettings) {
    saveNotificationSettings.addEventListener("click", () => {
        const preferences = {
            ideas: ideaNotifications?.checked ?? true,

            announcements:
                announcementNotifications?.checked ?? true,

            account:
                accountNotifications?.checked ?? true
        };

        const saved = saveLocalSettings(
            STORAGE_KEYS.notifications,
            preferences
        );

        showMessage(
            notificationMessage,

            saved
                ? "Your notification preferences have been saved on this device."
                : "Could not save your notification preferences.",

            saved
        );
    });
}


// =============================================
// 16. PRIVACY PREFERENCES
// =============================================

function loadPrivacySettings() {
    const defaults = {
        visibility: "members",
        showBio: true
    };

    const preferences = readLocalSettings(
        STORAGE_KEYS.privacy,
        defaults
    );

    const allowedVisibility = [
        "public",
        "members",
        "private"
    ];

    if (profileVisibility) {
        profileVisibility.value =
            allowedVisibility.includes(preferences.visibility)
                ? preferences.visibility
                : defaults.visibility;
    }

    if (showBio) {
        showBio.checked =
            preferences.showBio ?? defaults.showBio;
    }
}

if (savePrivacySettings) {
    savePrivacySettings.addEventListener("click", () => {
        const visibility =
            profileVisibility?.value || "members";

        const allowedVisibility = [
            "public",
            "members",
            "private"
        ];

        if (!allowedVisibility.includes(visibility)) {
            showMessage(
                privacyMessage,
                "Please select a valid visibility option."
            );

            return;
        }

        const preferences = {
            visibility: visibility,
            showBio: showBio?.checked ?? true
        };

        const saved = saveLocalSettings(
            STORAGE_KEYS.privacy,
            preferences
        );

        showMessage(
            privacyMessage,

            saved
                ? "Your preferences are saved on this device. They do not yet change actual profile visibility."
                : "Could not save your privacy preferences.",

            saved
        );
    });
}


// =============================================
// 17. LOAD MY ACTIVITY
// =============================================

async function loadActivity() {
    if (!currentUser) return;

    if (activityList) {
        activityList.textContent = "Loading your activity...";
    }

    try {
        const [ideasResult, notificationsResult] =
            await Promise.all([

                supabase
                    .from("ideas")
                    .select("id, title, created_at")
                    .eq("member_id", currentUser.id)
                    .order("created_at", { ascending: false }),

                supabase
                    .from("notifications")
                    .select("id, title, message, type, created_at")
                    .eq("user_id", currentUser.id)
                    .order("created_at", { ascending: false })

            ]);

        if (ideasResult.error) {
            throw ideasResult.error;
        }

        if (notificationsResult.error) {
            throw notificationsResult.error;
        }

        const ideas = ideasResult.data || [];
        const notifications = notificationsResult.data || [];

        if (myIdeasCount) {
            myIdeasCount.textContent = ideas.length;
        }

        if (myNotificationsCount) {
            myNotificationsCount.textContent = notifications.length;
        }

        if (!activityList) return;

        activityList.replaceChildren();

        const activities = [
            ...ideas.map(item => ({
                title: item.title || "Your idea",
                description: "You created an idea",
                date: item.created_at,
                kind: "Idea"
            })),

            ...notifications.map(item => ({
                title: item.title || "Notification",
                description: item.message || "You received a notification",
                date: item.created_at,
                kind: "Notification"
            }))
        ];

        activities.sort((a, b) => {
            return new Date(b.date || 0) -
                new Date(a.date || 0);
        });

        const recentActivities = activities.slice(0, 15);

        if (recentActivities.length === 0) {
            activityList.textContent =
                "You don't have any activity yet.";

            return;
        }

        recentActivities.forEach(activity => {
            const item = document.createElement("div");

            item.className = "activity-item";

            const heading = createTextElement(
                "strong",
                "",
                activity.title
            );

            const description = createTextElement(
                "p",
                "",
                activity.description
            );

            const metadata = createTextElement(
                "small",
                "",
                `${activity.kind} · ${formatDate(activity.date)}`
            );

            item.append(
                heading,
                description,
                metadata
            );

            activityList.appendChild(item);
        });

        showMessage(
            activityMessage,
            "Your activity is up to date.",
            true
        );

    } catch (error) {
        console.error("Activity loading error:", error);

        if (activityList) {
            activityList.textContent =
                "Your activity could not be loaded. Please try again later.";
        }

        showMessage(
            activityMessage,
            "Could not load your activity."
        );
    }
}


// =============================================
// 18. EXPORT MY DATA
// =============================================

if (exportDataButton) {
    exportDataButton.addEventListener("click", async () => {
        if (!currentUser) return;

        setButtonLoading(
            exportDataButton,
            true,
            "Preparing..."
        );

        let downloadUrl = null;

        try {
            const [
                profileResult,
                ideasResult,
                notificationsResult
            ] = await Promise.all([

                supabase
                    .from("profiles")
                    .select(`
                        display_name,
                        member_code,
                        status,
                        bio,
                        avatar_url,
                        created_at
                    `)
                    .eq("id", currentUser.id)
                    .single(),

                supabase
                    .from("ideas")
                    .select("id, title, content, created_at")
                    .eq("member_id", currentUser.id),

                supabase
                    .from("notifications")
                    .select("id, title, message, type, is_read, created_at")
                    .eq("user_id", currentUser.id)

            ]);

            if (profileResult.error) throw profileResult.error;
            if (ideasResult.error) throw ideasResult.error;
            if (notificationsResult.error) throw notificationsResult.error;

            const exportData = {
                exported_at: new Date().toISOString(),

                account: {
                    email: currentUser.email || null
                },

                profile: profileResult.data,
                ideas: ideasResult.data || [],
                notifications: notificationsResult.data || []
            };

            const file = new Blob(
                [JSON.stringify(exportData, null, 2)],
                {
                    type: "application/json"
                }
            );

            downloadUrl = URL.createObjectURL(file);

            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = "coreI-my-data.json";

            document.body.appendChild(link);

            link.click();
            link.remove();

            showMessage(
                exportMessage,
                "Your data export has been downloaded.",
                true
            );

        } catch (error) {
            console.error("Data export error:", error);

            showMessage(
                exportMessage,
                error.message || "Could not export your data."
            );

        } finally {
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
            }

            setButtonLoading(
                exportDataButton,
                false,
                "Preparing..."
            );
        }
    });
}


// =============================================
// 19. ACCOUNT DELETION INFORMATION
// =============================================

if (accountDeletionInfoButton && accountDeletionInfo) {
    accountDeletionInfoButton.addEventListener("click", () => {
        const shouldShow = accountDeletionInfo.hidden;

        accountDeletionInfo.hidden = !shouldShow;

        accountDeletionInfoButton.textContent = shouldShow
            ? "Hide information"
            : "Learn about account deletion";
    });
}


// =============================================
// 20. SUPPORT HISTORY ELEMENTS
// =============================================

// Create support history area
const supportHistory = document.createElement("div");

supportHistory.id = "mySupportIssues";
supportHistory.className = "my-support-issues";

supportHistory.innerHTML = `
    <div class="support-history-heading">
        <h3>My support reports</h3>
        <p>Check the status of reports you have sent to coreI.</p>
    </div>

    <div id="mySupportIssuesList" aria-live="polite">
        Loading your reports...
    </div>
`;

if (supportForm) {
    supportForm.insertAdjacentElement(
        "afterend",
        supportHistory
    );
}

const mySupportIssuesList = document.getElementById(
    "mySupportIssuesList"
);


// Display readable report status
function getSupportStatus(status) {
    const statuses = {
        pending: "Waiting for admin",
        in_progress: "Being reviewed",
        resolved: "Resolved"
    };

    return statuses[status] || "Status unavailable";
}


// =============================================
// 21. LOAD MY SUPPORT REPORTS
// =============================================

async function loadMySupportIssues() {
    if (!currentUser || !mySupportIssuesList) return;

    mySupportIssuesList.textContent =
        "Loading your reports...";

    try {
        const { data, error } = await supabase
            .from("support_issues")
            .select(`
                id,
                subject,
                category,
                description,
                status,
                admin_reply,
                created_at,
                updated_at
            `)
            .eq("member_id", currentUser.id)
            .order("created_at", { ascending: false });

        if (error) throw error;

        mySupportIssuesList.replaceChildren();

        if (!data || data.length === 0) {
            mySupportIssuesList.textContent =
                "You haven't submitted any support reports yet.";

            return;
        }

        data.forEach(issue => {
            const card = document.createElement("article");

            card.className = "support-history-card";

            const heading = document.createElement("div");

            heading.className =
                "support-history-card-heading";

            const title = createTextElement(
                "h4",
                "support-history-title",
                issue.subject
            );

            const status = createTextElement(
                "span",
                `support-status support-status-${issue.status}`,
                getSupportStatus(issue.status)
            );

            heading.append(title, status);

            const category = createTextElement(
                "p",
                "support-history-category",
                `Category: ${issue.category}`
            );

            const description = createTextElement(
                "p",
                "support-history-description",
                issue.description
            );

            const date = createTextElement(
                "small",
                "support-history-date",
                `Submitted: ${formatDate(issue.created_at)}`
            );

            card.append(
                heading,
                category,
                description,
                date
            );

            if (issue.admin_reply) {
                const replyBox = document.createElement("div");

                replyBox.className = "support-admin-reply";

                const replyHeading = createTextElement(
                    "strong",
                    "",
                    "Reply from coreI Admin"
                );

                const replyText = createTextElement(
                    "p",
                    "",
                    issue.admin_reply
                );

                replyBox.append(
                    replyHeading,
                    replyText
                );

                card.appendChild(replyBox);

            } else {
                const waiting = createTextElement(
                    "p",
                    "support-waiting-message",
                    "The admin team has not replied yet."
                );

                card.appendChild(waiting);
            }

            mySupportIssuesList.appendChild(card);
        });

    } catch (error) {
        console.error("Support history loading error:", error);

        mySupportIssuesList.textContent =
            "Could not load your reports. Please refresh the page.";
    }
}


// =============================================
// 22. SUBMIT SUPPORT REPORT
// =============================================

if (supportForm) {
    supportForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (!currentUser) {
            showMessage(
                supportFormMessage,
                "Please sign in before submitting a report."
            );

            return;
        }

        const subject =
            supportSubject?.value.trim() || "";

        const description =
            supportMessageInput?.value.trim() || "";

        const selectedCategory =
            supportCategory?.value || "";

        // Older HTML may still contain security.
        // Convert it to the database-supported bug category.
        const category =
            selectedCategory === "security"
                ? "bug"
                : selectedCategory;

        if (subject.length < 3 || subject.length > 150) {
            showMessage(
                supportFormMessage,
                "Your subject must contain between 3 and 150 characters."
            );

            return;
        }

        if (!ALLOWED_SUPPORT_CATEGORIES.includes(category)) {
            showMessage(
                supportFormMessage,
                "Please select a valid report category."
            );

            return;
        }

        if (
            description.length < 10 ||
            description.length > 5000
        ) {
            showMessage(
                supportFormMessage,
                "Your description must contain between 10 and 5000 characters."
            );

            return;
        }

        setButtonLoading(
            submitSupportButton,
            true,
            "Sending..."
        );

        try {
            const { error } = await supabase
                .from("support_issues")
                .insert({
                    member_id: currentUser.id,
                    subject: subject,
                    category: category,
                    description: description
                });

            if (error) throw error;

            supportForm.reset();

            showMessage(
                supportFormMessage,
                "Your report has been sent successfully. The coreI admin team can now review it.",
                true
            );

            await loadMySupportIssues();

        } catch (error) {
            console.error("Support submission error:", error);

            showMessage(
                supportFormMessage,
                error.message ||
                "Your report could not be sent. Please try again."
            );

        } finally {
            setButtonLoading(
                submitSupportButton,
                false,
                "Sending..."
            );
        }
    });
}


// =============================================
// 23. SEARCH KEYBOARD SHORTCUT
// =============================================

document.addEventListener("keydown", event => {
    const searchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";

    if (searchShortcut && settingsSearch) {
        event.preventDefault();

        settingsSearch.focus();
    }

    if (event.key === "Escape" && settingsSearch) {
        settingsSearch.value = "";

        filterSettings();

        settingsSearch.blur();
    }
});


// =============================================
// 24. CLEAN UP PHOTO PREVIEW
// =============================================

window.addEventListener("beforeunload", () => {
    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
    }
});


// =============================================
// 25. SIGN OUT
// =============================================

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        setButtonLoading(
            logoutButton,
            true,
            "Signing out..."
        );

        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            window.location.replace("./login.html");

        } catch (error) {
            console.error("Sign out error:", error);

            showMessage(
                logoutMessage,
                error.message || "Could not sign out."
            );

            setButtonLoading(
                logoutButton,
                false,
                "Signing out..."
            );
        }
    });
}


// =============================================
// 26. START SETTINGS
// =============================================

loadSettings();

console.log("coreI Settings system loaded successfully.");
