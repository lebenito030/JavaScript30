# DAY 15 --- LocalStroage

第十五个练习是使用 [LocalStroage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 保存我们的 Todolist 的数据，以方便在刷新之后内容不会被清空。

## 步骤拆分

1. 完善变量部分，让 `items` 在 LocalStroage 中有所需值时将其作为设定值
2. 给 `add-items` 添加调用的方法，点击后添加一个 `item` 到 LocalStroage 中储存
3. 更改 checkbox 的 checked 状态，并同步更新 LocalStroage 中的数据
4. 完成各个事件的绑定监听

## 第一步

我们需要判断 `items` 在 LocalStroage 中是否已有值。

```javascript
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// 当 items 在 items 中未搜索到值时，使用一个空数组做值
const items = JSON.parse(localStorage.getItem('items')) || [];
```

## 第二步

因为我们的 `addItems` 是一个 form 表单，而我们并不需要使用 form 表单的默认提交事件，所以这里我们需要使用 `preventDefault()` 来取消默认事件。

```javascript
function addItems(e) {
// 取消默认事件
  e.preventDefault();
// 获取输入框中内容
  const text = (this.querySelector('[name=item]').value);
// 创建 item 对象，包含 todo 内容和完成情况
  const item = {
    text,
    done: false
  };

// 将 item 堆入 items 数组中
  items.push(item);
// 调用 populateList 方法在页面中显示 todo 内容
  populateList(items, itemsList);
// 将 items 内容序列化为 JSON 保存至 localStorage 中
  localStorage.setItem('items', JSON.stringify(items));
// 调用 reset 方法把表单中的元素重置为它们的默认值
  this.reset();
}

function populateList(plates = [], platesList) {
// map 遍历 plates 中的内容并在 platesList 中输出 HTML
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}
```

## 第三步

点击更改 checkbox 的 checked 情况，并完成同步更新 localStorage 中的数据的方法。

```javascript
function toggleDone(e) {
// 如果事件目标不是 input 元素则立刻跳出事件
  if(!e.target.matches('input')) return;
// 得到事件对应元素和对应 index 值
  const el = e.target;
  const index = e.dataset.index;
// 更改 todo 完成情况
  items[index].done = !items[index].done;
// 保存至 localStorage 中
  localStorage.setItem('items', JSON.stringify(items));
// 重新在页面中进行渲染
  populateList(item, itemsList);
}
```

## 第四步

完成各个监听器的监听事件。

```javascript
addItems.addEventListener('submit', addItems);
itemsList.addEventListener('click', toggleDone);
// 当页面加载完时进行一次渲染
populateList(items, itemsList);
```

OK，完成！

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。