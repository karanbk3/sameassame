import { supabase } from "./supabase.js";


// =============================================
// 1. PAGE ELEMENTS
// =============================================

// Header
const guestActions = document.getElementById("guestActions");
const memberActions = document.getElementById("memberActions");
const logoutButton = document.getElementById("logoutButton");

// Main sections
const homeSection = document.getElementById("homeSection");

// Welcome
const personalGreeting = document.getElementById("personalGreeting");
const personalWelcomeMessage = document.getElementById("personalWelcomeMessage");

// Idea form
const ideaForm = document.getElementById("ideaForm");
const ideaFormCard = document.getElementById("ideaFormCard");
const loginPrompt = document.getElementById("loginPrompt");
const ideaTitle = document.getElementById("ideaTitle");
const ideaContent = document.getElementById("ideaContent");
const ideaFormMessage = document.getElementById("ideaFormMessage");
const publishIdeaButton = document.getElementById("publishIdeaButton");

// Community ideas
const ideasList = document.getElementById("ideasList");
const featuredIdeasList = document.getElementById("featuredIdeasList");

// Announcements
const announcementsList = document.getElementById("announcementsList");

// Notifications
const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotifications = document.getElementById("closeNotifications");
const notificationCount = document.getElementById("notificationCount");
const notificationList = document.getElementById("notificationList");

// Theme
const themeToggleButton = document.getElementById("themeToggleButton");

// Default profile image
const DEFAULT_AVATAR = "./images/default-profile.png";


// =============================================
// 2. MEMBER INFORMATION
// =============================================

let currentUser = null;
let currentProfile = null;


// =============================================
// 3. HEADER
// =============================================

function updateHeader(isLoggedIn) {

    if (guestActions) {
        guestActions.hidden = isLoggedIn;
    }

    if (memberActions) {
        memberActions.hidden = !isLoggedIn;
    }

}


// =============================================
// 4. THEME SWITCHER
// =============================================

const systemTheme = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;


function getSavedTheme() {

    try {

        const savedTheme = localStorage.getItem("coreI-theme");

        if (["light", "dark", "system"].includes(savedTheme)) {
            return savedTheme;
        }

    } catch (error) {

        console.warn("Unable to read theme preference:", error);

    }

    return "system";

}


function getActiveTheme(preference) {

    if (preference === "light" || preference === "dark") {
        return preference;
    }

    return systemTheme?.matches ? "dark" : "light";

}


function applyTheme(preference = getSavedTheme()) {

    const activeTheme = getActiveTheme(preference);

    document.body.classList.toggle(
        "dark-theme",
        activeTheme === "dark"
    );

    if (themeToggleButton) {

        const icon = themeToggleButton.querySelector("i");

        if (icon) {

            icon.className = activeTheme === "dark"
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

        }

        themeToggleButton.setAttribute(
            "aria-label",
            activeTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeColor) {

        themeColor.content = activeTheme === "dark"
            ? "#101D1C"
            : "#123B3A";

    }

}


// Apply saved theme.
applyTheme();


// Change theme.
if (themeToggleButton) {

    themeToggleButton.addEventListener("click", () => {

        const currentTheme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";

        const newTheme = currentTheme === "dark"
            ? "light"
            : "dark";

        try {

            localStorage.setItem("coreI-theme", newTheme);

        } catch (error) {

            console.warn("Unable to save theme:", error);

        }

        applyTheme(newTheme);

    });

}


// Follow system theme when no manual preference is saved.
if (systemTheme) {

    systemTheme.addEventListener("change", () => {

        if (getSavedTheme() === "system") {
            applyTheme("system");
        }

    });

}


// =============================================
// 5. HELPER FUNCTIONS
// =============================================

function showMessage(element, message, type = "") {

    if (!element) return;

    element.textContent = message;
    element.className = "form-message";

    if (type) {
        element.classList.add(type);
    }

}


function formatDate(date) {

    if (!date) return "";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
        return "";
    }

    return formattedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

}


function createEmptyMessage(message) {

    const container = document.createElement("div");
    container.className = "empty-card";

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    container.appendChild(paragraph);

    return container;

}


function createTextElement(tagName, className, text) {

    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    element.textContent = text || "";

    return element;

}


