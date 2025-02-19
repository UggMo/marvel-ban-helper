import cv2
import numpy as np
import pyautogui
import time
import pytesseract
import json

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def capture_screen():
    screenshot = pyautogui.screenshot()
    screenshot = np.array(screenshot)
    screenshot = cv2.cvtColor(screenshot, cv2.COLOR_RGB2BGR)
    return screenshot

def extract_text_from_image(image): # perfect strength (psm) still not figured out, 7 works for nowww
    text = pytesseract.image_to_string(image, config='--psm 7')
    return text.strip()

def detect_match_start(template_path, hotspots, threshold=0.65, delay_after_detection=3): #reads file after 3 secs and then greyscales it to help text detection
    template = cv2.imread(template_path, cv2.IMREAD_GRAYSCALE)
    
    while True:
        screen = capture_screen()
        gray_screen = cv2.cvtColor(screen, cv2.COLOR_BGR2GRAY)
        res = cv2.matchTemplate(gray_screen, template, cv2.TM_CCOEFF_NORMED)
        loc = np.where(res >= threshold)

        if len(loc[0]) > 0:
            time.sleep(delay_after_detection)
            usernames = []

            for hotspot in hotspots: # makes sure to only ge the hotspots to print the names to usernames.json
                x, y, w, h = hotspot
                cropped_image = screen[y:y+h, x:x+w]
                hotspot_text = extract_text_from_image(cropped_image)
                if hotspot_text:
                    usernames.append(hotspot_text)
            # Output the list as JSON
            with open('usernames.json', 'w') as f:
                json.dump(usernames, f)
            return usernames

        time.sleep(1)

if __name__ == "__main__": # queue pops and this is cords where ocr scans 1920x1080 competitive.
    template_path = "queuePopImage.png"
    hotspots = [
        (268, 315, 200, 31),
        (236, 439, 200, 31),
        (205, 562, 200, 31),
        (171, 688, 200, 31),
        (143, 814, 200, 31),
        (111, 937, 200, 31),
        (1429, 187, 200, 31),
        (1399, 314, 200, 31),
        (1368, 438, 200, 31),
        (1337, 565, 200, 31),
        (1304, 688, 200, 31),
        (1274, 813, 200, 31)
    ]

    usernames = detect_match_start(template_path, hotspots=hotspots, delay_after_detection=3)
    print(usernames)