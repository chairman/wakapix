import { create } from "zustand";

type RouteKey =
  | "login"
  | "register"
  | "home"
  | "brand"
  | "brand-presets"
  | "settings"
  | "subscription"
  | "model-swap"
  | "product-images"
  | "history"
  | "profile";

interface ModalState {
  open: boolean;
  kind?: "import-amazon" | "import-shopify" | "upgrade" | "forgot" | "help" | null;
  title?: string;
  data?: any;
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
  monthQuota: number;
  monthUsed: number;
}

interface ConsumptionRecord {
  id: string;
  date: string;
  type: "image" | "video" | "model-swap";
  description: string;
  count: number;
  cost: number;
  status: "completed" | "failed" | "processing";
}

interface SubscriptionPlan {
  id: string;
  name: string;
  type: "personal" | "team" | "addon";
  price: number;
  originalPrice: number;
  period: "monthly" | "yearly" | "once";
  quota: number;
  features: string[];
  popular?: boolean;
  disabled?: boolean;
}

interface AppState {
  route: RouteKey;
  navKey: RouteKey;
  loggedIn: boolean;
  monthQuota: number;
  monthUsed: number;
  modal: ModalState;
  currentContext: "personal" | string;
  profileActiveTab: "profile" | "orders" | "consumption" | "subscription";
  personalInfo: {
    name: string;
    phone: string;
    availableQuota: number;
    availablePoints: number;
    plan: SubscriptionPlan | null;
  };
  teams: Team[];
  consumptionRecords: ConsumptionRecord[];
  subscriptionPlans: SubscriptionPlan[];
  setRoute: (r: RouteKey) => void;
  setProfileActiveTab: (tab: "profile" | "orders" | "consumption" | "subscription") => void;
  login: (email: string) => void;
  logout: () => void;
  openModal: (m: Partial<ModalState>) => void;
  closeModal: () => void;
  switchContext: (context: "personal" | string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  route: "model-swap",
  navKey: "model-swap",
  loggedIn: true,
  monthQuota: 500,
  monthUsed: 158,
  modal: { open: false, kind: null },
  currentContext: "personal",
  profileActiveTab: "profile",
  personalInfo: {
    name: "用户0536",
    phone: "133****0536",
    availableQuota: 300,
    availablePoints: 0,
    plan: null,
  },
  teams: [
    { id: "team-1", name: "领星科技团队", memberCount: 5, monthQuota: 5000, monthUsed: 1200 },
    { id: "team-2", name: "跨境电商联盟", memberCount: 3, monthQuota: 3000, monthUsed: 800 },
  ],
  consumptionRecords: [
    { id: "1", date: "2026-06-30", type: "image", description: "商品图生成", count: 25, cost: 25, status: "completed" },
    { id: "2", date: "2026-06-29", type: "model-swap", description: "模特图生成", count: 10, cost: 30, status: "completed" },
    { id: "3", date: "2026-06-28", type: "video", description: "视频封面生成", count: 5, cost: 20, status: "completed" },
    { id: "4", date: "2026-06-27", type: "image", description: "商品图生成", count: 15, cost: 15, status: "completed" },
    { id: "5", date: "2026-06-26", type: "model-swap", description: "模特图生成", count: 8, cost: 24, status: "processing" },
  ],
  subscriptionPlans: [
    {
      id: "free",
      name: "免费版",
      type: "personal",
      price: 0,
      originalPrice: 0,
      period: "monthly",
      quota: 500,
      features: ["作图优先级：低", "AI 生图同时发起 1 个任务", "原价购买算力加油包", "约生成 25 张图片"],
      disabled: true,
    },
    {
      id: "basic",
      name: "基础版",
      type: "personal",
      price: 69,
      originalPrice: 129,
      period: "monthly",
      quota: 3500,
      features: ["作图优先级：正常", "AI 生图同时发起 10 个任务", "5 折购买算力加油包", "约生成 350 张图片或 11 个视频"],
    },
    {
      id: "pro",
      name: "高级版",
      type: "personal",
      price: 299,
      originalPrice: 599,
      period: "monthly",
      quota: 21000,
      features: ["作图优先级：优先", "AI 生图同时发起 30 个任务", "4 折购买算力加油包", "约生成 2100 张图片或 70 个视频"],
      popular: true,
    },
    {
      id: "team-basic",
      name: "团队版",
      type: "team",
      price: 4790.4,
      originalPrice: 5988,
      period: "yearly",
      quota: 43200,
      features: ["最多添加 5 人团队", "素材算力共享", "协作用更高效"],
      popular: true,
    },
    {
      id: "team-pro",
      name: "团队专业版",
      type: "team",
      price: 7660.8,
      originalPrice: 9576,
      period: "yearly",
      quota: 86400,
      features: ["最多添加 10 人团队", "素材算力共享", "协作用更高效"],
    },
    {
      id: "team-enterprise",
      name: "团队旗舰版",
      type: "team",
      price: 19104,
      originalPrice: 23880,
      period: "yearly",
      quota: 172800,
      features: ["最多添加 20 人团队", "素材算力共享", "协作用更高效"],
    },
    { id: "addon-1", name: "算力加油包", type: "addon", price: 60, originalPrice: 60, period: "once", quota: 1000, features: [] },
    { id: "addon-2", name: "算力加油包", type: "addon", price: 300, originalPrice: 300, period: "once", quota: 5000, features: [] },
    { id: "addon-3", name: "算力加油包", type: "addon", price: 1200, originalPrice: 1200, period: "once", quota: 20000, features: [] },
  ],
  setRoute: (r) => set({ route: r, navKey: r }),
  setProfileActiveTab: (tab) => set({ profileActiveTab: tab }),
  login: (_email) => set({ loggedIn: true, route: "model-swap", navKey: "model-swap" }),
  logout: () => set({ loggedIn: false, route: "login", navKey: "model-swap" }),
  openModal: (m) => set({ modal: { open: true, ...m } }),
  closeModal: () => set({ modal: { open: false, kind: null, title: undefined, data: undefined } }),
  switchContext: (context) => {
    set({ currentContext: context });
    if (context === "personal") {
      set({ monthQuota: 500, monthUsed: 200 });
    } else {
      const team = get().teams.find((t) => t.id === context);
      if (team) {
        set({ monthQuota: team.monthQuota, monthUsed: team.monthUsed });
      }
    }
  },
}));

export const routePath: Record<RouteKey, string> = {
  login: "/login",
  register: "/register",
  home: "/",
  brand: "/brand",
  "brand-presets": "/brand-presets",
  settings: "/settings",
  subscription: "/subscription",
  "model-swap": "/tools/model-swap",
  "product-images": "/tools/product-images",
  history: "/history",
  profile: "/profile",
};

export const routeFromPath = (p: string): RouteKey => {
  const m: Record<string, RouteKey> = {
    "/": "home",
    "/login": "login",
    "/register": "register",
    "/brand": "brand",
    "/brand-presets": "brand-presets",
    "/settings": "settings",
    "/subscription": "subscription",
    "/tools/model-swap": "model-swap",
    "/tools/product-images": "product-images",
    "/history": "history",
    "/profile": "profile",
  };
  return m[p] || "model-swap";
};
