PANDI BIRTHDAY WEBSITE — COMPLETE PERFORMANCE BUILD

This is the complete project. Replace your existing website files AND assets folder with these together, then commit/push this one ZIP's contents.

Performance changes:
- Original asset archive: about 349.8 MB uncompressed.
- Final assets folder: about 26.8 MB uncompressed (roughly 92% smaller).
- Removed exact duplicate assets and fixed all references.
- Converted all 34 unique animated GIFs to animated WebP, keeping transparency and looping; reduced them to a maximum width of 480 px and 12 fps to reduce download and animation-decoding load.
- Converted the puzzle background image from PNG to WebP, reducing it from about 1.40 MB to about 70 KB. The puzzle layout/logic is unchanged.
- First page waits only for the main pig; floating reactions load after the page is usable.
- Removed redundant hidden-image preloading to reduce duplicate decoding work.
- Surprise animation video uses preload="none", so it won't download before that step is opened.
- Kept both video files and all unique photos/reaction assets.

Compatibility: animated WebP is supported in current Chrome, Firefox, and Safari/iOS 14+. Please test the deployed site on the target phones after pushing.
