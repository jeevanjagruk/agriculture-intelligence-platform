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
// WEBSITE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Agriculture Intelligence Platform initialized.");

    console.log("Supabase client initialized.");

});
