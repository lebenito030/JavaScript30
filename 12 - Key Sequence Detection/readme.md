# DAY 12 Key Sequence Detection
[Demo 地址](https://lab.lebenito.net/javascript30/12%20-%20Key%20Sequence%20Detection/index.html)

第十二个练习是按键监听，我们要完成一个，在网页上连续敲击特定按键会有特定反馈的彩蛋。

## 步骤拆分

1. 监听整个页面的键盘敲击事件。
2. 当检测到连续敲击的按键组合为设定值时触发彩蛋。

## 第一步

如果要监听整个页面，我们有两种方法。

```javascript
window.addEventListener('keyup', function() {});
// 或者
document.addEventListener('keyup', function() {});
```

## 第二步

这里直接给出代码并用注释进行解释。

```javascript
// inputRecord 中依次记录了输入的按键
const inputRecord = [];
// bonusCode 是让彩蛋弹出的秘籍
const bonusCode = 'AWSL';
// 监听整个页面的方法
window.addEventListener('keyup', (e) => {
// 将每一次按键的 key 使用 push 方法存入 inputRecord 中
  inputRecord.push(e.key);
// splice 方法，保持 inputRecord 中只剩下新出现的元素且长度与 bonusCode 相同
  inputRecord.splice(-bonusCode.length - 1, inputRecord.length - bonusCode.length)
// 当 inputRecord 中包含了 bonusCode 时弹出彩蛋。
  if(inputRecord.join('').includes(bonusCode)) {
// 弹出彩蛋 AWSL
    alert('AWSL!');
  }
});
```

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。