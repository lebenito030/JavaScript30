# DAY 20 --- Speech Detection
[Demo 地址](https://lab.lebenito.net/javascript30/20%20-%20Speech%20Detection/)

第二十个练习是完成一个语音转文字在线显示的功能，本次练习会利用到 [Web speech API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API) —— 一个让 web 应用能够处理语音数据的 API。（只有 Chrome 支持）

## 步骤分析

1. 创建一个语音识别对象
2. 开起对象的识别功能
3. 监听语音识别对象的 `result` 事件，获取语音捕获入的内容
4. 监听 `end` 事件，当语音捕获结束后重启捕获，对语音进行持续监听

## 源码分析

这里使用注释的方式对代码进行解释。

```javascript
// 兼容性调整
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 创建语音识别对象
const recognition = new SpeechRecognition();
// 语音识别对象是否返回临时结果
recognition.interimResults = true;
// 语音识别类别为英语
recognition.lang = 'en-US';
// 获取 .words 元素，并在其中插入子元素 p 标签
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
// 监听语音识别的 result 事件
recognition.addEventListener('result', e => {
// 事件触发，返回一个包含识别内容的对象
  const transcript = Array.from(e.results)
// 将对象中的 results（识别结果）转换为数组方便下面的 map 操作
    .map(result => result[0])
// 获取每一段话的结果数据
    .map(result => result.transcript)
// 将数据链接成一串字符串
    .join('');
// 将识别出来的结果字符串输出到 p 标签中
    p.textContent = transcript;
// 当出现了停顿时，另起一行进行输出
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
});
// 监听 end 事件，防止语音识别断线
recognition.addEventListener('end', recognition.start);
// 启动语音识别
recognition.start(); 
```

## 要点

- [`SpeechRecognition.interimResults`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults) 此属性设定为 `true` 时将在语音识别中一直返回识别内容的临时结果，一直到语音识别结束。

- [`SpeechRecognitionResult.isFinal`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognitionResult/isFinal) 如果值为 `true` 则说明语音识别结束，如果是 `false` 则说明这只是一个临时结果，语音识别仍然在继续进行。

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。