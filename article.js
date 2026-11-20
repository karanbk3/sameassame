
import { supabase } from "./supabase.js";

/* =========================================
   coreI — ARTICLE READING SYSTEM
========================================= */


/* =========================================
   1. PAGE ELEMENTS
========================================= */

const articleLoading = document.getElementById("articleLoading");
const articleError = document.getElementById("articleError");
const articleErrorMessage = document.getElementById("articleErrorMessage");
const retryArticleButton = document.getElementById("retryArticleButton");

const articleContent = document.getElementById("articleContent");

const articleCategoryLink = document.getElementById("articleCategoryLink");
const articleCategory = document.getElementById("articleCategory");
const articleLanguage = document.getElementById("articleLanguage");

const articleTitle = document.getElementById("articleTitle");
const articleDescription = document.getElementById("articleDescription");

const articleAuthor = document.getElementById("articleAuthor");
const authorAvatar = document.getElementById("authorAvatar");

const articleDate = document.getElementById("articleDate");
const articleReadingTime = document.getElementById("articleReadingTime");

const articleCoverWrapper = document.getElementById("articleCoverWrapper");
const articleCover = document.getElementById("articleCover");

const articleBody = document.getElementById("articleBody");

const editorInformation = document.getElementById("editorInformation");
const articleEditor = document.getElementById("articleEditor");

const articleSourceSection = document.getElementById("articleSourceSection");
const articleSourceLink = document.getElementById("articleSourceLink");

const articleStarButton = document.getElementById("articleStarButton");
const articleStarIcon = document.getElementById("articleStarIcon");
const articleStarText = document.getElementById("articleStarText");
const articleStarCount = document.getElementById("articleStarCount");

const backToCategory = document.getElementById("backToCategory");
const currentYear = document.getElementById("currentYear");


/* =========================================
   2. PAGE INFORMATION
========================================= */

const articleId = new URLSearchParams(window.location.search).get("id");

let currentUser = null;
let currentArticle = null;
let isApprovedMember = false;
let hasAppreciated = false;
let appreciationCount = 0;
let appreciationBusy = false;


/* =========================================
   3. PAGE MESSAGE
========================================= */

function showLoading() {
    articleLoading.hidden = false;
    articleError.hidden = true;
    articleContent.hidden = true;
}

function showError(message) {
    articleLoading.hidden = true;
    articleContent.hidden = true;
    articleError.hidden = false;

    articleErrorMessage.textContent = message;
}

function showArticle() {
    articleLoading.hidden = true;
    articleError.hidden = true;
    articleContent.hidden = false;
}


/* =========================================
   4. SAFE URL CHECK
========================================= */

function getSafeURL(value) {
    if (!value || typeof value !== "string") {
        return null;
    }

    try {
        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

        return null;

    } catch {
        return null;
    }
}


/* =========================================
   5. DATE FORMAT
========================================= */

function formatDate(dateValue) {
    if (!dateValue) {
        return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =========================================
   6. READING TIME
========================================= */

function calculateReadingTime(content) {
    const words = content.trim().split(/\s+/).filter(Boolean).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
}


/* =========================================
   7. MEMBER ACCESS
========================================= */

async function checkMemberAccess() {
    try {
        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError) {
            throw userError;
        }

        currentUser = userData.user;

        if (!currentUser) {
            isApprovedMember = false;
            return;
        }

        const { data, error } = await supabase.rpc(
            "is_corei_approved_member"
        );

        if (error) {
            throw error;
        }

        isApprovedMember = data === true;

    } catch (error) {
        console.error("Member access error:", error);

        currentUser = null;
        isApprovedMember = false;
    }
}


/* =========================================
   8. LOAD ARTICLE FROM SUPABASE
========================================= */

async function loadArticle() {
    showLoading();

    if (!articleId) {
        showError("This article link is incomplete. Please return to Discover and choose an article.");
        return;
    }

    try {
        await checkMemberAccess();

        if (!currentUser || !isApprovedMember) {
            showError(
                "Please sign in with an approved coreI member account to read this article."
            );
            return;
        }

        const { data, error } = await supabase
            .from("reading_articles")
            .select(`
                id,
                title,
                category,
                language,
                author_name,
                editor_name,
                description,
                cover_url,
                content,
                source_url,
                published_at,
                created_at,
                is_featured
            `)
            .eq("id", articleId)
            .eq("status", "published")
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error("This article could not be found.");
        }

        currentArticle = data;

        displayArticle(data);

        showArticle();

        await loadAppreciation();

    } catch (error) {
        console.error("Article loading error:", error);

        showError(
            "We couldn't load this article. Please check your connection or try again."
        );
    }
}


/* =========================================
   9. DISPLAY ARTICLE
========================================= */

