```javascript
// ==========================================
// AGRICULTURE INTELLIGENCE PLATFORM
// Main JavaScript
// ==========================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// SUPABASE CONFIGURATION
const SUPABASE_URL = "https://fojtazbjwyivuownhaun.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_EXISTING_PUBLISHABLE_KEY";

// INITIALIZE SUPABASE
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// GLOBAL PLATFORM OBJECT
window.AgriPlatform = {
    supabase: supabase,

    isSupabaseConnected() {
        return supabase !== null;
    }
};

// UTILITY
function getValue(object, possibleKeys, fallback = "") {
    for (const key of possibleKeys) {
        if (
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {
            return object[key];
        }
    }

    return fallback;
}

// CREATE SLUG
function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

// LOAD KNOWLEDGE CATEGORIES
async function loadKnowledgeCategories() {

    const container = document.querySelector(".knowledge-grid");

    if (!container) {
        console.warn("Knowledge grid not found.");
        return;
    }

    container.innerHTML = `
        <p class="loading-message">
            Loading agricultural knowledge categories...
        </p>
    `;

    try {

        const { data, error } = await supabase
            .from("knowledge_categories")
            .select("*")
            .eq("is_active", true);

        if (error) throw error;

        console.log("Knowledge categories loaded:", data);

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-message">
                    No knowledge categories are currently available.
                </p>
            `;

            return;
        }

        const categoryIcons = {
            "Agriculture Fundamentals": "🌱",
            "Crop Science": "🌾",
            "Soil Science": "🌍",
            "Irrigation & Water Management": "💧",
            "Weather & Climate": "🌦️",
            "Seeds & Fertilizers": "🌿",
            "Pests & Plant Diseases": "🐛",
            "Farming Methods": "🚜",
            "Agricultural Machinery": "⚙️",
            "Agricultural Biotechnology": "🔬",
            "Agricultural Economics": "📊",
            "Agricultural Technology": "🛰️",
            "Indian Agriculture": "🇮🇳",
            "Government Schemes": "🏛️",
            "Agricultural Research": "🧪",
            "Statistics & Data": "📈",
            "Agriculture Glossary": "📚"
        };

        container.replaceChildren();

        data.forEach((category, index) => {

            const name = getValue(
                category,
                ["name", "category_name", "title"],
                "Agriculture Category"
            );

            const description = getValue(
                category,
                ["description", "short_description"],
                "Explore agricultural knowledge and scientific information."
            );

            const slug = getValue(
                category,
                ["slug"],
                createSlug(name)
            );

            const icon = getValue(
                category,
                ["icon", "emoji"],
                categoryIcons[name] || "🌱"
            );

            const card = document.createElement("article");

            card.className = "knowledge-card";
            card.setAttribute("role", "link");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", `Explore ${name}`);

            const number = document.createElement("span");
            number.className = "card-number";
            number.textContent = String(index + 1).padStart(2, "0");

            const iconElement = document.createElement("div");
            iconElement.className = "card-icon";
            iconElement.textContent = icon;

            const heading = document.createElement("h3");
            heading.textContent = name;

            const paragraph = document.createElement("p");
            paragraph.textContent = description;

            card.append(
                number,
                iconElement,
                heading,
                paragraph
            );

            // CATEGORY PAGE LINK
            const destination =
                `./src/pages/category.html?slug=${encodeURIComponent(slug)}`;

            card.addEventListener("click", () => {
                window.location.href = destination;
            });

            card.addEventListener("keydown", (event) => {

                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    window.location.href = destination;
                }

            });

            container.appendChild(card);

        });

        console.log(
            `${data.length} knowledge categories displayed successfully.`
        );

    } catch (error) {

        console.error("Unable to load knowledge categories:", error);

        container.innerHTML = `
            <p class="error-message">
                Unable to load knowledge categories.
                Please try again later.
            </p>
        `;
    }
}

// WEBSITE INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {

    console.log("--------------------------------");
    console.log("Agriculture Intelligence Platform initialized.");
    console.log("Supabase client initialized.");
    console.log("--------------------------------");

    await loadKnowledgeCategories();

});

// GLOBAL FUNCTIONS
window.AgriPlatform.loadKnowledgeCategories =
    loadKnowledgeCategories;
```
