# WordCounter 字数统计功能

#### 概述

WordCounter 是一个用于富文本编辑器的字数统计组件，支持中英文混合文本的准确计数，提供实时更新功能，并具有良好的用户体验。

##### 核心功能
- **多语言字数统计**：支持中文字符、英文单词、数字字符的混合计数
- **实时更新**：编辑器内容变化时自动更新字数统计
- **灵活配置**：支持开启/关闭实时更新功能

##### 用户界面
- **固定定位**：字数统计栏固定在编辑器区域底部
- **响应式布局**：适配不同屏幕尺寸

#### 技术实现

### 1. 组件架构

```vue
<template>
  <div class="word-count-bar">
    <div class="word-count-content">
      <span class="word-count-text">字数统计: {{ wordCount }} 字</span>
    </div>
  </div>
</template>
```


### 2. Props 设计

```javascript
const props = defineProps({
  editor: {
    type: Object,
    default: null
  },
  realTimeUpdate: {
    type: Boolean,
    default: true
  }
});
```

**设计理念：**
- `editor`：接收编辑器实例，支持多种编辑器类型
- `realTimeUpdate`：控制是否启用实时更新，提供性能优化选项

### 3. 字数计算算法

#### 核心算法实现

```javascript
const calculateWordCount = () => {
  // 1. 获取纯文本内容
  const textContent = editableContainer.innerText || editableContainer.textContent || "";
  
  // 2. 清理多余空白字符
  const cleanText = textContent.replace(/\s+/g, " ").trim();
  
  // 3. 分类计数
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const numberChars = (cleanText.match(/[0-9]/g) || []).length;
  
  // 4. 英文单词计数
  const nonChineseNonNumberText = cleanText
    .replace(/[\u4e00-\u9fa5]/g, " ")
    .replace(/[0-9]/g, " ")
    .replace(/[^a-zA-Z\s]/g, " ")
    .trim();
  
  const englishWords = nonChineseNonNumberText
    ? nonChineseNonNumberText.split(/\s+/).filter(word => word.length > 0).length
    : 0;
  
  return chineseChars + numberChars + englishWords;
};
```

#### 特点

1. **多语言支持**
   - 中文字符：使用Unicode范围 `\u4e00-\u9fa5` 匹配
   - 数字字符：按字符数计算
   - 英文单词：按空格分隔计算单词数


### 4. 事件监听机制

#### 事件绑定策略

```javascript
const bindEventListeners = () => {
  // DOM事件监听
  editorContainer.addEventListener('input', handleInput, true);
  editorContainer.addEventListener('keydown', handleKeydown, true);
  editorContainer.addEventListener('keyup', handleKeyup, true);
  editorContainer.addEventListener('paste', handlePaste, true);
  editorContainer.addEventListener('compositionend', handleComposition, true);
  
  // 编辑器事件监听
  props.editor.on('change', updateWordCount);
};
```

#### 设计考虑

1. **事件覆盖全面**
   - `input`：处理基本输入
   - `keydown/keyup`：处理键盘操作
   - `paste`：处理粘贴操作
   - `compositionend`：处理输入法输入

2. **时机控制**
   - 使用捕获阶段监听（`true`参数）
   - 适当的延迟处理确保内容已更新
   - 粘贴操作使用较长延迟（10ms）

3. **性能优化**
   - 支持禁用实时更新
   - 事件处理函数复用
   - 及时清理事件监听器

### 5. 生命周期管理

#### 初始化流程

```javascript
const initWordCount = () => {
  if (!props.editor) return;
  
  setTimeout(() => {
    updateWordCount();
    bindEventListeners();
  }, 100);
};
```

#### 清理机制

```javascript
const removeEventListeners = () => {
  // 移除DOM事件监听器
  if (container) {
    container.removeEventListener('input', handlers.input, true);
    // ... 其他事件
  }
  
  // 移除编辑器事件监听器
  if (props.editor) {
    props.editor.off('change', updateWordCount);
  }
};
```

#### 响应式监听

```javascript
// 监听编辑器变化
watch(() => props.editor, (newEditor, oldEditor) => {
  if (oldEditor) removeEventListeners();
  if (newEditor) initWordCount();
}, { immediate: true });

// 监听配置变化
watch(() => props.realTimeUpdate, (newVal) => {
  if (newVal) {
    bindEventListeners();
  } else {
    removeEventListeners();
  }
});
```


#### 样式实现

```css
.word-count-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  border-top: 1px solid #e8e8e8;
  padding: 8px 16px;
  z-index: 9999;
}
```



### 基本用法

```vue
<template>
  <div class="editor-container">
    <!-- 编辑器 -->
    <div id="editor"></div>
    
    <!-- 字数统计 -->
    <WordCounter 
      :editor="editorInstance" 
      @update:wordCount="handleWordCountUpdate" 
    />
  </div>
</template>

<script setup>
import WordCounter from '@/components/WordCounter.vue';

const editorInstance = ref(null);
const wordCount = ref(0);

const handleWordCountUpdate = (count) => {
  wordCount.value = count;
};
</script>
```


### 扩展性设计

#### 1. 暴露的方法

```javascript
defineExpose({
  updateWordCount,
  calculateWordCount,
  getWordCount: () => wordCount.value
});
```

#### 2. 事件通信

```javascript
// 向父组件发送更新事件
emit('update:wordCount', count);
```


