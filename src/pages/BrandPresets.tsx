import React, { useState } from "react";
import {
  Plus,
  Search,
  Globe,
  Lock,
  MessageCircle,
  RotateCcw,
  Upload,
  Palette,
  Type,
  Sparkles,
  ChevronRight,
  X,
  Image,
} from "lucide-react";

interface BrandCard {
  id: string;
  name: string;
  subtitle: string;
  region?: string;
  pro?: boolean;
  gradient: string;
  auto?: boolean;
  newPlaceholder?: boolean;
}

const brands: BrandCard[] = [
  {
    id: "auto",
    name: "Auto",
    subtitle: "智能主色、智能字体风格",
    region: "🇺🇸  US",
    pro: true,
    gradient:
      "linear-gradient(135deg,#E91E63 0%,#F97316 15%,#FBBF24 30%,#22C55E 50%,#06B6D4 70%,#3B82F6 85%,#8B5CF6 100%)",
    auto: true,
  },
];

export const BrandPresets: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [region, setRegion] = useState("🇨🇳 CN");
  const [domain, setDomain] = useState("");
  const [font, setFont] = useState("");

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setShowCreate(false);
      setName("");
      setDomain("");
      setFont("");
    }, 1100);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-64px)]">
      {/* 顶部提示条 */}
      <div className="px-8 py-3 bg-[#FFFBEB] border-b border-[#FDE68A] flex items-center gap-2 text-[12.5px] text-amber-800">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>品牌预设团队成员全部可见，建议按使用习惯统一管理品牌</span>
      </div>

      {/* 搜索 */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          我的品牌预设
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="请搜索你的品牌预设"
            className="w-[280px] h-[36px] rounded-full bg-white border border-gray-200 pl-9 pr-3 text-[12.5px] outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* 品牌网格 */}
      <div className="flex-1 p-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowCreate(true)}
            className="w-[240px] h-[200px] rounded-xl border-2 border-dashed border-gray-300 hover:border-[#8B5CF6] hover:bg-purple-50/40 transition flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#8B5CF6]"
          >
            <Plus className="w-6 h-6" />
            <div className="text-[12.5px]">新建品牌预设</div>
          </button>

          {brands
            .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || !search)
            .map((b) => (
              <div
                key={b.id}
                className="w-[240px] h-[200px] rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div
                  className={`h-[120px] flex items-center justify-center relative ${b.auto ? "" : "bg-gradient-to-br from-slate-100 to-slate-50"}`}
                  style={b.auto ? { background: b.gradient } : undefined}
                >
                  <span className="text-[26px] font-extrabold tracking-tight text-white drop-shadow">
                    {b.name}
                  </span>
                  {b.pro && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#F5F3FF] text-[10px] font-semibold text-[#6D28D9] border border-[#DDD6FE]">
                      Pro
                    </span>
                  )}
                  {b.region && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-white/90 text-[10px] text-gray-600 font-medium flex items-center gap-0.5">
                      <Globe className="w-2.5 h-2.5" />
                      {b.region}
                    </span>
                  )}
                </div>
                <div className="px-3 py-2.5 text-[12px] text-gray-500">
                  {b.subtitle}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 右侧浮标 */}
      <div className="fixed right-5 bottom-20 z-30 flex flex-col gap-3">
        <button className="w-10 h-10 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#8B5CF6] flex items-center justify-center hover:bg-[#EDE9FE] transition shadow-md">
          <MessageCircle className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#8B5CF6] flex items-center justify-center hover:bg-[#EDE9FE] transition shadow-md">
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* 创建弹层 */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[520px] rounded-2xl bg-white shadow-2xl overflow-hidden animate-fadeIn">
            <div className="h-[56px] border-b border-gray-100 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-800">
                <Palette className="w-4 h-4 text-[#8B5CF6]" /> 新建品牌预设
              </div>
              <button onClick={() => setShowCreate(false)} className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="text-[12px] text-gray-600 mb-1.5 flex items-center gap-1">
                  品牌名称 <span className="text-red-500">*</span>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如 Wakapix"
                  className="w-full h-[36px] rounded-lg border border-gray-200 px-3 text-[12.5px] outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div>
                <div className="text-[12px] text-gray-600 mb-1.5 flex items-center gap-1">
                  品牌站点
                </div>
                <div className="flex gap-2">
                  <input
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="flex-1 h-[36px] rounded-lg border border-gray-200 px-3 text-[12.5px] outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100"
                  />
                  <button className="h-[36px] px-3 rounded-lg border border-gray-200 text-[12px] text-gray-600 hover:border-[#8B5CF6] hover:text-[#8B5CF6] flex items-center gap-1">
                    <Globe className="w-3 h-3" /> 自动识别
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[12px] text-gray-600 mb-1.5">地区</div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full h-[36px] rounded-lg border border-gray-200 px-3 text-[12.5px] outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100 bg-white"
                  >
                    {["🇨🇳 CN", "🇺🇸 US", "🇬🇧 UK", "🇩🇪 DE", "🇫🇷 FR", "🇯🇵 JP", "🇰🇷 KR"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="text-[12px] text-gray-600 mb-1.5 flex items-center gap-1">
                    <Type className="w-3 h-3" /> 主字体（可选）
                  </div>
                  <input
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    placeholder="自动识别"
                    className="w-full h-[36px] rounded-lg border border-gray-200 px-3 text-[12.5px] outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              <div>
                <div className="text-[12px] text-gray-600 mb-1.5 flex items-center gap-1">
                  <Image className="w-3 h-3" /> 上传品牌 Logo（可选）
                </div>
                <label className="block cursor-pointer">
                  <input type="file" className="hidden" />
                  <div className="h-[64px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center gap-1 text-[12px] text-gray-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6] bg-gray-50">
                    <Upload className="w-3.5 h-3.5" /> 点击上传 PNG / SVG
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <RotateCcw className="w-3 h-3" /> 自动识别品牌主色 · 字体 · Logo 风格
              </div>
            </div>

            <div className="h-[64px] border-t border-gray-100 px-6 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[12px] text-gray-600">
                <input type="checkbox" defaultChecked className="accent-[#8B5CF6]" />
                自动应用到新生成的项目
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="h-[36px] px-4 rounded-lg text-[12.5px] text-gray-600 border border-gray-200 hover:border-gray-300"
                >
                  取消
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!name.trim() || creating}
                  className="h-[36px] px-4 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 font-medium"
                >
                  {creating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" /> 正在创建...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> 自动识别并创建
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 右侧悬浮按钮（预览图上的两个圆按钮） */}
      <div className="fixed right-6 top-[180px] z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-[#8B5CF6] hover:border-[#8B5CF6]">
        <Lock className="w-4 h-4" />
      </div>
    </div>
  );
};
