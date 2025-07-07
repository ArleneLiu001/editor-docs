# 自定义控件实现思路


### 概述

该文件实现了一套完整的拖拽式自定义控件系统，支持在富文本编辑器中通过拖拽方式插入和管理各种类型的控件，包括文本控件、日期控件、表格控件等。
插件名称
```javascript
dragDropHandler.js

```


#### 1. 模块化设计

文件采用ES6模块化设计，导出多个独立的功能函数：

- **工具函数**：`generateUniqueId`
- **拖拽处理**：`handleDragOver`、`handleDrop`、`getInsertionPoint`
- **元素操作**：`insertElementAtPosition`
- **控件创建**：`createTextControl`、`createDateControl`、`createTableControl`
- **交互功能**：`showInlineDatePicker`、`editTextControl`
- **统一接口**：`createDragDropHandler`



### 核心功能实现

#### 1. 唯一ID生成

```javascript
export const generateUniqueId = () => {
  return "id_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
};
```

**实现思路**：
- 结合时间戳和随机字符串确保唯一性
- 用于为每个控件生成独特的标识符
- 支持控件的追踪和管理

#### 2. 精确插入位置定位

```javascript
export const getInsertionPoint = (event, editorContainer) => {
  let insertionPoint;
  
  if (document.caretPositionFromPoint) {
    // 使用现代浏览器API
    const caretPosition = document.caretPositionFromPoint(event.clientX, event.clientY);
  } else if (document.caretRangeFromPoint) {
    // 兼容性处理
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
  }
  
  // 默认插入到编辑器末尾
  if (!insertionPoint) {
    insertionPoint = {
      node: editorContainer,
      offset: editorContainer.childNodes.length,
    };
  }
  
  return insertionPoint;
};
```

**实现思路**：
- 使用浏览器原生API获取鼠标位置对应的DOM节点位置
- 提供兼容性处理，支持不同浏览器
- 包含降级策略，确保在任何情况下都能正常插入

#### 3. 智能元素插入

```javascript
export const insertElementAtPosition = (element, insertionPoint, onChangeCallback) => {
  const { node, offset } = insertionPoint;
  
  if (node.nodeType === Node.TEXT_NODE) {
    // 处理文本节点插入
    const parent = node.parentNode;
    if (offset === 0) {
      parent.insertBefore(element, node);
    } else if (offset >= node.textContent.length) {
      parent.insertBefore(element, node.nextSibling);
    } else {
      // 分割文本节点
      const beforeText = node.textContent.substring(0, offset);
      const afterText = node.textContent.substring(offset);
      // 重新组织DOM结构
    }
  } else {
    // 处理元素节点插入
    if (offset >= node.childNodes.length) {
      node.appendChild(element);
    } else {
      node.insertBefore(element, node.childNodes[offset]);
    }
  }
  
  // 触发变化回调
  if (onChangeCallback && typeof onChangeCallback === 'function') {
    onChangeCallback();
  }
};
```

**实现思路**：
- 区分文本节点和元素节点的不同插入策略
- 对文本节点进行智能分割，保持文本完整性
- 提供回调机制，支持插入后的状态同步

#### 控件类型实现

#### 1. 文本控件

**核心特性**：
- 内联显示（`data-w-e-is-inline: true`）
- 不可编辑容器（`contenteditable: false`）
- 点击编辑功能

**实现要点**：
```javascript
export const createTextControl = (onChangeCallback) => {
  const textControl = document.createElement("span");
  
  // WangEditor兼容属性
  textControl.setAttribute("data-w-e-type", "text-control");
  textControl.setAttribute("data-w-e-is-void", "true");
  textControl.setAttribute("data-w-e-is-inline", "true");
  textControl.setAttribute("contenteditable", "false");
  
  // 锚点属性
  textControl.setAttribute("data-anchor-id", uniqueTextId);
  textControl.setAttribute("data-anchor-title", textAnchorTitle);
  textControl.setAttribute("data-anchor-type", "text-control");
  
  // 交互功能
  textControl.addEventListener("click", (e) => {
    editTextControl(e.target, onChangeCallback);
  });
};
```

**编辑机制**：
- 创建临时输入框覆盖原控件
- 使用固定定位确保位置准确
- 失焦自动保存

#### 2. 日期控件

**核心特性**：
- 内联日期选择器
- 格式化显示（使用dayjs）
- 位置智能调整
- 点击外部关闭

**实现要点**：
```javascript
export const createDateControl = (onChangeCallback) => {
  const dateControl = document.createElement("span");
  
  // 设置为日期控件类型
  dateControl.setAttribute("data-w-e-type", "date-control");
  dateControl.textContent = "📅 选择日期";
  
  // 点击显示日期选择器
  dateControl.addEventListener("click", (e) => {
    showInlineDatePicker(dateControl, onChangeCallback);
  });
};
```

**日期选择器特性**：
- 绝对定位，智能避免超出视窗
- 原生HTML5日期输入
- 确认/取消按钮
- 点击外部自动关闭
- 日期格式化显示

#### 3. 表格控件

**核心特性**：
- 块级显示（`data-w-e-is-inline: false`）
- 动态行列操作
- 单元格内容编辑
- 完整的表格结构

**实现要点**：
```javascript
export const createTableControl = (onChangeCallback) => {
  const tableControl = document.createElement("div");
  
  // 设置为表格控件
  tableControl.setAttribute("data-w-e-type", "table-control");
  tableControl.setAttribute("data-w-e-is-inline", "false");
  
  // 创建完整表格结构
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  
  // 添加操作按钮
  const addRowBtn = document.createElement("button");
  const addColBtn = document.createElement("button");
};
```

**动态操作**：
- 添加行：在tbody末尾插入新行
- 添加列：在所有行末尾添加新单元格
- 单元格编辑：设置`contentEditable=true`


#### 控件模式

每种控件都有对应的创建函数，统一接口：
```javascript
// 统一的控件创建接口
const createControl = (type, onChangeCallback) => {
  switch(type) {
    case 'text': return createTextControl(onChangeCallback);
    case 'date': return createDateControl(onChangeCallback);
    case 'table': return createTableControl(onChangeCallback);
  }
};
```


所有控件操作都支持变化回调：
```javascript
const onChangeCallback = () => {
  if (editor && typeof editor.emit === 'function') {
    editor.emit('change');
  }
};
```

通过`createDragDropHandler`提供统一的处理器接口：
```javascript
export const createDragDropHandler = (editor, uploadImageCallback) => {
  return {
    handleDragOver,
    handleDrop: (event) => handleDrop(event, editor, uploadImageCallback),
    generateUniqueId,
    insertElementAtPosition,
    showInlineDatePicker,
    createTextControl,
    createDateControl,
    createTableControl
  };
};
```


每个控件都包含完整的锚点信息：
- `data-anchor-id`：唯一标识符
- `data-anchor-title`：显示标题
- `data-anchor-type`：锚点类型


#### 性能优化

使用事件委托减少事件监听器数量：
```javascript
// 点击外部关闭机制
const closeOnClickOutside = (event) => {
  if (!pickerContainer.contains(event.target)) {
    pickerContainer.remove();
    document.removeEventListener("click", closeOnClickOutside);
  }
};
```



####  内存管理

及时清理临时元素和事件监听器：
```javascript
const finishEdit = () => {
  // 清理临时输入框
  input.remove();
  // 恢复原控件显示
  textControl.style.visibility = "visible";
};
```

#### 总结


这套实现为富文本编辑器提供了灵活的自定义控件，能够满足文档自定义文本，日期，图片，表格编辑需求。