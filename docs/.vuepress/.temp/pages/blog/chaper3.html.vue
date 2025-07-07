<template><div><h1 id="导入文档功能" tabindex="-1"><a class="header-anchor" href="#导入文档功能"><span>导入文档功能</span></a></h1>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3>
<p>该项目基于 Vue 3 和 wangEditor 富文本编辑器实现了一个功能完善的文档导入系统，支持多种文件格式的导入和处理。</p>
<h4 id="封装的js名称" tabindex="-1"><a class="header-anchor" href="#封装的js名称"><span>封装的js名称</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">fileUtils.js</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="核心技术栈" tabindex="-1"><a class="header-anchor" href="#核心技术栈"><span>核心技术栈</span></a></h4>
<ul>
<li><strong>前端框架</strong>: Vue 3 (Composition API)</li>
<li><strong>富文本编辑器</strong>: wangEditor v5</li>
<li><strong>文档处理库</strong>:
<ul>
<li><code v-pre>mammoth</code>: Word 文档(.docx)解析</li>
<li><code v-pre>xlsx</code>: Excel 文档(.xlsx/.xls)处理</li>
</ul>
</li>
<li><strong>UI组件</strong>: Ant Design Vue</li>
</ul>
<h3 id="导入文档功能实现" tabindex="-1"><a class="header-anchor" href="#导入文档功能实现"><span>导入文档功能实现</span></a></h3>
<h4 id="_1-用户界面设计" tabindex="-1"><a class="header-anchor" href="#_1-用户界面设计"><span>1. 用户界面设计</span></a></h4>
<h5 id="导入按钮" tabindex="-1"><a class="header-anchor" href="#导入按钮"><span>导入按钮</span></a></h5>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>importDocument<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>导入文档<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h5 id="隐藏文件输入框" tabindex="-1"><a class="header-anchor" href="#隐藏文件输入框"><span>隐藏文件输入框</span></a></h5>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span></span>
<span class="line">  <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fileInput<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">accept</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>.doc,.docx,.pdf,.txt,.html,.xls,.xlsx<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> none</span><span class="token punctuation">"</span></span></span></span>
<span class="line">  <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleFileImport<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="状态显示" tabindex="-1"><a class="header-anchor" href="#状态显示"><span>状态显示</span></a></h5>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>importStatus<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>import-status<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">  {{ importStatus }}</span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-核心实现逻辑" tabindex="-1"><a class="header-anchor" href="#_2-核心实现逻辑"><span>2. 核心实现逻辑</span></a></h4>
<h4 id="文件选择触发" tabindex="-1"><a class="header-anchor" href="#文件选择触发"><span>文件选择触发</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token function-variable function">importDocument</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  fileInput<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="文件导入处理" tabindex="-1"><a class="header-anchor" href="#文件导入处理"><span>文件导入处理</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token function-variable function">handleFileImport</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> file <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  importStatus<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">"正在导入..."</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">readFile</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> editor <span class="token operator">=</span> state<span class="token punctuation">.</span>editor<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>editor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      editor<span class="token punctuation">.</span><span class="token function">dangerouslyInsertHtml</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    importStatus<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">"导入成功"</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"导入失败:"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    importStatus<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">导入失败: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>error<span class="token punctuation">.</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-文件处理核心模块-fileutils-js" tabindex="-1"><a class="header-anchor" href="#_3-文件处理核心模块-fileutils-js"><span>3. 文件处理核心模块 (fileUtils.js)</span></a></h4>
<h4 id="支持的文件格式" tabindex="-1"><a class="header-anchor" href="#支持的文件格式"><span>支持的文件格式</span></a></h4>
<ul>
<li><strong>Word文档</strong> (.docx)</li>
<li><strong>Excel表格</strong> (.xlsx, .xls)</li>
<li><strong>HTML文件</strong> (.html)</li>
<li><strong>纯文本文件</strong> (.txt)</li>
<li><strong>PDF文件</strong> (提示不支持，需先转为word)</li>
</ul>
<h4 id="word文档处理" tabindex="-1"><a class="header-anchor" href="#word文档处理"><span>Word文档处理</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>fileName<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">'.docx'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> arrayBuffer <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> mammoth<span class="token punctuation">.</span><span class="token function">convertToHtml</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">        arrayBuffer<span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">preserveStyles</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> html <span class="token operator">=</span> result<span class="token punctuation">.</span>value<span class="token punctuation">;</span></span>
<span class="line">      </span>
<span class="line">        <span class="token operator">...</span></span>
<span class="line">      `<span class="token punctuation">;</span></span>
<span class="line">      <span class="token function">resolve</span><span class="token punctuation">(</span>styledHtml<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Word文档解析失败'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="excel文档处理" tabindex="-1"><a class="header-anchor" href="#excel文档处理"><span>Excel文档处理</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>fileName<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">'.xlsx'</span><span class="token punctuation">)</span> <span class="token operator">||</span> fileName<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">'.xls'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> workbook <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'array'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> firstSheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span>Sheets<span class="token punctuation">[</span>workbook<span class="token punctuation">.</span>SheetNames<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">sheet_to_html</span><span class="token punctuation">(</span>firstSheet<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'excel-table'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      </span>
<span class="line">    <span class="token operator">...</span><span class="token punctuation">.</span></span>
<span class="line">      `<span class="token punctuation">;</span></span>
<span class="line">      <span class="token function">resolve</span><span class="token punctuation">(</span>styledHtml<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Excel文档解析失败'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="文本文件处理" tabindex="-1"><a class="header-anchor" href="#文本文件处理"><span>文本文件处理</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">let</span> content <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span></span>
<span class="line">      content <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\n</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&lt;br>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function">readAsText</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="多格式支持" tabindex="-1"><a class="header-anchor" href="#多格式支持"><span>多格式支持</span></a></h4>
<ul>
<li><strong>Word文档</strong>: 使用 mammoth 库保持原始格式和样式</li>
<li><strong>Excel表格</strong>: 使用 xlsx 库转换为HTML表格</li>
<li><strong>文本文件</strong>: 自动处理换行符转换</li>
<li><strong>HTML文件</strong>: 直接插入内容</li>
<li><strong>pdf文件</strong>: （暂定是后端先转为word，再导入。或者前端考虑使用pdf.js）</li>
</ul>
<h3 id="待扩展" tabindex="-1"><a class="header-anchor" href="#待扩展"><span>待扩展</span></a></h3>
<p>业务中如果有需要将图片解析为docs文档。</p>
<h4 id="备选解决方法" tabindex="-1"><a class="header-anchor" href="#备选解决方法"><span>备选解决方法：</span></a></h4>
<ol>
<li>前段实现方案，利用浏览器端JS库生成.docx文件（基于Office Open XML格式）。使用docx.js库。适合少量不复杂的图片。</li>
<li>后端实现方案，后端利用第三方库生成.docx文件。前端下载。适合大量图片。</li>
</ol>
</div></template>


