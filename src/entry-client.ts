// 该文件运行在浏览器中
import { createApp } from './main';

const { app, store, router } = createApp();

if (window.__INTIAL_STATE__) {
  store.replaceState(window.__INTIAL_STATE__);
}

router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    const toMatchedComponents = router
      .resolve(to)
      .matched.filter((c) => c.components)
      .flatMap((record: any) => Object.values(record.components));

    const fromMatchedComponents = router
      .resolve(from)
      .matched.filter((c) => c.components)
      .flatMap((record: any) => Object.values(record.components));

    const matchedComponents = toMatchedComponents.filter((c, i) => {
      return fromMatchedComponents[i] !== c;
    });

    if (!matchedComponents.length) return next();

    console.log('同步服务端数据');

    Promise.all(
      matchedComponents.map((Component: any) => {
        if (Component.asyncData) {
          return Component.asyncData({ route: router.currentRoute, store });
        }
      }),
    ).then(() => {
      next();
    });
  });
});

app.mount('#app');
