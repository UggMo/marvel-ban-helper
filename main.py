import subprocess

def runScript(command, scriptName):
    # subprocess script and erorr handling
    try:
        subprocess.run(command, check=True, shell=True)
        print(f"{scriptName} worked.")
    except subprocess.CalledProcessError as e:
        print(f"{scriptName} no work (probably need to put your API key in an .env file): {e}")

if __name__ == "__main__":
    print("Get into a ranked game loading screen...")

    # Step 1: Run OCR to detect usernames
    runScript("python ocr.py", "OCR funciton (ocr.py)")

    # Step 2: Fetch UIDs for usernames
    runScript("node fetchUid.js", "UID getter (FetchUid.js)")

    # Step 3: Fetch player stats & top heroes
    runScript("node fetchTopHero.js", "Stat getter (fetchTopHero.js)")

    print("results in topHeroes.json.")