
          
# 导入文档功能

### 概述

该项目基于 Vue 3 和 wangEditor 富文本编辑器实现了一个功能完善的文档导入系统，支持多种文件格式的导入和处理。

#### 封装的js名称
```
fileUtils.js
```

#### 核心技术栈
- **前端框架**: Vue 3 (Composition API)
- **富文本编辑器**: wangEditor v5
- **文档处理库**:
  - `mammoth`: Word 文档(.docx)解析
  - `xlsx`: Excel 文档(.xlsx/.xls)处理
- **UI组件**: Ant Design Vue


### 导入文档功能实现

#### 1. 用户界面设计

##### 导入按钮

```vue
<button @click="importDocument" class="btn btn-primary">导入文档</button>
```

##### 隐藏文件输入框

```vue
<input
  ref="fileInput"
  type="file"
  accept=".doc,.docx,.pdf,.txt,.html,.xls,.xlsx"
  style="display: none"
  @change="handleFileImport"
/>
```

##### 状态显示
```vue
<span v-if="importStatus" class="import-status">
  {{ importStatus }}
</span>
```

#### 2. 核心实现逻辑

#### 文件选择触发
```javascript
const importDocument = () => {
  fileInput.value.click();
};
```

#### 文件导入处理
```javascript
const handleFileImport = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  importStatus.value = "正在导入...";
  try {
    const content = await readFile(file);
    const editor = state.editor;
    if (editor) {
      editor.dangerouslyInsertHtml(content);
    }
    importStatus.value = "导入成功";
  } catch (error) {
    console.error("导入失败:", error);
    importStatus.value = `导入失败: ${error.message}`;
  }
};
```

#### 3. 文件处理核心模块 (fileUtils.js)

#### 支持的文件格式
- **Word文档** (.docx)
- **Excel表格** (.xlsx, .xls)
- **HTML文件** (.html)
- **纯文本文件** (.txt)
- **PDF文件** (提示不支持，需先转为word)

#### Word文档处理
```javascript
if (fileName.endsWith('.docx')) {
  reader.onload = async (e) => {
    try {
      const arrayBuffer = e.target.result;
      const result = await mammoth.convertToHtml({
        arrayBuffer,
        preserveStyles: true,
      });
      const html = result.value;
      
        ...
      `;
      resolve(styledHtml);
    } catch (error) {
      reject(new Error('Word文档解析失败'));
    }
  };
  reader.readAsArrayBuffer(file);
}
```

#### Excel文档处理
```javascript
else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = XLSX.utils.sheet_to_html(firstSheet, {
        id: 'excel-table',
      });
      
    ....
      `;
      resolve(styledHtml);
    } catch (error) {
      reject(new Error('Excel文档解析失败'));
    }
  };
  reader.readAsArrayBuffer(file);
}
```

#### 文本文件处理
```javascript
else {
  reader.onload = (e) => {
    try {
      let content = e.target.result;
      content = content.replace(/\n/g, '<br>');
    ...
    } catch (error) {
      reject(error);
    }
  };
  reader.readAsText(file);
}
```


#### 多格式支持
- **Word文档**: 使用 mammoth 库保持原始格式和样式
- **Excel表格**: 使用 xlsx 库转换为HTML表格
- **文本文件**: 自动处理换行符转换
- **HTML文件**: 直接插入内容
- **pdf文件**: （暂定是后端先转为word，再导入。或者前端考虑使用pdf.js）

### 待扩展
业务中如果有需要将图片解析为docs文档。
#### 备选解决方法：
1. 前段实现方案，利用浏览器端JS库生成.docx文件（基于Office Open XML格式）。使用docx.js库。适合少量不复杂的图片。
2. 后端实现方案，后端利用第三方库生成.docx文件。前端下载。适合大量图片。




        