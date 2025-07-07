import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper4.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper4.html\",\"title\":\"页面缩放功能\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"概述\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":3,\"title\":\"实现思路\",\"slug\":\"实现思路\",\"link\":\"#实现思路\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper4.md\",\"excerpt\":\"\\n<h3>概述</h3>\\n<p>该页面实现了一个完整的缩放功能系统，允许用户对编辑器内容进行放大和缩小操作。缩放功能通过组合式API、组件化设计和状态管理相结合的方式实现。</p>\\n<h4>核心技术栈</h4>\\n<ul>\\n<li><strong>Vue 3 Composition API</strong>: 使用组合式函数管理缩放状态</li>\\n<li><strong>Pinia</strong>: 状态管理，持久化缩放配置</li>\\n<li><strong>CSS Transform</strong>: 实现视觉缩放效果</li>\\n<li><strong>组件化设计</strong>: 独立的缩放控件组件</li>\\n</ul>\"}")
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
