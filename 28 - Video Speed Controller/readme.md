# DAY 28 --- Video Speed Controller
[Demo 地址](https://lab.lebenito.net/javascript30/28%20-%20Video%20Speed%20Controller/)

第二十八个练习是做一个视频播放速度的控制栏。

## 源码分析

其实这个内容在之前自定义播放器的时候就做过_(:з)∠)_

```javascript
// 获取所需的 DOM 元素
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
// 是否按下按键
let isDown;

function handleMove(e) {
// 当鼠标未按下时不触发
  if (!isDown) return;
// 获取鼠标位置到滑动条顶部的距离
  const y =  e.pageY - this.offsetTop;
// 计算移动距离百分比
  const percent = y / this.offsetHeight;
// 播放速度最小值
  const min = 0;
// 播放速度最大值
  const max = 2;
// 计算出高度比例（方便后续样式修改）
  const height = Math.round(percent * 100) + '%';
// 将百分比映射到高度中
  const playbackRate = percent * (max - min) + min;
// 修改样式的高度
  bar.style.height = height;
// 修改样式中显示的数值（toFixed 格式化数值到小数点后二位）
  bar.textContent = playbackRate.toFixed(2) + 'x';
// 设置视频播放时的速率
  video.playbackRate = playbackRate;
}
// 和上一个练习一样，我们通过 isDown 来控制只有在元素中按下鼠标移动才能修改相应值
speed.addEventListener('mousedown', () => isDown = true);
speed.addEventListener('mousemove', handleMove);
speed.addEventListener('mouseleave', () => isDown = false);
speed.addEventListener('mouseup', () => isDown = false);
```

## 要点

- `const playbackRate = percent * (max - min) + min` 通过此方法计算出速率的值，以在后续进行直接设置。

- [Number.prototype.toFixed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 方法用于格式化一个数值，返回一个所给数值的定点数表示法的字符串形式。

- [HTMLMediaElement.playbackRate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/playbackRate) 用于设置媒体文件播放时的速率。

完成🆗

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。