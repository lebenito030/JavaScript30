# DAY 14 JavaScript References VS Copying

第十四个练习是关于 JavaScript 中的变量引用和变量复制，通过此次练习你可以了解到 JavaScript 对各种数据类型的赋值操作方式。

## 复制和引用

JavaScript 中的基本数据类型有 `Boolean`、`String`、`Number`、`Symbol`（ES6 新添加）、`undefined`、`null`。

基本类型是按值进行操作的，比如：

```javascript
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100
```

他们进行的是复制操作，`age2` 只是复制了 `age` 的值。也就是说，改变 `age` 的值并不会导致 `age2` 跟着改变。

剩下的都是对象类型了，诸如：`Array`、`Function`、`Object`、`Set`、`Map` 等。

对象类型是按引用进行操作的，比如：

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;

console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "Poppy"]

players[3] = 'lux';

console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "lux"], ["Wes", "Sarah", "Ryan", "lux"] 
```

可以发现，当我们修改 `players` 的值时，`team` 的值也跟着被修改了，那么如果修改 `team` 的值呢？

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;

console.log(players, team);
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "Poppy"]
team[3] = 'lux';

console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "lux"], ["Wes", "Sarah", "Ryan", "lux"] 
```

就好像他们都只是指向同一个地址一样，没错，他们就是保存的对象的内存地址，都是指向同一个数组。

那么怎么才能做到复制呢。

## 数组对象复制

很多时候引用操作能带来遍历，但是有时候我们并不希望是这样的效果，那么下面就来看看解决办法。

### [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

使用 `slice` 操作数组会返回一个新的数组对象，原数组也不会被改变。

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players.slice();

console.log(players, team);
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "Poppy"]
team[3] = 'lux';

console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "lux"]
```

### [Array.prototype.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

使用 `cancat` 操作数组也会返回一个新的数组对象，也不会改变原数组，这个方法是用于合并两个或多个数组，我们也能把它用于复制数组。

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = [].concat(players);

console.log(players, team);
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "Poppy"]
team[3] = 'lux';

console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "Poppy"], ["Wes", "Sarah", "Ryan", "lux"]
```

使用 `concat` 将 `players` 数组和一个空数组合并，再用 `team` 引用这个合并后的数组，就得到了 `players` 的复制。

### [ES6 展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

我们也可以使用 ES6 的展开语法，会更加简洁。

```javascript
const team4 = [...players];
team4[3] = 'heeee hawww';
console.log(team4);
// ["Wes", "Sarah", "Ryan", "heeee hawww"]
```

### [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

使用 `Array.from()` 也会返回一个新数组，我们也可以用它来完成复制操作。

```javascript
const team5 = Array.from(players);
team5[3] = 'alice';
console.log(team5);
// ["Wes", "Sarah", "Ryan", "alice"]
```

## Object 对象复制

`Object` 也是使用引用操作，我们需要对它完成复制操作的时候也需要借助其他的方法。

我们先假定有一个这样的 `Object` 对象我们来对它进行复制。

```javascript
const person = {
  name: 'Wes Bos',
  age: 80
};
```

### [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

这个方法也会生成一个新对象。但是这只是一个浅层复制，如果对象内部还带有对象，那么那个对象就并不是复制的内容，它还是一个指向原对象的指针。

```javascript
const cap2 = Object.assign({}, person, {age: 12});
console.log(cap2);
// {name: "Wes Bos", age: 12}
```

那么怎么解决浅层复制的问题呢，使用 `JSON` 可以解决这个问题。（当然，在 [Lodash](https://lodash.com/docs/4.17.11#cloneDeep) 中也提供了深层复制的方法，感兴趣可以去看一看）

#### 使用 JSON 来完成

这个方法就是把对象序列化为字符串，然后再反序列化把字符串转换成对象。这在只针对对象的操作中非常实用。

```javascript
const wes = {
  name: 'Wes',
  age: 100,
  social: {
    twitter: '@wesbos',
    facebook: 'wesbos.developer'
  }
};

console.log(wes);
const dev = Object.assign({}, wes);
const dev2 = JSON.parse(JSON.stringify(wes));
console.log(dev);
console.log(dev2);
```

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。