
import { supabase } from "./supabase.js";


// =============================================
// coreI — CATEGORY READING PAGE
// Loads published articles from Supabase
// =============================================


// =============================================
// 1. PAGE ELEMENTS
// =============================================

const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");
const categoryIcon = document.getElementById("categoryIcon");
const breadcrumbCategory = document.getElementById("breadcrumbCategory");

const articleCount = document.getElementById("articleCount");
const visibleArticleCount = document.getElementById("visibleArticleCount");

const articleSearch = document.getElementById("articleSearch");
const articleGrid = document.getElementById("articleGrid");

const articleLoading = document.getElementById("articleLoading");
const noArticlesMessage = document.getElementById("noArticlesMessage");

const articleError = document.getElementById("articleError");
const articleErrorMessage = document.getElementById("articleErrorMessage");
const retryArticlesButton = document.getElementById("retryArticlesButton");

const currentYear = document.getElementById("currentYear");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNavigation = document.getElementById("mainNavigation");


// =============================================
// 2. CATEGORY INFORMATION
// =============================================

const categories = {

    "Love & Relationships": {
        icon: "❤️",
        description: "Explore relationships, understanding, care and the many ways people connect."
    },

    "Friendship & Family": {
        icon: "🤝",
        description: "Discover the meaning of friendship, family, trust and belonging."
    },

    "Life & Meaning": {
        icon: "🌱",
        description: "Explore life's experiences, deeper questions and different perspectives."
    },

    "Philosophy & Wisdom": {
        icon: "🧠",
        description: "Think deeply about ideas, wisdom, ethics and the questions of existence."
    },

    "Personal Growth & Motivation": {
        icon: "🚀",
        description: "Discover ideas that encourage learning, confidence and personal development."
    },

    "Psychology & Emotions": {
        icon: "💭",
        description: "Understand human behaviour, emotions, thoughts and the mind."
    },

    "Technology & Innovation": {
        icon: "💻",
        description: "Explore technology, inventions, digital ideas and future possibilities."
    },

    "Science & Discovery": {
        icon: "🔬",
        description: "Discover scientific ideas, natural phenomena and new knowledge."
    },

    "History & Civilization": {
        icon: "🏛️",
        description: "Explore historical events, civilizations, cultures and human stories."
    },

    "World & Society": {
        icon: "🌍",
        description: "Understand societies, communities, global issues and the changing world."
    },

    "Creativity & Imagination": {
        icon: "🎨",
        description: "Explore creative thinking, imagination, art and original ideas."
    },

    "Education & Knowledge": {
        icon: "📚",
        description: "Discover learning methods, knowledge and the power of education."
    },

    "Nature & Environment": {
        icon: "🌿",
        description: "Explore nature, wildlife, ecosystems and our environment."
    },

    "Culture, Travel & Lifestyle": {
        icon: "✈️",
        description: "Discover cultures, places, traditions and different ways of living."
    }

};


// =============================================
// 3. READ CATEGORY FROM URL
// =============================================

const urlParameters = new URLSearchParams(window.location.search);

const selectedCategory = urlParameters.get("category");

const categoryInformation = categories[selectedCategory];


// =============================================
// 4. PAGE DATA
// =============================================

let allArticles = [];


// =============================================
// 5. HELPER FUNCTIONS
// =============================================

// Safely display text in HTML.

function escapeHTML(value = "") {

    return String(value).replace(/[&<>"']/g, character => {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return characters[character];

    });

}


// Format article publication date.

function formatDate(dateValue) {

    if (!dateValue) {
        return "Recently published";
    }

    const date = new Date(dateValue + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return "Recently published";
    }

    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}


// Display article count.

function updateArticleCount(number) {

    articleCount.textContent =
        `${number} ${number === 1 ? "article" : "articles"}`;

    visibleArticleCount.textContent =
        `${number} ${number === 1 ? "article" : "articles"}`;

}


// =============================================
// 6. SET CATEGORY INFORMATION
// =============================================

function setupCategory() {

    if (!selectedCategory || !categoryInformation) {

        categoryTitle.textContent = "Category not found";

        categoryDescription.textContent =
            "Please return to Discover and choose a valid category.";

        categoryIcon.textContent = "📚";

        breadcrumbCategory.textContent = "Not found";

        articleCount.textContent = "0 articles";

        return false;

    }

    categoryTitle.textContent = selectedCategory;

    categoryDescription.textContent =
        categoryInformation.description;

    categoryIcon.textContent =
        categoryInformation.icon;

    breadcrumbCategory.textContent =
        selectedCategory;

    document.title = `${selectedCategory} — coreI`;

    return true;

}


// =============================================
// 7. SHOW PAGE STATES
// =============================================

function showLoading() {

    articleLoading.hidden = false;

    articleGrid.hidden = true;

    noArticlesMessage.hidden = true;

    articleError.hidden = true;

}


function showEmpty() {

    articleLoading.hidden = true;

    articleGrid.hidden = true;

    noArticlesMessage.hidden = false;

    articleError.hidden = true;

}


function showError(message) {

    articleLoading.hidden = true;

    articleGrid.hidden = true;

    noArticlesMessage.hidden = true;

    articleError.hidden = false;

    articleErrorMessage.textContent = message;

}


