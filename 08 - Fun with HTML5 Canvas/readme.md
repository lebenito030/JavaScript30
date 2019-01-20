# DAY 8 Fun with HTML5 Canvas
[Demo 地址](https://lab.lebenito.net/javascript30/08%20-%20Fun%20with%20HTML5%20Canvas/)

第八个挑战是用 Canvas 制作一个画板，颜色和粗细都是渐变的。

## 步骤

1. 创建画板
2. 获取上下文并设定基本样式
3. 编写方法设立绘画效果，并且和鼠标事件进行绑定

## 第一步

创建画板，其实默认已经创建好了

```javascript
<canvas id="draw" width="800" height="800"></canvas>
```

## 第二步

获取上下文，我们先获取 canvas 元素进行操作，这里使用 [getContext()](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage#%E6%B8%B2%E6%9F%93%E4%B8%8A%E4%B8%8B%E6%96%87%EF%BC%88The_rendering_context%EF%BC%89) 方法来进行渲染上下文的操作，其中使用 `'2d'` 来使用 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口。

```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
```

因为要把页面全屏都变为画板，所以我们动态更新 `canvas` 的宽高。

```javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

然后给画笔添加默认样式

```javascript
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
```

## 第三步

编写方法设立绘画效果，我们需要完成的效果有。

- 颜色渐变
- 粗细渐变

以及后面我们还需要通过监听事件来启用这些方法。

```javascript
let isDrawing = false;  //是否开始绘画
let lastX = 0;          //鼠标 X 轴坐标
let lastY = 0;          //鼠标 Y 轴坐标
let hue = 0;            //色相
let direction = true;   //粗细是否改变（变到一定大小开始缩小，而后增大来做到粗细渐变）
```

以上是所需的初始值，接下来我们添加一个 draw 方法。

```javascript
function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}
```

添加监听器调用 draw 方法。

```javascript
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。