import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper8.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper8.html\",\"title\":\"自定义控件实现思路\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"概述\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":3,\"title\":\"核心功能实现\",\"slug\":\"核心功能实现\",\"link\":\"#核心功能实现\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper8.md\",\"excerpt\":\"\\n<h3>概述</h3>\\n<p>该文件实现了一套完整的拖拽式自定义控件系统，支持在富文本编辑器中通过拖拽方式插入和管理各种类型的控件，包括文本控件、日期控件、表格控件等。\\n插件名称</p>\\n<div class=\\\"language-javascript line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"js\\\"><pre><code><span class=\\\"line\\\">dragDropHandler<span class=\\\"token punctuation\\\">.</span>js</span>\\n<span class=\\\"line\\\"></span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
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
