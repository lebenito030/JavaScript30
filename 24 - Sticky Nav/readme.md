# DAY 24 --- Sticky Nav
[Demo 地址](https://lab.lebenito.net/javascript30/24%20-%20Sticky%20Nav/)

第二十四个练习是做一个能够在滑动到一定位置时固定到顶部的导航栏，这个功能很常见。

## 源码分析

源码有 JavaScript 和 CSS 两个部分，会分开解释。

```javascript
// JavaScript 部分
// 获取导航栏 DOM 元素
let nav = document.querySelector('#main');
// 获得导航栏顶部到页面顶部的距离
let navOffsetTop = nav.offsetTop;

function fixNav() {
// 判断滚动距离是否超过了导航栏的距离
  if (window.scrollY >= navOffsetTop) {
// 超过时设定导航栏为 fixed 定位
// 修改 paddingTop 值是为了修正导航栏脱离文档流造成的偏移
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}
// 监听滚动事件，每次滚动都检查导航栏是否需要更改
document.addEventListener('scroll', fixNav);
```

```css
/* CSS 部分 */
/* 更改导航栏为 1：1 的比例 */
.fixed-nav .site-wrap {
  transform: scale(1);
}
/* 更改导航栏为 fixed 定位 */
.fixed-nav nav {
  position: fixed;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}
/* 显示 logo */
.fixed-nav li.logo {
  max-width: 500px;
}
```

因为是采用的 `flex` 布局所以使用了 `flex: 1;` 来保证了 `li` 元素的均匀宽度，再通过更改 logo 的最大宽度，来决定 logo 的是否显示。

完成🆗

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。