# DAY 18 --- Adding Up Times with Reduce
[Demo 地址](https://lab.lebenito.net/javascript30/18%20-%20Adding%20Up%20Times%20with%20Reduce/)

第十八个练习是，记录每一个“视频”的时长然后算出总的时长。

## 源码分析

本次练习的内容也比较简单，这里直接给出源代码进行分析。

```javascript
// 将获取的 DOM 元素全部存入一个新数组中
const timeNode = Array.from(document.querySelectorAll('[data-time]'));
// 遍历数组中的时间数据并转换成秒进行保存
const seconds = timeNode
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((total, currentSeconds) => total + currentSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```

## 要点

1. `document.querySelectorAll('[data-time]')` 获得的是一个 `nodeList` 并不是一个数组，所以需要使用 `Array.from()` 来把它保存成数组
2. `.map(parseFloat)` 等效于 `.map((data) => parseFloat(data))`
3. `Math.floor` 等于向下取整数


----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。