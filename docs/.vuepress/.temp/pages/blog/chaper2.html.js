import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper2.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper2.html\",\"title\":\"WPSweboffice基础功能罗列参考\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"blog/chaper2.md\",\"excerpt\":\"\\n<p>支持在线创建、编辑提供与本地WPS Office高度相似的编辑界面和基础功能（字体、段落、样式、公式、图表、图片插入、基本动画等）。</p>\\n<ol>\\n<li>\\n<p>文档侧边栏（最多四层）\\n是否开启目录功能，默认开启\\n打开文档时，默认以最佳比例显示</p>\\n</li>\\n<li>\\n<p>查询文本位置和进行文本替换</p>\\n</li>\\n<li>\\n<p>粘贴带格式的html数据到指定的区域。\\n<code>（在wps weboffice中， 首先获取选中区域，再使用PasteHtml就能实现。）</code>\\n思考？在自己的组件库能不能封装下此功能。</p>\\n</li>\\n<li>\\n<p>搜索的时候，搜索的文字高亮实现。</p>\\n</li>\\n<li>\\n<p>文档内容提取和批量填充：文档合并，插入等\\n思考？（能不能使用wangeditor也封装一个方法，直接可以插入）</p>\\n</li>\\n<li>\\n<p>开启了限制编辑模式，打开模板文档后，我们发现除了内容控件可以编辑外，其它地方的内容都变为了只读。</p>\\n</li>\\n<li>\\n<p>在光标处插入内容控件（可不可以一行代码，在光标处插入内容控件。</p>\\n</li>\\n</ol>\"}")
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
