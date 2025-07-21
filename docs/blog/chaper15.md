# 锚点实现思路


锚点系统是一个基于 WangEditor 的富文本编辑器扩展功能，允许用户在文档中插入可编辑的动态控件，并通过右侧表单面板进行统一管理。

### 核心组件

1. **编辑器区域** - 基于 WangEditor 的富文本编辑器
2. **左侧控件面板** - 提供可拖拽的控件类型
3. **右侧锚点表单** - 显示和管理所有锚点控件
4. **拖拽处理器** - 处理控件的拖拽插入

### 锚点类型

系统支持四种锚点控件类型：

- **文本控件** (`text-control`) - 可编辑的文本输入
- **日期控件** (`date-control`) - 日期选择器
- **图片控件** (`image-control`) - 图片上传和显示
- **表格控件** (`table-control`) - HTML 表格内容


###  锚点标识机制

每个锚点控件通过以下 HTML 属性进行标识：

```html
<span 
  data-anchor-id="unique-id"
  data-anchor-title="锚点名称"
  data-anchor-type="text-control"
  data-w-e-type="anchor-element"
  id="anchor-control-unique-id"
  contenteditable="true"
  class="imported-anchor-highlight"
>
  锚点内容
</span>
```

**关键属性说明：**
- `data-anchor-id`: 唯一标识符，用于关联表单和编辑器中的元素
- `data-anchor-title`: 锚点显示名称
- `data-anchor-type`: 锚点类型（text-control、date-control等）
- `data-w-e-type`: WangEditor 元素类型标识
- `contenteditable="true"`: 确保锚点始终可编辑

### 2. 锚点解析和管理

#### 解析流程

```javascript
const parseAnchorsFromEditor = () => {
  // 1. 获取编辑器容器
  const editableContainer = editor.getEditableContainer();
  
  // 2. 查找所有锚点元素
  const anchorElements = editableContainer.querySelectorAll("[data-anchor-id]");
  
  // 3. 提取锚点信息
  anchorElements.forEach((element) => {
    const anchorId = element.getAttribute("data-anchor-id");
    const anchorType = element.getAttribute("data-anchor-type");
    
    // 根据类型提取值
    let value = "";
    if (anchorType === "text-control") {
      value = element.textContent || "";
    } else if (anchorType === "image-control") {
      const img = element.querySelector("img");
      value = img ? img.src : "";
    }
    // ... 其他类型处理
  });
};
```

#### 状态管理

```javascript
// 锚点表单数据
const anchorForms = ref([]);
// 当前选中的锚点ID
const selectedAnchorId = ref(null);
// 锚点类型配置
const anchorTypeConfig = {
  "text-control": { label: "文本", icon: "📝" },
  "date-control": { label: "日期", icon: "📅" },
  "table-control": { label: "表格", icon: "📊" },
  "image-control": { label: "图片", icon: "🖼️" },
};
```


#### 表单到编辑器的更新

```javascript
const updateAnchorValue = (anchorId, newValue) => {
  // 1. 找到编辑器中对应的锚点元素
  const anchorElement = editableContainer.querySelector(
    `[data-anchor-id="${anchorId}"]`
  );
  
  // 2. 根据类型更新内容
  const anchorType = anchorElement.getAttribute("data-anchor-type");
  
  if (anchorType === "text-control") {
    anchorElement.textContent = newValue;
  } else if (anchorType === "image-control") {
    let img = anchorElement.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      anchorElement.appendChild(img);
    }
    img.src = newValue;
  }
  
  // 3. 触发编辑器变化事件
  editor.emit("change");
};
```

#### 编辑器到表单的同步

通过 MutationObserver 监听编辑器内容变化：

```javascript
const observer = new MutationObserver((mutations) => {
  let shouldUpdate = false;
  
  mutations.forEach((mutation) => {
    // 检查是否有锚点元素发生变化
    if (mutation.target.hasAttribute("data-anchor-id")) {
      shouldUpdate = true;
    }
  });
  
  if (shouldUpdate) {
    setTimeout(() => {
      parseAnchorsFromEditor();
    }, 50);
  }
});

// 监听编辑器容器的所有变化
observer.observe(editableContainer, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: false,
});
```

###  只读模式实现

