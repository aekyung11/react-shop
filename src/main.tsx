import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const container: HTMLElement = document.getElementById("app")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* Recoil이나 Redux를 사용하시면 됩니다. 현업에서는 Redux-toolkit이 가장 많습니다. */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
