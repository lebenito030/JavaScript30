# DAY 5 Flex Panel Gallery
[Demo 地址](https://lab.lebenito.net/javascript30/05%20-%20Flex%20Panel%20Gallery/)

第五个挑战是使用 Flex 布局制作一个简单的展示页面，你可以在 Demo 地址中查看页面最终效果。

## 需求部分

1. 使用弹性布局横向排列各个部分。
2. 点击各个部分会进行横向扩展显示。
3. 每个部分中的第一个和最后一个 P 元素内容在扩展动画结束后实现飞入动画。
4. 再次点击恢复初始状态。

## 第一步

我们可以发现一开始我们的页面是纵向排列的，那么我们需要首先把页面布局完成。先来看看 CSS 部分我们做了什么吧。

```css
.panels {
  /*省略默认部分*/
  display: flex;
}

.panel {
  /*省略默认部分*/
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.panel > * {
  /*省略默认部分*/
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.panel > *:first-child { transform: translateY(-100%) }
.panel.open-active > *:first-child { transform: translateY(0) }
.panel > *:last-child { transform: translateY(100%) }
.panel.open-active > *:last-child { transform: translateY(0) }

.panel.open {
  /*省略默认部分*/
  flex: 5;
}
```

这样我们的 CSS 部分就完成了。接下来来讲解一下过程吧，如果你看懂了也可以直接跳过这部分。

添加 `display: flex` 到 `panels` 中，你会发现五个元素都变成了横向排列，但是他们没有完全覆盖整个页面，这是为什么呢。

这里我们给 `panel` 类添加一个 `flex: 1`，这是一个简写属性，后面会详细介绍，作用是让弹性盒模型对象的子元素都有相同的长度。这样 5 个元素就能全部均匀横向填充整个页面宽度。

接着我们会发现，`panel` 内部的 P 元素并没有居中显示，这个好办，我们在 `panel` 中使用 flex 布局，然后调整伸缩流（主轴）的方向为 column，这样 `panel` 中的 P 元素便会纵向排列，再使用 `justify-content: center` 就可以达到居中的效果。

这里想提一下，因为在这里我仍未分清 `justify-content` 和 `align-items` 的区别，也许正在看的你也有一丝疑惑，`justify-content` 是调整主轴上元素的排列方式，而 `align-items` 是调整侧轴上元素的排列方式，主轴和侧轴你可以想象成平面直角坐标系，主轴是 X，侧轴是 Y，详细内容可以去[这里](https://www.w3.org/html/ig/zh/css-flex-1/#justify-content)查阅。

现在我们的页面完成的差不多了，还差一小部分，`panel` 内部的 3 个 P 元素在最初状态应该是只有第 2 个是显示的，第一个和最后一个都应当是在 `panel` 的扩展动画结束时从上端和下端飞入。既然是飞入，只需要让他们一开始在屏幕外就行了嘛，添加 `transform: translateY(±100%)` 将两个 P 元素放置到最外端。再给执行动画的类 `open-active` 设置 `transform: translateY(0)` 当这个类被添加时便会让 P 元素飞入。

## 第二步

点击以一定比例扩展 `panel` 的宽度。

```javascript
// 获取 DOM 元素
const panels = document.querySelectorAll('.panel');

// 监听器触发事件给 panel 添加 open 类
function toggleOpen(e) {
  this.classList.toggle('open');
}

// 监听 panels 的点击事件
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
```

## 第三步

每个部分中的第一个和最后一个 P 元素内容在扩展动画结束后实现飞入动画。

```javascript
// 判断是否执行的事件
function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

// 添加动画执行结束的事件监听器到 panels 上
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```
## 第四步

再次点击恢复初始状态，这是利用了 `classList.toggle()` 方法，当指定类存在时，会将其删除，反之会添加。

## 包含知识点

### flex: 1
[参考地址](https://www.w3.org/html/ig/zh/css-flex-1/#flexibility)

flex 是 flex-grow、flex-shrink、flex-basis 的缩写，其默认值是 `0 1 auto`，而当 flex 值为正数时，它的表现效果等同于 `flex: 1 0px`，在 w3c 的文档中是这样解释的。

> 该值使元素可伸缩，并将伸缩基准值设置为零，导致该项目会根据设置的比率占用伸缩容器的剩余空间。如果一个伸缩容器里的所有项目都使用此模式，则它们的尺寸会正比于指定的伸缩比率。

### Element.classList.toggle()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

classList.toggle() 方法在只有一个参数时会改变参数对应的 Class 值，如果 Class 存在，则删除它并返回 false，如果不存在，则添加它并返回 true。当存在第二个参数时：如果第二个参数的计算结果为 true，则添加指定的类值，如果计算结果为 false，则删除它。

这里给出 MDN 上的例子：

```javascript
// 当 i < 10 时添加 visible 类，当 i >= 10 时删除 visible 类
div.classList.toggle("visible", i < 10 );
```

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。