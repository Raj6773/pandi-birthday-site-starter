# 🐷 Pandi Birthday Website

This is a mobile-first starter website for the birthday flow you described.

## Folder replacements

Replace these files later:

- `assets/photos/puzzle-photo.jpg` → the photo used for the 3x3 puzzle.
- `assets/video/birthday-video.mp4` → the birthday/Motu Patlu video.
- `assets/stickers/` → her cartoon stickers.
- `assets/gifs/` → WhatsApp GIFs/stickers.

The current website deliberately uses placeholders so you can test the whole flow before adding your real assets.

## First thing to change

Open `script.js` and change:

```js
correctBirthday: "CHANGE-ME"
```

to her actual birthday in:

`YYYY-MM-DD`

Example:

```js
correctBirthday: "2002-08-31"
```

## Current flow

1. Birthday check
2. Wrong birthday reaction + Try Again
3. Are You Ready? → YES / NO
4. NO → angry reaction → Sorry → returns to Ready
5. Birthday celebration
6. Candle/cake interaction
7. Gift?
8. 3x3 sliding puzzle
9. Automatically opens video after the puzzle is solved
10. Final birthday message + Bye

## Adding stickers/GIFs

The placeholder boxes say where the real stickers can go. Later we can replace those with the actual files and decide which expression belongs to each scene.

## Important

The site is designed mobile-first and includes iPhone-friendly details such as:

- viewport/safe-area handling
- `playsinline` video
- touch-friendly buttons
- responsive layout
- no hover-only interactions
- reduced-motion support
- no horizontal page overflow

Open `index.html` in a browser to test the starter version.
