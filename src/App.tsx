import { useAppStore } from "@/store/useStore";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Login, Register } from "@/pages/Login";
import { BrandStyle, Settings, Subscription } from "@/pages/BrandStyle";
import { BrandPresets } from "@/pages/BrandPresets";
import { AiModelSwap } from "@/pages/AiModelSwap";
import { ProductImages } from "@/pages/ProductImages";
import { HistoryPage } from "@/pages/HistoryPage";
import { ProfileCenter } from "@/pages/ProfileCenter";
import { HomePage } from "@/pages/HomePage";
import { Modal } from "@/components/UI/Modal";

function App() {
  const route = useAppStore((s) => s.route);
  const loggedIn = useAppStore((s) => s.loggedIn);

  if (route === "register") return <Register />;
  if (!loggedIn || route === "login") return <Login />;

  const page = (() => {
    switch (route) {
      case "home":
        return <HomePage />;
      case "brand":
        return <BrandStyle />;
      case "brand-presets":
        return <BrandPresets />;
      case "settings":
        return <Settings />;
      case "subscription":
        return <Subscription />;
      case "product-images":
        return <ProductImages />;
      case "model-swap":
        return <AiModelSwap />;
      case "history":
        return <HistoryPage />;
      case "profile":
        return <ProfileCenter />;
      default:
        return <HomePage />;
    }
  })();

  return (
    <MainLayout>
      {page}
      <Modal />
    </MainLayout>
  );
}

export default App;
