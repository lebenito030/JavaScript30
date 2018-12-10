# DAY 1 JavaScript Drum Kit

[Demo 地址](https://lab.lebenito.net/javascript30/01%20-%20JavaScript%20Drum%20Kit/)

第一个挑战项目是使用 JavaScript 制作一个架子鼓页面，通过敲击键盘上相应字母的按键，打击出不同的声音，并且在页面上会伴随敲击显示相应动画。

## 分析需求

1. 按下按键，根据按键的不同发出声音
2. 按下按键，根据按键的不同显示相应的动画

## 第一步

前面我们依次列出了我们的需求，那么现在开始一个一个完成他们。

现在我们都知道了，我们的两个需求都需要让页面知道，我们按下了按键，这个好办，我们添加一个监听事件。
```javascript
window.addEventListener('keydown', function(){});
```

## 第二步

### 需求：发出声音

根据需求，我们首先应该完成的是我们的核心内容，就是敲击按键，发出声音。那么我们可以写一个 `playSound` 方法来完成。

```javascript
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  if (!key) return;

  audio.currentTime = 0;
  audio.play();
  }
```

然后在我们的监听器里调用这个方法。

```javascript
window.addEventListener('keydown', playSound);
```

### 需求：实现动画
动画部分很简单，因为具体实现都已经写好了，我们只需要去调用就行了。那么我们就在 `playSound` 方法里面向监听对象添加一个已经写好的 `playing` 类

```javascript
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  if (!key) return;
  ///这句就是添加的 CSS 动画👇
  key.classList.add('playing');
  ///
  audio.currentTime = 0;
  audio.play();
}
```

好了，我们现在得到了一个按下去的动画，但是我们松开按键，改变的元素并不会恢复，这个时候我们就需要删除这个动画的效果达到初始化。

那么我们再添加一个删除这个动画的方法

```javascript
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}
```

接下来就是，放开按键的时候，我们需要去删除这个动画，那么我们再添加一个监听事件。

```javascript
window.addEventListener('keyup', removeTransition);
```
**完成！**

## 包含知识点

### 事件监听
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

```javascript
target.addEventListener(type, listener, options]);
```

* `targe`：支持事件的对象。
* `type`：表示监听事件类型的字符串。
* `listener`：必须是一个实现了 EventListener 接口的对象，或者是一个函数。
* `options`：一个指定有关 listener 属性的可选参数对象。

### Element.querySelector()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelector)

```javascript
element = baseElement.querySelector(selectors);
```

* `selectors`：是 CSS 选择器字符串。

### 模板字符串
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

```javascript
let a = 5;
let b = 10;
console.log(`a + b = ${a + b}`); //15
```

模板字符串让我们能够更好的操作字符串，能够允许我们嵌入表达式的字符串字面量。

### HTMLMediaElement.play()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play)

* `audio.play()` ->	开始播放音频
* `audio.currentTime` -> 设置或返回音频/视频中的当前播放位置（以秒计）

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。