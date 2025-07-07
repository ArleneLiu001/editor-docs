<template><div><h1 id="工具栏自定义日期组件实现" tabindex="-1"><a class="header-anchor" href="#工具栏自定义日期组件实现"><span>工具栏自定义日期组件实现</span></a></h1>
<h3 id="核心插件" tabindex="-1"><a class="header-anchor" href="#核心插件"><span>核心插件</span></a></h3>
<p><strong>日期选择器插件</strong></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line"></span>
<span class="line">\src\utils\datePickerPlugin.js</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈"><span>技术栈</span></a></h4>
<ul>
<li><strong>编辑器框架</strong>: wangEditor v5</li>
<li><strong>UI 框架</strong>: Vue 3 + Ant Design Vue</li>
<li><strong>日期处理</strong>: dayjs</li>
<li><strong>插件机制</strong>: wangEditor Boot 注册系统</li>
</ul>
<h3 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路"><span>实现思路</span></a></h3>
<h4 id="_1-插件注册机制" tabindex="-1"><a class="header-anchor" href="#_1-插件注册机制"><span>1. 插件注册机制</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 注册日期选择器插件</span></span>
<span class="line"><span class="token function">registerDatePickerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"datePickerMenu"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">menuOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 可在此配置需要的参数</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-工具栏集成" tabindex="-1"><a class="header-anchor" href="#_2-工具栏集成"><span>2. 工具栏集成</span></a></h4>
<p>在工具栏配置中添加日期选择器菜单：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> toolbarConfig <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">toolbarKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// ... 其他工具</span></span>
<span class="line">    <span class="token string">"datePickerMenu"</span><span class="token punctuation">,</span> <span class="token comment">// 添加日期选择器菜单</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="工具栏弹出式选择器" tabindex="-1"><a class="header-anchor" href="#工具栏弹出式选择器"><span>工具栏弹出式选择器</span></a></h5>
<ul>
<li>点击工具栏日期图标触发</li>
<li>在按钮下方弹出内联日期选择器</li>
<li>使用原生 <code v-pre>&lt;input type=&quot;date&quot;&gt;</code> 控件</li>
<li>支持确认/取消操作</li>
</ul>
<h4 id="_3-日期格式化与插入" tabindex="-1"><a class="header-anchor" href="#_3-日期格式化与插入"><span>3. 日期格式化与插入</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 格式化日期</span></span>
<span class="line"><span class="token keyword">const</span> formattedDate <span class="token operator">=</span> <span class="token function">dayjs</span><span class="token punctuation">(</span>selectedDate<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>dateFormat<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> textToInsert <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>formattedDate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 插入到编辑器</span></span>
<span class="line">editor<span class="token punctuation">.</span><span class="token function">insertText</span><span class="token punctuation">(</span>textToInsert<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>默认格式</strong>: <code v-pre>📅 YYYY年MM月DD日</code></p>
<h4 id="核心特性" tabindex="-1"><a class="header-anchor" href="#核心特性"><span>核心特性</span></a></h4>
<h4 id="_1-高度可配置" tabindex="-1"><a class="header-anchor" href="#_1-高度可配置"><span>1. 高度可配置</span></a></h4>
<ul>
<li><strong>日期格式</strong>: 支持自定义格式字符串</li>
<li><strong>显示样式</strong>: 可配置前缀、图标、颜色等</li>
<li><strong>交互行为</strong>: 支持自定义插入回调函数</li>
<li><strong>UI 样式</strong>: 完全可定制的样式配置</li>
</ul>
<h4 id="_2-智能定位" tabindex="-1"><a class="header-anchor" href="#_2-智能定位"><span>2. 智能定位</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 检查是否超出视窗边界</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> pickerRect<span class="token punctuation">.</span>width <span class="token operator">></span> window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  left <span class="token operator">=</span> rect<span class="token punctuation">.</span>left <span class="token operator">-</span> pickerRect<span class="token punctuation">.</span>width <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">+</span> pickerRect<span class="token punctuation">.</span>height <span class="token operator">></span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  top <span class="token operator">=</span> rect<span class="token punctuation">.</span>top <span class="token operator">-</span> pickerRect<span class="token punctuation">.</span>height <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-用户体验优化" tabindex="-1"><a class="header-anchor" href="#_3-用户体验优化"><span>3. 用户体验优化</span></a></h4>
<ul>
<li><strong>点击外部关闭</strong>: 自动检测外部点击</li>
<li><strong>焦点管理</strong>: 自动聚焦到日期输入框</li>
<li><strong>选区保持</strong>: 保存和恢复编辑器选区</li>
</ul>
<h4 id="_4-状态管理" tabindex="-1"><a class="header-anchor" href="#_4-状态管理"><span>4. 状态管理</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 响应式状态</span></span>
<span class="line"><span class="token keyword">const</span> showDatePickerModal <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> selectedDate <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> currentDateControl <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-插件化架构" tabindex="-1"><a class="header-anchor" href="#_5-插件化架构"><span>5. 插件化架构</span></a></h4>
<ul>
<li>基于 wangEditor 的插件机制</li>
<li>支持动态注册和注销</li>
<li>避免重复注册的保护机制</li>
</ul>
<h4 id="_6-多重查找策略" tabindex="-1"><a class="header-anchor" href="#_6-多重查找策略"><span>6. 多重查找策略</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 增强菜单按钮查找逻辑</span></span>
<span class="line"><span class="token keyword">let</span> menuButton <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[data-menu-key="datePickerMenu"]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>menuButton<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 尝试通过 title 属性查找</span></span>
<span class="line">  menuButton <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.w-e-toolbar button'</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">btn</span> <span class="token operator">=></span> btn<span class="token punctuation">.</span>title <span class="token operator">&amp;&amp;</span> btn<span class="token punctuation">.</span>title<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">'日期'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用"><span>基础使用</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> registerDatePickerPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/utils/datePickerPlugin'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 注册插件</span></span>
<span class="line"><span class="token function">registerDatePickerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 在工具栏配置中添加</span></span>
<span class="line"><span class="token keyword">const</span> toolbarConfig <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">toolbarKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'datePickerMenu'</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置参数" tabindex="-1"><a class="header-anchor" href="#配置参数"><span>配置参数</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">registerDatePickerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'customDatePicker'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">menuOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'自定义日期'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">dateFormat</span><span class="token operator">:</span> <span class="token string">'MM/DD/YYYY'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">'🗓️ '</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">onInsert</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">text<span class="token punctuation">,</span> date<span class="token punctuation">,</span> editor</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 自定义插入逻辑</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'插入日期:'</span><span class="token punctuation">,</span> text<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      editor<span class="token punctuation">.</span><span class="token function">insertText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


