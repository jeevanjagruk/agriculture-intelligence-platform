/* ==========================================
   AGRICULTURE INTELLIGENCE PLATFORM
   FRONTEND APPLICATION
========================================== */

// API CONFIGURATION

const API_CONFIG = {
    baseURL: "http://localhost:5000/api",
    timeout: 10000
};


// API REQUEST HANDLER

async function apiRequest(endpoint, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(
        () => controller.abort(),
        API_CONFIG.timeout
    );

    try {

        const response = await fetch(
            `${API_CONFIG.baseURL}${endpoint}`,
            {
                ...options,
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error("API Request Failed:", error);

        throw error;

    } finally {

        clearTimeout(timeout);

    }

}


// BACKEND HEALTH CHECK

async function checkBackend() {

    try {

        const data = await apiRequest("/health");

        console.log(
            "Backend Status:",
            data.message
        );

        return true;

    } catch (error) {

        console.warn(
            "Backend is currently unavailable."
        );

        return false;

    }

}


// NAVIGATION FUNCTIONALITY

function initializeNavigation() {

    const navigationLinks = document.querySelectorAll(
        ".main-navigation a"
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigationLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

}


// SCROLL FUNCTIONALITY

function initializeScroll() {

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".main-navigation a"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${currentId}`
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-20% 0px -65% 0px"
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

}


// INITIALIZE APPLICATION

async function initializeApplication() {

    console.log(
        "Agriculture Intelligence Platform initialized."
    );

    initializeNavigation();

    initializeScroll();

    await checkBackend();

}


// START APPLICATION

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


// EXPORT API FUNCTIONS

window.AgriAPI = {
    request: apiRequest,
    checkBackend: checkBackend
};
