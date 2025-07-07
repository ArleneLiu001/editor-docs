# 右键菜单组件

一个可配置的右键菜单组件，支持自定义菜单项、位置调整、条件显示等功能。

#### 功能特性

- **可配置菜单项** - 支持自定义图标、标签、快捷键等
-  **智能位置调整** - 自动调整位置避免超出视窗
-  **灵活样式定制** - 支持禁用状态、分割线等
-  **条件显示** - 可根据上下文决定是否显示菜单
-  **响应式设计** - 适配不同屏幕尺寸
-  **高性能** - 使用组合式API，性能优化

### 基础用法

#### 1. 导入组件和组合式函数

```javascript
import ContextMenu from '@/components/ContextMenu.vue'
import { useContextMenu, createTextOptimizeMenuItems } from '@/composables/useContextMenu.js'
```

#### 2. 创建右键菜单实例

```javascript
// 创建右键菜单
const contextMenu = useContextMenu({
  shouldShow: (event) => {
    // 只有选中文字时才显示菜单
    const selection = window.getSelection()
    return selection && !selection.isCollapsed && selection.toString().trim()
  },
  autoHide: true
})

// 定义菜单项
const menuItems = [
  {
    key: 'improve',
    label: '优化文字',
    icon: '📋',
    handler: (context) => {
    }
  },
]
```

#### 3. 在模板中使用

```vue
<template>
  <div @contextmenu="handleContextMenu">
    <!-- 你的内容 -->
    <p>右键这里查看菜单</p>
    
    <!-- 右键菜单组件 -->
    <ContextMenu
      :visible="contextMenu.visible.value"
      :position="contextMenu.position.value"
      :menu-items="menuItems"
      @item-click="contextMenu.handleItemClick"
      @hide="contextMenu.hide"
    />
  </div>
</template>

<script setup>
const handleContextMenu = (event) => {
  contextMenu.show(event)
}
</script>
```

#### API 参考

#### ContextMenu 组件 Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | Boolean | false | 是否显示菜单 |
| position | Object | {x:0,y:0} | 菜单位置坐标 |
| menuItems | Array | [] | 菜单项配置数组 |
| autoAdjustPosition | Boolean | true | 是否自动调整位置 |

#### ContextMenu 组件 Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| item-click | item | 菜单项被点击时触发 |
| hide | - | 菜单隐藏时触发 |

#### useContextMenu 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| menuItems | Array | [] | 菜单项配置 |
| onItemClick | Function | () => {} | 菜单项点击回调 |
| shouldShow | Function | () => true | 是否显示菜单的判断函数 |
| autoHide | Boolean | true | 是否自动隐藏菜单 |

#### 菜单项配置

```javascript
{
  key: 'unique-key',        // 唯一标识
  label: '菜单标签',         // 显示文本
  icon: '🔧',              // 图标（可选）
  disabled: false,         // 是否禁用（可选）
  handler: (context) => {  // 点击处理函数
    // 处理逻辑
    context.hide() // 隐藏菜单
  }
}

// 分割线
{
  type: 'divider'
}
```

#### Context 上下文对象

菜单项的 handler 函数会接收一个 context 对象，包含以下属性：

```javascript
{
  selectedText: '',        // 选中的文本
  selectedRange: null,     // 选中的范围对象
  contextData: null,       // 自定义上下文数据
  hide: () => {},         // 隐藏菜单函数
  replaceSelectedText: (text) => {} // 替换选中文本函数
}
```

#### 预设菜单项

##### 文本优化菜单

```javascript
import { createTextOptimizeMenuItems } from '@/composables/useContextMenu.js'

// 创建文本优化菜单项
const optimizeMenuItems = createTextOptimizeMenuItems(async (text, type) => {
  // 你的文本优化逻辑
  const response = await fetch('/api/optimize', {
    method: 'POST',
    body: JSON.stringify({ text, type })
  })
  const result = await response.json()
  return result.optimizedText
})
```

### 升级用法

##### 条件显示菜单

```javascript
const contextMenu = useContextMenu({
  shouldShow: (event, data) => {
    // 根据不同条件显示不同菜单
    const target = event.target
    
    if (target.tagName === 'IMG') {
      return true // 图片右键菜单
    }
    
    if (target.closest('.editable')) {
      const selection = window.getSelection()
      return selection && !selection.isCollapsed // 编辑区域文本菜单
    }
    
    return false // 不显示菜单
  }
})
```

#### 动态菜单项

```javascript
const menuItems = computed(() => {
  const items = [
    {
      key: 'copy',
      label: '复制',
      icon: '📋',
      disabled: !contextMenu.selectedText.value,
      handler: (context) => {
        navigator.clipboard.writeText(context.selectedText)
        context.hide()
      }
    }
  ]
  
  // 根据条件添加更多菜单项
  if (userPermissions.canEdit) {
    items.push({
      key: 'edit',
      label: '编辑',
      icon: '✏️',
      handler: (context) => {
        // 编辑逻辑
        context.hide()
      }
    })
  }
  
  return items
})
```

#### 多个右键菜单（暂时只有文本，其他暂无扩展）

```javascript
// 为不同区域创建不同的右键菜单
const textMenu = useContextMenu({ /* 文本菜单配置 */ })
const imageMenu = useContextMenu({ /* 图片菜单配置 */ })
const tableMenu = useContextMenu({ /* 表格菜单配置 */ })

const handleContextMenu = (event) => {
  const target = event.target
  
  if (target.tagName === 'IMG') {
    imageMenu.show(event)
  } else if (target.closest('table')) {
    tableMenu.show(event)
  } else {
    textMenu.show(event)
  }
}
```

#### 样式自定义

组件使用 scoped 样式，如需自定义样式，可以通过以下方式：

```css
/* 全局样式覆盖 */
.context-menu {
  --menu-bg: #ffffff;
  --menu-border: #e1e5e9;
  --menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --item-hover-bg: #f5f5f5;
  --item-active-bg: #e8e8e8;
  --item-disabled-color: #ccc;
}

/* 深色主题 */
.dark .context-menu {
  --menu-bg: #2d2d2d;
  --menu-border: #404040;
  --item-hover-bg: #404040;
  --item-active-bg: #505050;
}
```


#### 完整示例

查看 `ContextMenuExample.vue` 文件获取完整的使用示例。