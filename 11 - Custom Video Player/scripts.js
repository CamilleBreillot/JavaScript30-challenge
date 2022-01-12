// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullButton = player.querySelector('.fullscreen');

// function
function togglePlayer() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (this.paused) {
    toggle.textContent = '►';
  } else if (this.play) {
    toggle.textContent = "❚ ❚";
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeChange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const perc = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${perc}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  video.requestFullscreen();
}

// eventlisteners
video.addEventListener('click', togglePlayer);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlayer);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(skipButton => {
  skipButton.addEventListener('click', skip);
});
ranges.forEach(range => {
  range.addEventListener('change', handleRangeChange)
});
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeChange)
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
  if(mousedown) {
    scrub(e);
  }
});
// or progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullButton.addEventListener('click', handleFullScreen);
