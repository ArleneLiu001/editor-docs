# 页面缩放功能

### 概述

该页面实现了一个完整的缩放功能系统，允许用户对编辑器内容进行放大和缩小操作。缩放功能通过组合式API、组件化设计和状态管理相结合的方式实现。


#### 核心技术栈
- **Vue 3 Composition API**: 使用组合式函数管理缩放状态
- **Pinia**: 状态管理，持久化缩放配置
- **CSS Transform**: 实现视觉缩放效果
- **组件化设计**: 独立的缩放控件组件

### 实现思路

#### 1. 组合式函数 (useZoom.js)

缩放功能的核心逻辑封装在 `useZoom` 组合式函数中：

```javascript
import { ref } from 'vue';

export function useZoom() {
  const scale = ref(1); // 缩放比例，默认为1（100%）

  const zoomIn = () => {
    scale.value += 0.1; // 每次放大10%
  };

  const zoomOut = () => {
    scale.value -= 0.1; // 每次缩小10%
  };

  return {
    scale,
    zoomIn,
    zoomOut,
  };
}
```

**设计特点：**
- 使用响应式引用 `ref(1)` 管理缩放比例
- 提供简单的放大/缩小方法
- 每次操作步长为0.1（10%）
- 返回响应式状态和操作方法


#### 引入和初始化
```javascript
import { useZoom } from "@/composables/useZoom.js";
import ZoomControls from "@/components/ZoomControls.vue";

// 使用缩放功能
const { scale: zoom, zoomIn, zoomOut } = useZoom();
provide("zoom", { zoom, zoomIn, zoomOut });
```

#### 模板中的应用
```vue
<template>
  <!-- 缩放控件 -->
  <div class="ml-auto">
    <ZoomControls />
  </div>
  
  <!-- 编辑器容器应用缩放 -->
  <div
    id="editor-container"
    :style="{ transform: `scale(${zoom})`, transformOrigin: 'center top' }"
  >
    <!-- 编辑器内容 -->
  </div>
</template>
```

**关键实现点：**
- 使用 `provide/inject` 模式向子组件传递缩放状态
- 通过 CSS `transform: scale()` 实现视觉缩放
- 设置 `transformOrigin: 'center top'` 确保从顶部中心缩放

#### 3. 缩放控件组件 (ZoomControls.vue)

#### 功能特性
- **按钮控制**: 提供放大/缩小按钮
- **滑块控制**: 拖拽滑块调整缩放比例
- **数值输入**: 点击百分比显示可直接输入数值
- **重置功能**: 一键恢复100%缩放
- **范围限制**: 缩放范围限制在50%-200%之间

#### 核心实现
```javascript
const { zoom, zoomIn, zoomOut } = inject('zoom');

const minZoom = 0.5;  // 最小50%
const maxZoom = 2;    // 最大200%
const showZoomInput = ref(false);
const zoomInput = ref('');

// 显示百分比
const displayZoom = computed(() => Math.round(zoom.value * 100));

// 重置缩放
const resetZoom = () => {
  zoom.value = 1;
};

// 切换到输入模式
const toggleZoomInput = () => {
  showZoomInput.value = true;
  zoomInput.value = displayZoom.value;
  nextTick(() => {
    zoomInputRef.value?.focus();
    zoomInputRef.value?.select();
  });
};

// 应用输入的缩放值
const applyZoomInput = () => {
  const value = parseInt(zoomInput.value);
  if (!isNaN(value)) {
    zoom.value = Math.max(minZoom, Math.min(maxZoom, value / 100));
  }
  showZoomInput.value = false;
};
```

#### 4. 状态管理集成 (editor.js)

```javascript
export const useEditorStore = defineStore('editor', {
  state: () => ({
    config: {
      zoom: 100,  // 存储百分比值
      wordCount: 0
    },
  }),
  
  actions: {
    // 设置缩放比例（带范围限制）
    setZoom(zoom) {
      this.config.zoom = Math.max(50, Math.min(200, zoom))
    },
    
    // 放大
    zoomIn() {
      this.setZoom(this.config.zoom + 10)
    },
    
    // 缩小
    zoomOut() {
      this.setZoom(this.config.zoom - 10)
    },
    
    // 重置
    resetZoom() {
      this.setZoom(100)
    },
  }
})
```




####     数据流向

```
用户操作 → ZoomControls组件 → useZoom状态 → CSS transform → 视觉缩放
                ↓
            EditorStore → 持久化存储
```


        