# DAY 17 --- Sort Without Articles
[Demo 地址](https://lab.lebenito.net/javascript30/17%20-%20Sort%20Without%20Articles/)

第十七个练习是对数组进行排序，而数组中元素名字中的冠词不参与排序，按照冠词后的名字进行排序。

## 步骤分析

1. 编写一个 `strip` 方法，输入一个乐队名字自动去除名字前的冠词部分并返回
2. 对 `bands` 数组使用 `sort` 方法并在 `sort` 方法中使用 `strip` 对名字进行修正
3. 遍历排序后的数组并输出到 `#bands` 中

## 第一步

使用 `replace` 把冠词部分进行替代，并用 `trim` 方法清除空格

```javascript
function strip(bandName) {
  return bandName.replace(/^(a |an |the )/i, '').trim();
}
```

## 第二步

排序需要我们自定义其中的函数，更多内容参考 [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

```javascript
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
```

## 第三步

使用 `map` 对数组进行遍历，然后输出模板字符串到 `#bands` 中

```javascript
document.querySelector('#bands').innerHTML = 
  sortedBands
    .map(band => `<li>${band}</li>`)
    .join('');
```

OK，完成了！

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。