# DAY 16 --- Mouse Move Shadow
[Demo 地址]()

第十六个练习是实现鼠标在页面上移动，而字体的阴影跟随鼠标的移动而移动的效果。

## 源码分析

内容不多，直接用注释写出来吧。

```javascript
// 获取 DOM 元素
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
// walk 为字体阴影的最大移动距离（单位 px）
const walk = 20;

function shadow(e) {
// 解构赋值
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;
// 当鼠标指向目标不为 hero 时，默认事件会导致阴影偏移量不一致，需要进行下面的修正
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
// 算出实际阴影的偏移量并取整数
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));
// 添加阴影
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0, 255, 0, 0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)
  `;
}
// 监听鼠标的移动事件
hero.addEventListener('mousemove', shadow);
```

## 知识点

### 解构赋值
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

解构赋值语法是一个 Javascript 表达式，运用解构赋值能够更方便的从数组或对象中提取数据赋值给其他不同的变量。

### 鼠标事件
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)

在本次练习中主要用到了 [`event.offsetX`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX)、[`event.offsetY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetY) 这两个事件，会返回事件对象与目标节点的内填充边（padding edge）在 X/Y 轴方向上的偏移量。

### HTMLElement 属性

本次练习中出现了 [`HTMLElement.offsetTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)、[`HTMLElement.offsetLeft`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetLeft)、[`HTMLElement.offsetWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)、[`HTMLElement.offsetHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)，它们会返回该元素的 `顶部相对于父元素顶部的距离`、`左上角相对于父元素左边界的距离`、`元素的布局宽度`、`元素的布局高度`。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。