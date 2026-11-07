// ==========================================
// AGRICULTURE INTELLIGENCE PLATFORM
// Main JavaScript File
// ==========================================

// Import Supabase JavaScript client
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

// Add your Supabase project credentials here later.

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";


// ==========================================
// INITIALIZE SUPABASE
// ==========================================

let supabase = null;

if (
    SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_PUBLISHABLE_KEY"
) {
    supabase = createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("Supabase connection initialized.");
} else {
    console.info("Supabase credentials are not configured yet.");
}


// ==========================================
// GLOBAL PLATFORM OBJECT
// ==========================================

window.AgriPlatform = {

    get supabase() {
        return supabase;
    },

    isSupabaseConnected() {
        return supabase !== null;
    }

};


// ==========================================
// WEBSITE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Agriculture Intelligence Platform is running."
    );

});
