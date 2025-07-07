#  可配置控件组件


`ConfigurableControls` 是一个高度可配置的自定义控件面板组件，支持通过 props 灵活控制显示的控件类型、面板样式和交互行为。

## 功能特性

- ✅ **可配置显示控件**：支持选择性显示文本、日期、图片、表格控件
- ✅ **灵活的显示控制**：可控制是否显示整个面板和帮助信息
- ✅ **自定义标题和帮助文本**：支持自定义面板标题和帮助说明
- ✅ **拖拽功能**：内置拖拽支持，可拖拽控件到目标区域
- ✅ **事件回调**：提供拖拽开始和控件选择事件
- ✅ **响应式设计**：适配移动端和桌面端

## Props 参数

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `showControls` | Boolean | `true` | 是否显示控件面板 |
| `enabledControls` | Array | `['text', 'date', 'image', 'table']` | 启用的控件类型数组 |
| `title` | String | `'自定义控件'` | 面板标题 |
| `showHelp` | Boolean | `true` | 是否显示帮助信息 |
| `helpText` | String | `'拖拽控件到编辑器中使用'` | 帮助文本 |
| `customClass` | String | `''` | 自定义样式类名 |

### enabledControls 可选值

- `'text'` - 文本控件
- `'date'` - 日期控件  
- `'image'` - 图片上传控件
- `'table'` - 表格控件

## Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `dragstart` | `{ type, event }` | 控件拖拽开始时触发 |
| `control-selected` | `type` | 控件被选择时触发 |

## 基础用法

### 1. 完整功能（默认配置）

```vue
<template>
  <ConfigurableControls 
    @dragstart="handleDragStart"
    @control-selected="handleControlSelected"
  />
</template>

<script setup>
import ConfigurableControls from '@/components/ConfigurableControls.vue'

const handleDragStart = ({ type, event }) => {
  console.log('拖拽开始:', type)
}

const handleControlSelected = (type) => {
  console.log('控件选择:', type)
}
</script>
```

### 2. 仅显示特定控件

```vue
<template>
  <!-- 仅显示文本和日期控件 -->
  <ConfigurableControls 
    :enabled-controls="['text', 'date']"
    title="基础控件"
    help-text="仅提供文本和日期功能"
  />
</template>
```

### 3. 隐藏帮助信息

```vue
<template>
  <ConfigurableControls 
    :show-help="false"
    title="简洁模式"
  />
</template>
```

### 4. 动态配置

```vue
<template>
  <div>
    <!-- 配置控制 -->
    <div class="config-panel">
      <label>
        <input type="checkbox" v-model="config.showControls" />
        显示控件面板
      </label>
      <label>
        <input type="checkbox" v-model="config.showHelp" />
        显示帮助信息
      </label>
      <div>
        <label>启用的控件：</label>
        <label><input type="checkbox" value="text" v-model="config.enabledControls" /> 文本</label>
        <label><input type="checkbox" value="date" v-model="config.enabledControls" /> 日期</label>
        <label><input type="checkbox" value="image" v-model="config.enabledControls" /> 图片</label>
        <label><input type="checkbox" value="table" v-model="config.enabledControls" /> 表格</label>
      </div>
    </div>
    
    <!-- 控件面板 -->
    <ConfigurableControls 
      :show-controls="config.showControls"
      :enabled-controls="config.enabledControls"
      :title="config.title"
      :show-help="config.showHelp"
      :help-text="config.helpText"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import ConfigurableControls from '@/components/ConfigurableControls.vue'

const config = reactive({
  showControls: true,
  enabledControls: ['text', 'date', 'image', 'table'],
  title: '自定义控件',
  showHelp: true,
  helpText: '拖拽控件到编辑器中使用'
})
</script>
```

## 使用场景

### 1. 文档编辑器
在文档编辑器中提供可拖拽的控件工具栏：

```vue
<ConfigurableControls 
  :enabled-controls="['text', 'date', 'image', 'table']"
  title="文档控件"
  @dragstart="handleControlDrop"
/>
```

### 2. 表单设计器
在表单设计器中仅提供表单相关控件：

```vue
<ConfigurableControls 
  :enabled-controls="['text', 'date']"
  title="表单控件"
  help-text="拖拽到表单设计区域"
/>
```


```

## 样式定制

组件提供了基础样式，可以通过 `customClass` prop 或全局 CSS 进行定制：

```vue
<ConfigurableControls 
  custom-class="my-custom-controls"
/>
```

```css
.my-custom-controls {
  /* 自定义样式 */
}

.my-custom-controls .control-item {
  /* 自定义控件项样式 */
}
```

## 注意事项

1. **控件类型验证**：`enabledControls` 数组中的值必须是有效的控件类型
2. **事件处理**：确保正确处理 `dragstart` 和 `control-selected` 事件
3. **响应式**：组件已适配移动端，在小屏幕设备上会自动调整布局
4. **性能**：大量控件时建议使用 `v-show` 而不是 `v-if` 来控制显示

## 演示页面

访问 `/controls-demo` 路由可以查看完整的演示和配置示例。

