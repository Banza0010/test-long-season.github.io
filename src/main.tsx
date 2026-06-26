
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { ShopDataProvider } from "./app/shopify/ShopDataContext.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <ShopDataProvider>
      <App />
    </ShopDataProvider>,
  );
  