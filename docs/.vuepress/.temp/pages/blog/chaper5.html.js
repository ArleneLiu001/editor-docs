import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper5.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper5.html\",\"title\":\"工具栏自定义日期组件实现\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"核心插件\",\"slug\":\"核心插件\",\"link\":\"#核心插件\",\"children\":[]},{\"level\":3,\"title\":\"实现思路\",\"slug\":\"实现思路\",\"link\":\"#实现思路\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper5.md\",\"excerpt\":\"\\n<h3>核心插件</h3>\\n<p><strong>日期选择器插件</strong></p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"text\\\"><pre><code><span class=\\\"line\\\"></span>\\n<span class=\\\"line\\\">\\\\src\\\\utils\\\\datePickerPlugin.js</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
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
