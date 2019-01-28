# DAY 9 Dev Tools Domination
[Demo 地址](https://lab.lebenito.net/javascript30/09%20-%20Dev%20Tools%20Domination/index.html)

第九个练习是掌握常用的 console 调试操作。

## 介绍

本文只介绍练习中出现过的内容，了解更多内容可以阅读：

[[译] 前端 Console 调试小技巧](https://juejin.im/post/5a08087f6fb9a04529363d71)  
[\[译\] 你不知道的 Chrome 调试工具技巧](https://juejin.im/post/5c09a80151882521c81168a2)  
[MDN 中的 Console 部分](https://developer.mozilla.org/zh-CN/docs/Web/API/Console)

## Console 类型

### 普通方式

这是我们最常用的方式

```javascript
console.log("Hello");
```

### 插值方式

这个方式允许我们以插值的方式去显示 `console` 的内容。

```javascript
console.log('Hello %s', 'World');  // Hello World

const a = 'Apple';
console.log('Hello %s', a); // Hello Apple

console.log('String: %s, Int: %d,Float: %f, Object: %o', str, ints, floats, obj) // MDN 给出的例子，可能更好理解
```

### 自定义样式

这种方式允许我们以自定义的 CSS 样式来显示 `console` 内容。

```javascript
console.log('%c Hello World', 'font-size:10px; background:red; text-shadow: 10px 10px 0 blue')
```

### 警告样式

以警告框的样式显示 `console` 内容。

```javascript
console.warn('Warning World');
```

### 错误样式

以错误框的样式显示 `console` 内容。

```javascript
console.error('Error World');
```

### 消息样式

以消息框的样式显示 `console` 内容。

```javascript
console.info('Hello World'); // 大致和 log 是一个效果
```

### 判断样式

内部为一个布尔表达式，当值为 true 时，没有反应。当值为 false 时，会在控制台写入一个错误消息。

```javascript
console.assert(p.classList.contain('ouch'), 'That is wrong!'); // 错误警告 That is wrong!
```

### 清除

当运行此指令时，`console` 中的内容将被清空。

```javascript
console.clear(); // 在 console 返回消息 'Console was cleared'
```

### 查看 DOM 元素

这里介绍两种方式。

```javascript
console.log(p);
console.dir(p);
```

`console.log()` 会让元素的 DOM 结构直接显示出来，而 `console.dir()` 会以文件树的结构来显示 DOM 元素。

### 分组显示

其中我们用到了 `console.groupCollapsed()`，它会把其中的内容作为组名，并为后续的显示添加缩进，直到执行到 `console.groupEnd()` 时结束缩进。

```javascript
const dog = {
  name: 'Aibo',
  age: 2
};
console.groupCollapsed(`${dog.name}`);                         // 组名 Aibo
console.log(`This is ${dog.name}`);                            // This is Aibo
console.log(`${dog.name} is ${dog.age} years old`);            // Aibo is 2 years old
console.log(`${dog.name} is ${dog.age * 7} dog years old`);    // Aibo is 14 dog years old
console.groupEnd(`${dog.name}`);                               // 结束分组
```

### 计数

`console.count()` 方法会返回其自身被调用的次数。[console.count()](https://developer.mozilla.org/zh-CN/docs/Web/API/Console/count) 包含一个参数，当参数有内容时，会返回参数被调用的次数。当参数为空时，会返回 `count()` 被调用的次数。

### 时间

`console.time()` 方法会在执行时启动一个计时器，当执行到结束语句 `console.timeEnd()` 的时候输出计时器记录的时间。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。