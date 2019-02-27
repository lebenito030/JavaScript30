# DAY 22 --- Follow Along Link Highlighter
[Demo 地址](https://lab.lebenito.net/javascript30/22%20-%20Follow%20Along%20Link%20Highlighter/)

第二十二个练习是实现一个随着锚点被触发而移动的高亮提示。

## 源码分析

```javascript
// 获取锚点 a 标签
const triggers = document.querySelectorAll('a');
// 创建高亮 span 元素并添加 highlight 样式
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);
// 创建 highlightLink 方法，实现高亮框的移动
function highlightLink() {
// 用 getBoundingClientRect 方法获取一组用于描述边框的只读属性
  const linkCoords = this.getBoundingClientRect();
// coords 为高亮元素移动到该锚点的各项坐标
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
// 因为 linkCoords 只包含元素对于可视位置的距离信息
// 所以需要加上滚动条的移动距离才能得到真实距离
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  };
// 移动高亮元素
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

}
// 遍历 nodeList 向每一个锚点都添加鼠标进入调用 highlightLink 方法的事件
triggers.forEach(trigger => trigger.addEventListener('mouseenter', highlightLink));
```

**要点**：[`object.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 是一个返回元素的大小及其相对于视口的位置的方法，MDN 中也有详细解释，不清楚的话可以去看看。这里的难点就是在于，滚动条移动后，视口位置不再能够适用于移动的位置，需要与滚动距离 `scrollY/X` 进行相加才能得到真正的移动距离。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。