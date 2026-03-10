# Loving Homes | لوفينغ هومز — Project Structure

## Folder Organization

```
project/
├── HTML/
│   └── index.html          # Main HTML page (links to CSS and JS)
├── CSS/
│   └── style.css           # All styles extracted from the original HTML
├── JS/
│   └── main.js             # All JavaScript extracted from the original HTML
├── Images/
│   ├── hero-bg.jpg         # Hero section background image
│   ├── image_1.jpg         # Dog/hotel images used throughout the site
│   ├── image_2.jpg
│   └── ...                 # Additional images
├── Sounds/                 # Folder for audio files (currently empty)
├── Videos/                 # Folder for video files (currently empty)
└── README.md               # This file
```

## Notes
- The original single HTML file has been separated into HTML, CSS, and JS files
- Base64 embedded images have been extracted into the Images folder
- The HTML file references external CSS and JS using relative paths: `../CSS/style.css` and `../JS/main.js`
