
import { supabase } from "./supabase.js";


// =============================================
// coreI — DISCOVER / READING SPACE
// =============================================


// =============================================
// 1. PAGE ELEMENTS
// =============================================

// Header
const adminAddArticleButton =
    document.getElementById("adminAddArticleButton");

const submitArticleButton =
    document.getElementById("submitArticleButton");

const contributeArticleButton =
    document.getElementById("contributeArticleButton");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNavigation =
    document.getElementById("mainNavigation");


// Search
const categorySearch =
    document.getElementById("categorySearch");

const categorySearchButton =
    document.getElementById("categorySearchButton");

const categoryGrid =
    document.getElementById("categoryGrid");

const categoryCards =
    document.querySelectorAll(".category-card");

const searchMessage =
    document.getElementById("searchMessage");

const noCategoriesMessage =
    document.getElementById("noCategoriesMessage");

const showAllCategories =
    document.getElementById("showAllCategories");


// Article modal
const articleModal =
    document.getElementById("articleModal");

const closeArticleModal =
    document.getElementById("closeArticleModal");

const articleForm =
    document.getElementById("articleForm");

const articleFormMessage =
    document.getElementById("articleFormMessage");

const saveDraftButton =
    document.getElementById("saveDraftButton");

const publishArticleButton =
    document.getElementById("publishArticleButton");


// Form fields
const articleTitle =
    document.getElementById("articleTitle");

const articleCategory =
    document.getElementById("articleCategory");

const articleLanguage =
    document.getElementById("articleLanguage");

const articleAuthor =
    document.getElementById("articleAuthor");

const articleEditor =
    document.getElementById("articleEditor");

const articleDescription =
    document.getElementById("articleDescription");

const articleCover =
    document.getElementById("articleCover");

const articleContent =
    document.getElementById("articleContent");

const articleSource =
    document.getElementById("articleSource");

const articlePublishedDate =
    document.getElementById("articlePublishedDate");


// Footer
const currentYear =
    document.getElementById("currentYear");


// =============================================
// 2. USER ACCESS
// =============================================

let currentUser = null;

let isAdmin = false;

let isApprovedMember = false;


// Check the signed-in user's permissions
async function checkUserAccess() {

    try {

        const { data: { user }, error: userError } =
            await supabase.auth.getUser();

        if (userError) {
            throw userError;
        }

        currentUser = user;

        isAdmin = false;
        isApprovedMember = false;

        if (!currentUser) {
            updateAccessButtons();
            return;
        }


        // Check admin permission using the
        // existing Supabase security function

        const { data: adminResult, error: adminError } =
            await supabase.rpc("is_corei_admin");

        if (adminError) {
            throw adminError;
        }

        isAdmin = adminResult === true;


        // Check approved member permission

        const { data: memberResult, error: memberError } =
            await supabase.rpc("is_corei_approved_member");

        if (memberError) {
            throw memberError;
        }

        isApprovedMember = memberResult === true;

        updateAccessButtons();

    } catch (error) {

        console.error("Access check failed:", error);

        isAdmin = false;
        isApprovedMember = false;

        updateAccessButtons();

    }

}


// Show the correct buttons
function updateAccessButtons() {

    if (adminAddArticleButton) {

        adminAddArticleButton.hidden = !isAdmin;

    }

    if (submitArticleButton) {

        submitArticleButton.hidden =
            !isApprovedMember || isAdmin;

    }

    if (contributeArticleButton) {

        contributeArticleButton.hidden =
            !isApprovedMember || isAdmin;

    }

}


// =============================================
// 3. CATEGORY SEARCH
// =============================================

