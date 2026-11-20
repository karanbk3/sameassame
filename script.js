
// =============================================
// coreI — HOME PAGE INTERACTIONS
// =============================================


// 1. MOBILE NAVIGATION

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");


// Open and close mobile menu
if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // Close menu after selecting a link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            navLinks.classList.remove("open");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    // Close menu using Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("open");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


// 2. SHARED THEME PREFERENCE

const THEME_STORAGE_KEY = "coreI-theme";

const systemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
);


// Read saved theme
function getThemePreference() {

    try {

        const savedTheme = localStorage.getItem(
            THEME_STORAGE_KEY
        );

        if (["light", "dark", "system"].includes(savedTheme)) {
            return savedTheme;
        }

    } catch (error) {

        console.error("Could not read theme preference:", error);

    }

    return "system";

}


// Apply selected theme
function applyTheme() {

    const preference = getThemePreference();

    const isDark =
        preference === "dark" ||
        (
            preference === "system" &&
            systemTheme.matches
        );

    document.body.classList.toggle(
        "dark-theme",
        isDark
    );

    // Update browser address bar theme colour
    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeColor) {

        themeColor.setAttribute(
            "content",
            isDark ? "#101A1A" : "#123B3A"
        );

    }

}


// Apply theme when page opens
applyTheme();


// Update page when device theme changes
function handleSystemThemeChange() {

    if (getThemePreference() === "system") {
        applyTheme();
    }

}

if (systemTheme.addEventListener) {

    systemTheme.addEventListener(
        "change",
        handleSystemThemeChange
    );

} else {

    systemTheme.addListener(
        handleSystemThemeChange
    );

}


// 3. CURRENT YEAR IN FOOTER

const copyrightText = document.querySelector(
    ".copyright"
);

if (copyrightText) {

    copyrightText.textContent =
        `© ${new Date().getFullYear()} coreI. All rights reserved.`;

}


// 4. PAGE LOADED

console.log("coreI home page is ready.");
