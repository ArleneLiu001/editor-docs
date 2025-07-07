<template><div><h1 id="工具栏图片上传并裁剪功能实现分析" tabindex="-1"><a class="header-anchor" href="#工具栏图片上传并裁剪功能实现分析"><span>工具栏图片上传并裁剪功能实现分析</span></a></h1>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3>
<p>页面中的工具栏图片上传并裁剪功能是基于 <strong>wangEditor</strong> 编辑器的自定义插件实现，集成了 <strong>vue-cropper</strong> 图片裁剪库，提供了完整的图片上传、裁剪和插入编辑器的功能。</p>
<h3 id="核心组件" tabindex="-1"><a class="header-anchor" href="#核心组件"><span>核心组件</span></a></h3>
<ol>
<li><strong>imageCropperPlugin.js</strong> - 自定义工具栏插件</li>
</ol>
<h4 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路"><span>实现思路</span></a></h4>
<h4 id="_1-插件注册机制" tabindex="-1"><a class="header-anchor" href="#_1-插件注册机制"><span>1. 插件注册机制</span></a></h4>
<h5 id="插件类定义" tabindex="-1"><a class="header-anchor" href="#插件类定义"><span>插件类定义</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ImageCropperMenu</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 默认配置</span></span>
<span class="line">    <span class="token keyword">const</span> defaultOptions <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'上传并裁剪图片'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">iconSvg</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;svg>...&lt;/svg></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token comment">// 工具栏图标</span></span>
<span class="line">      <span class="token literal-property property">acceptTypes</span><span class="token operator">:</span> <span class="token string">'image/*'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">maxFileSize</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token comment">// 10MB</span></span>
<span class="line">      <span class="token literal-property property">cropperOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">autoCrop</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">autoCropWidth</span><span class="token operator">:</span> <span class="token number">800</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">autoCropHeight</span><span class="token operator">:</span> <span class="token number">600</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">fixedBox</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">centerBox</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="插件注册" tabindex="-1"><a class="header-anchor" href="#插件注册"><span>插件注册</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 在 befenTencent.vue 中注册插件</span></span>
<span class="line"><span class="token function">registerImageCropperPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"imageCropperMenu"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">menuOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"图片上传并裁剪"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">cropperOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">autoCrop</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">autoCropWidth</span><span class="token operator">:</span> <span class="token number">300</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">autoCropHeight</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">fixedBox</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">centerBox</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">maxFileSize</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token comment">// 5MB</span></span>
<span class="line">    <span class="token literal-property property">insertMode</span><span class="token operator">:</span> <span class="token string">"append"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-工具栏集成" tabindex="-1"><a class="header-anchor" href="#_2-工具栏集成"><span>2. 工具栏集成</span></a></h4>
<h5 id="菜单配置" tabindex="-1"><a class="header-anchor" href="#菜单配置"><span>菜单配置</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> toolbarConfig <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">menuKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"imageCropperMenu"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 添加自定义菜单</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="菜单执行逻辑" tabindex="-1"><a class="header-anchor" href="#菜单执行逻辑"><span>菜单执行逻辑</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">exec</span><span class="token punctuation">(</span><span class="token parameter">editor<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isDisabled</span><span class="token punctuation">(</span>editor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor <span class="token operator">=</span> editor</span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 创建隐藏的文件输入</span></span>
<span class="line">  <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFileInput</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  input<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 触发文件选择</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-文件上传处理" tabindex="-1"><a class="header-anchor" href="#_3-文件上传处理"><span>3. 文件上传处理</span></a></h4>
<h5 id="文件选择和验证" tabindex="-1"><a class="header-anchor" href="#文件选择和验证"><span>文件选择和验证</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">handleFileSelect</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> file <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">)</span> <span class="token keyword">return</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 验证文件类型</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">.</span>type<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'image/'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleError</span><span class="token punctuation">(</span><span class="token string">'请选择图片文件'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 验证文件大小</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">.</span>size <span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>maxFileSize<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">文件大小不能超过 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>maxFileSize <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">MB</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 读取文件并显示裁剪器</span></span>
<span class="line">  <span class="token keyword">const</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showCropper</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  reader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-图片裁剪界面" tabindex="-1"><a class="header-anchor" href="#_4-图片裁剪界面"><span>4. 图片裁剪界面</span></a></h4>
<h5 id="动态创建-vue-组件" tabindex="-1"><a class="header-anchor" href="#动态创建-vue-组件"><span>动态创建 Vue 组件</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">showCropper</span><span class="token punctuation">(</span><span class="token parameter">imageSrc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 创建模态框容器</span></span>
<span class="line">  <span class="token keyword">const</span> modalContainer <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span></span>
<span class="line">  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>modalContainer<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 创建 Vue 应用实例</span></span>
<span class="line">  <span class="token keyword">const</span> cropperComponent <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> VueCropper <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">imageSrc</span><span class="token operator">:</span> imageSrc<span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">cropperOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">img</span><span class="token operator">:</span> imageSrc<span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">autoCrop</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>cropperOptions<span class="token punctuation">.</span>autoCrop<span class="token punctuation">,</span></span>
<span class="line">          <span class="token comment">// ... 其他配置</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">cropImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>cropperRef<span class="token punctuation">.</span><span class="token function">getCropData</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">          self<span class="token punctuation">.</span><span class="token function">onCropped</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closeCropper</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">rotateLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>cropperRef<span class="token punctuation">.</span><span class="token function">rotateLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">rotateRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>cropperRef<span class="token punctuation">.</span><span class="token function">rotateRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">zoomIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>cropperRef<span class="token punctuation">.</span><span class="token function">changeScale</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">zoomOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>cropperRef<span class="token punctuation">.</span><span class="token function">changeScale</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 挂载 Vue 应用</span></span>
<span class="line">  <span class="token keyword">this</span><span class="token punctuation">.</span>vueApp <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>cropperComponent<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">this</span><span class="token punctuation">.</span>vueApp<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span>modalContainer<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="裁剪控制功能" tabindex="-1"><a class="header-anchor" href="#裁剪控制功能"><span>裁剪控制功能</span></a></h5>
<ul>
<li><strong>旋转</strong>: 左转/右转</li>
<li><strong>缩放</strong>: 放大/缩小</li>
<li><strong>重置</strong>: 恢复初始状态</li>
<li><strong>裁剪框调整</strong>: 拖拽调整裁剪区域</li>
</ul>
<h4 id="_5-图片插入编辑器" tabindex="-1"><a class="header-anchor" href="#_5-图片插入编辑器"><span>5. 图片插入编辑器</span></a></h4>
<h5 id="裁剪完成处理" tabindex="-1"><a class="header-anchor" href="#裁剪完成处理"><span>裁剪完成处理</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">onCropped</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">insertImage</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// 裁剪完成回调</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>onCropped <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>onCropped <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">onCropped</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closeCropper</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">insertImage</span><span class="token punctuation">(</span><span class="token parameter">imageData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>insertMode <span class="token operator">===</span> <span class="token string">'replace'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 替换当前选中内容</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor<span class="token punctuation">.</span><span class="token function">dangerouslyInsertHtml</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;img src="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>imageData<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" alt="cropped image" style="max-width: 100%; height: auto;"/></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 追加到末尾</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>currentEditor<span class="token punctuation">.</span><span class="token function">dangerouslyInsertHtml</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;img src="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>imageData<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" alt="cropped image" style="max-width: 100%; height: auto;"/></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-资源清理" tabindex="-1"><a class="header-anchor" href="#_6-资源清理"><span>6. 资源清理</span></a></h4>
<h5 id="组件销毁" tabindex="-1"><a class="header-anchor" href="#组件销毁"><span>组件销毁</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">closeCropper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 销毁 Vue 应用实例</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vueApp<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>vueApp<span class="token punctuation">.</span><span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>vueApp <span class="token operator">=</span> <span class="token keyword">null</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// 移除模态框容器</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>modalContainer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>modalContainer<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>modalContainer <span class="token operator">=</span> <span class="token keyword">null</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="核心特性" tabindex="-1"><a class="header-anchor" href="#核心特性"><span>核心特性</span></a></h4>
<h5 id="可配置" tabindex="-1"><a class="header-anchor" href="#可配置"><span>可配置</span></a></h5>
<ul>
<li><strong>裁剪参数</strong>: 自动裁剪、裁剪框尺寸、固定比例等</li>
<li><strong>文件限制</strong>: 文件类型、大小限制</li>
<li><strong>插入模式</strong>: 替换或追加模式</li>
<li><strong>回调函数</strong>: 裁剪完成、错误处理回调</li>
</ul>
<h4 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h4>
<h5 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用"><span>基础使用</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 1. 注册插件</span></span>
<span class="line"><span class="token function">registerImageCropperPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"imageCropperMenu"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">menuOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"图片裁剪"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">maxFileSize</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 2. 配置工具栏</span></span>
<span class="line"><span class="token keyword">const</span> toolbarConfig <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">menuKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"imageCropperMenu"</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 3. 创建编辑器</span></span>
<span class="line"><span class="token keyword">const</span> editor <span class="token operator">=</span> <span class="token function">createEditor</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">container</span><span class="token operator">:</span> editorContainer<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">config</span><span class="token operator">:</span> editorConfig</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> toolbar <span class="token operator">=</span> <span class="token function">createToolbar</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  editor<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">container</span><span class="token operator">:</span> toolbarContainer<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">config</span><span class="token operator">:</span> toolbarConfig</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="更多配置" tabindex="-1"><a class="header-anchor" href="#更多配置"><span>更多配置</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">registerImageCropperPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"imageCropperMenu"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">menuOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"高级图片裁剪"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">cropperOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">autoCrop</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">autoCropWidth</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">autoCropHeight</span><span class="token operator">:</span> <span class="token number">300</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">fixedBox</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 固定裁剪框</span></span>
<span class="line">      <span class="token literal-property property">centerBox</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">maxFileSize</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">insertMode</span><span class="token operator">:</span> <span class="token string">"replace"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">onCropped</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">imageData<span class="token punctuation">,</span> editor</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'裁剪完成，图片大小:'</span><span class="token punctuation">,</span> imageData<span class="token punctuation">.</span>length<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">onError</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      notification<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'图片处理失败'</span><span class="token punctuation">,</span> <span class="token literal-property property">description</span><span class="token operator">:</span> message <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


