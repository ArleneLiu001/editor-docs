
# 工具栏自定义日期组件实现

### 核心插件
 **日期选择器插件** 
```

\src\utils\datePickerPlugin.js
```

#### 技术栈

- **编辑器框架**: wangEditor v5
- **UI 框架**: Vue 3 + Ant Design Vue
- **日期处理**: dayjs
- **插件机制**: wangEditor Boot 注册系统

### 实现思路

#### 1. 插件注册机制

```javascript
// 注册日期选择器插件
registerDatePickerPlugin({
  key: "datePickerMenu",
  menuOptions: {
    // 可在此配置需要的参数
  },
});
```


#### 2. 工具栏集成

在工具栏配置中添加日期选择器菜单：

```javascript
const toolbarConfig = {
  toolbarKeys: [
    // ... 其他工具
    "datePickerMenu", // 添加日期选择器菜单
  ],
};
```


##### 工具栏弹出式选择器

- 点击工具栏日期图标触发
- 在按钮下方弹出内联日期选择器
- 使用原生 `<input type="date">` 控件
- 支持确认/取消操作



#### 3. 日期格式化与插入

```javascript
// 格式化日期
const formattedDate = dayjs(selectedDate).format(this.options.dateFormat)
const textToInsert = `${this.options.prefix}${formattedDate}`

// 插入到编辑器
editor.insertText(textToInsert)
```

**默认格式**: `📅 YYYY年MM月DD日`



#### 核心特性

#### 1. 高度可配置

- **日期格式**: 支持自定义格式字符串
- **显示样式**: 可配置前缀、图标、颜色等
- **交互行为**: 支持自定义插入回调函数
- **UI 样式**: 完全可定制的样式配置

#### 2. 智能定位

```javascript
// 检查是否超出视窗边界
if (left + pickerRect.width > window.innerWidth) {
  left = rect.left - pickerRect.width - 5;
}
if (top + pickerRect.height > window.innerHeight) {
  top = rect.top - pickerRect.height - 5;
}
```

#### 3. 用户体验优化

- **点击外部关闭**: 自动检测外部点击
- **焦点管理**: 自动聚焦到日期输入框
- **选区保持**: 保存和恢复编辑器选区

#### 4. 状态管理

```javascript
// 响应式状态
const showDatePickerModal = ref(false);
const selectedDate = ref(null);
const currentDateControl = ref(null);
```


#### 5. 插件化架构

- 基于 wangEditor 的插件机制
- 支持动态注册和注销
- 避免重复注册的保护机制

#### 6. 多重查找策略

```javascript
// 增强菜单按钮查找逻辑
let menuButton = document.querySelector('[data-menu-key="datePickerMenu"]');
if (!menuButton) {
  // 尝试通过 title 属性查找
  menuButton = Array.from(document.querySelectorAll('.w-e-toolbar button'))
    .find(btn => btn.title && btn.title.includes('日期'));
}
```




#### 基础使用

```javascript
import { registerDatePickerPlugin } from '@/utils/datePickerPlugin';

// 注册插件
registerDatePickerPlugin();

// 在工具栏配置中添加
const toolbarConfig = {
  toolbarKeys: ['datePickerMenu']
};
```

#### 配置参数

```javascript
registerDatePickerPlugin({
  key: 'customDatePicker',
  menuOptions: {
    title: '自定义日期',
    dateFormat: 'MM/DD/YYYY',
    prefix: '🗓️ ',
    onInsert: (text, date, editor) => {
      // 自定义插入逻辑
      console.log('插入日期:', text, date);
      editor.insertText(text);
    }
  }
});
```


        