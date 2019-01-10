# DAY 3 CSS Variables
[Demo 地址](https://lab.lebenito.net/javascript30/03%20-%20CSS%20Variables/)

第三个挑战是学会使用 CSS 变量。

## 分析需求

1. 初始化 CSS 变量
2. 给 `padding`、`filter`、`color` 等赋值
3. 监听 `input` 标签获得值
4. 将值赋给 CSS 变量动态更新样式

## 第一步

分析页面我们能够知道，我们需要更改图片的内边距、模糊以及背景颜色的值。

所以我们先在 CSS 根元素中定义这三个变量并赋予初始值。

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```

我们现在得到了这三个变量，接下来我们需要把变量赋值给图片。

```css
img {
  background: var(--base);
  padding: var(--spacing);
  filter: blur(var(--blur));
}
```

> 其中源码里的 hl 关系到 JS 两个字的颜色，和图片背景颜色是一个道理，我相信你能看出来的，此处就不再说了。

现在我们可以发现，图片的这三个属性都已被赋予了我们之前给变量设定的初始值。那么我们怎么让他们动起来呢，当然是用 JS 啦。

## 第二步

我们已经在第一步完成了前半部分，接下来我们需要做的是监听获取 `input` 的值。

首先，我们先在 DOM 中拿到全部 `input` 节点

```javascript
const inputs = document.querySelectorAll('.controls input');
```

然后我们遍历全部节点对象添加 `change` 和 `mousemove` 事件监听器

```javascript
inputs.forEach(inputElement => inputElement.addEventListener('change', function() {}));
inputs.forEach(inputElement => inputElement.addEventListener('mousemove', function() {}));
```

现在我们能够通过监听事件根据 `input` 的变化改变元素了，我们只需要写入相应的改变方法

```javascript
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
```

解释一下函数运行过程

1. 传入事件对象
2. 获取对象的 `dataset.sizing` 属性，主要是包含值的单位如 `px` 等
3. 如果没有单位如 `color` 这类值，变传入空字符串替代
4. 通过 `style.setProperty()` 方法，调整对应对象属性的值

OK，完成，接下来说一下用到的知识点

## 包含知识点

### CSS Variables
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

声明一个局部变量

```css
element {
  --main-bg-color: brown;
}
```

声明一个全局变量（在根元素中声明）

```css
:root {
  --global-color: #666;
  --pane-padding: 5px 42px;
}
```

使用一个局部变量

```css
element {
  background-color: var(--main-bg-color);
}
```

使用一个全局变量

```css
.demo{
   color: var(--global-color);
}
```

只要注意变量的作用域范围，使用起来是很简单的。

> 参考地址中为中文链接，想得到更详细的内容请查阅英文页面

### style.setProperty()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

语法

```javascript
style.setProperty(propertyName, value, priority);
```

* `propertyName` 是一个 DOMString ，代表被更改的CSS属性
* `value` 是一个 DOMString ，含有新的属性值。如果没有指定, 则当作空字符串。
* `priority` 是一个 DOMString 允许设置 "important" CSS 优先级。

其中 `value` 和 `priority` 都是可选项，你可以不使用它


----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。
