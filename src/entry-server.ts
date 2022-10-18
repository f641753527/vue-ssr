import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';

function renderPreloadLinks(url: string) {
  if (url.endsWith('.css')) {
    return `<link rel="stylesheet" href="${url}">`;
  }
  if (url.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${url}">`;
  }
  if (url.endsWith('.jpg')) {
    return `<link rel="preload" as="image" href="${url}" type="image/jpeg">`;
  }
  return '';
}

function renderLinks(modules: any, manifest: any) {
  let links = '';
  modules.forEach((id: string) => {
    const files = manifest[id] || [];

    files.forEach((file: string) => {
      links += renderPreloadLinks(file);
    });
  });
  return links;
}

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();

  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record: any) => Object.values(record.components),
  );

  await Promise.all(
    matchedComponents.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({ route: router.currentRoute.value, store });
      }
    }),
  );

  const ctx: any = {};

  const appHtml = await renderToString(app, ctx);

  if (import.meta.env.PROD) {
    const preloadLinks = renderLinks(ctx.modules, manifest);

    return { appHtml, state: store.state, preloadLinks };
  }

  return { appHtml, state: store.state };
}
