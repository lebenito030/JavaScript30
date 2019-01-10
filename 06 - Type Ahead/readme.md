# DAY 6 Type Ahead
[Demo 地址](https://lab.lebenito.net/javascript30/06%20-%20Type%20Ahead/)

第六个挑战是做一个输入城市名即时从数据中筛选符合结果的工具。

## 拆分步骤

1. 获取数据并保存至数组中方便操作。
2. 输入框输入内容即时检测。
3. 将输入内容和获取的数据比较返回相似结果。
4. 将结果以指定 li 元素样式添加至页面中。

## 第一步

我们有一个接口地址，所以我们可以直接发送请求去获取数据然后放到数组里。

```javascript
const endpoint = '/*接口地址*/';

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
```

这样一来我们就得到了一个含有所需数据的数组，`fetch` 方法会返回一个包含响应结果的 Promise，我们再通过 `body.json()` 方法（就是上面的 `blob.json()`）便可以获取到 json 的内容。接着我们通过 Push() 方法直接把数据插入 cities 数组中，第一步就算完成了。这里的 `...data` 是[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)，这里先不详细解释了。

## 第二步

输入框输入内容即时检测，老办法，监听事件。

```javascript
// 先获取 DOM 元素
const searchInput = document.querySelector('.search');
// 监听 Change 事件
searchInput.addEventListener('change', displayMatches);
```

这样是不是就大功告成了呢，并不，有一些小问题，我们希望得到的是，我们输入一个字符，筛选器就筛选一次，那么我们可以再监听一个 **keyup** 事件。

```javascript
// 监听 keyup 事件
searchInput.addEventListener('keyup', displayMatches);
```

这样一来，我们的按键按下松开的时候就会重新筛选一次，满足了我们的需求。

## 第三步

将获取的数据和输入的内容进行比较，用到了 [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法。

```javascript
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

`filter` 方法会把每一个元素都调入其中的 `callback` 函数去执行，当 callback 函数返回值为 true 或等同于 true 的值时会把这个元素加入到新创建的数组中，当每个元素都没有通过测试时会返回一个空数组。

[RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 创建一个正则表达式对象方便与文本和模式进行匹配，这里使用了 'g'、'i' 两个标识符，指定匹配模式为全局匹配（g）和忽略大小写（i）。

[match](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 方法将字符串和正则表达式进行匹配，如果匹配成功会返回一个字符串，如果没有匹配成功则返回 null。

## 第四步

将结果以指定样式添加，这里我们使用 innerHTML 方法生成新的 HTML 元素。

```javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
```

其中 numberWithCommas 方法是使用正则为数字每隔三位添加一个“,”符号做间隔。

当调用 displayMatches 方法时，首先将输入框的值传入 findMatches 方法中，然后将返回值（匹配到的内容）保存在数组中，然后遍历（map）这个数组，将每一个符合的内容都替换成 HTML 的标签格式以便后面的生成，这里使用模板字符串传递字符串，最后向 suggestions 元素中生成 HTML 内容就完成了。

## 额外知识点

### fetch 请求
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

[语法](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)：

```javascript
fetch(input[, init]);
```

其中 input 是定义的要获取的资源链接，init 参数是一个配置项对象，包括所有对请求的设置。

不过 fetch 的兼容性并不高，而且 fetch 是基于 ES6 的 Promise 来写的，所以你得使用 polyfill es6-promise 来解决这个问题，但是这是一个原生挑战，我们可以试着用老办法写一下。

#### XMLHttpRequest()
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/XMLHttpRequest)

老方法：

```javascript
var url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

var xhr;
xhr = new XMLHttpRequest();
xhr.open('Get', url);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = xhr.responseText;
    return data;
  }
}
xhr.send();
```

### 展开语法
[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

展开语法可以在函数调用/数组构造时, 将数组表达式或者 string 在语法层面展开，比如一个数组为 `string = [1, 2, 3]` 这样，当你在另一个数组中使用比如 `[...string, 4]` 就会等同于 `[1, 2, 3, 4]`。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。