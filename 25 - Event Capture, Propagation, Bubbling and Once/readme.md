# DAY 25 --- Event Capture, Propagation, Bubbling and Once
[Demo 地址](https://lab.lebenito.net/javascript30/25%20-%20Event%20Capture,%20Propagation,%20Bubbling%20and%20Once/)

第二十五个练习是关于事件机制的学习，需要打开 `console` 进行查看。

## 源码分析

本次练习中包括了事件捕获和事件冒泡以及单次执行事件内容。

```javascript
// 获取 div 元素和 button 元素
const divs = document.querySelectorAll('div');
const button = document.querySelector('button');
// 在 console 中显示是哪一个元素被触发
function logText(e) {
  console.log(this.classList.value);
}
// 监听所有 div（只能执行一次）
divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  once: true
}));
// 点击事件（只能执行一次）
button.addEventListener('click', () => {
  console.log('Click!');
}, {
  once: true
});
```

这应该是第一次在监听器中看见第三个参数，第三个参数是指定监听器的一些属性的一个对象，可用选项有 `capture`、`once`、`passive`。具体内容可以查阅 MDN 上的 [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 部分。

## 要点

事件捕获和事件冒泡都是为了解决浏览器处理事件的先后顺序诞生的，本次练习中，源码不进行改动时，直接点击中心的 `.three` 元素，监听事件会在冒泡阶段触发，即从内到外 `.three` => `.two` => `.one` => `body` => `html` => `document`，但当我们修改 `capture` 的值为 `true` 时，监听器就会在捕获阶段执行，这和冒泡阶段相反，是从外到内的 `document` => `html` => `body` => `.one` => `.two` => `.three`。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。