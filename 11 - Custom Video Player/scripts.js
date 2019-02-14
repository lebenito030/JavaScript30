// 获取 DOM 元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// 事件触发
const buttonMethods = {
  update: function() {
    const status = video.paused ? 'play' : 'pause';
    console.log(status);
    video[status]();
  },
  updateIcon: function() {
    const status = video.paused ? '►' : '❚ ❚';
    toggle.textContent = status;
  }
}

const rangesMethods = {
  update: function() {
    video[this.name] = this.value;
  }
}

const progressBarMethods = {
  update: function() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  },
  grab: function(e) {
    const grabTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = grabTime;
  },
  skip: function() {
    video.currentTime += parseFloat(this.dataset.skip);
  }
}

// 绑定监听事件
video.addEventListener('click', buttonMethods.update);
video.addEventListener('play', buttonMethods.updateIcon);
video.addEventListener('pause', buttonMethods.updateIcon);
toggle.addEventListener('click', buttonMethods.update);

ranges.forEach(range => range.addEventListener('change', rangesMethods.update));
ranges.forEach(range => range.addEventListener('mousemove', rangesMethods.update));

let isMouseDown = false;
skipButtons.forEach(skipButton => skipButton.addEventListener('click', progressBarMethods.skip));
video.addEventListener('timeupdate', progressBarMethods.update);
progress.addEventListener('click', progressBarMethods.grab);
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mousemove', (e) => isMouseDown && progressBarMethods.grab(e));
progress.addEventListener('mouseup', () => isMouseDown = false);