import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper11.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper11.html\",\"title\":\"文档导出核心功能\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"主要方法解析\",\"slug\":\"主要方法解析\",\"link\":\"#主要方法解析\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper11.md\",\"excerpt\":\"\\n<p>该脚本的主要功能是将一段HTML字符串转换为符合 <code>.docx</code> 格式的Word文档，并利用浏览器功能将其下载到本地。</p>\\n<h4>关键技术栈</h4>\\n<ul>\\n<li><strong><code>docx</code></strong>：一个纯JavaScript库，用于以声明式API创建和处理 <code>.docx</code> 文件，无需服务器或Office软件依赖。</li>\\n<li><strong><code>file-saver</code></strong>：一个客户端文件保存库，用于在浏览器中触发文件下载，解决了跨浏览器兼容性问题。</li>\\n</ul>\"}")
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
