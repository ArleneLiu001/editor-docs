# 工具栏图片上传并裁剪功能实现分析

### 概述
页面中的工具栏图片上传并裁剪功能是基于 **wangEditor** 编辑器的自定义插件实现，集成了 **vue-cropper** 图片裁剪库，提供了完整的图片上传、裁剪和插入编辑器的功能。


### 核心组件

1. **imageCropperPlugin.js** - 自定义工具栏插件


#### 实现思路

#### 1. 插件注册机制

##### 插件类定义
```javascript
class ImageCropperMenu {
  constructor(options = {}) {
    // 默认配置
    const defaultOptions = {
      title: '上传并裁剪图片',
      iconSvg: `<svg>...</svg>`, // 工具栏图标
      acceptTypes: 'image/*',
      maxFileSize: 10 * 1024 * 1024, // 10MB
      cropperOptions: {
        autoCrop: true,
        autoCropWidth: 800,
        autoCropHeight: 600,
        fixedBox: false,
        centerBox: true
      }
    }
  }
}
```

#### 插件注册
```javascript
// 在 befenTencent.vue 中注册插件
registerImageCropperPlugin({
  key: "imageCropperMenu",
  menuOptions: {
    title: "图片上传并裁剪",
    cropperOptions: {
      autoCrop: true,
      autoCropWidth: 300,
      autoCropHeight: 200,
      fixedBox: false,
      centerBox: true,
    },
    maxFileSize: 5 * 1024 * 1024, // 5MB
    insertMode: "append"
  }
});
```

#### 2. 工具栏集成

##### 菜单配置
```javascript
const toolbarConfig = {
  menuKeys: ["imageCropperMenu"], // 添加自定义菜单
}
```

##### 菜单执行逻辑
```javascript
exec(editor, value) {
  if (this.isDisabled(editor)) return
  
  this.currentEditor = editor
  
  // 创建隐藏的文件输入
  const input = this.createFileInput()
  input.click() // 触发文件选择
}
```

#### 3. 文件上传处理

##### 文件选择和验证
```javascript
handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    this.handleError('请选择图片文件')
    return
  }

  // 验证文件大小
  if (file.size > this.options.maxFileSize) {
    this.handleError(`文件大小不能超过 ${this.options.maxFileSize / 1024 / 1024}MB`)
    return
  }

  // 读取文件并显示裁剪器
  const reader = new FileReader()
  reader.onload = (e) => {
    this.showCropper(e.target.result)
  }
  reader.readAsDataURL(file)
}
```

#### 4. 图片裁剪界面

##### 动态创建 Vue 组件
```javascript
showCropper(imageSrc) {
  // 创建模态框容器
  const modalContainer = document.createElement('div')
  document.body.appendChild(modalContainer)

  // 创建 Vue 应用实例
  const cropperComponent = {
    components: { VueCropper },
    data() {
      return {
        visible: true,
        imageSrc: imageSrc,
        cropperOptions: {
          img: imageSrc,
          autoCrop: this.options.cropperOptions.autoCrop,
          // ... 其他配置
        }
      }
    },
    methods: {
      cropImage() {
        this.$refs.cropperRef.getCropData((data) => {
          self.onCropped(data)
          this.closeCropper()
        })
      },
      rotateLeft() { this.$refs.cropperRef.rotateLeft() },
      rotateRight() { this.$refs.cropperRef.rotateRight() },
      zoomIn() { this.$refs.cropperRef.changeScale(1) },
      zoomOut() { this.$refs.cropperRef.changeScale(-1) }
    }
  }

  // 挂载 Vue 应用
  this.vueApp = createApp(cropperComponent)
  this.vueApp.mount(modalContainer)
}
```

##### 裁剪控制功能
- **旋转**: 左转/右转
- **缩放**: 放大/缩小
- **重置**: 恢复初始状态
- **裁剪框调整**: 拖拽调整裁剪区域

#### 5. 图片插入编辑器

##### 裁剪完成处理
```javascript
onCropped(data) {
  if (data) {
    this.insertImage(data)
    
    // 裁剪完成回调
    if (this.options.onCropped && typeof this.options.onCropped === 'function') {
      this.options.onCropped(data, this.currentEditor)
    }
  }
  
  this.closeCropper()
}

insertImage(imageData) {
  if (this.currentEditor) {
    this.currentEditor.focus()
    
    if (this.options.insertMode === 'replace') {
      // 替换当前选中内容
      this.currentEditor.dangerouslyInsertHtml(`<img src="${imageData}" alt="cropped image" style="max-width: 100%; height: auto;"/>`)
    } else {
      // 追加到末尾
      this.currentEditor.dangerouslyInsertHtml(`<img src="${imageData}" alt="cropped image" style="max-width: 100%; height: auto;"/>`)
    }
  }
}
```

#### 6. 资源清理

##### 组件销毁
```javascript
closeCropper() {
  // 销毁 Vue 应用实例
  if (this.vueApp) {
    this.vueApp.unmount()
    this.vueApp = null
  }
  
  // 移除模态框容器
  if (this.modalContainer) {
    this.modalContainer.remove()
    this.modalContainer = null
  }
}
```

#### 核心特性

##### 可配置
- **裁剪参数**: 自动裁剪、裁剪框尺寸、固定比例等
- **文件限制**: 文件类型、大小限制
- **插入模式**: 替换或追加模式
- **回调函数**: 裁剪完成、错误处理回调




#### 使用示例

##### 基础使用
```javascript
// 1. 注册插件
registerImageCropperPlugin({
  key: "imageCropperMenu",
  menuOptions: {
    title: "图片裁剪",
    maxFileSize: 5 * 1024 * 1024
  }
})

// 2. 配置工具栏
const toolbarConfig = {
  menuKeys: ["imageCropperMenu"]
}

// 3. 创建编辑器
const editor = createEditor({
  container: editorContainer,
  config: editorConfig
})

const toolbar = createToolbar({
  editor,
  container: toolbarContainer,
  config: toolbarConfig
})
```

##### 更多配置
```javascript
registerImageCropperPlugin({
  key: "imageCropperMenu",
  menuOptions: {
    title: "高级图片裁剪",
    cropperOptions: {
      autoCrop: true,
      autoCropWidth: 400,
      autoCropHeight: 300,
      fixedBox: true, // 固定裁剪框
      centerBox: true
    },
    maxFileSize: 10 * 1024 * 1024,
    insertMode: "replace",
    onCropped: (imageData, editor) => {
      console.log('裁剪完成，图片大小:', imageData.length)
    },
    onError: (message) => {
      notification.error({ message: '图片处理失败', description: message })
    }
  }
})
```


        