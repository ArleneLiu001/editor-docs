import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper7.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper7.html\",\"title\":\"字数统计功能\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"核心实现思路\",\"slug\":\"核心实现思路\",\"link\":\"#核心实现思路\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper7.md\",\"excerpt\":\"\\n<h3>核心实现思路</h3>\\n<h4>1. 数据结构设计</h4>\\n<div class=\\\"language-javascript line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"js\\\"><pre><code><span class=\\\"line\\\"><span class=\\\"token keyword\\\">const</span> state <span class=\\\"token operator\\\">=</span> <span class=\\\"token function\\\">reactive</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">{</span></span>\\n<span class=\\\"line\\\">  <span class=\\\"token literal-property property\\\">editor</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token keyword\\\">null</span><span class=\\\"token punctuation\\\">,</span></span>\\n<span class=\\\"line\\\">  <span class=\\\"token literal-property property\\\">htmlContent</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token string\\\">\\\"\\\"</span><span class=\\\"token punctuation\\\">,</span></span>\\n<span class=\\\"line\\\">  <span class=\\\"token literal-property property\\\">pageTitle</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token string\\\">\\\"\\\"</span><span class=\\\"token punctuation\\\">,</span></span>\\n<span class=\\\"line\\\">  <span class=\\\"token literal-property property\\\">wordCount</span><span class=\\\"token operator\\\">:</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> <span class=\\\"token comment\\\">// 字数统计变量</span></span>\\n<span class=\\\"line\\\"><span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span></span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
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
