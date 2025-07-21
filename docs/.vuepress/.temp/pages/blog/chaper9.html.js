import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper9.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper9.html\",\"title\":\"可配置控件组件\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"功能特性\",\"slug\":\"功能特性\",\"link\":\"#功能特性\",\"children\":[]},{\"level\":3,\"title\":\"基础用法\",\"slug\":\"基础用法\",\"link\":\"#基础用法\",\"children\":[]},{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]}],\"git\":{\"updatedTime\":1751855107000,\"contributors\":[{\"name\":\"arlene001\",\"username\":\"arlene001\",\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"commits\":2,\"url\":\"https://github.com/arlene001\"}],\"changelog\":[{\"hash\":\"13cc2049c15ad42d925452fe9e9d43973f8fa1e0\",\"time\":1751855107000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"},{\"hash\":\"53fc117d8a9cfb464850e3363d49de1d78eb7a63\",\"time\":1751852733000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"}]},\"filePathRelative\":\"blog/chaper9.md\",\"excerpt\":\"\\n<p><code>ConfigurableControls</code> 是一个高度可配置的自定义控件面板组件，支持通过 props 灵活控制显示的控件类型、面板样式和交互行为。</p>\\n<h3>功能特性</h3>\\n<ul>\\n<li><strong>可配置显示控件</strong>：支持选择性显示文本、日期、图片、表格控件</li>\\n<li><strong>灵活的显示控制</strong>：可控制是否显示整个面板和帮助信息</li>\\n<li><strong>自定义标题和帮助文本</strong>：支持自定义面板标题和帮助说明</li>\\n<li><strong>拖拽功能</strong>：内置拖拽支持，可拖拽控件到目标区域</li>\\n<li><strong>事件回调</strong>：提供拖拽开始和控件选择事件</li>\\n<li><strong>响应式设计</strong>：适配移动端和桌面端</li>\\n</ul>\"}")
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