只读模式的实现采用了精细化控制策略：
- 保持编辑器容器可编辑以确保工具栏可用
- 为非锚点元素设置 `contenteditable="false"`
- 锚点元素始终保持 `contenteditable="true"`
- 通过事件监听阻止非锚点区域的编辑操作

```javascript
const toggleReadOnlyMode = (editor, isReadOnly) => {
  const editableContainer = editor.getEditableContainer();
  
  if (isReadOnly) {
    // 1. 保持容器可编辑
    editableContainer.setAttribute("contenteditable", "true");
    editableContainer.setAttribute("data-readonly-mode", "true");
    
    // 2. 设置子元素的可编辑性
    const allElements = editableContainer.querySelectorAll("*");
    allElements.forEach((element) => {
      if (element.hasAttribute("data-anchor-id")) {
        element.setAttribute("contenteditable", "true");
      } else {
        element.setAttribute("contenteditable", "false");
      }
    });
    
    // 3. 添加事件监听器阻止非锚点编辑
    preventNonAnchorEdit(editableContainer, true);
  }
};
```

#### 事件拦截机制

```javascript
const handleReadOnlyKeydown = (event) => {
  const target = event.target;
  // 如果不是锚点控件，阻止编辑
  if (!target.closest("[data-anchor-id]")) {
    event.preventDefault();
    event.stopPropagation();
  }
};
```


####  内容预处理

```javascript
const parseAndHighlightAnchors = (htmlContent, isReadOnly = false) => {
  // 1. 如果是只读模式，为非锚点元素添加不可编辑属性
  let processedContent;
  if (isReadOnly) {
    processedContent = addReadOnlyAttributes(htmlContent);
  } else {
    processedContent = htmlContent;
  }
  
  // 2. 查找所有锚点标签
  const anchorRegex = /<([^>]+data-anchor-id[^>]*)>/gi;
  const matches = processedContent.match(anchorRegex);
  
  // 3. 为每个锚点添加必要的属性和样式
  matches?.forEach((match) => {
    let newTag = match;
    
    // 添加标识属性
    if (!newTag.includes("data-w-e-type")) {
      newTag = newTag.replace('>', ' data-w-e-type="anchor-element">');
    }
    
    // 确保可编辑
    if (!newTag.includes("contenteditable")) {
      newTag = newTag.replace('>', ' contenteditable="true">');
    }
    
    // 添加高亮样式
    newTag = newTag.replace(
      /class=["']([^"']*)["']/,
      'class="$1 imported-anchor-highlight"'
    );
    
    processedContent = processedContent.replace(match, newTag);
  });
  
  return processedContent;
};
```

###  拖拽插入机制

锚点控件支持从左侧面板拖拽到编辑器中：

```javascript
// 处理控件拖拽开始
const handleControlDragStart = (controlType) => {
  // 设置拖拽数据
  dragDropHandler.value?.setDragData({
    type: 'control',
    controlType: controlType
  });
};

// 编辑器拖拽处理
<div
  id="editor-container"
  @dragover="dragDropHandler?.handleDragOver"
  @drop="dragDropHandler?.handleDrop"
>
```



### 锚点选择和高亮

```javascript
const selectAnchor = (anchorId) => {
  selectedAnchorId.value = anchorId;
  
  // 移除所有锚点的选中状态
  editableContainer.querySelectorAll("[data-anchor-id]").forEach((el) => {
    el.classList.remove("anchor-selected");
  });
  
  // 添加选中状态并滚动到视图
  const selectedElement = editableContainer.querySelector(
    `[data-anchor-id="${anchorId}"]`
  );
  if (selectedElement) {
    selectedElement.classList.add("anchor-selected");
    selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
```

## 总结

锚点系统通过以下核心机制实现了强大的动态表单功能：

1. **HTML 属性标识** - 使用 `data-*` 属性标识和管理锚点
2. **双向数据绑定** - 表单和编辑器内容的实时同步
3. **事件监听机制** - MutationObserver 和编辑器事件的结合使用
4. **精细化权限控制** - 只读模式下的选择性编辑能力
5. **可视化交互** - 高亮显示和拖拽操作的用户体验

这种设计模式为富文本编辑器提供了的表单化扩展能力，可以广泛应用于文档模板、表单设计器等场景。