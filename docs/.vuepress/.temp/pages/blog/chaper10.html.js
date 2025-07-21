import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper10.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper10.html\",\"title\":\"右键菜单组件\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"基础用法\",\"slug\":\"基础用法\",\"link\":\"#基础用法\",\"children\":[]},{\"level\":3,\"title\":\"升级用法\",\"slug\":\"升级用法\",\"link\":\"#升级用法\",\"children\":[]}],\"git\":{\"updatedTime\":1751855107000,\"contributors\":[{\"name\":\"arlene001\",\"username\":\"arlene001\",\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"commits\":2,\"url\":\"https://github.com/arlene001\"}],\"changelog\":[{\"hash\":\"13cc2049c15ad42d925452fe9e9d43973f8fa1e0\",\"time\":1751855107000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"},{\"hash\":\"53fc117d8a9cfb464850e3363d49de1d78eb7a63\",\"time\":1751852733000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"}]},\"filePathRelative\":\"blog/chaper10.md\",\"excerpt\":\"\\n<p>一个可配置的右键菜单组件，支持自定义菜单项、位置调整、条件显示等功能。</p>\\n<h4>功能特性</h4>\\n<ul>\\n<li><strong>可配置菜单项</strong> - 支持自定义图标、标签、快捷键等</li>\\n<li><strong>智能位置调整</strong> - 自动调整位置避免超出视窗</li>\\n<li><strong>灵活样式定制</strong> - 支持禁用状态、分割线等</li>\\n<li><strong>条件显示</strong> - 可根据上下文决定是否显示菜单</li>\\n<li><strong>响应式设计</strong> - 适配不同屏幕尺寸</li>\\n<li><strong>高性能</strong> - 使用组合式API，性能优化</li>\\n</ul>\"}")
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