function displayArticle(article) {

    // Page title
    document.title = `${article.title} — coreI`;

    // Category
    articleCategory.textContent = article.category || "Reading";

    // Category navigation
    articleCategoryLink.textContent = article.category || "Category";

    articleCategoryLink.href =
        `./category.html?category=${encodeURIComponent(article.category || "")}`;

    backToCategory.href =
        `./category.html?category=${encodeURIComponent(article.category || "")}`;


    // Language
    articleLanguage.textContent = article.language || "English";


    // Article title and description
    articleTitle.textContent = article.title || "Untitled Article";

    articleDescription.textContent =
        article.description || "";


    // Author
    const authorName = article.author_name || "coreI Contributor";

    articleAuthor.textContent = authorName;

    authorAvatar.textContent = authorName
        .trim()
        .charAt(0)
        .toUpperCase();


    // Publication date
    articleDate.textContent = formatDate(
        article.published_at || article.created_at
    );


    // Reading time
    articleReadingTime.textContent =
        calculateReadingTime(article.content || "");


    // Cover image
    const safeCoverURL = getSafeURL(article.cover_url);

    if (safeCoverURL) {
        articleCover.src = safeCoverURL;
        articleCover.alt = `Cover image for ${article.title}`;
        articleCoverWrapper.hidden = false;

        articleCover.onerror = () => {
            articleCoverWrapper.hidden = true;
        };

    } else {
        articleCoverWrapper.hidden = true;
        articleCover.removeAttribute("src");
    }


    // Article content
    // textContent prevents article text from being treated as HTML.
    // CSS will control its line spacing and paragraph appearance.
    articleBody.textContent = article.content || "";


    // Editor information
    if (article.editor_name && article.editor_name.trim()) {
        articleEditor.textContent = article.editor_name;
        editorInformation.hidden = false;
    } else {
        editorInformation.hidden = true;
    }


    // Source link
    const safeSourceURL = getSafeURL(article.source_url);

    if (safeSourceURL) {
        articleSourceLink.href = safeSourceURL;
        articleSourceSection.hidden = false;
    } else {
        articleSourceSection.hidden = true;
        articleSourceLink.removeAttribute("href");
    }
}


/* =========================================
   10. LOAD APPRECIATION INFORMATION
========================================= */

async function loadAppreciation() {
    if (!currentArticle || !currentUser || !isApprovedMember) {
        articleStarButton.disabled = true;
        articleStarText.textContent = "Members only";
        return;
    }

    articleStarButton.disabled = true;

    try {
        // Get the total appreciation count
        const { count, error: countError } = await supabase
            .from("reading_article_stars")
            .select("article_id", {
                count: "exact",
                head: true
            })
            .eq("article_id", currentArticle.id);

        if (countError) {
            throw countError;
        }

        appreciationCount = count || 0;


        // Check whether this member already appreciated the article
        const { data, error: starError } = await supabase
            .from("reading_article_stars")
            .select("article_id")
            .eq("article_id", currentArticle.id)
            .eq("member_id", currentUser.id)
            .maybeSingle();

        if (starError) {
            throw starError;
        }

        hasAppreciated = Boolean(data);

        updateAppreciationButton();

    } catch (error) {
        console.error("Appreciation loading error:", error);

        articleStarCount.textContent = "—";
        articleStarText.textContent = "Unavailable";
        articleStarButton.disabled = true;
    }
}


/* =========================================
   11. UPDATE APPRECIATION BUTTON
========================================= */

function updateAppreciationButton() {
    articleStarCount.textContent = appreciationCount;

    if (hasAppreciated) {
        articleStarIcon.textContent = "♥";
        articleStarText.textContent = "Appreciated";

        articleStarButton.classList.add("appreciated");

    } else {
        articleStarIcon.textContent = "♡";
        articleStarText.textContent = "Appreciate";

        articleStarButton.classList.remove("appreciated");
    }

    articleStarButton.disabled = !isApprovedMember || !currentUser;
}


/* =========================================
   12. ADD OR REMOVE APPRECIATION
========================================= */

async function toggleAppreciation() {
    if (
        !currentUser ||
        !isApprovedMember ||
        !currentArticle ||
        appreciationBusy
    ) {
        return;
    }

    appreciationBusy = true;
    articleStarButton.disabled = true;

    try {

        if (hasAppreciated) {

            // Remove appreciation
            const { error } = await supabase
                .from("reading_article_stars")
                .delete()
                .eq("article_id", currentArticle.id)
                .eq("member_id", currentUser.id);

            if (error) {
                throw error;
            }

            hasAppreciated = false;

            appreciationCount = Math.max(
                0,
                appreciationCount - 1
            );

        } else {

            // Add appreciation
            const { error } = await supabase
                .from("reading_article_stars")
                .insert({
                    article_id: currentArticle.id,
                    member_id: currentUser.id
                });

            if (error) {
                throw error;
            }

            hasAppreciated = true;
            appreciationCount += 1;
        }

        updateAppreciationButton();

    } catch (error) {
        console.error("Appreciation update error:", error);

        alert(
            "We couldn't update your appreciation. Please try again."
        );

    } finally {
        appreciationBusy = false;
        updateAppreciationButton();
    }
}


/* =========================================
   13. RETRY BUTTON
========================================= */

retryArticleButton.addEventListener("click", () => {
    loadArticle();
});


/* =========================================
   14. APPRECIATION BUTTON
========================================= */

articleStarButton.addEventListener("click", () => {
    toggleAppreciation();
});


/* =========================================
   15. THEME SYSTEM
========================================= */

function applyTheme() {
    const savedTheme = localStorage.getItem("coreI-theme");

    const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const useDarkTheme =
        savedTheme === "dark" ||
        (savedTheme === "system" && systemDark) ||
        (!savedTheme && systemDark);

    document.body.classList.toggle(
        "dark-theme",
        useDarkTheme
    );
}

applyTheme();


window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {

        if (localStorage.getItem("coreI-theme") === "system") {
            applyTheme();
        }

        if (!localStorage.getItem("coreI-theme")) {
            applyTheme();
        }
    });


/* =========================================
   16. FOOTER YEAR
========================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   17. START ARTICLE PAGE
========================================= */

loadArticle();
