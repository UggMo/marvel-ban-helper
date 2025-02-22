require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.MARVEL_API_KEY;
const API_URL = "https://marvelrivalsapi.com/api/v1/find-player/UggMo";

if (!API_KEY) {
    console.error("❌ API key is missing! set MARVEL_API_KEY in a .env file with ur key");
    process.exit(1);
}

async function fetchPlayerStats(username) {
    if (!username) {
        console.error("❌ No username provided!");
        return;
    }

    try {
        const response = await axios.get(`${API_URL}`, {
            headers: { 'x-api-key': API_KEY },
            params: { username }  // Pass username dynamically
        });

        console.log("📡 Request URL:", response.config.url);
        console.log("🔍 Response Code:", response.status);
        console.log("🎯 Player Stats:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`⚠️ API error (${error.response.status}):`, error.response.data);
        } else {
            console.error("❌ Request failed:", error.message);
        }
        return null;
    }
}

// Example usage from OCR
const username = process.argv[2] || "UggMo"; // Allow running via command line
fetchPlayerStats(username).then(data => {
    if (data) console.log("✅ Successfully fetched player stats!");
    else console.log("❌ Failed to fetch player stats.");
});