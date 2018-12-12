# DAY 2 JS and CSS Clock
[Demo 地址](https://lab.lebenito.net/javascript30/02%20-%20JS%20and%20CSS%20Clock/)

第二个挑战项目是制作一个时钟页面。（没错，就是很基础）

## 分析需求

1. 获取当前时间，对指针角度进行变换。

## 第一步

首先这个页面已经是完成得差不多了，我们其实可以直接开始调整指针的转动，不过在那之前，有些 `CSS` 的部分还需要完成。

```css
.hand {
  width: 50%;
  height: 6px;
  background: black;
  position: absolute;
  top: 50%;
}
```

这是一开始我们有的 `CSS` 内容，这个时候如果我们去做转动指针的操作，我们会发现指针旋转的『支点』是指针的中心。

因此我们需要去进行一些调整。

```css
.hand {
  height: 6px;
  background: black;
  position: absolute;
  top: 50%; right: 50%;
  border-radius: 10px;
  transform-origin: 100%;
  transform: rotate(90deg);
  transition: all 0.05s;
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}

.hour-hand {
  width: 40%;
}

.min-hand {
  width: 50%;
}

.second-hand {
  width: 48%;
  background: red;
}
```

这样看起来就正常了许多，那么我解释一下修改的内容。

1. 我们去掉了 `hand` 类的宽度设置，因为我们需要单独调整每一个指针的长度。
2. 添加 `border-radius` 对指针进行美化（谁不喜欢圆润一点呢）
3. `transform-origin` 就是核心内容了，后面的数值决定了『支点』在 `x` 轴上的位置。（具体内容在后面会提到）
4. `transform` 因为我们的指针在一开始只是 3 根直线而已，所以我们需要把他转到垂直方向。
5. `transition` 和 `transition-timing-funcion` 这里先不多说，只需要知道是动画的持续时间和如何持续就行了。

## 第二步

进入正题，毕竟这还是一个 JS 练习项目。(:з)∠)

既然要让我们创建的指针动起来，当然是要先拿到它了。

```javascript
const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');
```

现在我们拿到了这些指针，接下来就是写一个方法，让这些指针的角度每一秒更新一次，那么他们就会自然而然的转起来。

```javascript
function setDate() {
  const now = new Date();

  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentSecond = now.getSeconds();

  const hourDegree = (currentHour * 30) + (currentMin / 2) + 90; //((currentHour / 12) * 360) + ((currentMin / 60) * 30) + 90;
  const minDegree = (currentMin * 6) + (currentSecond / 10)  + 90; //((currentMin / 60) * 360) + ((currentSecond / 60) * 6) + 90;
  const secondDegree = (currentSecond * 6) + 90;

  hourHand.style.transform = `rotate(${hourDegree}deg)`;
  minHand.style.transform = `rotate(${minDegree}deg)`;
  secondHand.style.transform = `rotate(${secondDegree}deg)`;
}
```

好了，我们现在写了一个方法，在执行的时候会获取当前时间，然后根据当前时间我们就能算出指针应该转动多少度。

>PS：其实这些是改良过的，众所周知，时针和分针是跟随秒针的转动在一直转动的，所以我们需要把每一秒带来的影响代入进去，就是一个更加精细的时钟了。

有了方法，我们该实现每秒的调用了。

```javascript
setInterval(setDate, 1000);

setDate();
```

很简单吧，这样就完成了。

## 包含知识点

### transform
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

- `transform-origin`：它的属性可以使用一个，两个或三个值来指定，其中每个值都表示一个偏移量。 没有明确定义的偏移将重置为其对应的初始值。(对应值就是 X、Y、Z 三轴的偏移量)
- `transform: rotate(angle)`：定义 2D 旋转，在参数中规定角度。
- `transition`：内含 4 个过渡属性。
```css
transition: property duration timing-function delay;
```
- `transition-timing-function`：该属性允许过渡效果随着时间来改变其速度。有 `linear|ease|ease-in|ease-out|ease-in-out` 5 种可选方式，也可以通过 `cubic-
bezier(n,n,n,n)` 创建自定义的改变效果。

### 模板字符串
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

```javascript
let a = 5;
let b = 10;
console.log(`a + b = ${a + b}`); //15
```

在练习一里面也提到过的操作字符串方式。

### Date()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

创建 Date 实例用来处理日期和时间。