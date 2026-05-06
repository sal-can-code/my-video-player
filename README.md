# Custom Web Video Player

A custom-built browser video player built from scratch with vanilla HTML, CSS, 
and JavaScript — inspired by frustrations with poorly implemented video players 
on streaming platforms.

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
- [Author](#author)

## Overview

### Features

- Play / Pause toggle with dynamic button state
- Rewind and forward 10 seconds
- Previous and next video in playlist
- Seek bar — click anywhere to jump to that position
- Buffer indicator showing how much of the video has loaded
- Live time display showing current position and total duration
- Auto-hide controls after 5 seconds of mouse inactivity
- Controls always visible when video is paused

## My Process

I started by identifying a real frustration — video players on some streaming 
platforms handle buffering poorly, especially on slow internet connections. 
Rather than accepting that, I decided to build my own player from scratch to 
understand exactly how browsers handle video natively.

I planned the features before writing a single line of code, breaking the 
player into logical parts — playback controls, playlist navigation, progress 
tracking, and UI behaviour. Each feature was built and tested independently 
before moving to the next.

The biggest challenge was CSS layering — the progress bar and buffer indicator 
are absolutely positioned elements stacked on top of each other using z-index, 
and getting them to render correctly inside the player took methodical debugging. 
I also ran into a JavaScript ReferenceError caused by declaring the same variable 
twice, which taught me to keep all declarations at the top of the file and 
understand how JavaScript reads code top to bottom.

### Built With

- Semantic HTML5
- CSS3 with absolute positioning and transitions
- Vanilla JavaScript — no libraries or frameworks
- Native HTML5 Video API

### What I Learned

How the browser handles video natively through the HTML5 Video API — 
specifically how `timeupdate` and `progress` events work differently, 
one tracking playback position and the other tracking how much data 
has been buffered from the network.

I also learned how to debug CSS layering issues using z-index and 
position absolute, and how JavaScript variable scope causes 
ReferenceErrors when declarations are duplicated or out of order.

```javascript
// timeupdate fires continuously during playback
video.addEventListener('timeupdate', function() {
  const percent = (video.currentTime / video.duration) * 100;
  seekBar.style.width = percent + '%';
});

// progress fires as the browser downloads the video
video.addEventListener('progress', function() {
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const percent = (bufferedEnd / video.duration) * 100;
    bufferBar.style.width = percent + '%';
  }
});
```

### Continued Development

Phase 2 will add:
- Subtitle support via WebVTT
- Quality selector (144p to 4K) using HLS streaming

## Author

- GitHub: [sal-can-code](https://github.com/sal-can-code)