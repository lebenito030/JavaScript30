# DAY 30 --- Whack A Mole
[Demo 地址](https://lab.lebenito.net/javascript30/30%20-%20Whack%20A%20Mole/)

第三十个练习（也是最后一个）是制作一个打地鼠的游戏。

## 页面分析

首先我们还是来看看页面是我们有哪些元素可以操作。

```html
<!-- 分数 -->
<h1>Whack-a-mole! <span class="score">0</span></h1>
<!-- 调用开始游戏方法的开始按钮 -->
<button onClick="startGame()">Start!</button>
<!-- 游戏本体框架 -->
<div class="game">
  <div class="hole hole1">
    <div class="mole"></div>
  </div>
  <div class="hole hole2">
    <div class="mole"></div>
  </div>
  <div class="hole hole3">
    <div class="mole"></div>
  </div>
  <div class="hole hole4">
    <div class="mole"></div>
  </div>
  <div class="hole hole5">
    <div class="mole"></div>
  </div>
  <div class="hole hole6">
    <div class="mole"></div>
  </div>
</div>
```

再来看看 CSS 部分。

```css
/* 这是鼹鼠的 CSS 样式 */
.mole {
  background: url('mole.svg') bottom center no-repeat;
  background-size: 60%;
  position: absolute;
/* top 距离设置为 100% 完全“潜入地下” */
  top: 100%;
  width: 100%;
  height: 100%;
  transition:all 0.4s;
}
/* up 样式使鼹鼠从洞中冒出 */
.hole.up .mole {
  top: 0;
}
```

我们现在可以知道，我们只需要调用 `up` 样式，就可以让鼹鼠从地上钻出来了（核心功能 -> 钻出来）

## 第二步

现在我们就来完成控制鼹鼠的一系列方法。

```javascript
// 先是获取所需要的 DOM 元素
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
// 预设变量
let lastHole;          //最后一次出现的鼹鼠洞
let timeUp = false;    // 是否到达游戏结束时间
let score = 0;         // 分数

function randomTime(min, max) {
// 随机一个 min max 区间中的整数，来确定鼹鼠的存在时间
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
// 随机取得一个鼹鼠洞
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
// 避免两次都是同一个鼹鼠洞
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    // 重新判定
    return randomHole(holes);
  }
// 更新最后一个洞位置
  lastHole = hole;
  return hole;
}
// 打地鼠成功方法
function bonk(e) {
// isTrusted 防止脚本操作
  if (!e.isTrusted) return;
// 加分
  score++;
  this.parentNode.classList.remove('up');
// 更新分数
  scoreBoard.textContent = score;
}
```

## 第三步

接下来我们需要利用上述的控制鼹鼠的方法来进行游戏，所以我们需要一个控制游戏进程的方法。

```javascript
function peep() {
// 取得鼹鼠的存在时间
  const time = randomTime(200, 1000);
// 取得鼹鼠钻出的洞位置
  const hole = randomHole(holes);
// 鼹鼠钻出
  hole.classList.add('up');
  setTimeout(() => {
// 存在时间结束，鼹鼠钻回洞中
    hole.classList.remove('up');
// 如果分数超过 10 或者已经到达结束时间，游戏结束
    score < 10 && !timeUp ? peep() : alert('Game Over!');
  }, time);
}

function startGame() {
// 将分数初始化到分数版
  scoreBoard.textContent = 0;
// 初始化分数和是否到达游戏结束时间
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
// 10 秒后结束游戏
    timeUp = true;
  }, 10000);
}
// 当点到鼹鼠时，触发击打成功方法
moles.forEach(mole => mole.addEventListener('click', bonk));
```

## 要点

- [Event.isTrusted](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted) 本方法是返回一个布尔值，用以检测事件是否是由人工触发（有可能是由脚本指令触发）

OK，本次练习就到此结束了。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。