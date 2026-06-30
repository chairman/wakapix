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
  Home,
  Lightbulb,
  TrendingUp,
  Star,
  UserRound,
  Package,
  Shirt,
  Zap,
  ArrowUpRight,
  Square,
  Check,
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

interface InspirationItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  likes: number;
  tags: string[];
}

const inspirations: InspirationItem[] = [
  { id: "1", title: "北欧简约家居场景", category: "家居", gradient: "linear-gradient(135deg,#E5E9F0,#CFD6E4)", likes: 234, tags: ["北欧", "简约", "家居"] },
  { id: "2", title: "夏日海滩度假风", category: "户外", gradient: "linear-gradient(135deg,#FBE5D6,#E39667)", likes: 189, tags: ["海滩", "度假", "夏日"] },
  { id: "3", title: "都市咖啡馆氛围", category: "餐饮", gradient: "linear-gradient(135deg,#D8EFD3,#8FD0A8)", likes: 156, tags: ["都市", "咖啡", "氛围"] },
  { id: "4", title: "高端科技产品展示", category: "科技", gradient: "linear-gradient(135deg,#EAEAFD,#A48EE4)", likes: 203, tags: ["高端", "科技", "产品"] },
  { id: "5", title: "温馨家庭生活场景", category: "家庭", gradient: "linear-gradient(135deg,#FBE0EC,#F7A7C4)", likes: 178, tags: ["温馨", "家庭", "生活"] },
  { id: "6", title: "时尚服装搭配", category: "服装", gradient: "linear-gradient(135deg,#F8F2E8,#E8CFA0)", likes: 245, tags: ["时尚", "服装", "搭配"] },
];

type TabKey = "home" | "brand-presets" | "inspiration";

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Sidebar - Vertical Tab Navigation */}
      <aside className="w-[160px] bg-white border-r border-gray-200 flex flex-col py-4">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              activeTab === "home"
                ? "bg-brand-accent text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-4 h-4" />
            首页
          </button>
          <button
            onClick={() => setActiveTab("brand-presets")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              activeTab === "brand-presets"
                ? "bg-brand-accent text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Palette className="w-4 h-4" />
            品牌预设
          </button>
          <button
            onClick={() => setActiveTab("inspiration")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              activeTab === "inspiration"
                ? "bg-brand-accent text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            灵感库
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "home" && <HomeContent />}
        {activeTab === "brand-presets" && <BrandPresetsContent />}
        {activeTab === "inspiration" && <InspirationContent />}
      </div>
    </div>
  );
};

const HomeContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agent" | "catalog">("agent");
  const [brandPreset, setBrandPreset] = useState("LF.Banana");
  const [inputValue, setInputValue] = useState("");
  const [hasImages, setHasImages] = useState(false);

  const canCreate = inputValue.trim().length > 0 || hasImages;

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-gray-900 mb-6">从一个想法, 到全球爆单</h1>
        
        {/* Tab Navigation */}
        <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("agent")}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition ${
              activeTab === "agent"
                ? "bg-brand-accent text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            灵感创作(Agent)
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-5 py-2 rounded-md text-[14px] font-medium transition ${
              activeTab === "catalog"
                ? "bg-brand-accent text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            建立商品档案
          </button>
        </div>
      </div>

      {/* Main Input Card */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Input Area */}
          <div className="px-6 py-4">
            {activeTab === "agent" ? (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="上传产品图，描述你想要的效果，让 AI 搞定所有设计"
                className="w-full h-[80px] resize-none bg-transparent outline-none text-[14px] text-gray-600 placeholder:text-gray-400"
              />
            ) : (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="上传商品主图，建立商品档案，方便后续管理与生成"
                className="w-full h-[80px] resize-none bg-transparent outline-none text-[14px] text-gray-600 placeholder:text-gray-400"
              />
            )}
          </div>

          {/* Actions Bar */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 添加图片 */}
              <button 
                onClick={() => setHasImages(!hasImages)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition ${
                  hasImages 
                    ? "text-brand-accent bg-brand-accent/10 border border-brand-accent/30" 
                    : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Image className="w-4 h-4" />
                添加图片
                {hasImages && <Check className="w-3 h-3" />}
              </button>

              {/* 默认比例 */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition">
                <Square className="w-4 h-4" />
                默认比例
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 品牌预设 */}
              <div className="relative">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-gray-800 bg-gradient-to-r from-[#F5F3FF] to-[#FAF5FF] border border-[#DDD6FE] hover:border-[#C4B5FD] transition">
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  {brandPreset}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 去创作 */}
            <button 
              disabled={!canCreate}
              className={`px-5 py-2 rounded-lg text-[13px] font-medium transition flex items-center gap-1.5 ${
                canCreate
                  ? "text-white bg-brand-accent hover:bg-brand-accent/90"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              {activeTab === "agent" ? "去创作" : "建立档案"}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Agent Cards / Catalog Cards */}
      <div className="max-w-3xl mx-auto">
        {activeTab === "agent" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 商品套图 Agent */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">商品套图 Agent</div>
                  <div className="text-[11px] text-gray-500">多视角自动生成</div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">上传商品图，自动生成多角度、多场景商品套图</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 transition flex items-center justify-center gap-1">
                立即使用
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* 服装套图 Agent */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">服装套图 Agent</div>
                  <div className="text-[11px] text-gray-500">AI试穿自动生成</div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">上传服装图，自动完成模特试穿、多场景展示</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 transition flex items-center justify-center gap-1">
                立即使用
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* 爆款复刻 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">爆款复刻</div>
                  <div className="text-[11px] text-orange-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    HOT
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">上传竞品爆款图，一键复刻风格与场景</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition flex items-center justify-center gap-1">
                立即使用
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 商品档案管理 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">商品档案管理</div>
                  <div className="text-[11px] text-gray-500">统一管理商品信息</div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">建立商品档案，统一管理商品信息与素材</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 transition flex items-center justify-center gap-1">
                进入管理
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* 批量导入商品 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">批量导入商品</div>
                  <div className="text-[11px] text-gray-500">快速建立商品档案</div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">支持Excel/CSV批量导入商品信息</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 transition flex items-center justify-center gap-1">
                立即导入
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* 商品分类管理 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">商品分类管理</div>
                  <div className="text-[11px] text-gray-500">自定义商品类目</div>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">创建自定义商品分类，便于筛选与查找</p>
              <button className="w-full py-2 rounded-lg text-[12px] text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 transition flex items-center justify-center gap-1">
                管理分类
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BrandPresetsContent: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-brand-primary">品牌预设</h1>
          <p className="text-[12px] text-gray-500 mt-1">管理您的品牌风格预设，快速应用到商品图生成</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="h-[40px] px-5 rounded-lg bg-brand-accent text-white text-[13px] font-medium flex items-center gap-2 hover:bg-brand-accentHover transition"
        >
          <Plus className="w-4 h-4" /> 创建预设
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 w-[320px] h-[40px] px-3 rounded-lg bg-white border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索品牌预设..."
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer">
            <div className="h-[120px] flex items-center justify-center text-white font-extrabold text-[32px]" style={{ background: brand.gradient }}>
              {brand.name}
            </div>
            <div className="p-4">
              <div className="text-[14px] font-semibold text-gray-800">{brand.name}</div>
              <div className="text-[12px] text-gray-500 mt-1">{brand.subtitle}</div>
              {brand.region && (
                <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
                  <Globe className="w-3 h-3" /> {brand.region}
                </div>
              )}
              {brand.pro && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-orange-100 text-orange-600 border border-orange-200">
                  Pro
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InspirationContent: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = ["all", "家居", "户外", "餐饮", "科技", "家庭", "服装"];

  const filteredInspirations = categoryFilter === "all"
    ? inspirations
    : inspirations.filter((i) => i.category === categoryFilter);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] font-bold text-brand-primary">灵感库</h1>
        <p className="text-[12px] text-gray-500 mt-1">探索热门创意灵感，为您的商品图生成提供参考</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 w-[320px] h-[40px] px-3 rounded-lg bg-white border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索灵感..."
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-[12px] border transition ${
                categoryFilter === cat
                  ? "bg-brand-accent text-white border-brand-accent"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat === "all" ? "全部" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inspiration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredInspirations.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer group">
            <div className="h-[160px] flex items-center justify-center" style={{ background: item.gradient }}>
              <div className="text-white text-[48px] opacity-0.3 group-hover:opacity-100 transition">
                {item.category === "家居" && "🏠"}
                {item.category === "户外" && "🌳"}
                {item.category === "餐饮" && "☕"}
                {item.category === "科技" && "💻"}
                {item.category === "家庭" && "👨‍👩‍👧‍👦"}
                {item.category === "服装" && "👗"}
              </div>
            </div>
            <div className="p-4">
              <div className="text-[14px] font-semibold text-gray-800">{item.title}</div>
              <div className="text-[12px] text-gray-500 mt-1">{item.category}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[12px] text-gray-400">
                  <Star className="w-3 h-3" /> {item.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};