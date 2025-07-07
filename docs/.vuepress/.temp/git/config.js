import { GitContributors } from "C:/yingao/editor-docs/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-rc.88_vuepress@2.0.0-rc.20_@vuepress+bundler-vite@2.0.0-rc.20_@typ_p37e7cidkjnu4mlte3quo4tdua/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "C:/yingao/editor-docs/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-rc.88_vuepress@2.0.0-rc.20_@vuepress+bundler-vite@2.0.0-rc.20_@typ_p37e7cidkjnu4mlte3quo4tdua/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
