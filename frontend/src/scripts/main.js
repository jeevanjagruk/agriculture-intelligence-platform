// ==========================================
// AGRICULTURE INTELLIGENCE PLATFORM
// Main JavaScript
// ==========================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL = "https://fojtazbjwyivuownhaun.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_iO2Cs2-UuXntlEQGENWg8Q_gCbWJelr";


// ==========================================
// INITIALIZE SUPABASE
// ==========================================

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ==========================================
// GLOBAL PLATFORM OBJECT
// ==========================================

window.AgriPlatform = {

    supabase: supabase,

    isSupabaseConnected() {
        return supabase !== null;
    }

};


// ==========================================
// UTILITY FUNCTIONS
// ==========================================

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


// ==========================================
// LOAD KNOWLEDGE CATEGORIES
// ==========================================

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

        if (error) {
            throw error;
        }

        console.log("Knowledge categories loaded:", data);

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-message">
                    No knowledge categories are currently available.
                </p>
            `;

            return;
        }


        // ==================================
        // CATEGORY ICONS
        // ==================================

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


        // ==================================
        // RENDER CATEGORY CARDS
        // ==================================

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
                ""
            );

            const icon = getValue(
                category,
                ["icon", "emoji"],
                categoryIcons[name] || "🌱"
            );

            const card = document.createElement("article");

            card.className = "knowledge-card";

            if (slug) {
                card.dataset.categorySlug = slug;
            }

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

            container.appendChild(card);

        });


        console.log(
            `${data.length} knowledge categories displayed successfully.`
        );

    }

    catch (error) {

        console.error(
            "Unable to load knowledge categories:",
            error
        );

        container.innerHTML = `
            <p class="error-message">
                Unable to load knowledge categories.
                Please try again later.
            </p>
        `;

    }

}


// ==========================================
// WEBSITE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("--------------------------------");

    console.log(
        "Agriculture Intelligence Platform initialized."
    );

    console.log("Supabase client initialized.");

    console.log("--------------------------------");


    // Load dynamic knowledge categories

    await loadKnowledgeCategories();

});


// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

window.AgriPlatform.loadKnowledgeCategories =
    loadKnowledgeCategories;