function getTodayKey() {

    const today = new Date();

    return Number(
        `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`
    );

}


// =============================================
// 6. PERSONAL WELCOME
// =============================================

function updatePersonalWelcome(profile) {

    if (!personalGreeting || !personalWelcomeMessage) return;

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good morning";

    } else if (hour < 17) {

        greeting = "Good afternoon";

    } else {

        greeting = "Good evening";

    }

    // Show a general welcome to visitors.
    if (!profile) {

        personalGreeting.textContent = "Welcome to coreI!";

        personalWelcomeMessage.textContent =
            "Every day is an opportunity to discover something new. " +
            "Explore your interests, discover ideas and connect with different perspectives.";

        return;

    }

    const displayName =
        profile.display_name?.trim() || "Explorer";

    personalGreeting.textContent =
        `${greeting}, ${displayName}!`;

    personalWelcomeMessage.textContent =
        "Every day is an opportunity to discover something new. " +
        "Explore your interests, share your thoughts and connect with others.";

}


// =============================================
// 7. IDEA OF THE DAY
// =============================================

const dailyIdeas = [

    {
        category: "CURIOSITY",
        title: "Small questions can lead to big discoveries.",
        description: "Stay curious and take time to understand the world around you."
    },

    {
        category: "KNOWLEDGE",
        title: "Understanding is more valuable than memorising.",
        description: "Take time to understand how things work and why they matter."
    },

    {
        category: "CREATIVITY",
        title: "Your next great idea might start with a question.",
        description: "Explore different possibilities and think differently."
    },

    {
        category: "TECHNOLOGY",
        title: "Technology creates new possibilities.",
        description: "Discover how technology can solve problems and improve everyday life."
    },

    {
        category: "DISCOVERY",
        title: "Explore what genuinely interests you.",
        description: "You can discover new interests by looking beyond what you already know."
    },

    {
        category: "KNOWLEDGE",
        title: "Every question is an opportunity to discover.",
        description: "Never stop asking why. Curiosity opens the door to new ideas."
    },

    {
        category: "CREATIVITY",
        title: "Don't wait for the perfect moment to begin.",
        description: "Start with what you have and improve your ideas along the way."
    },

    {
        category: "PERSPECTIVE",
        title: "Different perspectives help us understand more.",
        description: "Listen to other people and consider ideas from different points of view."
    },

    {
        category: "DISCOVERY",
        title: "Look beyond what you already know.",
        description: "A new interest can introduce you to possibilities you never expected."
    },

    {
        category: "COMMUNITY",
        title: "Sharing an idea can inspire someone else.",
        description: "Your thoughts and experiences may help another person see something differently."
    },

    {
        category: "INNOVATION",
        title: "Good ideas often begin with everyday problems.",
        description: "Notice the small challenges around you. They might inspire something useful."
    },

    {
        category: "SELF DISCOVERY",
        title: "Give yourself permission to explore.",
        description: "Your interests can change. Discovering something new is always worthwhile."
    }

];


function updateIdeaOfTheDay() {

    const ideaContainer = document.getElementById("ideaOfTheDay");

    if (!ideaContainer) return;

    const ideaIndex = getTodayKey() % dailyIdeas.length;
    const selectedIdea = dailyIdeas[ideaIndex];

    ideaContainer.innerHTML = "";

    const category = createTextElement(
        "p",
        "idea-category",
        selectedIdea.category
    );

    const title = createTextElement(
        "h3",
        "",
        selectedIdea.title
    );

    const description = createTextElement(
        "p",
        "",
        selectedIdea.description
    );

    ideaContainer.append(
        category,
        title,
        description
    );

}


// =============================================
// 8. PAGE NAVIGATION
// =============================================

