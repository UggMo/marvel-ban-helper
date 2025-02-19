require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.MARVEL_API_KEY;

// Read the user ids from uids.json
fs.readFile('uids.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading uids.json:', err);
    return;
  }

  const uids = JSON.parse(data);
  const playerStats = [];

  const getPlayerStats = async (uid, playerName) => {
    try {
      // Call to update player stats
      await axios.get(`https://marvelrivalsapi.com/api/v1/player/${uid}/update`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      // Call to get the player stats
      const response = await axios.get(`https://marvelrivalsapi.com/api/v1/player/${uid}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      const heroesRanked = response.data.heroes_ranked || [];

      // Sort heroes by how many matches have been played
      const sortedHeroes = heroesRanked.sort((a, b) => b.matches - a.matches);
      const topHeroes = sortedHeroes.slice(0, 3);

      if (topHeroes.length === 0 || topHeroes[0].matches === 0) {
        return { playerName, message: 'No matches played' };
      }

      // calculate wr and format playtime
      topHeroes.forEach(hero => {
        hero.winRate = hero.matches > 0 ? ((hero.wins / hero.matches) * 100).toFixed(2) + '%' : '0%';
        hero.playTime = new Date(hero.play_time * 1000).toISOString().substring(11, 8); // make it to HH:MM:SS
      });

      // check for otp's
      const totalTop3Matches = topHeroes.reduce((sum, hero) => sum + hero.matches, 0);
      const isOneTrick = topHeroes.length > 0 && totalTop3Matches > 0
        ? (topHeroes[0].matches / totalTop3Matches) > 0.75
        : false;

      // check the skill levels
      let skillLevel = '';
      if (topHeroes[0].matches > 30 && (topHeroes[0].wins / topHeroes[0].matches) >= 0.8) {
        skillLevel = 'Very Insane';
      } else if ((topHeroes[0].wins / topHeroes[0].matches) >= 0.7) {
        skillLevel = 'Very Good';
      } else if ((topHeroes[0].wins / topHeroes[0].matches) >= 0.6) {
        skillLevel = 'Good';
      } else {
        skillLevel = 'No worries';
      }

      return {
        playerName,
        topHeroes: topHeroes.map(hero => ({
          heroName: hero.hero_name,
          matches: hero.matches,
          wins: hero.wins,
          winRate: hero.winRate,
          playTime: hero.playTime
        })),
        isOneTrick,
        skillLevel
      };
    } catch (error) {
      console.error(`Error fetching stats for UID ${uid}:`, error);
      return { playerName, message: 'Error fetching stats' };
    }
  };

  const fetchAllPlayerStats = async () => {
    for (let i = 0; i < uids.length; i++) {
      const { playerName, uid } = uids[i];
      const stats = await getPlayerStats(uid, playerName);
      playerStats.push(stats);
    }

    // put all the queried info into topHeroes.json
    fs.writeFile('topHeroes.json', JSON.stringify(playerStats, null, 2), (err) => {
      if (err) {
        console.error('Error writing topHeroes.json:', err);
      } else {
        console.log('Top heroes saved to topHeroes.json');
      }
    });
  };

  fetchAllPlayerStats();
});