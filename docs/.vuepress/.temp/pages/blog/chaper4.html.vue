<template><div><h1 id="页面缩放功能" tabindex="-1"><a class="header-anchor" href="#页面缩放功能"><span>页面缩放功能</span></a></h1>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3>
<p>该页面实现了一个完整的缩放功能系统，允许用户对编辑器内容进行放大和缩小操作。缩放功能通过组合式API、组件化设计和状态管理相结合的方式实现。</p>
<h4 id="核心技术栈" tabindex="-1"><a class="header-anchor" href="#核心技术栈"><span>核心技术栈</span></a></h4>
<ul>
<li><strong>Vue 3 Composition API</strong>: 使用组合式函数管理缩放状态</li>
<li><strong>Pinia</strong>: 状态管理，持久化缩放配置</li>
<li><strong>CSS Transform</strong>: 实现视觉缩放效果</li>
<li><strong>组件化设计</strong>: 独立的缩放控件组件</li>
</ul>
<h3 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路"><span>实现思路</span></a></h3>
<h4 id="_1-组合式函数-usezoom-js" tabindex="-1"><a class="header-anchor" href="#_1-组合式函数-usezoom-js"><span>1. 组合式函数 (useZoom.js)</span></a></h4>
<p>缩放功能的核心逻辑封装在 <code v-pre>useZoom</code> 组合式函数中：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useZoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> scale <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 缩放比例，默认为1（100%）</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">zoomIn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    scale<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">0.1</span><span class="token punctuation">;</span> <span class="token comment">// 每次放大10%</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">zoomOut</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    scale<span class="token punctuation">.</span>value <span class="token operator">-=</span> <span class="token number">0.1</span><span class="token punctuation">;</span> <span class="token comment">// 每次缩小10%</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">    scale<span class="token punctuation">,</span></span>
<span class="line">    zoomIn<span class="token punctuation">,</span></span>
<span class="line">    zoomOut<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>设计特点：</strong></p>
<ul>
<li>使用响应式引用 <code v-pre>ref(1)</code> 管理缩放比例</li>
<li>提供简单的放大/缩小方法</li>
<li>每次操作步长为0.1（10%）</li>
<li>返回响应式状态和操作方法</li>
</ul>
<h4 id="引入和初始化" tabindex="-1"><a class="header-anchor" href="#引入和初始化"><span>引入和初始化</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> useZoom <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/composables/useZoom.js"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> ZoomControls <span class="token keyword">from</span> <span class="token string">"@/components/ZoomControls.vue"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 使用缩放功能</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">scale</span><span class="token operator">:</span> zoom<span class="token punctuation">,</span> zoomIn<span class="token punctuation">,</span> zoomOut <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useZoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">"zoom"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> zoom<span class="token punctuation">,</span> zoomIn<span class="token punctuation">,</span> zoomOut <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="模板中的应用" tabindex="-1"><a class="header-anchor" href="#模板中的应用"><span>模板中的应用</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token comment">&lt;!-- 缩放控件 --></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-auto<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ZoomControls</span> <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">&lt;!-- 编辑器容器应用缩放 --></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span></span>
<span class="line">    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>editor-container<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{ transform: `scale(${zoom})`, transformOrigin: 'center top' }<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">></span></span></span>
<span class="line">    <span class="token comment">&lt;!-- 编辑器内容 --></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键实现点：</strong></p>
<ul>
<li>使用 <code v-pre>provide/inject</code> 模式向子组件传递缩放状态</li>
<li>通过 CSS <code v-pre>transform: scale()</code> 实现视觉缩放</li>
<li>设置 <code v-pre>transformOrigin: 'center top'</code> 确保从顶部中心缩放</li>
</ul>
<h4 id="_3-缩放控件组件-zoomcontrols-vue" tabindex="-1"><a class="header-anchor" href="#_3-缩放控件组件-zoomcontrols-vue"><span>3. 缩放控件组件 (ZoomControls.vue)</span></a></h4>
<h4 id="功能特性" tabindex="-1"><a class="header-anchor" href="#功能特性"><span>功能特性</span></a></h4>
<ul>
<li><strong>按钮控制</strong>: 提供放大/缩小按钮</li>
<li><strong>滑块控制</strong>: 拖拽滑块调整缩放比例</li>
<li><strong>数值输入</strong>: 点击百分比显示可直接输入数值</li>
<li><strong>重置功能</strong>: 一键恢复100%缩放</li>
<li><strong>范围限制</strong>: 缩放范围限制在50%-200%之间</li>
</ul>
<h4 id="核心实现" tabindex="-1"><a class="header-anchor" href="#核心实现"><span>核心实现</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> zoom<span class="token punctuation">,</span> zoomIn<span class="token punctuation">,</span> zoomOut <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">'zoom'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> minZoom <span class="token operator">=</span> <span class="token number">0.5</span><span class="token punctuation">;</span>  <span class="token comment">// 最小50%</span></span>
<span class="line"><span class="token keyword">const</span> maxZoom <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>    <span class="token comment">// 最大200%</span></span>
<span class="line"><span class="token keyword">const</span> showZoomInput <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> zoomInput <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 显示百分比</span></span>
<span class="line"><span class="token keyword">const</span> displayZoom <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>zoom<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 重置缩放</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">resetZoom</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  zoom<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 切换到输入模式</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">toggleZoomInput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  showZoomInput<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">  zoomInput<span class="token punctuation">.</span>value <span class="token operator">=</span> displayZoom<span class="token punctuation">.</span>value<span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    zoomInputRef<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    zoomInputRef<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 应用输入的缩放值</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">applyZoomInput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>zoomInput<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    zoom<span class="token punctuation">.</span>value <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>minZoom<span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>maxZoom<span class="token punctuation">,</span> value <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  showZoomInput<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-状态管理集成-editor-js" tabindex="-1"><a class="header-anchor" href="#_4-状态管理集成-editor-js"><span>4. 状态管理集成 (editor.js)</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> useEditorStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">'editor'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">zoom</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>  <span class="token comment">// 存储百分比值</span></span>
<span class="line">      <span class="token literal-property property">wordCount</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  </span>
<span class="line">  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 设置缩放比例（带范围限制）</span></span>
<span class="line">    <span class="token function">setZoom</span><span class="token punctuation">(</span><span class="token parameter">zoom</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>config<span class="token punctuation">.</span>zoom <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> zoom<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// 放大</span></span>
<span class="line">    <span class="token function">zoomIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setZoom</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>config<span class="token punctuation">.</span>zoom <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// 缩小</span></span>
<span class="line">    <span class="token function">zoomOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setZoom</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>config<span class="token punctuation">.</span>zoom <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// 重置</span></span>
<span class="line">    <span class="token function">resetZoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setZoom</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="数据流向" tabindex="-1"><a class="header-anchor" href="#数据流向"><span>数据流向</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">用户操作 → ZoomControls组件 → useZoom状态 → CSS transform → 视觉缩放</span>
<span class="line">                ↓</span>
<span class="line">            EditorStore → 持久化存储</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


