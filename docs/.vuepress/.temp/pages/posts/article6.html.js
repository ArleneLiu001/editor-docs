import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/posts/article6.html.vue"
const data = JSON.parse("{\"path\":\"/posts/article6.html\",\"title\":\"Article 6\",\"lang\":\"en-US\",\"frontmatter\":{\"date\":\"2022-01-06T00:00:00.000Z\",\"category\":[\"Category A\",\"Category B\"],\"tag\":[\"tag A\",\"tag B\"]},\"headers\":[{\"level\":2,\"title\":\"Heading 2\",\"slug\":\"heading-2\",\"link\":\"#heading-2\",\"children\":[{\"level\":3,\"title\":\"Heading 3\",\"slug\":\"heading-3\",\"link\":\"#heading-3\",\"children\":[]}]}],\"git\":{\"updatedTime\":1751852733000,\"contributors\":[{\"name\":\"arlene001\",\"username\":\"arlene001\",\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"commits\":1,\"url\":\"https://github.com/arlene001\"}],\"changelog\":[{\"hash\":\"53fc117d8a9cfb464850e3363d49de1d78eb7a63\",\"time\":1751852733000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"}]},\"filePathRelative\":\"posts/article6.md\",\"excerpt\":\"\\n<h2>Heading 2</h2>\\n<p>Here is the content.</p>\\n<h3>Heading 3</h3>\\n<p>Here is the content.</p>\\n\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
