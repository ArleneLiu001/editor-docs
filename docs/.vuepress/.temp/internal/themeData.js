export const themeData = JSON.parse("{\"logo\":\"\",\"navbar\":[\"/\",{\"text\":\"文章\",\"link\":\"/blog/chaper1\"}],\"sidebar\":{\"/blog/\":[{\"title\":\"基础\",\"collapsable\":true,\"children\":[\"chaper1\",\"chaper2\",\"chaper3\",\"chaper4\",\"chaper5\",\"chaper6\",\"chaper7\",\"chaper8\",\"chaper9\",\"chaper10\"]},{\"title\":\"基础\",\"collapsable\":false,\"children\":[\"content/chaper1\",\"content/chaper2\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