function openSection(sectionId) {

    const targetSection = document.getElementById(sectionId);

    if (
        !targetSection ||
        !targetSection.classList.contains("page-section")
    ) {
        return;
    }

    document.querySelectorAll(".page-section").forEach(section => {

        section.classList.remove("active");

    });

    targetSection.classList.add("active");

    document.querySelectorAll(".nav-button[data-page]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === sectionId
        );

    });

    if (notificationPanel) {
        notificationPanel.hidden = true;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Handle section navigation.
document.querySelectorAll("[data-page]").forEach(button => {

    button.addEventListener("click", event => {

        if (button.tagName === "A") return;

        event.preventDefault();

        openSection(button.dataset.page);

    });

});


// Open Home by default.
if (homeSection) {
    openSection("homeSection");
}


// =============================================
// 9. CHECK LOGIN STATUS
// =============================================

async function checkMemberAccess() {

    try {

        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError) throw userError;

        currentUser = userData.user;

        // No signed-in user.
        if (!currentUser) {

            currentProfile = null;

            updateHeader(false);
            updatePersonalWelcome(null);

            if (ideaForm) {
                ideaForm.hidden = true;
            }

            if (loginPrompt) {
                loginPrompt.hidden = false;
            }

            if (notificationButton) {
                notificationButton.disabled = true;
            }

            return false;

        }


        // Anonymous accounts are not normal registered accounts.
        if (currentUser.is_anonymous) {

            currentProfile = null;

            updateHeader(false);
            updatePersonalWelcome(null);

            if (ideaForm) {
                ideaForm.hidden = true;
            }

            if (loginPrompt) {
                loginPrompt.hidden = false;
            }

            if (notificationButton) {
                notificationButton.disabled = true;
            }

            return false;

        }


        // Get the registered user's profile.
        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select(`
                    display_name,
                    member_code,
                    status,
                    role,
                    bio,
                    avatar_url
                `)
                .eq("id", currentUser.id)
                .single();

        if (profileError) throw profileError;

        currentProfile = profile;

        updateHeader(true);
        updatePersonalWelcome(profile);


        // A rejected account cannot publish.
        // Normal registered accounts do not need admin approval.
        const canPublish = profile.status !== "rejected";

        if (ideaForm) {
            ideaForm.hidden = !canPublish;
        }

        if (loginPrompt) {
            loginPrompt.hidden = true;
        }

        if (notificationButton) {
            notificationButton.disabled = !canPublish;
        }

        if (!canPublish) {

            showMessage(
                ideaFormMessage,
                "This account cannot currently publish ideas.",
                "error"
            );

            return false;

        }

        return true;

    } catch (error) {

        console.error("Login status error:", error);

        currentUser = null;
        currentProfile = null;

        updateHeader(false);
        updatePersonalWelcome(null);

        if (ideaForm) {
            ideaForm.hidden = true;
        }

        if (loginPrompt) {
            loginPrompt.hidden = false;
        }

        if (notificationButton) {
            notificationButton.disabled = true;
        }

        return false;

    }

}


// =============================================
// 10. CREATE COMMUNITY IDEA CARD
// =============================================

