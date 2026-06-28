import { create } from "zustand";

type RouteKey =
  | "login"
  | "register"
  | "brand"
  | "brand-presets"
  | "settings"
  | "subscription"
  | "model-swap"
  | "product-images"
  | "history";

interface ModalState {
  open: boolean;
  kind?: "import-amazon" | "import-shopify" | "upgrade" | "forgot" | null;
  title?: string;
  data?: any;
}

interface AppState {
  route: RouteKey;
  navKey: RouteKey;
  loggedIn: boolean;
  monthQuota: number;
  monthUsed: number;
  modal: ModalState;
  setRoute: (r: RouteKey) => void;
  login: (email: string) => void;
  logout: () => void;
  openModal: (m: Partial<ModalState>) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  route: "model-swap",
  navKey: "model-swap",
  loggedIn: true,
  monthQuota: 500,
  monthUsed: 158,
  modal: { open: false, kind: null },
  setRoute: (r) => set({ route: r, navKey: r }),
  login: (_email) => set({ loggedIn: true, route: "model-swap", navKey: "model-swap" }),
  logout: () => set({ loggedIn: false, route: "login", navKey: "model-swap" }),
  openModal: (m) => set({ modal: { open: true, ...m } }),
  closeModal: () => set({ modal: { open: false, kind: null, title: undefined, data: undefined } }),
}));

export const routePath: Record<RouteKey, string> = {
  login: "/login",
  register: "/register",
  brand: "/brand",
  "brand-presets": "/brand-presets",
  settings: "/settings",
  subscription: "/subscription",
  "model-swap": "/tools/model-swap",
  "product-images": "/tools/product-images",
  history: "/history",
};

export const routeFromPath = (p: string): RouteKey => {
  const m: Record<string, RouteKey> = {
    "/login": "login",
    "/register": "register",
    "/brand": "brand",
    "/brand-presets": "brand-presets",
    "/settings": "settings",
    "/subscription": "subscription",
    "/tools/model-swap": "model-swap",
    "/tools/product-images": "product-images",
    "/history": "history",
  };
  return m[p] || "model-swap";
};
