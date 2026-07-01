import React, { useState } from "react";
import { useAppStore } from "@/store/useStore";
import { X, ArrowRight, ArrowLeft, MessageCircle, Video, ChevronRight, Phone, Mail, Clock } from "lucide-react";

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

  if (modal.kind === "help") {
    const [activeTab, setActiveTab] = useState<"contact" | "tutorial">("contact");

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
        <div className="w-[600px] bg-white rounded-xl shadow-2xl animate-slideUp overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="text-lg font-bold text-gray-800">帮助与客服</div>
            <button onClick={closeModal} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              联系客服
            </button>
            <button
              onClick={() => setActiveTab("tutorial")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "tutorial"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Video className="w-4 h-4" />
              产品教程
            </button>
          </div>

          <div className="p-6">
            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">在线客服</div>
                    <div className="text-xs text-gray-500 mt-1">工作时间：9:00 - 21:00</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    立即咨询
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">客服热线</div>
                    <div className="text-xs text-gray-500 mt-1">400-888-8888</div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                    拨打电话
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">邮件支持</div>
                    <div className="text-xs text-gray-500 mt-1">support@wakapix.com</div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                    发送邮件
                  </button>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-600">客服工作时间：周一至周日 9:00 - 21:00</span>
                </div>
              </div>
            )}

            {activeTab === "tutorial" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-800">商品图生成教程</div>
                    <div className="text-xs text-gray-500 mt-1">了解如何生成高质量商品图</div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-800">模特图换脸教程</div>
                    <div className="text-xs text-gray-500 mt-1">AI试穿功能使用指南</div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-12 h-12 text-orange-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-800">品牌预设管理</div>
                    <div className="text-xs text-gray-500 mt-1">如何创建和管理品牌风格</div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition cursor-pointer">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-12 h-12 text-purple-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-800">API接入教程</div>
                    <div className="text-xs text-gray-500 mt-1">开发者API使用文档</div>
                  </div>
                </div>

                <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  查看更多教程 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
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
