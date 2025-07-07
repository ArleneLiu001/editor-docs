<template><div><h1 id="可配置控件组件" tabindex="-1"><a class="header-anchor" href="#可配置控件组件"><span>可配置控件组件</span></a></h1>
<p><code v-pre>ConfigurableControls</code> 是一个高度可配置的自定义控件面板组件，支持通过 props 灵活控制显示的控件类型、面板样式和交互行为。</p>
<h3 id="功能特性" tabindex="-1"><a class="header-anchor" href="#功能特性"><span>功能特性</span></a></h3>
<ul>
<li><strong>可配置显示控件</strong>：支持选择性显示文本、日期、图片、表格控件</li>
<li><strong>灵活的显示控制</strong>：可控制是否显示整个面板和帮助信息</li>
<li><strong>自定义标题和帮助文本</strong>：支持自定义面板标题和帮助说明</li>
<li><strong>拖拽功能</strong>：内置拖拽支持，可拖拽控件到目标区域</li>
<li><strong>事件回调</strong>：提供拖拽开始和控件选择事件</li>
<li><strong>响应式设计</strong>：适配移动端和桌面端</li>
</ul>
<h4 id="props-参数" tabindex="-1"><a class="header-anchor" href="#props-参数"><span>Props 参数</span></a></h4>
<table>
<thead>
<tr>
<th>参数名</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>showControls</code></td>
<td>Boolean</td>
<td><code v-pre>true</code></td>
<td>是否显示控件面板</td>
</tr>
<tr>
<td><code v-pre>enabledControls</code></td>
<td>Array</td>
<td><code v-pre>['text', 'date', 'image', 'table']</code></td>
<td>启用的控件类型数组</td>
</tr>
<tr>
<td><code v-pre>title</code></td>
<td>String</td>
<td><code v-pre>'自定义控件'</code></td>
<td>面板标题</td>
</tr>
<tr>
<td><code v-pre>showHelp</code></td>
<td>Boolean</td>
<td><code v-pre>true</code></td>
<td>是否显示帮助信息</td>
</tr>
<tr>
<td><code v-pre>helpText</code></td>
<td>String</td>
<td><code v-pre>'拖拽控件到编辑器中使用'</code></td>
<td>帮助文本</td>
</tr>
<tr>
<td><code v-pre>customClass</code></td>
<td>String</td>
<td><code v-pre>''</code></td>
<td>自定义样式类名</td>
</tr>
</tbody>
</table>
<h4 id="enabledcontrols-可选值" tabindex="-1"><a class="header-anchor" href="#enabledcontrols-可选值"><span>enabledControls 可选值</span></a></h4>
<ul>
<li><code v-pre>'text'</code> - 文本控件</li>
<li><code v-pre>'date'</code> - 日期控件</li>
<li><code v-pre>'image'</code> - 图片上传控件</li>
<li><code v-pre>'table'</code> - 表格控件</li>
</ul>
<h4 id="events-事件" tabindex="-1"><a class="header-anchor" href="#events-事件"><span>Events 事件</span></a></h4>
<table>
<thead>
<tr>
<th>事件名</th>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>dragstart</code></td>
<td><code v-pre>{ type, event }</code></td>
<td>控件拖拽开始时触发</td>
</tr>
<tr>
<td><code v-pre>control-selected</code></td>
<td><code v-pre>type</code></td>
<td>控件被选择时触发</td>
</tr>
</tbody>
</table>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法"><span>基础用法</span></a></h3>
<h4 id="_1-完整功能-默认配置" tabindex="-1"><a class="header-anchor" href="#_1-完整功能-默认配置"><span>1. 完整功能（默认配置）</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">    <span class="token attr-name">@dragstart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleDragStart<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">@control-selected</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleControlSelected<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> ConfigurableControls <span class="token keyword">from</span> <span class="token string">'@/components/ConfigurableControls.vue'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">handleDragStart</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> type<span class="token punctuation">,</span> event <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'拖拽开始:'</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">handleControlSelected</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'控件选择:'</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-仅显示特定控件" tabindex="-1"><a class="header-anchor" href="#_2-仅显示特定控件"><span>2. 仅显示特定控件</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token comment">&lt;!-- 仅显示文本和日期控件 --></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">    <span class="token attr-name">:enabled-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['text', 'date']<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>基础控件<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">help-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>仅提供文本和日期功能<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-隐藏帮助信息" tabindex="-1"><a class="header-anchor" href="#_3-隐藏帮助信息"><span>3. 隐藏帮助信息</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">    <span class="token attr-name">:show-help</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>简洁模式<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-动态配置" tabindex="-1"><a class="header-anchor" href="#_4-动态配置"><span>4. 动态配置</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token comment">&lt;!-- 配置控制 --></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config-panel<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.showControls<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">        显示控件面板</span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.showHelp<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">        显示帮助信息</span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span>启用的控件：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.enabledControls<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> 文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.enabledControls<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> 日期<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.enabledControls<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> 图片<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>table<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.enabledControls<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> 表格<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">&lt;!-- 控件面板 --></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">      <span class="token attr-name">:show-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.showControls<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:enabled-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.enabledControls<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.title<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:show-help</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.showHelp<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:help-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.helpText<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span></span>
<span class="line"><span class="token keyword">import</span> ConfigurableControls <span class="token keyword">from</span> <span class="token string">'@/components/ConfigurableControls.vue'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">showControls</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">enabledControls</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'text'</span><span class="token punctuation">,</span> <span class="token string">'date'</span><span class="token punctuation">,</span> <span class="token string">'image'</span><span class="token punctuation">,</span> <span class="token string">'table'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'自定义控件'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">showHelp</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">helpText</span><span class="token operator">:</span> <span class="token string">'拖拽控件到编辑器中使用'</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3>
<h4 id="_1-文档编辑器" tabindex="-1"><a class="header-anchor" href="#_1-文档编辑器"><span>1. 文档编辑器</span></a></h4>
<p>在文档编辑器中提供可拖拽的控件工具栏：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">  <span class="token attr-name">:enabled-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['text', 'date', 'image', 'table']<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>文档控件<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">@dragstart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleControlDrop<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-表单设计器" tabindex="-1"><a class="header-anchor" href="#_2-表单设计器"><span>2. 表单设计器</span></a></h4>
<p>在表单设计器中仅提供表单相关控件：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConfigurableControls</span> </span>
<span class="line">  <span class="token attr-name">:enabled-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['text', 'date']<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>表单控件<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">help-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>拖拽到表单设计区域<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line"></span>
<span class="line">#### 样式定制</span>
<span class="line"></span>
<span class="line">组件提供了基础样式，可以通过 `customClass` prop 或全局 CSS 进行定制：</span>
<span class="line"></span>
<span class="line">```vue</span>
<span class="line">&lt;ConfigurableControls </span>
<span class="line">  custom-class="my-custom-controls"</span>
<span class="line">/></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css"><pre v-pre><code><span class="line"><span class="token selector">.my-custom-controls</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* 自定义样式 */</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.my-custom-controls .control-item</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* 自定义控件项样式 */</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h4>
<ol>
<li><strong>控件类型验证</strong>：<code v-pre>enabledControls</code> 数组中的值必须是有效的控件类型</li>
<li><strong>事件处理</strong>：确保正确处理 <code v-pre>dragstart</code> 和 <code v-pre>control-selected</code> 事件</li>
<li><strong>响应式</strong>：组件已适配移动端，在小屏幕设备上会自动调整布局</li>
<li><strong>性能</strong>：大量控件时建议使用 <code v-pre>v-show</code> 而不是 <code v-pre>v-if</code> 来控制显示</li>
</ol>
<h4 id="演示页面" tabindex="-1"><a class="header-anchor" href="#演示页面"><span>演示页面</span></a></h4>
<p>访问 <code v-pre>/controls-demo</code> 路由可以查看完整的演示和配置示例。</p>
</div></template>


