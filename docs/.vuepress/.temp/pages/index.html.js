import comp from "C:/yingao/editor-docs/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"首页\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"首页\",\"actions\":[{\"text\":\"开始使用\",\"link\":\"/blog/chaper1\",\"type\":\"primary\"}],\"footer\":null},\"headers\":[],\"git\":{\"updatedTime\":1751855107000,\"contributors\":[{\"name\":\"arlene001\",\"username\":\"arlene001\",\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"commits\":2,\"url\":\"https://github.com/arlene001\"}],\"changelog\":[{\"hash\":\"13cc2049c15ad42d925452fe9e9d43973f8fa1e0\",\"time\":1751855107000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"},{\"hash\":\"53fc117d8a9cfb464850e3363d49de1d78eb7a63\",\"time\":1751852733000,\"email\":\"8431484+arlene001@user.noreply.gitee.com\",\"author\":\"arlene001\",\"message\":\"提交\"}]},\"filePathRelative\":\"README.md\"}")
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
