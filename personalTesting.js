// remember to .\venv\Scripts\activate and go into the VM :D
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const API_KEY = process.env.MARVEL_API_KEY; //dont leak your api key agian lol

const PLAYER_UID = 'UggMo';

axios.get(`https://marvelrivalsapi.com/api/v1/player/${PLAYER_UID}`, { 
    headers: { 'x-api-key': API_KEY }
})
.then(response => {
    fs.writeFileSync('meowmeow.json', JSON.stringify(response.data, null, 2));
    console.log('Data saved to player_stats.json');
})
.catch(error => console.error(error));