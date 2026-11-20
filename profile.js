
import { supabase } from "./supabase.js";

// =============================================
// coreI — PROFILE SYSTEM
// Loads the signed-in member's profile and ideas
// =============================================


// =============================================
// 1. PAGE ELEMENTS
// =============================================

const profilePhoto = document.getElementById("profilePhoto");
const profileName = document.getElementById("profileName");
const profileMemberCode = document.getElementById("profileMemberCode");
const profileStatus = document.getElementById("profileStatus");

const profileBio = document.getElementById("profileBio");
const sidebarBio = document.getElementById("sidebarBio");

const profileJoinedDate = document.getElementById("profileJoinedDate");
const aboutJoinedDate = document.getElementById("aboutJoinedDate");

const profileLocation = document.getElementById("profileLocation");

const myIdeasList = document.getElementById("myIdeasList");

const adminCard = document.getElementById("adminCard");
const adminDashboardButton = document.getElementById("adminDashboardButton");


// =============================================
// 2. DEFAULT SETTINGS
// =============================================

const DEFAULT_PROFILE_PHOTO = "./images/default-profile.png";


// These sections will remain hidden until
// their database and privacy systems are ready.

const unfinishedSections = [
    "learningGoalsSection",
    "skillsSection",
    "interestsSection",
    "exploreTopicsSection",
    "careerSection",
    "hobbiesSection",
    "learningProgressSection",
    "milestonesSection",
    "contributionsSection",
    "weeklyReflectionSection",
    "journalSection",
    "resourcesSection",
    "savedIdeasSection"
];

function hideUnfinishedSections() {
    unfinishedSections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
            section.hidden = true;
        }
    });
}


// =============================================
// 3. HELPER FUNCTIONS
// =============================================

// Display a date in a simple format.

function formatDate(dateValue) {
    if (!dateValue) {
        return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Not available";
    }

    return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


// Safely display text inside an element.

function setText(element, value, fallback = "") {
    if (!element) return;

    element.textContent = value || fallback;
}


// Display a message when there are no ideas.

function showIdeasMessage(message) {
    if (!myIdeasList) return;

    const messageElement = document.createElement("div");

    messageElement.className = "empty-card";
    messageElement.textContent = message;

    myIdeasList.replaceChildren(messageElement);
}


// =============================================
// 4. CHECK MEMBER LOGIN
// =============================================

async function checkMemberLogin() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error || !user) {
        window.location.href = "./login.html";
        return null;
    }

    return user;
}


// =============================================
// 5. LOAD MEMBER PROFILE
// =============================================

async function loadMemberProfile(user) {

    const { data: profile, error } = await supabase
        .from("profiles")
        .select(`
            display_name,
            member_code,
            status,
            role,
            created_at,
            bio,
            avatar_url
        `)
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        console.error("Profile loading error:", error);

        setText(
            profileName,
            "Profile unavailable"
        );

        setText(
            profileBio,
            "We could not load your profile information."
        );

        return null;
    }


    // =========================================
    // MEMBER NAME
    // =========================================

    setText(
        profileName,
        profile.display_name,
        "coreI Member"
    );


    // =========================================
    // MEMBER CODE
    // =========================================

    setText(
        profileMemberCode,
        profile.member_code,
        "Member code unavailable"
    );


    // =========================================
    // MEMBER STATUS
    // =========================================

    setText(
        profileStatus,
        profile.status || "Member"
    );


    // =========================================
    // MEMBER BIO
    // =========================================

    const bioText = profile.bio || "No introduction added yet.";

    setText(profileBio, bioText);
    setText(sidebarBio, bioText);


    // =========================================
    // JOINING DATE
    // =========================================

    const joinedDate = formatDate(profile.created_at);

    setText(profileJoinedDate, joinedDate);
    setText(aboutJoinedDate, joinedDate);


    // =========================================
    // PROFILE PHOTO
    // =========================================

    if (profilePhoto) {

        profilePhoto.onerror = function () {
            this.onerror = null;
            this.src = DEFAULT_PROFILE_PHOTO;
        };

        profilePhoto.src =
            profile.avatar_url || DEFAULT_PROFILE_PHOTO;

        profilePhoto.alt =
            `${profile.display_name || "Member"}'s profile photo`;
    }


    // =========================================
    // LOCATION
    // =========================================

    // Location is not currently stored in the
    // profiles table, so do not display fake data.

    if (profileLocation) {
        profileLocation.hidden = true;
    }


    // =========================================
    // ADMIN ACCESS BUTTON
    // =========================================

    if (adminCard) {
        adminCard.hidden = true;
    }

    const isApprovedAdmin =
        profile.role === "admin" &&
        profile.status === "approved";

    if (isApprovedAdmin && adminCard) {

        adminCard.hidden = false;

        if (adminDashboardButton) {

            adminDashboardButton.addEventListener("click", () => {
                window.location.href = "./admin.html";
            });

        }
    }

    return profile;
}


// =============================================
// 6. LOAD MEMBER'S PUBLISHED IDEAS
// =============================================

async function loadMemberIdeas(user) {

    if (!myIdeasList) return;

    myIdeasList.textContent = "Loading your ideas...";

    const { data: ideas, error } = await supabase
        .from("ideas")
        .select(`
            id,
            title,
            content,
            created_at
        `)
        .eq("member_id", user.id)
        .order("created_at", { ascending: false });


    // =========================================
    // HANDLE DATABASE ERROR
    // =========================================

    if (error) {

        console.error("Ideas loading error:", error);

        showIdeasMessage(
            "We could not load your ideas. Please try again later."
        );

        return;
    }


    // =========================================
    // CHECK EMPTY IDEAS
    // =========================================

    if (!ideas || ideas.length === 0) {

        showIdeasMessage(
            "You haven't published any ideas yet. Your shared ideas will appear here."
        );

        return;
    }


    // =========================================
    // DISPLAY IDEAS
    // =========================================

    const ideasContainer = document.createDocumentFragment();

    ideas.forEach((idea) => {

        // Create idea card.

        const ideaCard = document.createElement("article");

        ideaCard.className = "idea-card";


        // Idea title.

        const title = document.createElement("h3");

        title.textContent = idea.title || "Untitled idea";


        // Idea content.

        const content = document.createElement("p");

        content.textContent =
            idea.content || "No description provided.";


        // Publishing date.

        const date = document.createElement("span");

        date.className = "idea-date";

        date.textContent = formatDate(idea.created_at);


        // Add elements to card.

        ideaCard.append(
            title,
            content,
            date
        );

        ideasContainer.appendChild(ideaCard);

    });


    // Show all ideas.

    myIdeasList.replaceChildren(ideasContainer);
}


// =============================================
// 7. START PROFILE PAGE
// =============================================

async function startProfilePage() {

    // Hide unfinished sections.

    hideUnfinishedSections();


    // Check login.

    const user = await checkMemberLogin();

    if (!user) return;


    // Load profile information.

    await loadMemberProfile(user);


    // Load published ideas.

    await loadMemberIdeas(user);

}


// =============================================
// 8. RUN PROFILE SYSTEM
// =============================================

startProfilePage();
