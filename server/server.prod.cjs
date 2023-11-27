/*
 * @Author: Phoenix Fan
 * @Date: 2022-09-05 10:11:59
 * @LastEditors: Phoenix Fan
 * @LastEditTime: 2022-10-12 23:13:03
 * @Description:
 */
const { readFileSync } = require("fs");
const { resolve } = require("path");
const express = require("express");
const serverStatic = require("serve-static");

async function createMyServer() {
  const app = express();

  app.use(serverStatic(resolve(__dirname, "../dist/client")));

  app.use("*", async (req, res) => {
  const url = req.originalUrl;

    try {
      let template = readFileSync(resolve(__dirname, "../dist/client/index.html"), "utf-8");

      const render = require("../dist/server/entry-server.cjs").render;

      const manifest = require("../dist/client/ssr-manifest.json");

      const { appHtml, state, preloadLinks } = await render(url, manifest);

      const html = template.replace(`<!--ssr-preload-links-->`, preloadLinks)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`'<!--ssr-intial-state-->'`, JSON.stringify(state))
        

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(9909, () => {
    console.log("app is listening at http://localhost:9909");
  });
}

createMyServer();
