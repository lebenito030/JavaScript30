# DAY 27 --- Click and Drag
[Demo 地址](https://lab.lebenito.net/javascript30/27%20-%20Click%20and%20Drag/)

第二十七个练习是完成一个点击拖拽的效果。

## 源码分析

因为内容并不多所以直接解释源码。

```javascript
// 获取拖动的目标元素 .items
const slider = document.querySelector('.items');
// isDown 来表示鼠标是否按下
let isDown = false;
// 初始化时的 X 轴坐标
let startX;
// slider 的 X 轴滚动量
let scrollLeft;
// 按下鼠标时添加样式以及修正 isDown 为 true 值
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
// 鼠标离开元素取消样式
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
// 松开鼠标也取消样式
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
// 鼠标移动时触发
slider.addEventListener('mousemove', (e) => {
// 当 isDown 为 false 时不执行以下代码
  if (!isDown) return;
// 清除默认的事件效果，去除鼠标的滑动选中
  e.preventDefault();
// 获得鼠标 X 轴移动距离
  const x = e.pageX - slider.offsetLeft;
// 计算元素的滚动距离（乘 3 加大移动距离，正值向左移动，负值向右移动）
  const walk = (x - startX) * 3;
// 相对原点移动的距离
  slider.scrollLeft = scrollLeft - walk;
});
```

## 要点

本次练习中的难点主要在于：

- `walk` 这个的意思是算出鼠标相对于点击时确认的初始点所移动的距离（向左移动为负值，向右移动为正值）

- `scrollLeft` 这个表示了鼠标按下去的时候，此时元素已经滚动的距离。

- `slider.scrollLeft = scrollLeft - walk` 用之前的水平距离减去我们拖动鼠标的移动距离，动态得到现在应该有的移动点的坐标值并更新，然后元素就能跟随鼠标的拖拽而移动了。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。