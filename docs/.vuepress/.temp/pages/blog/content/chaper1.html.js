import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/content/chaper1.html.vue"
const data = JSON.parse("{\"path\":\"/blog/content/chaper1.html\",\"title\":\"可配置控件组件\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"功能特性\",\"slug\":\"功能特性\",\"link\":\"#功能特性\",\"children\":[]},{\"level\":2,\"title\":\"Props 参数\",\"slug\":\"props-参数\",\"link\":\"#props-参数\",\"children\":[{\"level\":3,\"title\":\"enabledControls 可选值\",\"slug\":\"enabledcontrols-可选值\",\"link\":\"#enabledcontrols-可选值\",\"children\":[]}]},{\"level\":2,\"title\":\"Events 事件\",\"slug\":\"events-事件\",\"link\":\"#events-事件\",\"children\":[]},{\"level\":2,\"title\":\"基础用法\",\"slug\":\"基础用法\",\"link\":\"#基础用法\",\"children\":[{\"level\":3,\"title\":\"1. 完整功能（默认配置）\",\"slug\":\"_1-完整功能-默认配置\",\"link\":\"#_1-完整功能-默认配置\",\"children\":[]},{\"level\":3,\"title\":\"2. 仅显示特定控件\",\"slug\":\"_2-仅显示特定控件\",\"link\":\"#_2-仅显示特定控件\",\"children\":[]},{\"level\":3,\"title\":\"3. 隐藏帮助信息\",\"slug\":\"_3-隐藏帮助信息\",\"link\":\"#_3-隐藏帮助信息\",\"children\":[]},{\"level\":3,\"title\":\"4. 动态配置\",\"slug\":\"_4-动态配置\",\"link\":\"#_4-动态配置\",\"children\":[]}]},{\"level\":2,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[{\"level\":3,\"title\":\"1. 文档编辑器\",\"slug\":\"_1-文档编辑器\",\"link\":\"#_1-文档编辑器\",\"children\":[]},{\"level\":3,\"title\":\"2. 表单设计器\",\"slug\":\"_2-表单设计器\",\"link\":\"#_2-表单设计器\",\"children\":[]}]},{\"level\":2,\"title\":\"注意事项\",\"slug\":\"注意事项\",\"link\":\"#注意事项\",\"children\":[]},{\"level\":2,\"title\":\"演示页面\",\"slug\":\"演示页面\",\"link\":\"#演示页面\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/content/chaper1.md\",\"excerpt\":\"\\n<p><code>ConfigurableControls</code> 是一个高度可配置的自定义控件面板组件，支持通过 props 灵活控制显示的控件类型、面板样式和交互行为。</p>\\n<h2>功能特性</h2>\\n<ul>\\n<li>✅ <strong>可配置显示控件</strong>：支持选择性显示文本、日期、图片、表格控件</li>\\n<li>✅ <strong>灵活的显示控制</strong>：可控制是否显示整个面板和帮助信息</li>\\n<li>✅ <strong>自定义标题和帮助文本</strong>：支持自定义面板标题和帮助说明</li>\\n<li>✅ <strong>拖拽功能</strong>：内置拖拽支持，可拖拽控件到目标区域</li>\\n<li>✅ <strong>事件回调</strong>：提供拖拽开始和控件选择事件</li>\\n<li>✅ <strong>响应式设计</strong>：适配移动端和桌面端</li>\\n</ul>\"}")
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
