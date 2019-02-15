# DAY 13 Slide in on Scroll
[Demo 地址](https://lab.lebenito.net/javascript30/13%20-%20Slide%20in%20on%20Scroll/index.html)

第十三个挑战是让文章中的图片只在滚动到特定位置时浮入。

## 步骤拆分

1. 获取所需的图片元素
2. 监听 `window` 中的滚动 `scroll` 事件
3. 编写 `checkslide()` 函数，在滚动到特定位置时给指定图片添加 `slide-in` 动画

## 第一步 && 第二步

很简单，这里直接给出代码部分。

```javascript
// 获取图片元素
const sliderImages = document.querySelectorAll('.slide-in');
// 监听事件，使用 debounce 去除函数抖动
// checkSlide 方法在第三步进行解释
window.addEventListener('scroll', debounce(checkSlide));
```

## 第三步

下面会使用注释来进行解释。

```javascript
function checkSlide() {
// 循环遍历得到所有所需的 img 元素
  sliderImages.forEach(sliderImage => {
// 括号中的内容得到当前滚动高度（从页面的开始到当前可视位置的底部）
// 再减去图片高度的一半，得到图片一半位置到达屏幕底端的位置距离
    const slideAt = (window.innerHeight + window.scrollY) - sliderImage.height / 2;
// 图片顶部到页面开始位置的距离 + 图片高度
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
// 图片是否已经显示一半
    const isHalfShown = slideAt > sliderImage.offsetTop;
// 图片是否完全滚动出现
    const isNotScrollPast = window.scrollY < imageBottom;
// 已经显示一半 && 未完全滚动出现 => 动画触发
    if (isHalfShown && isNotScrollPast) {
      sliderImage.classList.add('active');
// 尚未显示一半 || 完全滚动出现 => 动画取消
    } else {
      sliderImage.classList.remove('active');
    }
  });
}
```

好了，这样本练习就结束了。下面提一下本练习中发现的有趣的内容。

**函数防抖 `debounce`**

当我们在连续触发 `scroll` 事件时，我们需要让函数不会跟着连续触发，跟着触发会增加浏览器的压力，这时候就需要用到函数防抖，运用 `debounce` （函数防抖）可以很好的解决这种问题。这里给出一个详细介绍的 [链接](https://css-tricks.com/debouncing-throttling-explained-examples/)，感兴趣可以去看看。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。