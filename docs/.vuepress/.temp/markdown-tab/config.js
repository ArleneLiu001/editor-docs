import { CodeTabs } from "C:/yingao/editor-docs/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_y2c57rgxgjafszzbxbxed6zp6e/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/yingao/editor-docs/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_y2c57rgxgjafszzbxbxed6zp6e/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/yingao/editor-docs/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_y2c57rgxgjafszzbxbxed6zp6e/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
