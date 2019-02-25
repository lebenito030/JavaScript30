# DAY 19 --- Webcam Fun
[Demo 地址](https://lab.lebenito.net/javascript30/19%20-%20Webcam%20Fun/)

第十九个练习是使用浏览器操作电脑摄像头记录影像，并输出到 Canvas 中，以及一些基础的滤镜功能。

## 步骤分析

1. 获取摄像头的影像
2. 将影像输出到 Canvas 上
3. 添加滤镜功能
4. 拍照保存

## 第一步

首先我们通过 [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) 提示用户给予使用媒体输入的许可。

```javascript
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream =>  {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.log('Error', err);
    });
}
```

- [MediaDevices.getUserMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) 此方法会在浏览器中弹出提示请求使用视频或者音频设备，并且会返回一个 `Promise` 对象，成功（允许）后会 `resolve` 一个 `MediaStream` 对象，失败（禁止）后会 `reject` 一个 `PermissionDeniedError` 或者 `NotFoundError`。


- [HTMLMediaElement.srcObject](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/srcObject) 此方法可以给 `HTMLMediaElement` 关联它们的媒体源，通常情况下设定的对象是 `MediaStream`。

## 第二步

我们把所得到的影像渲染到 Canvas 中，再对像素进行修改实现滤镜功能。

```javascript
function paintToCanvas() {
// 获取摄像头传输的视频宽高
  const width = video.videoWidth;
  const height = video.videoHeight;
// 将摄像头视频宽高应用到 canvas 中
  canvas.width = width;
  canvas.height = height;
// 每秒 60+ 次调用 drawImage 方法输出摄像头图像达到 60+ 帧的刷新率
  return setInterval(() => {
// 对图像进行 Y 轴上的翻转
    ctx.scale(-1, 1);
// 将图像画到 canvas 上
    ctx.drawImage(video, 0, 0, -width, height);
// 获取 canvas 中的像素数据
    let pixels = ctx.getImageData(0, 0, width, height);
// 将像素数据进行修改调整以实现滤镜功能，并返回过滤后的数据
    pixels = rgbSplit(pixels);
// 将数据重新画到 canvas 中
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
```

- [CanvasRenderingContext2D.scale()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale) 根据其中填入的 `x` 和 `y` 方向的缩放值可以实现缩放，也可以利用这一点来做到在某一轴上的翻转效果。

- [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 提供了用于将图像输出到 `canvas` 上的方法。

- [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData) 返回一个 `ImageData` 对象，用来描述 `canvas` 区域隐含的像素数据。

- [CanvasRenderingContext2D.putImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData) 可以实现将数据从已有的 `ImageData` 对象绘制到 `canvas` 中。

## 第三步

添加滤镜功能，其实就是修改之前 `imageData` 中的像素值，再通过 `putImageData` 重新绘制到 `canvas` 中。

```javascript
// 红色特效（画面整体偏红）
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}
// RGB 分离（各个颜色的渲染位置都产生了偏移）
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
// 绿屏效果
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
```

## 拍照保存

完成上面的内容后，我们接下来需要完成的是拍照保存的功能。

```javascript
function takePhoto() {
// 初始化拍照音效
  snap.currentTime = 0;
// 播放拍照音效
  snap.play();
// 返回一个包含图片展示的 dataURL，此处里面的内容为设定图片格式
  const data = canvas.toDataURL('image/jpeg');
// 创建一个 a 标签元素
  const link = document.createElement('a');
// a 标签的地址和 data 绑定
  link.href = data;
// 设置 a 标签的属性名称（前）和值（后）
  link.setAttribute('download', 'selfie');
// 在 a 标签中输出一个 img
  link.innerHTML = `<img src="${data}" alt="Your selfie" />`;
// 在参考节点（a 标签）之前插入一个拥有指定父节点（strip）的子节点
  strip.insertBefore(link, strip.firstChild);
}
```

- [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL) 返回一个包含图片展示的 dataURL，默认为 PNG 格式。

- [Node.insertBefore()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore) 在参考节点之前插入一个拥有指定父节点的子节点。语法如下：

  ```javascript
  var insertedNode = parentNode.insertBefore(newNode, referenceNode);
  ```

  - `insertedNode` 新添加的节点
  - `parentNode` 新添加节点的父节点
  - `newNode` 被插入的节点
  - `referenceNode` 被插入节点之前的节点

以上就是本次练习的全部内容了👍

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。