function searchCategories() {

    const searchValue =
        categorySearch.value.trim().toLowerCase();

    let visibleCategories = 0;

    categoryCards.forEach(card => {

        const categoryName =
            card.dataset.category.toLowerCase();

        const categoryDescription =
            card.innerText.toLowerCase();

        const matches =
            categoryName.includes(searchValue) ||
            categoryDescription.includes(searchValue);

        card.hidden = !matches;

        if (matches) {
            visibleCategories++;
        }

    });


    // Show search result message

    if (searchValue) {

        searchMessage.textContent =
            visibleCategories === 1
                ? "1 category found."
                : `${visibleCategories} categories found.`;

    } else {

        searchMessage.textContent = "";

    }


    // Show empty result message

    if (noCategoriesMessage) {

        noCategoriesMessage.hidden =
            visibleCategories !== 0;

    }

}


// Search button
if (categorySearchButton) {

    categorySearchButton.addEventListener(
        "click",
        searchCategories
    );

}


// Search while typing
if (categorySearch) {

    categorySearch.addEventListener(
        "input",
        searchCategories
    );

}


// Search using Enter
if (categorySearch) {

    categorySearch.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            searchCategories();

        }

    });

}


// Show all categories
if (showAllCategories) {

    showAllCategories.addEventListener("click", () => {

        categorySearch.value = "";

        searchCategories();

        document.getElementById("readingCategories")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

}


// =============================================
// 4. OPEN CATEGORY
// =============================================

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        if (!category) return;

        const categoryUrl =
            new URL("./category.html", window.location.href);

        categoryUrl.searchParams.set("category", category);

        window.location.href = categoryUrl.href;

    });

});


// =============================================
// 5. ADMIN ARTICLE MODAL
// =============================================

function openArticleModal() {

    if (!isAdmin) {

        showArticleMessage(
            "Only authorized administrators can publish articles.",
            "error"
        );

        return;

    }

    if (!articleModal) return;

    articleModal.hidden = false;

    document.body.classList.add("modal-open");

    articleTitle?.focus();

}


function closeArticleForm() {

    if (!articleModal) return;

    articleModal.hidden = true;

    document.body.classList.remove("modal-open");

    clearArticleMessage();

}


// Admin button
if (adminAddArticleButton) {

    adminAddArticleButton.addEventListener(
        "click",
        openArticleModal
    );

}


// Close button
if (closeArticleModal) {

    closeArticleModal.addEventListener(
        "click",
        closeArticleForm
    );

}


// Close when clicking outside the form
if (articleModal) {

    articleModal.addEventListener("click", event => {

        if (event.target === articleModal) {

            closeArticleForm();

        }

    });

}


// Close using Escape
document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        articleModal &&
        !articleModal.hidden
    ) {

        closeArticleForm();

    }

});


// =============================================
// 6. FORM MESSAGES
// =============================================

function showArticleMessage(message, type) {

    if (!articleFormMessage) return;

    articleFormMessage.textContent = message;

    articleFormMessage.className =
        `form-message ${type}`;

}


function clearArticleMessage() {

    if (!articleFormMessage) return;

    articleFormMessage.textContent = "";

    articleFormMessage.className = "form-message";

}


// =============================================
// 7. COLLECT ARTICLE INFORMATION
// =============================================

function getArticleInformation(status) {

    const title =
        articleTitle.value.trim();

    const category =
        articleCategory.value;

    const language =
        articleLanguage.value;

    const author =
        articleAuthor.value.trim();

    const editor =
        articleEditor.value.trim();

    const description =
        articleDescription.value.trim();

    const cover =
        articleCover.value.trim();

    const content =
        articleContent.value.trim();

    const source =
        articleSource.value.trim();

    const date =
        articlePublishedDate.value;


    // Check required information

    if (
        !title ||
        !category ||
        !author ||
        !description ||
        !content
    ) {

        throw new Error(
            "Please complete all required fields."
        );

    }


    if (title.length < 3) {

        throw new Error(
            "The title must contain at least 3 characters."
        );

    }


    if (description.length < 10) {

        throw new Error(
            "Please write a slightly longer description."
        );

    }


    if (!currentUser || !isAdmin) {

        throw new Error(
            "You do not have permission to publish articles."
        );

    }


    // Check image and source links

    if (cover && !isValidUrl(cover)) {

        throw new Error(
            "Please enter a valid cover image URL."
        );

    }

    if (source && !isValidUrl(source)) {

        throw new Error(
            "Please enter a valid source URL."
        );

    }


    return {

        title: title,

        category: category,

        language: language,

        author_name: author,

        editor_name: editor || null,

        description: description,

        cover_url: cover || null,

        content: content,

        source_url: source || null,

        published_at: date || null,

        status: status,

        created_by: currentUser.id

    };

}


