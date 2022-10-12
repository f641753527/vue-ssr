import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';

export async function render(url: string) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();

  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record: any) => Object.values(record.components),
  );

  await Promise.all(
    matchedComponents.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({ route: router.currentRoute, store });
      }
    }),
  );

  const appHtml = await renderToString(app);
  return { appHtml, state: store.state };
}
