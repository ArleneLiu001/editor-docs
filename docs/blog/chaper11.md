# 文档导出核心功能
该脚本的主要功能是将一段HTML字符串转换为符合 `.docx` 格式的Word文档，并利用浏览器功能将其下载到本地。

#### 关键技术栈
- **`docx`**：一个纯JavaScript库，用于以声明式API创建和处理 `.docx` 文件，无需服务器或Office软件依赖。
- **`file-saver`**：一个客户端文件保存库，用于在浏览器中触发文件下载，解决了跨浏览器兼容性问题。

#### 实现思路
该脚本采用**递归下降解析**的策略来处理HTML结构。它将HTML字符串解析成一个DOM树，然后深度优先遍历这个树，将每个HTML节点（Element Node, Text Node）映射为 `docx` 库中对应的文档元素（如 `Paragraph`, `TextRun`, `Table`, `ImageRun` 等）。

### 主要方法解析

1.  **`exportToWord(htmlContent, title, filename)`**
    - **入口函数**：这是暴露给外部调用的主函数。
    - **HTML解析**：通过 `document.createElement('div')` 和 `innerHTML` 将传入的HTML字符串转换为一个临时的DOM结构，便于后续遍历。
    - **内容转换**：调用 `convertHtmlToDocxParagraphs` 函数，启动从HTML到 `docx` 对象的递归转换过程。
    - **文档构建**：使用 `new Document()` 创建Word文档实例，并将转换后的段落、标题等内容组织到文档的 `sections` 中。
    - **文件生成与下载**：调用 `Packer.toBlob(doc)` 将 `docx` 文档对象打包成二进制 `Blob`。最后，使用 `file-saver` 的 `saveAs` 方法触发浏览器下载。

2.  **`convertHtmlToDocxParagraphs(element)` 和 `convertElementToParagraph(node)`**
    - **递归核心**：这两个函数构成了递归转换的核心逻辑。
    - **节点分发器 (`convertElementToParagraph`)**：此函数像一个路由器，根据当前HTML节点的类型 (`node.nodeType`) 和标签名 (`element.tagName`)，决定调用哪个具体的转换函数（例如 `convertTableElement` 处理 `<table>`，`convertImageElement` 处理 `<img>`）。

3.  **`convertElementToTextRuns(element, currentStyles)`**
    - **富文本处理**：这是处理**内联样式**（如加粗、斜体、下划线）的关键。它会递归遍历一个块级元素（如 `<p>`）的所有子节点。
    - **样式继承**：当遇到 `<strong>`, `<em>` 等样式标签时，它会将相应的样式（`{ bold: true }`）添加到 `currentStyles` 对象中，并向下传递给子节点。当遇到文本节点时，就用携带的 `currentStyles` 创建一个 `TextRun`。
    - **效果**：这种机制能够正确处理嵌套样式，例如 `<p>这是<strong><em>粗斜体</em></strong>文字</p>`。

4.  **特定元素转换函数 (例如 `convertImageElement`, `convertTableElement`, `convertSpanElement`)**
    - **图片处理**：能处理Base64格式的内嵌图片，将其转换为 `ImageRun`。对于外部链接的图片，则生成一个占位符文本。
    - **表格处理**：遍历 `<thead>` 和 `<tbody>` 中的 `<tr>` 和 `<td>`/`<th>`，构建出 `docx` 库所要求的 `Table`, `TableRow`, `TableCell` 结构。
    - **自定义控件处理**：通过检查 `data-w-e-type` 这样的自定义属性，对一些特殊的 `<span>` 或 `<div>`（如文本控件、日期控件）进行特殊处理，提取其有效数据或显示占位符，增强了对富文本编辑器内容的兼容性。


        