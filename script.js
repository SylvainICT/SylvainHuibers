const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const progressBar = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Play/Pause toggle
playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶️";
  }
});

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  // Update current time and duration
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60);

  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")}`;
  durationDisplay.textContent = `${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Seek audio
progressBar.addEventListener("input", () => {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
});

// Load metadata to display duration
audio.addEventListener("loadedmetadata", () => {
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60);
  durationDisplay.textContent = `${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});
