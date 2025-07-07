import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/blog/chaper1.html.vue"
const data = JSON.parse("{\"path\":\"/blog/chaper1.html\",\"title\":\"编辑器功能扩展需求\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"引言\",\"slug\":\"引言\",\"link\":\"#引言\",\"children\":[]},{\"level\":3,\"title\":\"功能需求描述\",\"slug\":\"功能需求描述\",\"link\":\"#功能需求描述\",\"children\":[]},{\"level\":3,\"title\":\"核心功能\",\"slug\":\"核心功能\",\"link\":\"#核心功能\",\"children\":[]},{\"level\":3,\"title\":\"核心技术实现\",\"slug\":\"核心技术实现\",\"link\":\"#核心技术实现\",\"children\":[]},{\"level\":2,\"title\":\"特色功能\",\"slug\":\"特色功能\",\"link\":\"#特色功能\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"blog/chaper1.md\",\"excerpt\":\"\\n<h3>引言</h3>\\n<p>公司需要在开源文本编辑器wangEditor的基础上，实现一个富文本编辑器扩展插件，用于在线文档的定制化编辑。</p>\\n<h3>功能需求描述</h3>\\n<ol>\\n<li>导入文档自动按照格式解析。支持格式为.doc,.docx,.pdf,.txt,.html,.xls,.xlsx图片（是否需要）</li>\\n<li>解析的文档可以调整查看比例。</li>\\n<li>可配置页面顶部是否显示编辑按钮区域。</li>\\n<li>编辑区域包含wangEditor编辑器的基础编辑功能及可配置。</li>\\n<li>自定义工具栏的插件，按照需要目前增加图片裁剪，插入日期控件。</li>\\n<li>需要锁定编辑。锁定情况下，只能编辑控件指定下的内容，其他内容不可编辑。</li>\\n<li>页面底部字数统计。</li>\\n<li>鼠标悬浮停留位置，可自由添加所需组件：组件包含\\n文本组件，时间控件，图片控件，表格控件等。</li>\\n<li>可以对编辑器里面的文档添加锚定点，用于用户对文档特点位置的内容进行编辑，以及知道编辑的是哪些位置信息。</li>\\n<li>封装整体为文档组件自定义标签插入和填充api。</li>\\n<li>富文本转文档导出。</li>\\n<li>选中内容，可AI拓展，优化内容，一键替换内容。</li>\\n<li></li>\\n</ol>\"}")
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
