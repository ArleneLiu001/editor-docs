<template><div><h1 id="自定义控件实现思路" tabindex="-1"><a class="header-anchor" href="#自定义控件实现思路"><span>自定义控件实现思路</span></a></h1>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3>
<p>该文件实现了一套完整的拖拽式自定义控件系统，支持在富文本编辑器中通过拖拽方式插入和管理各种类型的控件，包括文本控件、日期控件、表格控件等。
插件名称</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">dragDropHandler<span class="token punctuation">.</span>js</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-模块化设计" tabindex="-1"><a class="header-anchor" href="#_1-模块化设计"><span>1. 模块化设计</span></a></h4>
<p>文件采用ES6模块化设计，导出多个独立的功能函数：</p>
<ul>
<li><strong>工具函数</strong>：<code v-pre>generateUniqueId</code></li>
<li><strong>拖拽处理</strong>：<code v-pre>handleDragOver</code>、<code v-pre>handleDrop</code>、<code v-pre>getInsertionPoint</code></li>
<li><strong>元素操作</strong>：<code v-pre>insertElementAtPosition</code></li>
<li><strong>控件创建</strong>：<code v-pre>createTextControl</code>、<code v-pre>createDateControl</code>、<code v-pre>createTableControl</code></li>
<li><strong>交互功能</strong>：<code v-pre>showInlineDatePicker</code>、<code v-pre>editTextControl</code></li>
<li><strong>统一接口</strong>：<code v-pre>createDragDropHandler</code></li>
</ul>
<h3 id="核心功能实现" tabindex="-1"><a class="header-anchor" href="#核心功能实现"><span>核心功能实现</span></a></h3>
<h4 id="_1-唯一id生成" tabindex="-1"><a class="header-anchor" href="#_1-唯一id生成"><span>1. 唯一ID生成</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">generateUniqueId</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token string">"id_"</span> <span class="token operator">+</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"_"</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实现思路</strong>：</p>
<ul>
<li>结合时间戳和随机字符串确保唯一性</li>
<li>用于为每个控件生成独特的标识符</li>
<li>支持控件的追踪和管理</li>
</ul>
<h4 id="_2-精确插入位置定位" tabindex="-1"><a class="header-anchor" href="#_2-精确插入位置定位"><span>2. 精确插入位置定位</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getInsertionPoint</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> editorContainer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> insertionPoint<span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>caretPositionFromPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 使用现代浏览器API</span></span>
<span class="line">    <span class="token keyword">const</span> caretPosition <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">caretPositionFromPoint</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>clientX<span class="token punctuation">,</span> event<span class="token punctuation">.</span>clientY<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>caretRangeFromPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 兼容性处理</span></span>
<span class="line">    <span class="token keyword">const</span> range <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">caretRangeFromPoint</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>clientX<span class="token punctuation">,</span> event<span class="token punctuation">.</span>clientY<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 默认插入到编辑器末尾</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>insertionPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    insertionPoint <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">node</span><span class="token operator">:</span> editorContainer<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">offset</span><span class="token operator">:</span> editorContainer<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">return</span> insertionPoint<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实现思路</strong>：</p>
<ul>
<li>使用浏览器原生API获取鼠标位置对应的DOM节点位置</li>
<li>提供兼容性处理，支持不同浏览器</li>
<li>包含降级策略，确保在任何情况下都能正常插入</li>
</ul>
<h4 id="_3-智能元素插入" tabindex="-1"><a class="header-anchor" href="#_3-智能元素插入"><span>3. 智能元素插入</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">insertElementAtPosition</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> insertionPoint<span class="token punctuation">,</span> onChangeCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">{</span> node<span class="token punctuation">,</span> offset <span class="token punctuation">}</span> <span class="token operator">=</span> insertionPoint<span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> Node<span class="token punctuation">.</span><span class="token constant">TEXT_NODE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 处理文本节点插入</span></span>
<span class="line">    <span class="token keyword">const</span> parent <span class="token operator">=</span> node<span class="token punctuation">.</span>parentNode<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>offset <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      parent<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>offset <span class="token operator">>=</span> node<span class="token punctuation">.</span>textContent<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      parent<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> node<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 分割文本节点</span></span>
<span class="line">      <span class="token keyword">const</span> beforeText <span class="token operator">=</span> node<span class="token punctuation">.</span>textContent<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">const</span> afterText <span class="token operator">=</span> node<span class="token punctuation">.</span>textContent<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>offset<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token comment">// 重新组织DOM结构</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 处理元素节点插入</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>offset <span class="token operator">>=</span> node<span class="token punctuation">.</span>childNodes<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      node<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      node<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> node<span class="token punctuation">.</span>childNodes<span class="token punctuation">[</span>offset<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 触发变化回调</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>onChangeCallback <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> onChangeCallback <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">onChangeCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实现思路</strong>：</p>
<ul>
<li>区分文本节点和元素节点的不同插入策略</li>
<li>对文本节点进行智能分割，保持文本完整性</li>
<li>提供回调机制，支持插入后的状态同步</li>
</ul>
<h4 id="控件类型实现" tabindex="-1"><a class="header-anchor" href="#控件类型实现"><span>控件类型实现</span></a></h4>
<h4 id="_1-文本控件" tabindex="-1"><a class="header-anchor" href="#_1-文本控件"><span>1. 文本控件</span></a></h4>
<p><strong>核心特性</strong>：</p>
<ul>
<li>内联显示（<code v-pre>data-w-e-is-inline: true</code>）</li>
<li>不可编辑容器（<code v-pre>contenteditable: false</code>）</li>
<li>点击编辑功能</li>
</ul>
<p><strong>实现要点</strong>：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createTextControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">onChangeCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> textControl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"span"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// WangEditor兼容属性</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-type"</span><span class="token punctuation">,</span> <span class="token string">"text-control"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-is-void"</span><span class="token punctuation">,</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-is-inline"</span><span class="token punctuation">,</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"contenteditable"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 锚点属性</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-anchor-id"</span><span class="token punctuation">,</span> uniqueTextId<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-anchor-title"</span><span class="token punctuation">,</span> textAnchorTitle<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-anchor-type"</span><span class="token punctuation">,</span> <span class="token string">"text-control"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 交互功能</span></span>
<span class="line">  textControl<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">editTextControl</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">,</span> onChangeCallback<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编辑机制</strong>：</p>
<ul>
<li>创建临时输入框覆盖原控件</li>
<li>使用固定定位确保位置准确</li>
<li>失焦自动保存</li>
</ul>
<h4 id="_2-日期控件" tabindex="-1"><a class="header-anchor" href="#_2-日期控件"><span>2. 日期控件</span></a></h4>
<p><strong>核心特性</strong>：</p>
<ul>
<li>内联日期选择器</li>
<li>格式化显示（使用dayjs）</li>
<li>位置智能调整</li>
<li>点击外部关闭</li>
</ul>
<p><strong>实现要点</strong>：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createDateControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">onChangeCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> dateControl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"span"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 设置为日期控件类型</span></span>
<span class="line">  dateControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-type"</span><span class="token punctuation">,</span> <span class="token string">"date-control"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  dateControl<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token string">"📅 选择日期"</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 点击显示日期选择器</span></span>
<span class="line">  dateControl<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">showInlineDatePicker</span><span class="token punctuation">(</span>dateControl<span class="token punctuation">,</span> onChangeCallback<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>日期选择器特性</strong>：</p>
<ul>
<li>绝对定位，智能避免超出视窗</li>
<li>原生HTML5日期输入</li>
<li>确认/取消按钮</li>
<li>点击外部自动关闭</li>
<li>日期格式化显示</li>
</ul>
<h4 id="_3-表格控件" tabindex="-1"><a class="header-anchor" href="#_3-表格控件"><span>3. 表格控件</span></a></h4>
<p><strong>核心特性</strong>：</p>
<ul>
<li>块级显示（<code v-pre>data-w-e-is-inline: false</code>）</li>
<li>动态行列操作</li>
<li>单元格内容编辑</li>
<li>完整的表格结构</li>
</ul>
<p><strong>实现要点</strong>：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createTableControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">onChangeCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> tableControl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 设置为表格控件</span></span>
<span class="line">  tableControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-type"</span><span class="token punctuation">,</span> <span class="token string">"table-control"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  tableControl<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-w-e-is-inline"</span><span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 创建完整表格结构</span></span>
<span class="line">  <span class="token keyword">const</span> table <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"table"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> thead <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"thead"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> tbody <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"tbody"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 添加操作按钮</span></span>
<span class="line">  <span class="token keyword">const</span> addRowBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> addColBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>动态操作</strong>：</p>
<ul>
<li>添加行：在tbody末尾插入新行</li>
<li>添加列：在所有行末尾添加新单元格</li>
<li>单元格编辑：设置<code v-pre>contentEditable=true</code></li>
</ul>
<h4 id="控件模式" tabindex="-1"><a class="header-anchor" href="#控件模式"><span>控件模式</span></a></h4>
<p>每种控件都有对应的创建函数，统一接口：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 统一的控件创建接口</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">createControl</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> onChangeCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">switch</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'text'</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token function">createTextControl</span><span class="token punctuation">(</span>onChangeCallback<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'date'</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token function">createDateControl</span><span class="token punctuation">(</span>onChangeCallback<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'table'</span><span class="token operator">:</span> <span class="token keyword">return</span> <span class="token function">createTableControl</span><span class="token punctuation">(</span>onChangeCallback<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有控件操作都支持变化回调：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token function-variable function">onChangeCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>editor <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> editor<span class="token punctuation">.</span>emit <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    editor<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>createDragDropHandler</code>提供统一的处理器接口：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createDragDropHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">editor<span class="token punctuation">,</span> uploadImageCallback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">    handleDragOver<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">handleDrop</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">handleDrop</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> editor<span class="token punctuation">,</span> uploadImageCallback<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    generateUniqueId<span class="token punctuation">,</span></span>
<span class="line">    insertElementAtPosition<span class="token punctuation">,</span></span>
<span class="line">    showInlineDatePicker<span class="token punctuation">,</span></span>
<span class="line">    createTextControl<span class="token punctuation">,</span></span>
<span class="line">    createDateControl<span class="token punctuation">,</span></span>
<span class="line">    createTableControl</span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个控件都包含完整的锚点信息：</p>
<ul>
<li><code v-pre>data-anchor-id</code>：唯一标识符</li>
<li><code v-pre>data-anchor-title</code>：显示标题</li>
<li><code v-pre>data-anchor-type</code>：锚点类型</li>
</ul>
<h4 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h4>
<p>使用事件委托减少事件监听器数量：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 点击外部关闭机制</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">closeOnClickOutside</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pickerContainer<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    pickerContainer<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> closeOnClickOutside<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="内存管理" tabindex="-1"><a class="header-anchor" href="#内存管理"><span>内存管理</span></a></h4>
<p>及时清理临时元素和事件监听器：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token function-variable function">finishEdit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 清理临时输入框</span></span>
<span class="line">  input<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 恢复原控件显示</span></span>
<span class="line">  textControl<span class="token punctuation">.</span>style<span class="token punctuation">.</span>visibility <span class="token operator">=</span> <span class="token string">"visible"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h4>
<p>这套实现为富文本编辑器提供了灵活的自定义控件，能够满足文档自定义文本，日期，图片，表格编辑需求。</p>
</div></template>


