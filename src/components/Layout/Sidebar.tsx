import React from "react";
import { useAppStore } from "@/store/useStore";
import {
  Palette,
  Settings,
  CreditCard,
  Sparkles,
  UserRound,
  Image,
  History as HistoryIcon,
  LogOut,
} from "lucide-react";

const items = [
  { key: "product-images" as const, label: "商品图", icon: Image },
  { key: "model-swap" as const, label: "模特图", icon: UserRound },
  { key: "history" as const, label: "历史记录", icon: HistoryIcon },
  { key: "brand-presets" as const, label: "品牌预设", icon: Palette },
  { key: "settings" as const, label: "账号设置", icon: Settings },
  { key: "subscription" as const, label: "订阅计划", icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  const navKey = useAppStore((s) => s.navKey);
  const setRoute = useAppStore((s) => s.setRoute);
  const logout = useAppStore((s) => s.logout);

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-[#1A2B45] text-white flex flex-col z-30">
      <div className="h-[64px] flex items-center gap-2 px-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-accent to-[#FF8A5D] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-[16px] font-bold tracking-tight">Wakapix</div>
          <div className="text-[10px] text-white/50">跨境电商 AI 工作站</div>
        </div>
      </div>

      <nav className="flex-1 py-3 flex flex-col gap-0.5">
        {items.map((it) => {
          const active = navKey === it.key;
          const Icon = it.icon;
          return (
            <button
              key={it.key}
              onClick={() => setRoute(it.key)}
              className={`relative flex items-center gap-3 px-5 py-2.5 text-[13px] transition-colors text-left ${
                active
                  ? "bg-white/5 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-brand-accent" />
              )}
              <Icon className="w-[18px] h-[18px]" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-5 py-3 text-[12px] text-white/50 hover:text-white/80 border-t border-white/5"
      >
        <LogOut className="w-[16px] h-[16px]" />
        <span>退出登录</span>
      </button>
    </aside>
  );
};
