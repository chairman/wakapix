import React, { useState } from "react";
import { useAppStore } from "@/store/useStore";
import { Search, ChevronDown, Sparkles, X, ArrowRight } from "lucide-react";

const UpgradeModal: React.FC = () => {
  const { modal, closeModal } = useAppStore();
  if (!modal.open || modal.kind !== "upgrade") return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
      <div className="w-[460px] bg-white rounded-xl shadow-2xl animate-slideUp overflow-hidden">
        <div className="bg-gradient-to-r from-brand-primary to-[#2A4F7A] p-6 text-white relative">
          <button onClick={closeModal} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs text-white/60">升级到 Pro</div>
          <div className="text-xl font-bold mt-1">解锁每月 2000 张额度</div>
          <div className="text-sm text-white/70 mt-2">品牌风格迁移 · 批量生成 · API 上传</div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div>
              <div className="font-semibold text-sm">Free (当前)</div>
              <div className="text-xs text-gray-500">500 张 / 月</div>
            </div>
            <div className="text-[15px] font-bold text-gray-400">$0</div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border-2 border-brand-accent/40 bg-orange-50">
            <div>
              <div className="font-semibold text-sm flex items-center gap-2">
                Pro <span className="px-1.5 py-0.5 text-[10px] bg-brand-accent text-white rounded">推荐</span>
              </div>
              <div className="text-xs text-gray-600">2000 张 / 月 + 全部高级功能</div>
            </div>
            <div className="text-[18px] font-bold text-brand-accent">
              $49<span className="text-xs text-gray-500 font-normal">/月</span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={closeModal} className="flex-1 waka-btn-outline">
            稍后再说
          </button>
          <button onClick={closeModal} className="flex-1 waka-btn-primary">
            立即升级 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const TopBar: React.FC = () => {
  const { monthQuota, monthUsed, openModal } = useAppStore();
  const [search, setSearch] = useState("");

  const pct = Math.min(100, Math.round((monthUsed / monthQuota) * 100));

  return (
    <header className="h-[64px] bg-white border-b border-gray-200 flex items-center gap-4 px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2 w-[340px]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索项目、商品、图片..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-accent focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={() => openModal({ kind: "upgrade", title: "upgrade" })}
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-brand-light hover:bg-blue-100 transition group"
      >
        <Sparkles className="w-4 h-4 text-brand-accent" />
        <div className="text-left">
          <div className="text-[11px] text-gray-500 leading-none">本月剩余</div>
          <div className="text-[13px] font-semibold text-brand-primary leading-tight">
            {monthQuota - monthUsed} 张 / {monthQuota}
          </div>
        </div>
        <div className="w-[96px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-accent transition" />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <button className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary to-[#2A4F7A] text-white flex items-center justify-center font-semibold text-sm">
          LX
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-[12px] font-medium">Leo Xu</div>
          <div className="text-[10px] text-gray-500">Pro 会员</div>
        </div>
      </button>

      <UpgradeModal />
    </header>
  );
};
