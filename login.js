
/* =================================
   coreI - LOGIN SYSTEM
================================= */

import { supabase } from "./supabase.js";


// =================================
// 1. GET PAGE ELEMENTS
// =================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");


// =================================
// 2. SHOW MESSAGES
// =================================

function showMessage(message, type = "") {

    if (!loginMessage) return;

    loginMessage.textContent = message;
    loginMessage.className = "message " + type;

}


// =================================
// 3. HANDLE LOGIN
// =================================

loginForm?.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;


    // Check empty fields

    if (!email || !password) {

        showMessage(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    // Prevent repeated clicks

    loginButton.disabled = true;
    loginButton.textContent = "Signing in...";

    showMessage("");


    try {

        // SIGN IN WITH SUPABASE

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });


        if (error) {
            throw error;
        }


        if (!data.user) {

            throw new Error(
                "We could not verify your account."
            );

        }


        // GET MEMBER PROFILE

        const {
            data: profile,
            error: profileError
        } = await supabase
            .from("profiles")
            .select("display_name, status, role")
            .eq("id", data.user.id)
            .single();


        if (profileError || !profile) {

            await supabase.auth.signOut();

            throw new Error(
                "Your profile could not be found. Please contact the administrator."
            );

        }


        // CHECK MEMBERSHIP STATUS

        if (profile.status !== "approved") {

            await supabase.auth.signOut();


            if (profile.status === "pending") {

                throw new Error(
                    "Your membership request is waiting for administrator approval."
                );

            }


            if (profile.status === "rejected") {

                throw new Error(
                    "Your membership request was not approved."
                );

            }


            throw new Error(
                "Your account does not currently have access."
            );

        }


        // ALL APPROVED USERS GO TO HOME PAGE

        console.log(
            "coreI login successful:",
            profile.role
        );

        window.location.replace("./main.html");


    } catch (error) {

        console.error("coreI login error:", error);

        const message = error.message?.toLowerCase() || "";


        if (message.includes("invalid login credentials")) {

            showMessage(
                "Incorrect email or password. Please try again.",
                "error"
            );

        } else if (message.includes("email not confirmed")) {

            showMessage(
                "Please confirm your email address before signing in.",
                "error"
            );

        } else {

            showMessage(
                error.message || "Something went wrong. Please try again.",
                "error"
            );

        }

    } finally {

        loginButton.disabled = false;

        loginButton.innerHTML =
            'Sign in to coreI <span>↗</span>';

    }

});
