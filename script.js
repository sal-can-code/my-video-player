// Get elements
const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const seekBar = document.getElementById('seekBar');
const bufferBar = document.getElementById('bufferBar');
const playerContainer = document.getElementById('playerContainer');
const controls = document.getElementById('controls');
const timeDisplay = document.getElementById('timeDisplay');
const progressTrack = document.getElementById('progressTrack');

// Playlist
const playlist = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
];

let currentIndex = 0;

// Load the first video
video.src = playlist[currentIndex];
video.load();

// Play / Pause
playPauseBtn.addEventListener('click', function () {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '⏸ Pause';
  } else {
    video.pause();
    playPauseBtn.textContent = '▶ Play';
  }
});

// Rewind / Forward
rewindBtn.addEventListener('click', function () {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

forwardBtn.addEventListener('click', function () {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Previous / Next
function loadVideo(index) {
  video.src = playlist[index];
  video.load();
  video.play();
  playPauseBtn.textContent = '⏸ Pause';
}

prevBtn.addEventListener('click', function () {
  if (currentIndex > 0) {
    currentIndex--;
    loadVideo(currentIndex);
  }
});

nextBtn.addEventListener('click', function () {
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    loadVideo(currentIndex);
  }
});

// Seek bar
video.addEventListener('timeupdate', function () {
  const percent = (video.currentTime / video.duration) * 100;
  seekBar.style.width = percent + '%';
});
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

video.addEventListener('timeupdate', function () {
  const percent = (video.currentTime / video.duration) * 100;
  seekBar.style.width = percent + '%';
  timeDisplay.textContent =
    formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
});

// Buffer bar
video.addEventListener('progress', function () {
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const percent = (bufferedEnd / video.duration) * 100;
    bufferBar.style.width = percent + '%';
  }
});

// Click to seek
progressTrack.addEventListener('click', function (e) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  video.currentTime = percent * video.duration;
});

// Auto hide controls
let hideTimer;

function showControls() {
  controls.style.opacity = '1';
  progressContainer.style.opacity = '1';
  playerContainer.style.cursor = 'default';
}

function startHideTimer() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(function () {
    if (!video.paused) {
      controls.style.opacity = '0';
      progressContainer.style.opacity = '0';
      playerContainer.style.cursor = 'none';
    }
  }, 5000);
}

playerContainer.addEventListener('mousemove', function () {
  showControls();
  startHideTimer();
});
