# DAY 7 Array Cardio Day 2
[Demo 地址](https://lab.lebenito.net/javascript30/07%20-%20Array%20Cardio%20Day%202/)

第七个挑战是第四个挑战的衍生，我们同样是利用 Array 的原生方法去完成。

## 题目讲解

### （一）是否有一个人年满 19 岁？

在 Array 的原生方法中，有一个叫做 `Array.prototype.some()` 的方法，我们来看看它的[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)。

#### Array.prototype.some() 语法

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
```

some() 会把每一个元素都传给回调函数进行执行，如果回调函数返回了一个 true 值，some() 会立即返回 true。

```javascript
const isAdult = people.some(person => ((new Date().getFullYear()) - people.year >= 19));
```

这样当 some 内返回值为 true 时便可以在 isAdult 中得到一个 true 值。

### （二）是否每一个人都年满 19 岁？

有 some() 自然就少不了 `Array.prototype.every()` 方法，来看看它的[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)。

#### Array.prototype.every() 语法

```javascript
arr.every(callback[, thisArg])
```

和 some() 类似，不过每个元素放入回调函数返回都为 true 时才会使得 every() 返回 true 值。

解题步骤：

```javascript
const everyAdult = people.every(person => ((new Date().getFullYear()) - people.year >= 19));
```

### （三）找到 ID 为 823423 的评论

这里我们可以使用 `Array.prototype.find()` 方法来完成，先看看[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)。

#### Array.prototype.find() 语法

```javascript
arr.find(callback[, thisArg])
```

find() 方法也会对数组中的每一个元素执行回调函数，当回调函数有一个返回为 true 时会立即返回该元素的值，否则返回 `undefined`。

解题步骤：

```javascript
const findComment = comments.find(comment => comment.id === 823423);
```

### （四）删除 ID 823423 的评论

这次我们会用到 `Array.prototype.findIndex()` 方法，先看看[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)。

#### Array.prototype.findIndex() 语法

```javascript
arr.findIndex(callback[, thisArg])
```

findIndex() 方法会对数组中的每个元素执行回调函数，如果回调函数返回值为 true 则立即返回该元素的 index，如果回调函数不返回 true 或元素长度为 0 则返回 -1。

解题步骤：

```javascript
const index = comments.findIndex(comment => comment.id === 823423);
```

现在我们得到了需要删除的元素的 index，那么我们接下来会用到 splice() 方法，你可以去看看它的[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

```javascript
const deleteComment = comments.splice(index, 1);
```

这样便利用 index 删除了评论。

这里提一下，除了 splice() 你还可以使用 delete() 方法来删除数组，splice 会移除原数组的元素，后续元素的 index 也会随之改变，而 delete 只会让所指定元素变为 undefined，数组长度是不变的。

你也许会想，好像还见过一个 [slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法，那又是什么呢，slice() 方法是返回一个新的数组，不会对原数组产生影响。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。