import "./App.css";
import { useCallback, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { Header } from "./components/header.tsx";

function App() {
  const [routesReady, setRoutesReady] = useState(false);
  const onRouterReady = useCallback(() => {
    if (routesReady) {
      return;
    }
    setRoutesReady(true);
  }, [routesReady]);

  return (
    <div>
      <Header />
      {!routesReady && "Loading..."}
      <RouterProvider router={router(onRouterReady)} />
    </div>
  );
}

export default App;
