# 锚点实现思路与方法文档

###  页面概述

ContractAnchorDemo.vue 是一个合同编辑器示例页面，主要功能是允许用户创建、编辑和管理带有锚点的合同文档。锚点是指合同中需要填写的特定字段，如合同编号、甲方、乙方、签订日期等。该页面提供了一个直观的界面，让用户可以在合同中插入、定位、填写和管理这些锚点。


###  核心功能实现

##### 2.1 锚点数据结构

锚点数据存储在 `anchorFields` 响应式数组中，每个锚点包含以下属性：

```javascript
{
  id: "唯一标识符",
  type: "锚点类型（text、date、number、select等）",
  label: "锚点标签（如'合同编号'）",
  value: "锚点值",
  placeholder: "占位符文本",
  options: "选择类型锚点的选项数组（仅select类型）"
}
```

##### 2.2 插入锚点

通过 `insertAnchor` 函数实现锚点的插入：

```javascript
const insertAnchor = (type) => {
  if (!editor.value) return;
  
  // 生成唯一ID
  const id = generateUniqueId();
  // 获取锚点标签
  const label = getTypeLabel(type);
  // 获取占位符
  const placeholder = getTypePlaceholder(type);
  
  // 创建锚点数据
  const anchorData = {
    id,
    type,
    label,
    value: "",
    placeholder,
    options: type === "select" ? getDefaultOptions(label) : undefined,
  };
  
  // 添加到锚点数组
  anchorFields.value.push(anchorData);
  
  // 在编辑器中插入锚点节点
  editor.value.insertNode({
    type: "anchor-point",
    attrs: {
      "data-anchor-id": id,
      "data-anchor-title": label,
      "data-anchor-type": type,
    },
  });
  
  markAsChanged();
};
```

##### 2.3 更新锚点值

通过 `updateAnchorValue` 函数实现锚点值的更新：

```javascript
const updateAnchorValue = (id, value) => {
  // 更新锚点数组中的值
  const anchorIndex = anchorFields.value.findIndex((field) => field.id === id);
  if (anchorIndex !== -1) {
    anchorFields.value[anchorIndex].value = value;
  }
  
  // 更新编辑器中的锚点节点
  if (editor.value) {
    const html = editor.value.getHtml();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const anchorElement = doc.querySelector(`[data-anchor-id="${id}"]`);
    if (anchorElement) {
      // 更新属性和样式
      anchorElement.setAttribute("data-anchor-value", value);
      anchorElement.textContent = value ? value : `⚓ ${anchorFields.value[anchorIndex].label}`;
      anchorElement.style.backgroundColor = value ? "#e6fffa" : "#f3e8ff";
      anchorElement.style.color = value ? "#0d9488" : "#7c3aed";
      
      // 设置回编辑器
      editor.value.setHtml(doc.body.innerHTML);
      markAsChanged();
    }
  }
};
```

##### 2.4 定位锚点

通过 `locateAnchor` 函数实现锚点的定位和高亮：

