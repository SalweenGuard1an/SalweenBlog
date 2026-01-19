import { defineEventHandler, getQuery, readBody } from 'file:///Users/salween.li/my%20proj/SalweenBlog/node_modules/h3/dist/index.mjs';

const viewsStore = {};
const views = defineEventHandler(async (event) => {
  const method = event.method;
  if (method === "GET") {
    const query = getQuery(event);
    const path = query.path;
    if (!path) {
      return { error: "Path is required" };
    }
    return {
      path,
      views: viewsStore[path] || 0
    };
  }
  if (method === "POST") {
    const body = await readBody(event);
    const path = body.path;
    if (!path) {
      return { error: "Path is required" };
    }
    if (!viewsStore[path]) {
      viewsStore[path] = 0;
    }
    viewsStore[path] += 1;
    return {
      path,
      views: viewsStore[path]
    };
  }
  return { error: "Method not allowed" };
});

export { views as default };
//# sourceMappingURL=views.mjs.map
