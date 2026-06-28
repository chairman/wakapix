import React, { useState } from "react";
import { Upload, Check, ImagePlus } from "lucide-react";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

const fonts = [
  "Inter / Latin",
  "Source Han Sans CN / 思源黑体",
  "Noto Serif / 衬线",
  "Poppins / 几何",
  "Montserrat / 现代",
];

const palettes = [
  ["#1E3A5F", "#FF6B35", "#F8F9FA"],
  ["#243046", "#E85A26", "#FAFAFA"],
  ["#1A1A2E", "#0F82AF", "#FFFFFF"],
];

export const BrandStyle: React.FC = () => {
  const [name, setName] = useState("Wakapix Pro");
  const [primary, setPrimary] = useState("#1E3A5F");
  const [secondary, setSecondary] = useState("#FF6B35");
  const [font, setFont] = useState("Inter / Latin");
  const [applyAll, setApplyAll] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="text-[20px] font-bold text-brand-primary">品牌风格管理</div>
      <div className="text-[12px] text-gray-500 mt-0.5">
        保存后，所有新生成的图片会自动保持品牌一致性
      </div>

      <div className="mt-6 waka-card p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="waka-label">风格名称</label>
            <input className="waka-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="waka-label">品牌 Logo（建议透明 PNG）</label>
            <div className="flex items-start gap-4">
              <div className="w-[80px] h-[80px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <div
                  className="w-full h-full flex items-center justify-center text-[10px] text-gray-400"
                  style={{
                    background: "linear-gradient(135deg,#EEF3F9,#D7E3F2)",
                  }}
                >
                  Logo
                </div>
              </div>
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg py-4 px-5 flex items-center justify-center hover:border-brand-accent hover:bg-orange-50/40 transition cursor-pointer">
                  <div className="text-center text-[12px] text-gray-600">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                    拖拽或点击上传 PNG / SVG
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 mt-2">200×200px 起，建议透明背景</div>
              </div>
            </div>
          </div>

          <div>
            <label className="waka-label">主色调（取色器 / 手动输入）</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border" />
                <span className="text-[12px] text-gray-600">主色 {primary}</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border" />
                <span className="text-[12px] text-gray-600">辅色 {secondary}</span>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {palettes.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setPrimary(p[0]); setSecondary(p[1]); }}
                  className="flex items-center gap-1 px-2 py-1 rounded border border-gray-200 hover:border-brand-accent"
                  title={p.join(", ")}
                >
                  {p.map((c) => (
                    <span key={c} className="w-4 h-4 rounded-full" style={{ background: c }} />
                  ))}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="waka-label">字体（主字重）</label>
            <select value={font} onChange={(e) => setFont(e.target.value)} className="waka-input">
              {fonts.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <div className="mt-3 rounded-lg border border-gray-200 p-3 bg-gray-50">
              <div
                className="text-[16px] font-bold tracking-tight"
                style={{ color: primary }}
              >
                {font.includes("Latin") ? "Your Brand Name" : "你的品牌名称"}
              </div>
              <div className="text-[11.5px] text-gray-500 mt-0.5">
                400 / 700 · 自动应用到文字叠加
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className="waka-label">参考图（AI 风格迁移用，最多 6 张）</label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[100px] h-[100px] rounded-lg overflow-hidden shadow-card">
                  <PlaceholderImage aspect="sq" label={`参考 ${i}`} gradient={`linear-gradient(135deg,#${9999 - i * 50}999,#${8888 - i * 30}FFF)`} className="w-full h-full" />
                </div>
              ))}
              <div className="w-[100px] h-[100px] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-[11px] text-gray-500 cursor-pointer hover:border-brand-accent hover:bg-orange-50/40 transition">
                <ImagePlus className="w-6 h-6 text-gray-400 mb-1" />
                添加
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 waka-card p-5 flex items-center justify-between">
        <label className="flex items-center gap-3 text-[13px] text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={applyAll}
            onChange={(e) => setApplyAll(e.target.checked)}
            className="w-4 h-4 accent-brand-accent"
          />
          <div>
            <div className="font-medium">应用到所有新项目</div>
            <div className="text-[11px] text-gray-500">
              新建项目时自动选中此风格为默认
            </div>
          </div>
        </label>

        <div className="flex items-center gap-3">
          <button className="waka-btn-outline">取消</button>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="waka-btn-primary flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            {saved ? "已保存" : "保存风格"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-[820px]">
      <div className="text-[20px] font-bold text-brand-primary">账号设置</div>
      <div className="text-[12px] text-gray-500 mt-0.5">你的个人信息、团队、API 与安全</div>
      <div className="mt-6 waka-card divide-y divide-gray-100">
        {[
          ["个人信息", "姓名、邮箱、公司、头像"],
          ["成员与团队", "邀请成员、角色权限"],
          ["商店授权", "Amazon / Shopify / TikTok Shop OAuth"],
          ["API & Webhook", "生成密钥、回调地址"],
          ["账单", "发票、升级、付款方式"],
          ["通知", "邮件频率、生成完成提醒"],
          ["安全", "2FA、登录历史、注销所有设备"],
        ].map(([t, d]) => (
          <button key={t} className="w-full p-5 flex items-center justify-between hover:bg-gray-50 text-left">
            <div>
              <div className="text-[14px] font-medium text-brand-primary">{t}</div>
              <div className="text-[11.5px] text-gray-500 mt-0.5">{d}</div>
            </div>
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const Subscription: React.FC = () => {
  return (
    <div className="p-8 max-w-[1000px]">
      <div className="text-[20px] font-bold text-brand-primary">订阅计划</div>
      <div className="text-[12px] text-gray-500 mt-0.5">按月 / 按年付费，随时升级或取消</div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { name: "Free", price: "$0", period: "永久免费", quota: "500 张 / 月", highlight: false, features: ["全部基础场景", "白底主图", "邮件支持"] },
          { name: "Pro", price: "$49", period: "每月", quota: "2000 张 / 月", highlight: true, features: ["品牌风格库", "高级场景 & 自定义", "多平台 API 上传", "优先队列", "聊天优先支持"] },
          { name: "Business", price: "$149", period: "每月", quota: "8000 张 / 月", highlight: false, features: ["全部 Pro", "团队成员 5 席", "私有风格模型", "专属客户经理", "SLA 保障"] },
        ].map((p) => (
          <div
            key={p.name}
            className={`waka-card p-6 flex flex-col ${p.highlight ? "ring-2 ring-brand-accent shadow-cardHover" : ""}`}
          >
            {p.highlight && (
              <div className="absolute -mt-2 ml-auto px-2 py-0.5 text-[10px] bg-brand-accent text-white rounded-full">推荐</div>
            )}
            <div className="text-[14px] font-bold text-brand-primary">{p.name}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-brand-primary">{p.price}</span>
              <span className="text-[12px] text-gray-500">/ {p.period}</span>
            </div>
            <div className="mt-2 text-[12px] text-gray-600">{p.quota}</div>
            <ul className="mt-4 space-y-2 text-[12px] text-gray-700 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`mt-4 ${p.highlight ? "waka-btn-primary" : "waka-btn-outline"}`}>
              {p.highlight ? "立即升级" : "选择 " + p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