```javascript
const locateAnchor = (id) => {
  if (editor.value) {
    const html = editor.value.getHtml();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const anchorElement = doc.querySelector(`[data-anchor-id="${id}"]`);
    if (anchorElement) {
      // 高亮锚点
      const originalBg = anchorElement.style.backgroundColor;
      const originalBorder = anchorElement.style.border;
      
      anchorElement.style.backgroundColor = "#fef3c7";
      anchorElement.style.border = "1px solid #f59e0b";
      
      // 设置回编辑器
      editor.value.setHtml(doc.body.innerHTML);
      
      // 滚动到锚点位置
      setTimeout(() => {
        const element = document.querySelector(`[data-anchor-id="${id}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          
          // 恢复原样式
          setTimeout(() => {
            element.style.backgroundColor = originalBg;
            element.style.border = originalBorder;
            markAsChanged();
          }, 2000);
        }
      }, 100);
    }
  }
};
```

##### 2.5 删除锚点

通过 `removeAnchor` 函数实现锚点的删除：

```javascript
const removeAnchor = (id) => {
  // 从锚点数组中删除
  anchorFields.value = anchorFields.value.filter((field) => field.id !== id);
  
  // 从编辑器中删除锚点节点
  if (editor.value) {
    const html = editor.value.getHtml();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const anchorElement = doc.querySelector(`[data-anchor-id="${id}"]`);
    if (anchorElement) {
      anchorElement.remove();
      editor.value.setHtml(doc.body.innerHTML);
      markAsChanged();
    }
  }
};
```


##### 2.6 填充所有锚点

通过 `fillAllAnchors` 函数实现所有锚点的批量填充：

```javascript
const fillAllAnchors = () => {
  if (!editor.value || anchorFields.value.length === 0) return;
  
  const html = editor.value.getHtml();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let updated = false;
  
  anchorFields.value.forEach((field) => {
    // 生成示例数据
    let sampleValue = "";
    switch (field.type) {
      case "text":
        sampleValue = `示例${field.label}`;
        break;
      case "date":
        sampleValue = new Date().toLocaleDateString();
        break;
      case "number":
        sampleValue = Math.floor(Math.random() * 10000).toString();
        break;
      case "select":
        sampleValue = field.options[0].label;
        break;
      default:
        sampleValue = "示例数据";
    }
    
    // 更新锚点数组中的值
    field.value = sampleValue;
    
    // 更新编辑器中的锚点节点
    const anchorElement = doc.querySelector(`[data-anchor-id="${field.id}"]`);
    if (anchorElement) {
      anchorElement.setAttribute("data-anchor-value", sampleValue);
      anchorElement.textContent = sampleValue;
      anchorElement.style.backgroundColor = "#e6fffa";
      anchorElement.style.color = "#0d9488";
      updated = true;
    }
  });
  
  if (updated) {
    editor.value.setHtml(doc.body.innerHTML);
    markAsChanged();
  }
};
```

##### 2.7 清空所有锚点

通过 `clearAllAnchors` 函数实现所有锚点的批量清空：

```javascript
const clearAllAnchors = () => {
  if (!editor.value || anchorFields.value.length === 0) return;
  
  if (!confirm("确定要清空所有锚点值吗？")) return;
  
  const html = editor.value.getHtml();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let updated = false;
  
  anchorFields.value.forEach((field) => {
    // 清空锚点数组中的值
    field.value = "";
    
    // 更新编辑器中的锚点节点
    const anchorElement = doc.querySelector(`[data-anchor-id="${field.id}"]`);
    if (anchorElement) {
      anchorElement.setAttribute("data-anchor-value", "");
      anchorElement.textContent = `⚓ ${field.label}`;
      anchorElement.style.backgroundColor = "#f3e8ff";
      anchorElement.style.color = "#7c3aed";
      updated = true;
    }
  });
  
  if (updated) {
    editor.value.setHtml(doc.body.innerHTML);
    markAsChanged();
  }
};
```




##### 2.8 解析锚点

通过 `parseAnchorsFromContent` 函数实现从上传文档中解析锚点：

```javascript
const parseAnchorsFromContent = (content) => {
  // 首先检查是否已经有锚点标记
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const existingAnchorElements = doc.querySelectorAll("[data-anchor-id]");
  
  if (existingAnchorElements.length > 0) {
    // 如果已经有锚点，直接解析
    const newAnchors = [];
    existingAnchorElements.forEach((element) => {
      const id = element.getAttribute("data-anchor-id");
      const title = element.getAttribute("data-anchor-title") || "未命名锚点";
      const type = element.getAttribute("data-anchor-type") || "text";
      
      newAnchors.push({
        id,
        type,
        label: title,
        value: "",
        placeholder: getTypePlaceholder(type),
        options: type === "select" ? getDefaultOptions(title) : undefined,
      });
    });
    anchorFields.value = newAnchors;
  } else {
    // 如果没有锚点，自动检测并插入
    const detectedAnchors = detectAnchors(content);
    if (detectedAnchors.length > 0) {
      const processedContent = insertAnchorsIntoHtml(content, detectedAnchors);
      if (editor.value) {
        editor.value.setHtml(processedContent);
      }
      anchorFields.value = detectedAnchors;
    }
  }
};
```

#### 模板加载

通过 `loadTemplate` 函数实现预定义模板的加载：

```javascript
const loadTemplate = (templateName) => {
  const templates = {
    sales: {
      title: "销售合同模板",
      content: "<p>销售合同内容...</p>",
      anchors: [
        // 预定义的锚点数据
      ],
    },
    service: {
      title: "服务合同模板",
      content: "<p>服务合同内容...</p>",
      anchors: [
        // 预定义的锚点数据
      ],
    },
    lease: {
      title: "租赁合同模板",
      content: "<p>租赁合同内容...</p>",
      anchors: [
        // 预定义的锚点数据
      ],
    },
  };
  
  const template = templates[templateName];
  if (template) {
    contractTitle.value = template.title;
    if (editor.value) {
      editor.value.setHtml(template.content);
    }
    anchorFields.value = template.anchors;
    markAsChanged();
  }
};
```

#### 4. 辅助功能实现

#### 4.1 自动检测锚点

通过 `detectAnchors` 函数实现自动检测文档中的潜在锚点位置：

```javascript
export const detectAnchors = (content) => {
  const anchorPatterns = [
    { pattern: /合同编号[：:]/g, type: 'text', label: '合同编号' },
    { pattern: /甲方[：:]/g, type: 'text', label: '甲方' },
    // ... 其他模式
  ];
  
  const detectedAnchors = [];
  
  anchorPatterns.forEach((patternInfo) => {
    const matches = content.match(patternInfo.pattern);
    if (matches) {
      matches.forEach(() => {
        const anchorId = generateId();
        detectedAnchors.push({
          id: anchorId,
          type: patternInfo.type,
          label: patternInfo.label,
          value: '',
          placeholder: getPlaceholderByType(patternInfo.type),
          options: patternInfo.type === 'select' ? getDefaultOptions(patternInfo.label) : undefined
        });
      });
    }
  });
  
  return detectedAnchors;
};
```

#### 自动插入锚点

通过 `insertAnchorsIntoHtml` 函数实现自动在HTML内容中插入锚点：

```javascript
export const insertAnchorsIntoHtml = (html, anchors) => {
  let processedHtml = html;
  
  anchors.forEach(anchor => {
    const pattern = new RegExp(`(${anchor.label}[：:])`, 'g');
    const anchorSpan = `<span data-anchor-id="${anchor.id}" data-anchor-title="${anchor.label}" data-anchor-type="${anchor.type}" class="custom-anchor-point" style="display: inline-block; padding: 2px 6px; margin: 2px; border: 1px solid #8b5cf6; border-radius: 12px; background-color: #f3e8ff; font-size: 12px; color: #7c3aed; cursor: pointer; user-select: none;">⚓ ${anchor.label}</span>`;
    processedHtml = processedHtml.replace(pattern, `$1${anchorSpan}`);
  });
  
  return processedHtml;
};
```



#### 6. 总结

ContractAnchorDemo.vue 页面主要实现思路包括：

1. 使用富文本编辑器作为基础，提供合同内容的编辑功能
2. 设计锚点数据结构，实现锚点的插入、更新、定位和删除
3. 提供批量操作功能，如填充所有锚点、清空所有锚点
4. 实现文件操作功能，如导出数据、上传合同、解析锚点
5. 提供模板加载功能，方便用户快速创建不同类型的合同
6. 自动检测和插入锚点，提高用户体验

通过这些功能的组合，用户可以方便地创建、编辑和管理带有锚点的合同文档，提高合同处理的效率和准确性。
        