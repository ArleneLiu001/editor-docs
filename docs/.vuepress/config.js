import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
// const barObj = require('./config/sideBar.js');
import barObj from './config/sideBar.js';

export default defineUserConfig({
  lang: 'en-US',
  title: 'wangEditor富文本编辑器功能扩展',
  description: '在开源文本编辑器wangEditor的基础上，实现一个富文本编辑器扩展插件，用于在线文档的定制化编辑。',
 base:'/editor-docs/',
   dest: './docs/.vuepress/dist',
  theme: defaultTheme({
    logo: '',
    navbar: [
      '/',
      {
        text: '文章',
        link: '/blog/chaper1',
      },
    ],
     sidebar: barObj,
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',


 
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
})