function createIdeaCard(idea) {

    const card = document.createElement("article");
    card.className = "idea-card";


    // Get author profile.
    const author = Array.isArray(idea.profiles)
        ? idea.profiles[0]
        : idea.profiles;


    // Author section.
    const authorContainer = document.createElement("div");
    authorContainer.className = "idea-author";


    // Author image.
    const avatar = document.createElement("img");

    avatar.className = "idea-author-photo";
    avatar.src = author?.avatar_url || DEFAULT_AVATAR;
    avatar.alt = "Member profile photo";

    avatar.onerror = () => {

        avatar.onerror = null;
        avatar.src = DEFAULT_AVATAR;

    };


    // Author name.
    const authorDetails = document.createElement("div");
    authorDetails.className = "idea-author-details";

    const authorName = createTextElement(
        "strong",
        "",
        author?.display_name || "coreI Member"
    );

    const memberCode = createTextElement(
        "small",
        "",
        author?.member_code
            ? `Member ${author.member_code}`
            : "Community Member"
    );

    authorDetails.append(
        authorName,
        memberCode
    );

    authorContainer.append(
        avatar,
        authorDetails
    );


    // Date.
    const date = createTextElement(
        "small",
        "idea-date",
        formatDate(idea.created_at)
    );


    // Idea title.
    const title = createTextElement(
        "h3",
        "",
        idea.title
    );


    // Idea content.
    const content = createTextElement(
        "p",
        "idea-content",
        idea.content
    );


    // Action buttons.
    const actions = document.createElement("div");
    actions.className = "idea-actions";


    // Star information.
    const stars = idea.idea_stars || [];

    const hasStarred = currentUser
        ? stars.some(star => star.member_id === currentUser.id)
        : false;


    // Star button.
    const starButton = document.createElement("button");

    starButton.className = "star-button";
    starButton.type = "button";

    starButton.textContent =
        `${hasStarred ? "★ Starred" : "☆ Star"} (${stars.length})`;

    if (!currentUser || currentUser.is_anonymous) {
        starButton.title = "Sign in to react to this idea";
    }

    starButton.addEventListener("click", async () => {

        // Require a normal signed-in account for this action.
        if (!currentUser || currentUser.is_anonymous) {

            alert("Please log in before reacting to an idea.");

            window.location.href = "./login.html";

            return;

        }

        starButton.disabled = true;

        try {

            if (hasStarred) {

                const { error } = await supabase
                    .from("idea_stars")
                    .delete()
                    .eq("idea_id", idea.id)
                    .eq("member_id", currentUser.id);

                if (error) throw error;

            } else {

                const { error } = await supabase
                    .from("idea_stars")
                    .insert({
                        idea_id: idea.id,
                        member_id: currentUser.id
                    });

                if (error) throw error;

            }

            await loadIdeas();

        } catch (error) {

            console.error("Star error:", error);

            alert("Unable to update your reaction. Please try again.");

            starButton.disabled = false;

        }

    });

    actions.appendChild(starButton);


    // Owner or admin can delete an idea.
    const isOwner =
        currentUser && idea.member_id === currentUser.id;

    const isAdmin =
        currentProfile?.role === "admin";

    if (isOwner || isAdmin) {

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-idea-button";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {

            const confirmed = confirm(
                "Are you sure you want to delete this idea?"
            );

            if (!confirmed) return;

            deleteButton.disabled = true;

            try {

                const { error } = await supabase
                    .from("ideas")
                    .delete()
                    .eq("id", idea.id);

                if (error) throw error;

                await loadIdeas();

            } catch (error) {

                console.error("Delete error:", error);

                alert("Unable to delete this idea.");

                deleteButton.disabled = false;

            }

        });

        actions.appendChild(deleteButton);

    }


    card.append(
        authorContainer,
        date,
        title,
        content,
        actions
    );

    return card;

}


// =============================================
// 11. LOAD COMMUNITY IDEAS
// =============================================

async function loadIdeas() {

    if (!ideasList && !featuredIdeasList) return;

    try {

        if (ideasList) {
            ideasList.innerHTML = "";
            ideasList.appendChild(
                createEmptyMessage("Loading community ideas...")
            );
        }

        if (featuredIdeasList) {
            featuredIdeasList.innerHTML = "";
            featuredIdeasList.appendChild(
                createEmptyMessage("Loading shared ideas...")
            );
        }


        // Load ideas without requiring a login.
        const { data: ideas, error } = await supabase
            .from("ideas")
            .select(`
                id,
                title,
                content,
                member_id,
                created_at,
                profiles!ideas_member_id_fkey (
                    display_name,
                    member_code,
                    avatar_url
                ),
                idea_stars (
                    member_id
                )
            `)
            .order("created_at", {
                ascending: false
            });

        if (error) throw error;


        if (ideasList) {
            ideasList.innerHTML = "";
        }

        if (featuredIdeasList) {
            featuredIdeasList.innerHTML = "";
        }


        // No ideas yet.
        if (!ideas || ideas.length === 0) {

            if (ideasList) {

                ideasList.appendChild(
                    createEmptyMessage(
                        "No ideas have been shared yet. Be the first to share one!"
                    )
                );

            }

            if (featuredIdeasList) {

                featuredIdeasList.appendChild(
                    createEmptyMessage(
                        "Your community's first ideas will appear here."
                    )
                );

            }

            return;

        }


        // Display all ideas in Express.
        if (ideasList) {

            ideas.forEach(idea => {

                ideasList.appendChild(
                    createIdeaCard(idea)
                );

            });

        }


        // Display the latest three ideas on Home.
        if (featuredIdeasList) {

            ideas.slice(0, 3).forEach(idea => {

                featuredIdeasList.appendChild(
                    createIdeaCard(idea)
                );

            });

        }

    } catch (error) {

        console.error("Loading ideas error:", error);

        if (ideasList) {

            ideasList.innerHTML = "";

            ideasList.appendChild(
                createEmptyMessage(
                    "Unable to load ideas. Please check your connection or refresh the page."
                )
            );

        }

        if (featuredIdeasList) {

            featuredIdeasList.innerHTML = "";

            featuredIdeasList.appendChild(
                createEmptyMessage(
                    "Unable to load shared ideas right now."
                )
            );

        }

    }

}