function showArticles() {

    articleLoading.hidden = true;

    articleGrid.hidden = false;

    noArticlesMessage.hidden = true;

    articleError.hidden = true;

}


// =============================================
// 8. LOAD ARTICLES FROM SUPABASE
// =============================================

async function loadArticles() {

    if (!setupCategory()) {

        showEmpty();

        updateArticleCount(0);

        return;

    }

    showLoading();

    try {

        const { data, error } = await supabase

            .from("reading_articles")

            .select(`
                id,
                title,
                category,
                language,
                author_name,
                description,
                cover_url,
                published_at,
                is_featured
            `)

            .eq("category", selectedCategory)

            .eq("status", "published")

            .order("is_featured", { ascending: false })

            .order("published_at", { ascending: false, nullsFirst: false })

            .order("created_at", { ascending: false });


        if (error) {
            throw error;
        }


        allArticles = data || [];

        updateArticleCount(allArticles.length);

        displayArticles(allArticles);

    }

    catch (error) {

        console.error("Category articles error:", error);

        showError(
            "We couldn't load the articles. Please check your internet connection and try again."
        );

        updateArticleCount(0);

    }

}


// =============================================
// 9. DISPLAY ARTICLE CARDS
// =============================================

function displayArticles(articles) {

    articleGrid.innerHTML = "";

    updateArticleCount(articles.length);


    if (!articles.length) {

        showEmpty();

        return;

    }


    articles.forEach(article => {

        const card = document.createElement("article");

        card.className = "article-card";


        const safeTitle = escapeHTML(article.title);

        const safeAuthor = escapeHTML(article.author_name);

        const safeDescription = escapeHTML(article.description);

        const safeLanguage = escapeHTML(article.language || "English");

        const safeDate = escapeHTML(formatDate(article.published_at));


        // Only allow normal web image addresses.

        let coverHTML = `
            <div class="article-cover-placeholder">
                <span>${escapeHTML(categoryInformation.icon)}</span>
            </div>
        `;


        if (article.cover_url) {

            try {

                const coverURL = new URL(article.cover_url);

                if (
                    coverURL.protocol === "https:" ||
                    coverURL.protocol === "http:"
                ) {

                    coverHTML = `
                        <img
                            class="article-cover"
                            src="${escapeHTML(coverURL.href)}"
                            alt="${safeTitle}"
                            loading="lazy"
                        >
                    `;

                }

            }

            catch {
                // Keep the placeholder if the image address is invalid.
            }

        }


        card.innerHTML = `

            <a
                class="article-card-link"
                href="./article.html?id=${encodeURIComponent(article.id)}"
                aria-label="Read ${safeTitle}">

                <div class="article-card-image">

                    ${coverHTML}

                    ${article.is_featured ? `
                        <span class="featured-label">
                            Featured
                        </span>
                    ` : ""}

                </div>


                <div class="article-card-content">

                    <div class="article-card-meta">

                        <span>${safeLanguage}</span>

                        <span>•</span>

                        <span>${safeDate}</span>

                    </div>


                    <h3>${safeTitle}</h3>


                    <p>${safeDescription}</p>


                    <div class="article-card-footer">

                        <span class="article-author">
                            By ${safeAuthor}
                        </span>

                        <span class="read-article">
                            Read article →
                        </span>

                    </div>

                </div>

            </a>

        `;


        articleGrid.appendChild(card);

    });


    showArticles();

}


// =============================================
// 10. SEARCH ARTICLES
// =============================================

function searchArticles() {

    const searchText = articleSearch.value
        .trim()
        .toLowerCase();


    const filteredArticles = allArticles.filter(article => {

        const title = (article.title || "").toLowerCase();

        const author = (article.author_name || "").toLowerCase();

        const description = (article.description || "").toLowerCase();


        return (
            title.includes(searchText) ||
            author.includes(searchText) ||
            description.includes(searchText)
        );

    });


    displayArticles(filteredArticles);

}


// Search while typing.

articleSearch.addEventListener("input", searchArticles);


// =============================================
// 11. RETRY BUTTON
// =============================================

retryArticlesButton.addEventListener("click", () => {

    loadArticles();

});


// =============================================
// 12. MOBILE NAVIGATION
// =============================================

mobileMenuButton.addEventListener("click", () => {

    const isOpen = mainNavigation.classList.toggle("open");

    mobileMenuButton.classList.toggle("active", isOpen);

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    mobileMenuButton.textContent = isOpen ? "×" : "☰";

});


// Close mobile menu after selecting a link.

mainNavigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mainNavigation.classList.remove("open");

        mobileMenuButton.classList.remove("active");

        mobileMenuButton.setAttribute("aria-expanded", "false");

        mobileMenuButton.textContent = "☰";

    });

});


// =============================================
// 13. SHARED THEME
// =============================================

function applyTheme() {

    const savedTheme = localStorage.getItem("coreI-theme");

    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;


    const useDarkTheme =
        savedTheme === "dark" ||
        (savedTheme !== "light" && systemPrefersDark);


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

    });


// =============================================
// 14. FOOTER YEAR
// =============================================

currentYear.textContent = new Date().getFullYear();


// =============================================
// 15. START PAGE
// =============================================

loadArticles();
