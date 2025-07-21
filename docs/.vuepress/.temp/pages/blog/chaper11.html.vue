<template><div><h1 id="文档导出核心功能" tabindex="-1"><a class="header-anchor" href="#文档导出核心功能"><span>文档导出核心功能</span></a></h1>
<p>该脚本的主要功能是将一段HTML字符串转换为符合 <code v-pre>.docx</code> 格式的Word文档，并利用浏览器功能将其下载到本地。</p>
<h4 id="关键技术栈" tabindex="-1"><a class="header-anchor" href="#关键技术栈"><span>关键技术栈</span></a></h4>
<ul>
<li><strong><code v-pre>docx</code></strong>：一个纯JavaScript库，用于以声明式API创建和处理 <code v-pre>.docx</code> 文件，无需服务器或Office软件依赖。</li>
<li><strong><code v-pre>file-saver</code></strong>：一个客户端文件保存库，用于在浏览器中触发文件下载，解决了跨浏览器兼容性问题。</li>
</ul>
<h4 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路"><span>实现思路</span></a></h4>
<p>该脚本采用<strong>递归下降解析</strong>的策略来处理HTML结构。它将HTML字符串解析成一个DOM树，然后深度优先遍历这个树，将每个HTML节点（Element Node, Text Node）映射为 <code v-pre>docx</code> 库中对应的文档元素（如 <code v-pre>Paragraph</code>, <code v-pre>TextRun</code>, <code v-pre>Table</code>, <code v-pre>ImageRun</code> 等）。</p>
<h3 id="主要方法解析" tabindex="-1"><a class="header-anchor" href="#主要方法解析"><span>主要方法解析</span></a></h3>
<ol>
<li>
<p><strong><code v-pre>exportToWord(htmlContent, title, filename)</code></strong></p>
<ul>
<li><strong>入口函数</strong>：这是暴露给外部调用的主函数。</li>
<li><strong>HTML解析</strong>：通过 <code v-pre>document.createElement('div')</code> 和 <code v-pre>innerHTML</code> 将传入的HTML字符串转换为一个临时的DOM结构，便于后续遍历。</li>
<li><strong>内容转换</strong>：调用 <code v-pre>convertHtmlToDocxParagraphs</code> 函数，启动从HTML到 <code v-pre>docx</code> 对象的递归转换过程。</li>
<li><strong>文档构建</strong>：使用 <code v-pre>new Document()</code> 创建Word文档实例，并将转换后的段落、标题等内容组织到文档的 <code v-pre>sections</code> 中。</li>
<li><strong>文件生成与下载</strong>：调用 <code v-pre>Packer.toBlob(doc)</code> 将 <code v-pre>docx</code> 文档对象打包成二进制 <code v-pre>Blob</code>。最后，使用 <code v-pre>file-saver</code> 的 <code v-pre>saveAs</code> 方法触发浏览器下载。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>convertHtmlToDocxParagraphs(element)</code> 和 <code v-pre>convertElementToParagraph(node)</code></strong></p>
<ul>
<li><strong>递归核心</strong>：这两个函数构成了递归转换的核心逻辑。</li>
<li><strong>节点分发器 (<code v-pre>convertElementToParagraph</code>)</strong>：此函数像一个路由器，根据当前HTML节点的类型 (<code v-pre>node.nodeType</code>) 和标签名 (<code v-pre>element.tagName</code>)，决定调用哪个具体的转换函数（例如 <code v-pre>convertTableElement</code> 处理 <code v-pre>&lt;table&gt;</code>，<code v-pre>convertImageElement</code> 处理 <code v-pre>&lt;img&gt;</code>）。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>convertElementToTextRuns(element, currentStyles)</code></strong></p>
<ul>
<li><strong>富文本处理</strong>：这是处理<strong>内联样式</strong>（如加粗、斜体、下划线）的关键。它会递归遍历一个块级元素（如 <code v-pre>&lt;p&gt;</code>）的所有子节点。</li>
<li><strong>样式继承</strong>：当遇到 <code v-pre>&lt;strong&gt;</code>, <code v-pre>&lt;em&gt;</code> 等样式标签时，它会将相应的样式（<code v-pre>{ bold: true }</code>）添加到 <code v-pre>currentStyles</code> 对象中，并向下传递给子节点。当遇到文本节点时，就用携带的 <code v-pre>currentStyles</code> 创建一个 <code v-pre>TextRun</code>。</li>
<li><strong>效果</strong>：这种机制能够正确处理嵌套样式，例如 <code v-pre>&lt;p&gt;这是&lt;strong&gt;&lt;em&gt;粗斜体&lt;/em&gt;&lt;/strong&gt;文字&lt;/p&gt;</code>。</li>
</ul>
</li>
<li>
<p><strong>特定元素转换函数 (例如 <code v-pre>convertImageElement</code>, <code v-pre>convertTableElement</code>, <code v-pre>convertSpanElement</code>)</strong></p>
<ul>
<li><strong>图片处理</strong>：能处理Base64格式的内嵌图片，将其转换为 <code v-pre>ImageRun</code>。对于外部链接的图片，则生成一个占位符文本。</li>
<li><strong>表格处理</strong>：遍历 <code v-pre>&lt;thead&gt;</code> 和 <code v-pre>&lt;tbody&gt;</code> 中的 <code v-pre>&lt;tr&gt;</code> 和 <code v-pre>&lt;td&gt;</code>/<code v-pre>&lt;th&gt;</code>，构建出 <code v-pre>docx</code> 库所要求的 <code v-pre>Table</code>, <code v-pre>TableRow</code>, <code v-pre>TableCell</code> 结构。</li>
<li><strong>自定义控件处理</strong>：通过检查 <code v-pre>data-w-e-type</code> 这样的自定义属性，对一些特殊的 <code v-pre>&lt;span&gt;</code> 或 <code v-pre>&lt;div&gt;</code>（如文本控件、日期控件）进行特殊处理，提取其有效数据或显示占位符，增强了对富文本编辑器内容的兼容性。</li>
</ul>
</li>
</ol>
</div></template>


