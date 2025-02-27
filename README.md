# Marvel Rivals Winrate Checker local ver

## Overview
The Marvel Rivals Winrate Checker is a tool that fetches and analyzes player statistics from the Marvel Rivals API. It extracts the most-played hero, calculates win rates, and determines player skill levels. The program includes an OCR-based username extractor and API calls to retrieve and update stats.
## Features
- **Fetch Player Stats**: Queries Marvel Rivals API for player winrate and hero usage.
- **Top Hero Analysis**: Extracts the most-played hero and evaluates skill level, can also see individuals updated stats for top 3 heroes!
- **Skill Assessment**:
  - OneTrick: If 80%+ of matches are on one hero (out of top 3).
  - Very Insane: If a hero has 30+ matches and an 80%+ winrate.
  - Very Good: If a hero has a 70%+ winrate.
  - Good: If a hero has a 60%+ winrate.
- **OCR Integration**: Uses Tesseract OCR to extract usernames from in-game screens.

## Installation
### Prerequisites
- **Python 3.x** (for OCR and automation scripts)
- **Node.js & npm** (for API calls and future GUI development)
- **Tesseract OCR** (for screen text recognition)
- **.env File** (for storing API key securely)

### Get an API key from here!

https://marvelrivalsapi.com

- requires a discord account.

### Setup for local usage
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/marvel-rivals-winrate-checker.git
   cd marvel-rivals-winrate-checker
   ```
2. Install dependencies:
   - **Python**:
     ```bash
     pip install pytesseract opencv-python
     ```
   - **Node.js**:
     ```bash
     npm install axios dotenv fs
     ```
3. Set up the `.env` file with your API key:
   ```plaintext
   API_KEY=your_api_key_here
   ```

## Usage
Just run main while having the game open queuing into a competitive game and results will be in `topHeroes.json`:
```bash
python main.py
```

## Contact
For any questions or contributions, feel free to reach out here: simmontq23@gmail.com
cloud version need to contact me, the program is also uploaded to an EC2 instance, and access via SSH requires an IAM user with proper permissions.

