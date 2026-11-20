
import { supabase } from "./supabase.js";

// =====================================
// 1. GET SIGNUP PAGE ELEMENTS
// =====================================

const signupForm = document.getElementById("signupForm");

const displayNameInput = document.getElementById("displayName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const signupButton = document.getElementById("signupButton");
const signupMessage = document.getElementById("signupMessage");


// =====================================
// 2. SHOW MESSAGES
// =====================================

function showMessage(message, type = "") {

    signupMessage.textContent = message;
    signupMessage.className = "message " + type;

}


// =====================================
// 3. HANDLE REGISTRATION
// =====================================

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Get user information
    const displayName = displayNameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    // =================================
    // 4. VALIDATE USER INFORMATION
    // =================================

    if (displayName.length < 2) {

        showMessage(
            "Please enter a name with at least 2 characters.",
            "error"
        );

        return;
    }

    if (password.length < 8) {

        showMessage(
            "Your password must contain at least 8 characters.",
            "error"
        );

        return;
    }

    if (password !== confirmPassword) {

        showMessage(
            "Your passwords do not match.",
            "error"
        );

        return;
    }


    // =================================
    // 5. START REGISTRATION
    // =================================

    signupButton.disabled = true;
    signupButton.textContent = "Creating your account...";

    showMessage("");


    try {

        // Create account using Supabase
        const { data, error } = await supabase.auth.signUp({

            email: email,

            password: password,

            options: {

                data: {
                    display_name: displayName
                }

            }

        });


        // Check for errors
        if (error) {
            throw error;
        }


        // Check whether Supabase returned a new user
        if (!data.user) {

            throw new Error(
                "Your account could not be created. Please try again."
            );

        }


        // =================================
        // 6. SHOW REGISTRATION RESULT
        // =================================

        if (data.session) {

            showMessage(
                "Your account has been created! Your membership is waiting for administrator approval.",
                "success"
            );

        } else {

            showMessage(
                "Registration received! Please check your email and confirm your account. Administrator approval is also required.",
                "success"
            );

        }

        // Clear the form
        signupForm.reset();


    } catch (error) {

        console.error("coreI registration error:", error);

        const errorMessage = error.message?.toLowerCase() || "";

        if (
            errorMessage.includes("already registered") ||
            errorMessage.includes("already exists")
        ) {

            showMessage(
                "This email is already registered. Please sign in instead.",
                "error"
            );

        } else if (errorMessage.includes("password")) {

            showMessage(
                "Please check your password and try again.",
                "error"
            );

        } else {

            showMessage(
                error.message || "Something went wrong. Please try again.",
                "error"
            );

        }

    } finally {

        // Restore button
        signupButton.disabled = false;

        signupButton.innerHTML =
            'Request membership <span>↗</span>';

    }

});