// =============================================
// 12. PUBLISH NEW IDEA
// =============================================

if (ideaForm) {

    ideaForm.addEventListener("submit", async event => {

        event.preventDefault();


        // Only normal registered users can publish.
        if (
            !currentUser ||
            currentUser.is_anonymous ||
            !currentProfile ||
            currentProfile.status === "rejected"
        ) {

            showMessage(
                ideaFormMessage,
                "Please log in with a registered account before sharing ideas.",
                "error"
            );

            return;

        }


        const title = ideaTitle?.value.trim() || "";
        const content = ideaContent?.value.trim() || "";


        // Validate title.
        if (title.length < 3 || title.length > 120) {

            showMessage(
                ideaFormMessage,
                "Your title must contain between 3 and 120 characters.",
                "error"
            );

            return;

        }


        // Validate content.
        if (content.length < 10 || content.length > 5000) {

            showMessage(
                ideaFormMessage,
                "Your idea must contain between 10 and 5000 characters.",
                "error"
            );

            return;

        }


        // Disable button while publishing.
        if (publishIdeaButton) {

            publishIdeaButton.disabled = true;
            publishIdeaButton.textContent = "Sharing...";

        }

        showMessage(ideaFormMessage, "");


        try {

            const { error } = await supabase
                .from("ideas")
                .insert({
                    member_id: currentUser.id,
                    title: title,
                    content: content
                });

            if (error) throw error;


            // Clear the form.
            ideaForm.reset();


            showMessage(
                ideaFormMessage,
                "Your idea has been shared successfully!",
                "success"
            );


            // Refresh community ideas.
            await loadIdeas();

        } catch (error) {

            console.error("Publishing error:", error);

            showMessage(
                ideaFormMessage,
                "Unable to share your idea. Your account may not have permission yet.",
                "error"
            );

        } finally {

            if (publishIdeaButton) {

                publishIdeaButton.disabled = false;

                publishIdeaButton.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Share your idea';

            }

        }

    });

}


// =============================================
// 13. LOAD NOTIFICATIONS
// =============================================

async function loadNotifications() {

    if (
        !currentUser ||
        currentUser.is_anonymous ||
        !currentProfile ||
        currentProfile.status === "rejected"
    ) {
        return;
    }

    if (!notificationList) return;


    try {

        const { data: notifications, error } = await supabase
            .from("notifications")
            .select(`
                id,
                title,
                message,
                type,
                is_read,
                created_at
            `)
            .eq("user_id", currentUser.id)
            .order("created_at", {
                ascending: false
            });

        if (error) throw error;


        const notificationItems = notifications || [];

        notificationList.innerHTML = "";


        // Count unread notifications.
        const unreadCount = notificationItems.filter(item => {

            return !item.is_read;

        }).length;


        if (notificationCount) {

            notificationCount.textContent = unreadCount;
            notificationCount.hidden = unreadCount === 0;

        }


        // Empty state.
        if (notificationItems.length === 0) {

            notificationList.appendChild(
                createEmptyMessage(
                    "You don't have any notifications yet."
                )
            );

            return;

        }


        // Display notifications.
        notificationItems.forEach(notification => {

            const card = document.createElement("div");

            card.className = "notification-card";

            if (!notification.is_read) {
                card.classList.add("unread");
            }


            const title = createTextElement(
                "h3",
                "",
                notification.title || "Notification"
            );

            const message = createTextElement(
                "p",
                "",
                notification.message || ""
            );

            const date = createTextElement(
                "small",
                "",
                formatDate(notification.created_at)
            );

            const status = createTextElement(
                "span",
                "notification-status",
                notification.is_read ? "Read" : "New"
            );


            card.append(
                title,
                message,
                date,
                status
            );


            // Mark as read when clicked.
            card.addEventListener("click", async () => {

                if (notification.is_read) return;

                card.style.pointerEvents = "none";

                try {

                    const { error: updateError } = await supabase
                        .from("notifications")
                        .update({
                            is_read: true
                        })
                        .eq("id", notification.id)
                        .eq("user_id", currentUser.id);

                    if (updateError) throw updateError;


                    notification.is_read = true;

                    card.classList.remove("unread");
                    status.textContent = "Read";


                    const remainingUnread =
                        notificationItems.filter(item => !item.is_read).length;

                    if (notificationCount) {

                        notificationCount.textContent = remainingUnread;
                        notificationCount.hidden = remainingUnread === 0;

                    }

                } catch (error) {

                    console.error("Notification update error:", error);

                } finally {

                    card.style.pointerEvents = "";

                }

            });


            notificationList.appendChild(card);

        });

    } catch (error) {

        console.error("Notifications error:", error);

        notificationList.innerHTML = "";

        notificationList.appendChild(
            createEmptyMessage(
                "Unable to load notifications. Please try again."
            )
        );

    }

}


