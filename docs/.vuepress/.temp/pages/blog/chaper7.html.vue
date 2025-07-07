<template><div><h1 id="字数统计功能" tabindex="-1"><a class="header-anchor" href="#字数统计功能"><span>字数统计功能</span></a></h1>
<h3 id="核心实现思路" tabindex="-1"><a class="header-anchor" href="#核心实现思路"><span>核心实现思路</span></a></h3>
<h4 id="_1-数据结构设计" tabindex="-1"><a class="header-anchor" href="#_1-数据结构设计"><span>1. 数据结构设计</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">editor</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">htmlContent</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">pageTitle</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">wordCount</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 字数统计变量</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在响应式状态对象中定义了 <code v-pre>wordCount</code> 字段来存储当前的字数统计结果。</p>
<h4 id="_2-字数统计核心函数" tabindex="-1"><a class="header-anchor" href="#_2-字数统计核心函数"><span>2. 字数统计核心函数</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 计算字数的函数</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">updateWordCount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">editor</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>editor<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 获取纯文本内容</span></span>
<span class="line">  <span class="token keyword">const</span> text <span class="token operator">=</span> editor<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 移除空白字符后计算字数</span></span>
<span class="line">  <span class="token keyword">const</span> count <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\s+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span></span>
<span class="line">  state<span class="token punctuation">.</span>wordCount <span class="token operator">=</span> count<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 更新编辑器区域的data-word-count属性</span></span>
<span class="line">  <span class="token keyword">const</span> editorArea <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"editor-text-area"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>editorArea<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    editorArea<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-word-count"</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>核心逻辑：</strong></p>
<ul>
<li>使用 <code v-pre>editor.getText()</code> 获取编辑器的纯文本内容</li>
<li>通过正则表达式 <code v-pre>/\s+/g</code> 移除所有空白字符（空格、换行、制表符等）</li>
<li>计算处理后文本的长度作为字数</li>
<li>将结果存储到响应式状态中</li>
<li>同时更新DOM元素的 <code v-pre>data-word-count</code> 属性</li>
</ul>
<h4 id="_3-事件监听机制" tabindex="-1"><a class="header-anchor" href="#_3-事件监听机制"><span>3. 事件监听机制</span></a></h4>
<h5 id="_3-1-编辑器配置中的监听" tabindex="-1"><a class="header-anchor" href="#_3-1-编辑器配置中的监听"><span>3.1 编辑器配置中的监听</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> editorConfig <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">"请输入内容..."</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 添加内容变化监听，更新字数统计</span></span>
<span class="line">  <span class="token function-variable function">onChange</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">editor</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    state<span class="token punctuation">.</span>htmlContent <span class="token operator">=</span> editor<span class="token punctuation">.</span><span class="token function">getHtml</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 更新字数统计</span></span>
<span class="line">    <span class="token function">updateWordCount</span><span class="token punctuation">(</span>editor<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编辑器初始化配置中，通过 <code v-pre>onChange</code> 回调函数监听内容变化，每次内容改变时自动更新字数统计。</p>
<h5 id="_3-2-额外的事件监听" tabindex="-1"><a class="header-anchor" href="#_3-2-额外的事件监听"><span>3.2 额外的事件监听</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 初始化字数统计</span></span>
<span class="line"><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>state<span class="token punctuation">.</span>editor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">updateWordCount</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>editor<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 添加额外的事件监听，确保在内容变化时更新字数</span></span>
<span class="line">    state<span class="token punctuation">.</span>editor<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"change"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">updateWordCount</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>editor<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件挂载后，通过 <code v-pre>setTimeout</code> 延迟执行，确保编辑器完全初始化后：</p>
<ul>
<li>执行初始字数统计</li>
<li>添加额外的 <code v-pre>change</code> 事件监听器，提供双重保障</li>
</ul>
<h5 id="_3-3-注意事项" tabindex="-1"><a class="header-anchor" href="#_3-3-注意事项"><span>3.3 注意事项</span></a></h5>
<p>自定义控件中的文字未被计入字数统计
原因：</p>
<ul>
<li>获取文本的方式 ：在当前实现中，字数统计功能是通过 editor.getText() 方法获取编辑器内容的。这个方法只会获取编辑器核心区域的纯文本内容，而不会获取自定义控件中的文本。</li>
<li>DOM 结构隔离 ：自定义控件（如文本控件、日期控件等）是作为独立的 DOM 元素插入到编辑器中的，它们被标记为 contenteditable=&quot;false&quot; ，这意味着它们在编辑器的内容模型中被视为不可编辑的整体元素，而不是普通文本。</li>
</ul>
</div></template>


