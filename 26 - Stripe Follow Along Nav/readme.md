# DAY 26 --- Stripe Follow Along Nav
[Demo 地址](https://lab.lebenito.net/javascript30/26%20-%20Stripe%20Follow%20Along%20Nav/)

第二十六个练习是实现一个导航栏的动画，随着鼠标的指向而显示。

## 步骤分析

1. 获取所需 DOM 元素，实现基本的鼠标进出方法
2. 完善 `handleEnter` 方法
3. 完善 `handleLeave` 方法

## 第一步

首先确认所要用到的元素。

```javascript
// 鼠标移动到上面时触发动画所需的触发元素
const triggers = document.querySelectorAll('.cool > li');
// 背景元素，导航栏动画的背景板
const background = document.querySelector('.dropdownBackground');
// 整个导航栏，用于接下来的定宽定高
const nav = document.querySelector('.top');
// 基本的鼠标进入时触发的 handleEnter 方法
function handleEnter() {
  console.log('Enter');
}
// 基本的鼠标离开时触发的 handleLeave 方法
function handleLeave() {
  console.log('Leave');
}
// 给每一个触发元素添加鼠标进出的监听事件
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```

## 第二步

我们现在做到了鼠标移动到目标元素上即可触发指定方法。接下来我们需要完成的是完善整个 `handleEnter` 方法。

```javascript
function handleEnter() {
// 添加鼠标进入样式
  this.classList.add('trigger-enter');
// 延迟 150ms 检测当鼠标还在目标元素上时显示目标内容（延迟可避免鼠标移动过快出现产生拖影）
  setTimeout(() => this.classList.contains('trigger-enter')
    && this.classList.add('trigger-enter-active'), 150);
// 显示背景（修改 opacity 数值）
  background.classList.add('open');
// 获取框内元素以及他们的视界位置
  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
// 对位置进行修正
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }; 
// 重新调整背景的位置
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}
```

## 第三步

这一步就很简单了，我们只需要删除掉之前添加的样式，回到最初的状态。

```javascript
function handleLeave() {
// 初始化目标元素
  this.classList.remove('trigger-enter', 'trigger-enter-active');
// 初始化目标背景板
  background.classList.remove('open');
}
```

本次练习就完成了，其中的要点就是我们在设置背景板的上边距和左边距时，需要减去导航栏的上边距和左边距，才能得到我们所需的正确距离。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。