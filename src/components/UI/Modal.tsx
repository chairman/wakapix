import React from "react";
import { useAppStore } from "@/store/useStore";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

export const Modal: React.FC = () => {
  const { modal, closeModal } = useAppStore();
  if (!modal.open) return null;

  if (modal.kind === "import-amazon" || modal.kind === "import-shopify") {
    const platform = modal.kind === "import-amazon" ? "Amazon" : "Shopify";
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn"
        onClick={closeModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[520px] bg-white rounded-xl shadow-2xl animate-slideUp p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-brand-accent font-semibold">
                快速导入
              </div>
              <div className="text-lg font-bold mt-1">从 {platform} 链接导入</div>
              <div className="text-xs text-gray-500 mt-1">
                粘贴 {platform} 商品详情页 URL，Wakapix 将自动解析商品信息
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <label className="waka-label">{platform} 商品链接</label>
            <input
              defaultValue={
                modal.kind === "import-amazon"
                  ? "https://www.amazon.com/dp/B0XYZ12345"
                  : "https://your-store.myshopify.com/products/cold-cup"
              }
              className="waka-input"
              placeholder="粘贴商品页 URL"
            />
            <div className="text-[12px] text-gray-500 flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>
                部分页面需要登录才能访问；Wakapix 仅用于你的合法自有商品页面。
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={closeModal} className="waka-btn-outline">
              取消
            </button>
            <button
              onClick={closeModal}
              className="waka-btn-primary flex items-center gap-2"
            >
              解析并填充 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modal.kind === "forgot") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
        <div className="w-[420px] bg-white rounded-xl shadow-2xl animate-slideUp p-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-bold">找回密码</div>
            <button onClick={closeModal} className="w-8 h-8 rounded-lg hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">输入邮箱，我们将发送重置链接</p>
          <div className="mt-4 space-y-3">
            <input className="waka-input" placeholder="you@example.com" />
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={closeModal} className="waka-btn-primary">发送重置邮件</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const Steps: React.FC<{
  steps: { label: string; active?: boolean; done?: boolean }[];
}> = ({ steps }) => (
  <div className="flex items-center gap-2">
    {steps.map((s, i) => (
      <React.Fragment key={s.label + i}>
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition ${
              s.active
                ? "bg-brand-accent text-white shadow-md"
                : s.done
                ? "bg-brand-accent/15 text-brand-accent"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {i + 1}
          </div>
          <span
            className={`text-sm font-medium ${
              s.active ? "text-brand-primary" : s.done ? "text-brand-accent" : "text-gray-500"
            }`}
          >
            {s.label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className={`w-12 h-[2px] ${
              s.done ? "bg-brand-accent" : "bg-gray-200"
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
