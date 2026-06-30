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
      <div className="text-[20px] font-bold text-brand-primary">个人信息</div>
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium text-gray-700">手机号</div>
            <div className="text-sm text-gray-500 mt-1">133****0536</div>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium text-gray-700">用户名</div>
            <div className="text-sm text-gray-500 mt-1">用户0536</div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            编辑名称
          </button>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium text-gray-700">密码</div>
            <div className="text-sm text-gray-500 mt-1">**********</div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            重置密码
          </button>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .172-.65C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
            </svg>
            <div>
              <div className="text-sm font-medium text-gray-700">微信</div>
              <div className="text-sm text-gray-500 mt-1">您已绑定，可以通过微信扫码登录LinkFox</div>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            解除绑定
          </button>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="text-sm font-medium text-gray-700">个人认证</div>
            <div className="text-sm text-gray-500 mt-1">完成个人认证，可无上限创建团队；未认证最多创建 10 个团队。</div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            立即认证
          </button>
        </div>
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <div className="text-sm font-medium text-gray-700">注销账号</div>
            <div className="text-sm text-gray-500 mt-1">注销成功后，你账号的用户数据将被永久清除，所有权益将失效</div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-red-500 hover:bg-red-50 transition">
            注销账号
          </button>
        </div>
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
