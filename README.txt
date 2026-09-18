PANDI BIRTHDAY SITE - FIXED NOSE -> HEART ANIMATION

Replace your existing index.html, style.css and script.js with these three files.

IMPORTANT:
Keep your existing assets folder beside them.

The surprise animation expects these exact files:
assets/gifs/surprise_exact/rise.png
assets/gifs/surprise_exact/pop.png
assets/gifs/surprise_exact/flipstart.png
assets/gifs/surprise_exact/flipping.png
assets/gifs/surprise_exact/reveal.png
assets/gifs/surprise_exact/heart.png

Your screenshot showed that this folder already contains all six files.

FIX:
The previous script still contained the old SVG-morph code and tried to access
morphMain, noseDetails and heartDetails, which do not exist in the new HTML.
That JavaScript error stopped playSurpriseAnimation() before the CSS animation
could start. This version removes the stale SVG code completely and animates
the six supplied PNG stages directly.

No video or GIF is used for the nose-to-heart transition.
