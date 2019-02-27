# DAY 21 --- Geolocation
[Demo 地址](https://lab.lebenito.net/javascript30/21%20-%20Geolocation/)

第二十一个练习是使用 `NavigatorGeolocation.geolocation` 来访问设备的位置信息。

## 步骤分析

1. 获取箭头元素和速度表元素
2. 从 `Geolocation.watchPosition()` 获得所需箭头旋转角度和速度值

## 源码分析

```javascript
// 获取箭头元素
const arrow = document.querySelector('.arrow');
// 获取速度值元素
const speed = document.querySelector('.speed-value');
// 注册监听器
navigator.geolocation.watchPosition((data) => {
// 将返回的速度数据值赋值到 speed 元素上
  speed.textContent = data.coords.speed;
// 将返回的角度值赋值到指南针的旋转动画上
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
// 返回错误
  console.error(err);
})
```

## 要点

- [Geolocation.watchPosition()](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 注册地理位置监听器，当位置发生改变的时候自动被调用。具体内容请查阅文档。

完成🆗

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。