# DAY 11 Custom Video Player
[Demo 地址](https://lab.lebenito.net/javascript30/11%20-%20Custom%20Video%20Player/index.html)

第十一个练习是制作一个自定义视频播放器，CSS 部分已经完成，只需要我们完成 JS 的部分。需要完成的效果有，基本的暂停播放，拖动进度条更改播放进度，自由调整音量，自由调整播放速度。

## 步骤拆分

1. 获取各个需要操作的 DOM 元素
3. 完成播放，暂停，声音调整，播放速度，进度条，快进后退调整所需函数
3. 将函数绑定至监听事件上

## 第一步

同样是使用 `querySelector()` 或 `querySelectorAll()` 即可完成。

```javascript
// 播放器
const player = document.querySelector('.player');
// Video 标签
const video = player.querySelector('.viewer');
// 总进度条
const progress = player.querySelector('.progress');
// 进度条
const progressBar = player.querySelector('.progress__filled');
// 播放 / 暂停按键
const toggle = player.querySelector('.toggle');
// 音量 / 播放速度
const ranges = player.querySelectorAll('.player__slider');
// 快退 / 快进
const skip = player.querySelectorAll('[data-skip]');
```

## 第二步 && 第三步

首先我们来完成视频播放和暂停状态下的图标切换。

```javascript
const buttonMethods = {
  update: function() {
    const status = video.paused ? 'play' : 'pause';
    video[status]();
  },
  updateIcon: function() {
    const status = video.paused ? '►' : '❚ ❚';
    toggle.textContent = status;
  }
}
```

然后添加监听事件。

```javascript
video.addEventListener('click', buttonMethods.update);
video.addEventListener('play', buttonMethods.updateIcon);
video.addEventListener('pause', buttonMethods.updateIcon);
toggle.addEventListener('click', buttonMethods.update);
```

这样一来我们就完成了，点击进行的播放暂停操作。

接下来是声音和播放速度的内容。

```javascript
const rangesMethods = {
  update: function() {
    video[this.name] = this.value;
  }
}
```

然后添加监听事件。

```javascript
ranges.forEach(range => range.addEventListener('change', rangesMethods.update));
ranges.forEach(range => range.addEventListener('mousemove', rangesMethods.update));
```

最后我们来完成调整进度条和快进后退的内容。

```javascript
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
```

绑定监听事件。

```javascript
let isMouseDown = false;
skipButtons.forEach(skipButton => skipButton.addEventListener('click', progressBarMethods.skip));
video.addEventListener('timeupdate', progressBarMethods.update);
progress.addEventListener('click', progressBarMethods.grab);
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mousemove', (e) => isMouseDown && progressBarMethods.grab(e));
progress.addEventListener('mouseup', () => isMouseDown = false);
```

不知不觉第二步和第三步混合写了，不过也不是太难，一步一步来就行了。

完成！

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。