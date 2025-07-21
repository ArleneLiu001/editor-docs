import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper14.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper14.html\",\"title\":\"WordCounter 字数统计功能\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"1. 组件架构\",\"slug\":\"_1-组件架构\",\"link\":\"#_1-组件架构\",\"children\":[]},{\"level\":3,\"title\":\"2. Props 设计\",\"slug\":\"_2-props-设计\",\"link\":\"#_2-props-设计\",\"children\":[]},{\"level\":3,\"title\":\"3. 字数计算算法\",\"slug\":\"_3-字数计算算法\",\"link\":\"#_3-字数计算算法\",\"children\":[]},{\"level\":3,\"title\":\"4. 事件监听机制\",\"slug\":\"_4-事件监听机制\",\"link\":\"#_4-事件监听机制\",\"children\":[]},{\"level\":3,\"title\":\"5. 生命周期管理\",\"slug\":\"_5-生命周期管理\",\"link\":\"#_5-生命周期管理\",\"children\":[]},{\"level\":3,\"title\":\"基本用法\",\"slug\":\"基本用法\",\"link\":\"#基本用法\",\"children\":[]},{\"level\":3,\"title\":\"扩展性设计\",\"slug\":\"扩展性设计\",\"link\":\"#扩展性设计\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper14.md\",\"excerpt\":\"\\n<h4>概述</h4>\\n<p>WordCounter 是一个用于富文本编辑器的字数统计组件，支持中英文混合文本的准确计数，提供实时更新功能，并具有良好的用户体验。</p>\\n<h5>核心功能</h5>\\n<ul>\\n<li><strong>多语言字数统计</strong>：支持中文字符、英文单词、数字字符的混合计数</li>\\n<li><strong>实时更新</strong>：编辑器内容变化时自动更新字数统计</li>\\n<li><strong>灵活配置</strong>：支持开启/关闭实时更新功能</li>\\n</ul>\\n<h5>用户界面</h5>\\n<ul>\\n<li><strong>固定定位</strong>：字数统计栏固定在编辑器区域底部</li>\\n<li><strong>响应式布局</strong>：适配不同屏幕尺寸</li>\\n</ul>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
