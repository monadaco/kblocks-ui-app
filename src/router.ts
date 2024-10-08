import { createBrowserRouter } from "react-router-dom";

export const router = (onReady: () => void) => {
  const lazyLoading = async (module: Promise<any>) => {
    return module.then((module) => {
      onReady();
      return module;
    });
  };
  return createBrowserRouter([
    {
      path: "",
      lazy: () => lazyLoading(import("./routes/docs/index.js")),
    },
    {
      path: "/",
      lazy: () => lazyLoading(import("./routes/docs/index.js")),
    },
    {
      path: "*",
      lazy: () => lazyLoading(import("./routes/docs/index.js")),
    },
  ]);
};
