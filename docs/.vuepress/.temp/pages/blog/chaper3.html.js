import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper3.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper3.html\",\"title\":\"导入文档功能\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"概述\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":3,\"title\":\"导入文档功能实现\",\"slug\":\"导入文档功能实现\",\"link\":\"#导入文档功能实现\",\"children\":[]},{\"level\":3,\"title\":\"待扩展\",\"slug\":\"待扩展\",\"link\":\"#待扩展\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper3.md\",\"excerpt\":\"\\n<h3>概述</h3>\\n<p>该项目基于 Vue 3 和 wangEditor 富文本编辑器实现了一个功能完善的文档导入系统，支持多种文件格式的导入和处理。</p>\\n<h4>封装的js名称</h4>\\n<div class=\\\"language-text line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"text\\\"><pre><code><span class=\\\"line\\\">fileUtils.js</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\"}")
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
