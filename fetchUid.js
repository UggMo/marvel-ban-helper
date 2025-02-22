require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.MARVEL_API_KEY;

// Read the usernames from usernames.json
fs.readFile('usernames.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading usernames.json:', err);
    return;
  }

  const usernames = JSON.parse(data);
  const uids = [];

  const getUidForPlayer = (playerName) => {
    return axios.get(`https://marvelrivalsapi.com/api/v1/find-player/${playerName}`, {
      headers: {
        'x-api-key': API_KEY
      }
    })
      .then(response => {
        const uid = response.data.uid;
        return uid;
      })
      .catch(error => {
        console.error(`Error fetching UID for player ${playerName}:`, error);
        return null;
      });
  };

  // Loop through all usernames and get their UID
  const fetchUids = async () => {
    for (let i = 0; i < usernames.length; i++) {
      const playerName = usernames[i];
      const uid = await getUidForPlayer(playerName);

      if (uid) {
        uids.push({ playerName, uid });
      }
    }

    // Write the uids to uids.json
    fs.writeFile('uids.json', JSON.stringify(uids, null, 2), (err) => {
      if (err) {
        console.error('Error writing uids.json:', err);
      } else {
        console.log('UIDs saved to uids.json');
      }
    });
  };

  fetchUids();
});