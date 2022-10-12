/*
 * @Author: Phoenix Fan
 * @Date: 2022-09-05 10:11:59
 * @LastEditors: Phoenix Fan
 * @LastEditTime: 2022-10-12 21:50:52
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

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const { appHtml, state } = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`'<!--ssr-intial-state-->'`, JSON.stringify(state));

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(9000, () => {
    console.log("listening at 9000");
  });
}

createMyServer();