// =============================================
// 14. NOTIFICATION PANEL CONTROLS
// =============================================

if (notificationButton) {

    notificationButton.addEventListener("click", async () => {

        if (notificationButton.disabled) return;

        if (!notificationPanel) return;

        notificationPanel.hidden = !notificationPanel.hidden;

        if (!notificationPanel.hidden) {
            await loadNotifications();
        }

    });

}


if (closeNotifications) {

    closeNotifications.addEventListener("click", () => {

        if (notificationPanel) {
            notificationPanel.hidden = true;
        }

    });

}


// Close notifications when clicking outside.
document.addEventListener("click", event => {

    if (!notificationPanel || notificationPanel.hidden) return;

    const clickedInside =
        notificationPanel.contains(event.target) ||
        notificationButton?.contains(event.target);

    if (!clickedInside) {
        notificationPanel.hidden = true;
    }

});


// =============================================
// 15. LOAD ANNOUNCEMENTS
// =============================================

async function loadAnnouncements() {

    if (!announcementsList) return;

    announcementsList.innerHTML = "";

    announcementsList.appendChild(
        createEmptyMessage("Loading announcements...")
    );


    try {

        const { data: announcements, error } = await supabase
            .from("announcements")
            .select(`
                id,
                title,
                description,
                created_at,
                is_published
            `)
            .eq("is_published", true)
            .order("created_at", {
                ascending: false
            });

        if (error) throw error;


        announcementsList.innerHTML = "";


        if (!announcements || announcements.length === 0) {

            announcementsList.appendChild(
                createEmptyMessage(
                    "No announcements have been published yet. Check back soon!"
                )
            );

            return;

        }


        announcements.forEach(announcement => {

            const card = document.createElement("article");

            card.className = "announcement-card";


            const title = createTextElement(
                "h3",
                "",
                announcement.title || "Untitled announcement"
            );

            const description = createTextElement(
                "p",
                "",
                announcement.description || "No additional details provided."
            );

            const date = createTextElement(
                "small",
                "announcement-date",
                formatDate(announcement.created_at)
            );


            card.append(
                title,
                description,
                date
            );

            announcementsList.appendChild(card);

        });

    } catch (error) {

        console.error("Announcements loading error:", error);

        announcementsList.innerHTML = "";

        announcementsList.appendChild(
            createEmptyMessage(
                "We couldn't load announcements. Please refresh and try again."
            )
        );

    }

}


// =============================================
// 16. SIGN OUT
// =============================================

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        const confirmed = confirm(
            "Are you sure you want to sign out?"
        );

        if (!confirmed) return;

        logoutButton.disabled = true;

        try {

            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            window.location.replace("./main.html");

        } catch (error) {

            console.error("Sign out error:", error);

            alert("Unable to sign out. Please try again.");

            logoutButton.disabled = false;

        }

    });

}


// =============================================
// 17. START APPLICATION
// =============================================

async function startApplication() {

    // Display today's idea.
    updateIdeaOfTheDay();

    // Check login status.
    const canUseMemberFeatures = await checkMemberAccess();

    // Public content loads for visitors too.
    await Promise.all([
        loadAnnouncements(),
        loadIdeas()
    ]);

    // Personal notifications need a registered account.
    if (canUseMemberFeatures) {
        await loadNotifications();
    }

}


// =============================================
// 18. START COREI
// =============================================

startApplication();