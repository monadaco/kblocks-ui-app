import "./App.css";
import { useCallback, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { Header } from "./header.tsx";

function App() {
  const [routesReady, setRoutesReady] = useState(false);
  const onRouterReady = useCallback(() => {
    if (routesReady) {
      return;
    }
    setRoutesReady(true);
  }, [routesReady]);

  return (
    <div className={"flex flex-col h-full w-full"}>
      <Header />
      {!routesReady && "Loading..."}
      <div className={"flex w-full h-[calc(100%-74px)] mb-2"}>
        <RouterProvider router={router(onRouterReady)} />
      </div>
    </div>
  );
}

export default App;