// Check URL format
function isValidUrl(value) {

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


// =============================================
// 8. SAVE ARTICLE TO SUPABASE
// =============================================

async function saveArticle(status) {

    if (!isAdmin || !currentUser) {

        showArticleMessage(
            "You are not authorized to add articles.",
            "error"
        );

        return;

    }


    // Validate the form

    if (!articleForm.reportValidity()) {

        return;

    }


    let articleData;

    try {

        articleData =
            getArticleInformation(status);

    } catch (error) {

        showArticleMessage(
            error.message,
            "error"
        );

        return;

    }


    // Prevent repeated clicks

    const clickedButton =
        status === "published"
            ? publishArticleButton
            : saveDraftButton;

    if (clickedButton) {

        clickedButton.disabled = true;

        clickedButton.textContent =
            status === "published"
                ? "Publishing..."
                : "Saving...";

    }


    if (publishArticleButton) {
        publishArticleButton.disabled = true;
    }

    if (saveDraftButton) {
        saveDraftButton.disabled = true;
    }


    try {

        const { data, error } = await supabase

            .from("reading_articles")

            .insert([articleData])

            .select("id, title, status")

            .single();


        if (error) {

            throw error;

        }


        // Success message

        showArticleMessage(
            status === "published"
                ? "Article published successfully!"
                : "Article saved as a draft successfully!",
            "success"
        );


        console.log(
            "Article saved:",
            data
        );


        // Clear form

        articleForm.reset();


        // Close after a short delay

        setTimeout(() => {

            closeArticleForm();

        }, 1200);


    } catch (error) {

        console.error(
            "Article saving failed:",
            error
        );

        showArticleMessage(
            error.message ||
            "Unable to save the article. Please try again.",
            "error"
        );

    } finally {

        if (publishArticleButton) {

            publishArticleButton.disabled = false;

            publishArticleButton.textContent =
                "Publish Article";

        }

        if (saveDraftButton) {

            saveDraftButton.disabled = false;

            saveDraftButton.textContent =
                "Save as draft";

        }

    }

}


// =============================================
// 9. PUBLISH ARTICLE
// =============================================

if (articleForm) {

    articleForm.addEventListener("submit", async event => {

        event.preventDefault();

        await saveArticle("published");

    });

}


// =============================================
// 10. SAVE DRAFT
// =============================================

if (saveDraftButton) {

    saveDraftButton.addEventListener("click", async () => {

        await saveArticle("draft");

    });

}


// =============================================
// 11. MOBILE NAVIGATION
// =============================================

if (mobileMenuButton && mainNavigation) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            mainNavigation.classList.toggle("open");

        mobileMenuButton.classList.toggle(
            "active",
            isOpen
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close navigation after selecting a link

    mainNavigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNavigation.classList.remove("open");

            mobileMenuButton.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// =============================================
// 12. FOOTER YEAR
// =============================================

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// =============================================
// 13. START APPLICATION
// =============================================

async function startDiscoverPage() {

    await checkUserAccess();

    console.log("coreI Reading Space is ready.");

}


// Start
startDiscoverPage();


// Update permissions when login state changes
supabase.auth.onAuthStateChange(() => {

    setTimeout(() => {

        checkUserAccess();

    }, 0);

});
