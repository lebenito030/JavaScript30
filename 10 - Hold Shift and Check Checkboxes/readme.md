# DAY 10 Hold Shift and Check Checkboxes
[Demo 地址](https://lab.lebenito.net/javascript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html)

第十个练习是连续选中，很多时候我们想在勾选一串内容。但是我们却只能一个一个进行勾选，因此我们需要完成一个只需要按住 shift 勾选开头和结尾就能勾选其中全部内容的功能。

## 拆分步骤

1. 获取所有 `checkbox`。
2. 给每一个 `checkbox` 添加 `click` 事件的监听。
3. 编写 `multipleCheck` 方法解决 shift 按住点击时为中间选中目标打勾的问题。

## 第一步

获取 DOM 元素

```javascript
const checkboxes = document.querySelectorAll('.item input[type="checkbox"]');
```

## 第二步

为获取的元素添加 `click` 监听

```javascript
checkboxes.forEach(checkbox => checkbox.addEventListener('click', multipleCheck));
```

## 第三步

```javascript
// 当你不选定初始目标时直接按下 shift 选定结尾目标时会使得连续选定从第一个目标开始
let lastOne = checkboxes[0];
// 确认目标元素是否是在初始目标和结束目标之间
let inBetween = false;

function multipleCheck(e) {
  if (e.shiftKey && this.checked) {
    // 遍历 checkboxes 对象
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastOne) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  // 将初始目标设定为结尾目标便于第二次选定
  lastOne = this;
}
```

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。