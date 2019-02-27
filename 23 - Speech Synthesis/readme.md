# DAY 23 --- Speech Synthesis
[Demo 地址](https://lab.lebenito.net/javascript30/23%20-%20Speech%20Synthesis/)

第二十三个练习是一个朗读器，可以根据你填入的内容进行朗读。

## 步骤分析

1. 首先先获得所需的各个 DOM 元素，然后实例化一个语音对象
2. 完成语音下拉选择框部分
3. 监听语音滑动条的滑动事件
4. 监听开始和暂停按钮，切换语音播放状态

## 第一步

获得各个 DOM 元素并实例化语音对象。

```javascript
// 实例化语音对象
const msg = new SpeechSynthesisUtterance();
// 存放可选的语音对象
let voices = [];
// 下拉选择语音对象
const voicesDropdown = document.querySelector('[name="voice"]');
// 获取滑动条和 textarea 的 DOM 元素
const options = document.querySelectorAll('[type="range"], [name="text"]');
// 朗读按键
const speakButton = document.querySelector('#speak');
// 停止朗读按键
const stopButton = document.querySelector('#stop');
// 获取 textarea 中的内容赋值到 msg.text
msg.text = document.querySelector('[name="text"]').value;
```

## 第二步

完成下拉选择框的内容。

```javascript
function populateVoices() {
// 调用对象的 getVoice 方法获取系统支持的 TTS 语音
  voices = this.getVoices();
// 将语音对象进行过滤筛选出支持中文的对象
// 然后通过遍历筛选后的数组生成 option 选项渲染到 voicesDropdown 元素中
  voicesDropdown.innerHTML = voices
    .filter(voices => voices.lang.includes('zh'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
// 重设 msg 语音对象与选择的值一致
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

// 监听 getVoices 返回数据，当更改时触发 populateVoices 方法
speechSynthesis.addEventListener('voiceschanged', populateVoices);
// 监听下拉事件，当选择了框内其他选项时触发 setVoice 方法
voicesDropdown.addEventListener('change', setVoice);
```

## 第三步

监听滑动条的滑动事件。

```javascript
function setOption() {
// 更改 msg 元素对应 name 属性的值为当前滑动条的值
  msg[this.name] = this.value;
// 重新播放语音
  toggle();
}
// 给滑动条以及 option 元素都添加 change 事件监听器
options.forEach(option => option.addEventListener('change', setOption));
```

## 第四步

监听开始暂停按钮，更改语音的播放状态。

```javascript
// 默认 startOver 值为 true
function toggle(startOver = true) {
// 停止 TTS
  speechSynthesis.cancel();
// 默认播放 TTS
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
// 点击触发事件
speakButton.addEventListener('click', toggle);
// 点击触发停止事件，传入 startOver 值为 false
stopButton.addEventListener('click', () => toggle(false));
```

这个练习只要跟着步骤来并不算特别复杂。在学习过程中可以通过了解 MDN 中的 [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis) 内容来更好的理解。

完成🆗

----
>这是一个由 [wesbos](https://github.com/wesbos) 发起的项目，这里是[项目地址](https://github.com/wesbos/JavaScript30)，感谢 [wesbos](https://github.com/wesbos) 制作了如此优秀的内容。