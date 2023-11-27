// 该文件运行在浏览器中
import { createApp } from './main';

async function runAsyncData(comps: any, route: any, store: any) {
  return Promise.all(
    comps
      .filter((Comp: any) => Comp.asyncData)
      .map((Component: any) => Component.asyncData({ route, store })),
  );
}

async function main() {
  const { app, store, router } = createApp();

  if (
    window.__INTIAL_STATE__ &&
    window.__INTIAL_STATE__ !== '<!--ssr-intial-state-->'
  ) {
    store.replaceState(window.__INTIAL_STATE__);
  }
  await router.isReady();

  router.beforeResolve(async (to, from, next) => {
    const comps = router
      .resolve(to)
      .matched.filter((c) => c.components)
      .flatMap((record: any) => Object.values(record.components));

    await next();
    runAsyncData(comps, to, store);
  });

  const comps = router.currentRoute.value.matched.flatMap((record: any) =>
    Object.values(record.components),
  );

  runAsyncData(comps, router.currentRoute.value, store);

  app.mount('#app');
}

main();
