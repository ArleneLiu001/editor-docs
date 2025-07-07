


          
# 字数统计功能


### 核心实现思路

#### 1. 数据结构设计

```javascript
const state = reactive({
  editor: null,
  htmlContent: "",
  pageTitle: "",
  wordCount: 0, // 字数统计变量
});
```

在响应式状态对象中定义了 `wordCount` 字段来存储当前的字数统计结果。

#### 2. 字数统计核心函数

```javascript
// 计算字数的函数
const updateWordCount = (editor) => {
  if (!editor) return;

  // 获取纯文本内容
  const text = editor.getText();
  // 移除空白字符后计算字数
  const count = text.replace(/\s+/g, "").length;
  state.wordCount = count;

  // 更新编辑器区域的data-word-count属性
  const editorArea = document.getElementById("editor-text-area");
  if (editorArea) {
    editorArea.setAttribute("data-word-count", count);
  }
};
```

**核心逻辑：**
- 使用 `editor.getText()` 获取编辑器的纯文本内容
- 通过正则表达式 `/\s+/g` 移除所有空白字符（空格、换行、制表符等）
- 计算处理后文本的长度作为字数
- 将结果存储到响应式状态中
- 同时更新DOM元素的 `data-word-count` 属性

#### 3. 事件监听机制

##### 3.1 编辑器配置中的监听

```javascript
const editorConfig = {
  placeholder: "请输入内容...",
  // 添加内容变化监听，更新字数统计
  onChange: (editor) => {
    state.htmlContent = editor.getHtml();
    // 更新字数统计
    updateWordCount(editor);
  },
};
```

在编辑器初始化配置中，通过 `onChange` 回调函数监听内容变化，每次内容改变时自动更新字数统计。

##### 3.2 额外的事件监听

```javascript
// 初始化字数统计
setTimeout(() => {
  if (state.editor) {
    updateWordCount(state.editor);

    // 添加额外的事件监听，确保在内容变化时更新字数
    state.editor.on("change", () => {
      updateWordCount(state.editor);
    });
  }
}, 500);
```

在组件挂载后，通过 `setTimeout` 延迟执行，确保编辑器完全初始化后：
- 执行初始字数统计
- 添加额外的 `change` 事件监听器，提供双重保障

##### 3.3 注意事项
自定义控件中的文字未被计入字数统计
原因：
- 获取文本的方式 ：在当前实现中，字数统计功能是通过 editor.getText() 方法获取编辑器内容的。这个方法只会获取编辑器核心区域的纯文本内容，而不会获取自定义控件中的文本。
- DOM 结构隔离 ：自定义控件（如文本控件、日期控件等）是作为独立的 DOM 元素插入到编辑器中的，它们被标记为 contenteditable="false" ，这意味着它们在编辑器的内容模型中被视为不可编辑的整体元素，而不是普通文本。
