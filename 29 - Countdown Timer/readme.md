# DAY 29 Countdown Timer
[Demo 地址](https://lab.lebenito.net/javascript30/29%20-%20Countdown%20Timer)

第二十九个练习是制作一个倒计时的效果。

## 第一步

先不进行步骤分析，一步一步来就行了。

1. 分析现有元素
2. 获取现有 DOM 元素

这是我们现在在 `body` 中有的 HTML 内容，我会用注释的方法表明他们的用途以便后续的解释。

```html
<!-- 倒计时的整体 div 元素 -->
<div class="timer">
  <!-- 控制部分，为倒计时输入需要倒计的事件值 -->
  <div class="timer__controls">
    <!-- 运用 data-time 来保存按键对应的值 -->
    <button data-time="20" class="timer__button">20 Secs</button>
    <button data-time="300" class="timer__button">Work 5</button>
    <button data-time="900" class="timer__button">Quick 15</button>
    <button data-time="1200" class="timer__button">Snack 20</button>
    <button data-time="3600" class="timer__button">Lunch Break</button>
    <!-- 自定义一个输入框来输入自定义的倒计时时间，以分钟为单位 -->
    <form name="customForm" id="custom">
      <input type="text" name="minutes" placeholder="Enter Minutes">
    </form>
  </div>
  <!-- 核心的显示剩余时间的部分 -->
  <div class="display">
    <!-- 显示倒计时的剩余时间 -->
    <h1 class="display__time-left"></h1>
    <!-- 显示倒计时结束时的本地时间 -->
    <p class="display__end-time"></p>
  </div>
</div>
```

然后我们先获取到我们所需要的 DOM 元素，我们在这里需要的是

1. 包含按键数据 `data-time` 的按钮
2. 计时器的剩余时间
3. 计时器结束倒计时的时间

```javascript
const buttons = document.querySelectorAll('[data-time]');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
```

## 第二步

这一步我们来完成核心部分，也就是倒计时 `timer` 方法。

```javascript
function timer(seconds) {
// 清除定时器 countdown（重置倒计时）
  clearInterval(countdown);
// 获取现在的时间
  const now = Date.now();
// Date.now() 返回的是毫秒为单位的时间戳，所以我们需要把时间换算（秒 * 1000）
// then 就是计时器的结束时间
  const then = now + seconds * 1000;
// 调用剩余时间的显示方法
  displayTimeLeft(seconds);
// 调用计时器结束时间显示方法
  displayEndTime(then);
// 新建定时器 countdown
  countdown = setInterval(() => {
// 计算结束时间并取整
    const secondsLeft = Math.round((then - Date.now()) / 1000);
// 当结束时间归零时清除定时器
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
// 每 1000 毫秒（就是一秒）重新显示一下剩余时间
    displayTimeLeft(secondsLeft);
  }, 1000);
}
```

## 第三步

上一步中有两个显示用的方法，我们来看一下。

```javascript
function displayTimeLeft(seconds) {
// 求得剩余的分钟数
  const minutes = Math.floor(seconds / 60);
// 除去剩余的分钟数，求得余下的秒
  const remainderSeconds = seconds % 60;
// 创建 display 为需要显示的内容（这里用模板字符串）
// 当剩余的秒时间小于 10 时为了不让时间显示为“10:1”此类，添加 '0' 保证样式
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
// 在 title 和 timerDisplay 中都动态显示剩余时间
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
// 使用时间戳（then）创建新的时间单位 end
  const end = new Date(timestamp);
// 直接获取结束的时间
  const hour = end.getHours();
// 官方源码中有一个 12 小时计时修正，这里采用 24 小时制式更加明确
// 获取分钟并输出到 endTime 元素中
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
```

## 第四步

剩下的就是调用这些方法来在页面中显示了。

```javascript
function startTimer() {
// 从 data-time 中获取时间值并作为 timer 的参数
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
// 遍历添加点击事件监听器到按键上
buttons.forEach(button => button.addEventListener('click', startTimer));
// 自定义 form 的提交事件
document.customForm.addEventListener('submit', function(e) {
// 清除原事件效果
  e.preventDefault();
// 获取输入的分钟数值
  const mins = this.minutes.value;
// 转换为秒单位作为 timer 的参数
  timer(mins * 60);
// 重置表单清除输入内容
  this.reset();
})
```

## 额外内容

- `document.customForm` 当表单元素或者 `input` 元素有 `name` 值时，我们可以通过 `document.[name]` 进行 DOM 元素的获取。

- 关于箭头函数的函数作用域，在箭头函数中，`this` 的指向为函数的父级作用域，而不是想象中的 ES5 中的函数作用域。

第二十九个练习就算完成啦👍

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。