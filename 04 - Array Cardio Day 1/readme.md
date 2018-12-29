# DAY 4 Array Cardio Day 1
[Demo 地址]()

第四个挑战是掌握 Array 的部分常用方法，主要使用 console 进行显示并不会在网页中直接显示。

因为是基础的练习，本文只做题目介绍和做法，并列出使用到的方法的介绍。

## 题目讲解

### （一）筛选出生于 16 世纪的科学家

在第一题题目中已经提示了我们本题主要使用 `Array.prototype.filter()` 完成，那么我们来看看 `filter` 的[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)。

#### Array.prototype.filter() 语法：

```javascript
var new_array = arr.filter(callback(element[, index[, array]])[, thisArg])
```

**返回值是一个新的通过测试的元素的集合的数组，如果没有通过测试则返回空数组**

也就是说，当我们的 `callback` 返回值为 `true` 时，这个元素将会被放入新产生的数组中，生成一个被 “`filter`” 的数组，这样一来这道题的解法就很明确了。

```javascript
const filterFifteen = inventors.filter(inventor => inventor.year < 1600 && inventor.year >= 1500 );
```

其中使用了 ES6 中的[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，用 ES5 的方式写出来就是这样：

```javascript
var filterFifteen = inventors.filter(function (inventor) {
  return inventor.year < 1600 && inventor.year >= 1500 );
};
```

### （二）依次列出科学家的全名

看题目可以知道，我们这次需要使用 `Array.prototype.map()` 来完成题目，让我们像上道题一样看看[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)：

#### Array.prototype.map() 语法：

```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // 新数组的返回元素 }[, 
thisArg])
```

**返回值是一个新数组，其中的每个元素都是回调函数的结果**

解题步骤：

```javascript
const fullName = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
```

其中还用到了 ES6 中的[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)，在前面的挑战中也多次用到这里就不详细介绍了。

### （三）按年龄排序，从老到小

同样的，看题目这次需要使用 `Array.prototype.sort()` 来完成，我们先看看[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)：

#### Array.prototype.sort() 语法：

```javascript
arr.sort([compareFunction])
```

`sort` 方法很常用，我们只需要在其中设立一个[比较函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)，如果我们不设立一个比较函数，元素会按照转换为的字符串的诸个字符的 Unicode 位点进行排序，然后你就会看见诸如 5 比 10 大，13 比 7 小的场面。

解题步骤：

```javascript
const sortByAge = inventors.sort((inventorA,inventorB) => inventorA.year > inventorB.year? 1 : -1);
```

这里我们用到了[三元运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)，常用于作为 `if` 的简写形式使用。

### （四）样本中的所有科学家的年龄总和

题目提示我们要使用 `Array.prototype.reduce()` 来完成，这是[用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)：

#### Array.prototype.reduce() 语法：

```javascript
arr.reduce(callback[initialValue])
```

reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

解题步骤：

```javascript
const reducer = (total, inventor) => total + (inventor.passed - inventor.year);
const liveYears = inventors.reduce(reducer, 0);
```

其中除去 `reducer` 函数，0 所代表的是累加器的初始值，表明从多少开始往上累计。

### （五）按在世时间排序

同样是排序，我们自然是使用 `Array.prototype.sort()` 来完成题目，这里直接开始介绍解题步骤：

```javascript
const oldest = inventors.sort((inventorA, inventorB) => {
  const currentInventor = inventorA.passed - inventorA.year;
  const nextInventor = inventorB.passed - inventorB.year;
  return currentInventor > nextInventor? -1 : 1;
});
```

很简单吧，比较函数返回值小于 0 时第一个参数会被排在第二个参数前面，反之大于 0 时便会相反。在这里我们当 A > B 时会返回 -1，会使 A 被排在 B 前面，便实现了 “oldest” 的排在前面。

### （六）创建一个包含 “de” 的数组

这个挑战是依靠[这个页面](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)来完成的，你需要打开这个页面在 console 中完成它。

首先获取到 mw-category 的 DOM 节点

```javascript
const category = document.querySelector('.mw-category');
```

遍历这个节点的全部 a 标签以获得数组

```javascript
const setArray = Array.from(category.querySelectorAll('a'));
```

通过 `map` 方法遍历整个数组再通过 `filter` 方法生成新的筛选过的数组

```javascript
const de = setArray
  .map(street => street.textContent)
  .filter(streetName => streetName.includes('de'));
```

筛选过程中使用到了 `includes` 方法，你可以在[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)中查阅它的详细用法。

### （七）Sort 练习

按名字的字母表顺序进行排列

```javascript
const sortByLastName = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
```
这里我们用到了[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)，解构赋值是一种 JavaScript 表达式，它可以将**值从数组**或将**属性从对象**提取到不同的变量中去。然后还用到了 [String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法，，使用指定的分隔符字符串将一个 String 对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。

### （八）Reduce 练习

合计每个实例的数量

实例内容：

```javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
```

```javascript
const count = data.reduce((obj, index) => {
  if (!obj[index]) {
    obj[index] = 0;
  }
  obj[index]++;
  return obj;
}, {});
```

首先，累加器获得一个空对象为初始值，然后以对象属性就是元素名称，属性值就是数量值的方式进行累加。当对象属性不存在时生成一个默认值为 0 的新属性，最后生成一个新的自定义对象。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。