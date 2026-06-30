import React, { useState } from "react";
import {
  Image,
  FolderOpen,
  Maximize2,
  RefreshCw,
  Languages,
  Hand,
  History,
  Layers,
  Sparkles,
  Upload,
  ChevronRight,
  Globe,
  Wand2,
  ScanLine,
  Play,
  Lightbulb,
  MessageCircle,
  RotateCcw,
  ArrowRight,
  Sliders,
} from "lucide-react";

type MainTool =
  | "product"
  | "my-products"
  | "scene-ref"
  | "product-replace"
  | "scene-fission"
  | "image-translate"
  | "handheld"
  | "batch";

type ProductSub = "my" | "scene-ref" | "history";

const mainTools: { key: MainTool; label: string; icon: React.ElementType }[] = [
  { key: "product", label: "商品图", icon: Image },
  { key: "product-replace", label: "商品替换", icon: RefreshCw },
  { key: "scene-fission", label: "场景裂变", icon: Layers },
  { key: "image-translate", label: "图片翻译", icon: Languages },
  { key: "handheld", label: "手持商品", icon: Hand },
];

export const ProductImages: React.FC = () => {
  const [tool, setTool] = useState<MainTool>("product");
  const [productSub, setProductSub] = useState<ProductSub>("scene-ref");
  const [uploaded, setUploaded] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState<"upload" | "portfolio" | "lib">("upload");
  const [res, setRes] = useState<"2K" | "4K">("2K");
  const [count, setCount] = useState(4);
  const [aPlus, setAPlus] = useState(true);
  const [step, setStep] = useState(1);

  const [refUploaded, setRefUploaded] = useState(false);
  const [targetUploaded, setTargetUploaded] = useState(false);
  const [similarity, setSimilarity] = useState(60);

  const [sceneSource, setSceneSource] = useState(false);
  const [fissionCount, setFissionCount] = useState(4);

  const [translateSrc, setTranslateSrc] = useState(false);
  const [translateLang, setTranslateLang] = useState("US");

  const [handheldSrc, setHandheldSrc] = useState(false);
  const [handheldAngle, setHandheldAngle] = useState(0);

  const [myProducts] = useState([
    { id: 1, name: "LF-加湿器 Pro", img: "💧", sku: "SKU-001" },
    { id: 2, name: "竹编收纳篮", img: "🧺", sku: "SKU-014" },
    { id: 3, name: "无线蓝牙耳机", img: "🎧", sku: "SKU-028" },
    { id: 4, name: "不锈钢保温杯", img: "🥤", sku: "SKU-055" },
    { id: 5, name: "棉麻抱枕套装", img: "🛋️", sku: "SKU-077" },
    { id: 6, name: "木制桌面闹钟", img: "⏰", sku: "SKU-092" },
  ]);

  const DownloadIcon: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const handleGenerate = () => {
    if (generating) return;
    setDone(false);
    setGenerating(true);
    let v = 0;
    const t = setInterval(() => {
      v += 4;
      if (v >= 100) {
        clearInterval(t);
        setGenerating(false);
        setDone(true);
      }
    }, 160);
  };

  const section = (title: string, sub?: string, body?: React.ReactNode, footer?: React.ReactNode) => (
    <div className="flex flex-col w-[340px] shrink-0 bg-white border-r border-gray-100">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-gray-800 flex items-center gap-1">
            {title}
          </div>
          {sub && <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> {sub}
          </div>}
        </div>
        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">Pro</span>
      </div>
      {body}
      <div className="flex-1" />
      {footer}
    </div>
  );

  const floatingUI = (
    <>
      <div className="fixed right-4 bottom-20 z-30 flex flex-col gap-3">
        <button className="w-10 h-10 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#8B5CF6] flex items-center justify-center hover:bg-[#EDE9FE] shadow-md">
          <MessageCircle className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#8B5CF6] flex items-center justify-center hover:bg-[#EDE9FE] shadow-md">
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
      <div className="fixed right-0 bottom-0 z-40 pointer-events-none">
        <div className="bg-gradient-to-br from-[#EC4899] to-[#F97316] text-white text-center px-6 py-4 rounded-tl-[24px] shadow-lg pointer-events-auto cursor-pointer">
          <div className="text-[10px] opacity-90">超值</div>
          <div className="text-[36px] font-black leading-none tracking-tight">618</div>
          <div className="text-[10px] mt-0.5 opacity-90">立即参与 ×</div>
        </div>
      </div>
    </>
  );

  // ==================== TOOL: PRODUCT ====================

  const productPanel = (
    <div className="flex flex-col w-[340px] shrink-0 bg-white border-r border-gray-100">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-gray-800 flex items-center gap-1">
            <Wand2 className="w-4 h-4 text-[#8B5CF6]" /> 多视角自动商品实拍图
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> 从不同角度展示产品细节，提升点击和转化
          </div>
        </div>
        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">Pro</span>
      </div>
      <div className="px-5 pt-3 pb-2 flex items-center gap-1 text-[11.5px] text-gray-500 border-b border-gray-100">
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${step >= 1 ? "bg-[#8B5CF6] text-white" : ""}`}>
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span> 上传商品图
        </div>
        <span className="w-4 h-[1px] bg-gray-200" />
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${step >= 2 ? "bg-[#8B5CF6] text-white" : ""}`}>
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span> 风格设置
        </div>
        <span className="w-4 h-[1px] bg-gray-200" />
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${step >= 3 ? "bg-[#8B5CF6] text-white" : ""}`}>
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span> 生成
        </div>
      </div>
      <div className="px-5 py-3 space-y-3 border-b border-gray-100">
        <div className="inline-flex rounded-lg bg-gray-100 p-1 w-full">
          <button
            onClick={() => setMode("upload")}
            className={`flex-1 px-2 py-1.5 rounded-md text-[11.5px] flex items-center justify-center gap-1 transition ${mode === "upload" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}
          >
            <Upload className="w-3 h-3" /> 从本地上传
          </button>
          <button
            onClick={() => { setMode("lib"); setProductLibOpen(true); }}
            className={`flex-1 px-2 py-1.5 rounded-md text-[11.5px] flex items-center justify-center gap-1 transition ${mode === "lib" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}
          >
            <FolderOpen className="w-3 h-3" /> 从作品库选择
          </button>
        </div>
        <div
          onClick={() => { if (mode === "upload") { setUploaded(true); setStep(2); } }}
          className={`cursor-pointer h-[160px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#A78BFA] hover:bg-[#FAF5FF] transition ${mode === "upload" ? (uploaded ? "border-[#8B5CF6] bg-[#FAF5FF]" : "border-gray-200 bg-white") : "border-[#DDD6FE] bg-[#F5F3FF]"}`}
        >
          {mode === "lib" && (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                <FolderOpen className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div className="text-[12.5px] text-[#8B5CF6] font-medium">已选择：从作品库选择</div>
              <button
                onClick={(e) => { e.stopPropagation(); setProductLibOpen(true); }}
                className="h-[30px] px-3 rounded-md text-[11.5px] text-[#8B5CF6] bg-white border border-[#DDD6FE] hover:bg-[#F5F3FF]"
              >
                📂 重新选择
              </button>
            </>
          )}
          {mode === "upload" && uploaded ? (
            <>
              <div className="w-[96px] h-[96px] rounded-lg bg-gradient-to-br from-slate-200 via-white to-slate-100 flex items-center justify-center shadow-inner"><div className="text-[26px] font-bold text-gray-700">360</div></div>
              <div className="text-[12px] text-[#8B5CF6]">已上传 10M 以内，384×384 ~ 4096×4096，最佳偏光 5</div>
            </>
          ) : mode === "upload" ? (
            <>
              <Upload className="w-7 h-7" />
              <div className="text-[12.5px] text-gray-600 font-medium">点击或拖拽上传商品图</div>
              <div className="text-[11px] text-gray-400">10M 以内，384×384 ~ 4096×4096，最佳偏光 5</div>
            </>
          ) : null}
        </div>
      </div>
      <div className="px-5 py-3 border-b border-gray-100">
        <div className="text-[12px] text-gray-700 mb-1.5 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> 商品信息（可选）</div>
        <div className="text-[11px] text-gray-400 mb-2">商品信息越丰富，包含商品卖点、使用方式、销售地区、发布平台等生成效果将会更好</div>
        <div className="flex gap-2">
          <button className="h-[32px] px-3 rounded-md text-[12px] text-[#8B5CF6] bg-[#F5F3FF] border border-[#DDD6FE] flex items-center gap-1 hover:bg-[#EDE9FE]"><Sparkles className="w-3 h-3" /> AI分析</button>
          <button className="flex-1 h-[32px] px-3 rounded-md text-[12px] text-gray-500 border border-gray-200 flex items-center justify-between hover:border-[#A78BFA]"><span className="flex items-center gap-1">✏️ 输入向导</span><span className="text-gray-400">0 / 250</span></button>
        </div>
      </div>
      <div className="px-5 py-3 border-b border-gray-100">
        <div className="text-[12px] text-gray-700 mb-2 flex items-center gap-1"><Maximize2 className="w-3 h-3" /> 品牌预设</div>
        <button className="w-full h-[56px] rounded-xl bg-white border border-gray-200 flex items-center gap-3 px-3 hover:border-[#A78BFA] hover:shadow-sm">
          <div className="w-12 h-10 rounded-lg flex items-center justify-center text-white font-extrabold text-[18px]" style={{ background: "linear-gradient(135deg,#E91E63 0%,#F97316 15%,#FBBF24 30%,#22C55E 50%,#06B6D4 70%,#3B82F6 85%,#8B5CF6 100%)" }}>Auto</div>
          <div className="flex-1 text-left"><div className="text-[13px] font-medium text-gray-800">智能品牌预设</div><div className="text-[11px] text-gray-500">智能主色、智能字体风格</div></div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="px-5 py-3 border-b border-gray-100 space-y-2.5">
        <div className="text-[12px] text-gray-700 flex items-center gap-1"><Sparkles className="w-3 h-3" /> 模型选择</div>
        <div className="rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] text-[12px] text-[#6D28D9] px-3 py-2 flex items-center gap-2"><Wand2 className="w-3.5 h-3.5" /> LF Banana Pro 图片生成增强模型</div>
        <div className="text-[12px] text-gray-700">分辩率选择</div>
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button onClick={() => setRes("2K")} className={`px-4 py-1.5 rounded-md text-[12px] transition ${res === "2K" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}>2K</button>
          <button onClick={() => setRes("4K")} className={`px-4 py-1.5 rounded-md text-[12px] transition ${res === "4K" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}>4K</button>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="text-[12px] text-gray-700 flex items-center gap-1">A+图设置 <span className="text-[10px] text-gray-400">· 自动适配 Listing 尺寸</span></div>
          <button onClick={() => setAPlus((v) => !v)} className={`w-[38px] h-[22px] rounded-full transition ${aPlus ? "bg-[#8B5CF6]" : "bg-gray-200"}`}>
            <span className={`block w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${aPlus ? "translate-x-[18px]" : "translate-x-0.5"} mt-0.5`} />
          </button>
        </div>
        <div className="pt-1">
          <div className="text-[12px] text-gray-700 mb-1.5 flex items-center gap-1"><Layers className="w-3 h-3" /> 生成类型（单选）</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "白底主图", d: "主图" }, { l: "场景图", d: "场景" }, { l: "细节图", d: "细节" },
              { l: "功能图", d: "功能" }, { l: "尺寸图", d: "尺寸" }, { l: "使用场景", d: "使用" },
            ].map((x) => (
              <button
                key={x.l}
                onClick={() => setCount(1)}
                className={`h-[44px] rounded-lg border text-[11px] transition ${count === 1 ? "border-[#A78BFA] bg-[#FAF5FF] text-[#8B5CF6]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                <div className="text-[11px] text-gray-400">{x.d}</div>
                <div className="text-[12.5px] font-medium">{x.l}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="pt-1">
          <div className="text-[12px] text-gray-700 mb-1.5 flex items-center gap-1">📷 生成数量（1~6）</div>
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {[1, 2, 3, 4, 6, 9].map((n) => (
              <button key={n} onClick={() => setCount(n)} className={`min-w-[32px] px-2 py-1 rounded-md text-[12px] transition ${count === n ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}>{n}</button>
            ))}
          </div>
        </div>
        <div className="pt-2 flex items-center justify-between text-[11.5px] text-gray-500">
          <div className="flex items-center gap-1"><Globe className="w-3 h-3" /> 区域设置 · 中国站</div>
          <div className="flex items-center gap-1 text-gray-400"><Sparkles className="w-3 h-3" /> 提示词增强</div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-[11.5px] text-red-500">⚠️ 首次生成，每单张为「付费次数」（当月有效）</div>
        <button
          onClick={handleGenerate}
          disabled={generating || !uploaded}
          className="h-[42px] px-6 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-purple-200"
        >
          <Play className="w-4 h-4" />
          {generating ? "正在生成..." : done ? "再来一次" : "一键生成"}
        </button>
      </div>
    </div>
  );

  const productPreview = (
    <div className="flex flex-1 bg-[#F5F7FB] overflow-hidden">
      {/* Left Sidebar - Vertical Navigation */}
      <aside className="w-[160px] bg-white border-r border-gray-200 flex flex-col py-4">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setProductSub("my")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              productSub === "my"
                ? "bg-[#8B5CF6] text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            我的商品
          </button>
          <button
            onClick={() => setProductSub("scene-ref")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              productSub === "scene-ref"
                ? "bg-[#8B5CF6] text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Image className="w-4 h-4" />
            场景参考图
          </button>
          <button
            onClick={() => setProductSub("history")}
            className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
              productSub === "history"
                ? "bg-[#8B5CF6] text-white font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <History className="w-4 h-4" />
            历史记录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {productSub === "my" && (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                <div className="text-[12.5px] font-medium text-gray-800 flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5 text-gray-500" /> 我的商品素材
                </div>
                <span className="text-[11px] text-gray-400">共 {myProducts.length} 件</span>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4">
                {myProducts.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-[#A78BFA] transition cursor-pointer group relative"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center text-[64px]">
                      {p.img}
                    </div>
                    <div className="px-3 py-2.5">
                      <div className="text-[13px] font-medium text-gray-800 truncate">{p.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">SKU：{p.sku}</div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setTool("product"); setUploaded(true); }}
                        className="w-8 h-8 rounded-lg bg-white/90 shadow-sm text-gray-600 hover:text-[#8B5CF6] flex items-center justify-center"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setTool("product-replace"); setTargetUploaded(true); }}
                        className="w-8 h-8 rounded-lg bg-white/90 shadow-sm text-gray-600 hover:text-[#8B5CF6] flex items-center justify-center"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {productSub === "scene-ref" && (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] text-gray-500">排序:</span>
                  {["智能推荐", "按收藏时间", "按素材热度"].map((t, i) => (
                    <button
                      key={t}
                      className={`px-3 py-1 rounded-md text-[11.5px] ${i === 0 ? "bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]" : "bg-gray-50 text-gray-600 border border-gray-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-1 h-[28px] px-3 rounded-md bg-gray-50 border border-gray-200 text-[11.5px] text-gray-500">
                    🔍 搜索标签关键词
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] text-gray-500">商品:</span>
                  {["全部", "日用百货", "家居家装", "数码配件", "美妆个护", "家用电器", "玩具类目", "儿童&母婴", "3C数码", "办公用品", "运动户外", "工艺/艺术品", "服饰用品", "食品饮料", "美容保健/护理", "汽车用品", "其他"].map((t, i) => (
                    <button
                      key={t}
                      className={`px-3 py-1 rounded-md text-[11.5px] ${i === 0 ? "bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]" : "bg-gray-50 text-gray-600 border border-gray-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] text-gray-500">场景:</span>
                  {["全部", "室内", "室外", "节日活动", "简单背景", "工作场景", "休闲场景", "运动场所", "自然环境", "舞台", "科技"].map((t, i) => (
                    <button
                      key={t}
                      className={`px-3 py-1 rounded-md text-[11.5px] ${i === 0 ? "bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]" : "bg-gray-50 text-gray-600 border border-gray-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                  <button className="ml-auto text-[11.5px] text-gray-500 hover:text-[#8B5CF6] flex items-center gap-1">
                    收起 ∧
                  </button>
                </div>
              </div>

              <div className="p-5 grid grid-cols-4 gap-4">
                {[
                  { m: "🫖", t: "桌面-保温杯", bg: "from-sky-100 via-indigo-50 to-purple-50" },
                  { m: "🛏️", t: "卧室-床", bg: "from-slate-100 via-gray-50 to-white" },
                  { m: "🔦", t: "前台-LED灯", bg: "from-amber-50 via-orange-50 to-amber-100" },
                  { m: "🧺", t: "餐厅-收纳篮", bg: "from-amber-100 via-orange-50 to-rose-50" },
                  { m: "💡", t: "室内-吊灯", bg: "from-slate-100 via-gray-50 to-white" },
                  { m: "⌚", t: "纯色背景-皮带", bg: "from-rose-50 via-pink-50 to-slate-50" },
                  { m: "🛋️", t: "卧室-地毯", bg: "from-slate-100 via-gray-50 to-white" },
                  { m: "⌚", t: "纯色背景-皮带", bg: "from-rose-50 via-pink-50 to-slate-50" },
                  { m: "🦽", t: "室内-助行器", bg: "from-sky-50 via-indigo-50 to-purple-50" },
                  { m: "🧸", t: "前台-婴儿连体衣", bg: "from-rose-50 via-pink-50 to-amber-50" },
                  { m: "🕶️", t: "海滩-太阳镜", bg: "from-amber-50 via-orange-50 to-rose-50" },
                  { m: "🧴", t: "厨房-搅拌器", bg: "from-rose-50 via-pink-50 to-amber-50" },
                  { m: "🧸", t: "卧室-玩具", bg: "from-amber-50 via-orange-50 to-rose-50" },
                  { m: "🪴", t: "客厅-玩偶", bg: "from-emerald-50 via-green-50 to-lime-50" },
                  { m: "🧸", t: "万圣节-吊环", bg: "from-amber-100 via-orange-50 to-rose-100" },
                  { m: "🪟", t: "窗户", bg: "from-sky-100 via-indigo-50 to-white" },
                  { m: "🏝️", t: "沙滩", bg: "from-amber-50 via-orange-50 to-rose-50" },
                  { m: "🎨", t: "艺术", bg: "from-rose-50 via-pink-50 to-purple-50" },
                  { m: "🛋️", t: "沙发", bg: "from-slate-100 via-gray-50 to-white" },
                  { m: "🪷", t: "花丛", bg: "from-pink-50 via-rose-50 to-emerald-50" },
                  { m: "🌄", t: "日落", bg: "from-orange-50 via-amber-50 to-rose-100" },
                  { m: "🪴", t: "绿植", bg: "from-emerald-100 via-green-50 to-lime-50" },
                  { m: "🛋️", t: "床品", bg: "from-slate-50 via-white to-rose-50" },
                  { m: "✨", t: "更多...", bg: "from-gray-50 via-white to-gray-100" },
                ].map((x, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 overflow-hidden bg-white hover:border-[#A78BFA] transition cursor-pointer group relative"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${x.bg} flex items-center justify-center text-[72px]`}>
                      <div>{x.m}</div>
                      <div className="absolute left-2 bottom-2 w-[52px] h-[52px] rounded-lg bg-white/95 border border-gray-100 shadow-sm flex items-center justify-center text-[22px]">
                        {i % 8 === 0 ? "🏞️" : i % 8 === 1 ? "🫖" : i % 8 === 2 ? "🛋️" : i % 8 === 3 ? "🧺" : i % 8 === 4 ? "🧴" : i % 8 === 5 ? "🪷" : i % 8 === 6 ? "🧸" : "🪴"}
                      </div>
                      <button className="absolute right-2 bottom-2 px-2 py-1 rounded-md text-[11px] bg-white/95 border border-gray-100 text-[#8B5CF6] font-medium opacity-0 group-hover:opacity-100 transition">
                        做同款
                      </button>
                    </div>
                    <div className="px-2.5 py-2 flex items-center justify-between">
                      <div className="text-[11.5px] font-medium text-gray-700 truncate">{x.t}</div>
                      <button className="opacity-0 group-hover:opacity-100 transition w-6 h-6 rounded hover:bg-[#F5F3FF] flex items-center justify-center">
                        <span className="text-[12px]">♥</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {productSub === "history" && (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                <div className="text-[12.5px] font-medium text-gray-800 flex items-center gap-1">
                  <History className="w-3.5 h-3.5 text-gray-500" /> 商品图生成历史
                </div>
                <span className="text-[11px] text-gray-400">最近 30 天</span>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4">
                {[
                  { id: "T001", name: "北欧保温咖啡杯 500ml", count: 9, status: "done", time: "2小时前", thumb: "linear-gradient(135deg,#DDE8F8,#A9C0E5)" },
                  { id: "T002", name: "便携陶瓷马克杯", count: 12, status: "done", time: "3小时前", thumb: "linear-gradient(135deg,#FBE5D6,#E39667)" },
                  { id: "T003", name: "瑜伽垫 TPE 环保 10mm", count: 8, status: "done", time: "4小时前", thumb: "linear-gradient(135deg,#FBE0EC,#F7A7C4)" },
                  { id: "T004", name: "户外折叠太阳能灯", count: 9, status: "generating", time: "生成中", thumb: "linear-gradient(135deg,#EAEAFD,#A48EE4)" },
                  { id: "T005", name: "厨房硅胶煎蛋铲套装", count: 6, status: "done", time: "昨天", thumb: "linear-gradient(135deg,#D8EFD3,#8FD0A8)" },
                  { id: "T006", name: "便携电动打蛋器", count: 4, status: "done", time: "昨天", thumb: "linear-gradient(135deg,#E5E9F0,#CFD6E4)" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-[#A78BFA] transition cursor-pointer group relative"
                  >
                    <div className="aspect-square flex items-center justify-center" style={{ background: item.thumb }}>
                      <div className="text-[48px] opacity-0.3 group-hover:opacity-100 transition">📷</div>
                    </div>
                    <div className="px-3 py-2.5">
                      <div className="text-[13px] font-medium text-gray-800 truncate">{item.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-[11px] text-gray-400">{item.time}</div>
                        <div className={`text-[11px] px-1.5 py-0.5 rounded ${item.status === "done" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
                          {item.status === "done" ? `${item.count}张` : "生成中"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ==================== TOOL: PRODUCT REPLACE ====================

  const productReplacePanel = section(
    "商品替换",
    "上传参考图，一键替换商品，快来替换您的商品吧~",
    <>
      <div className="px-5 py-3 bg-[#FFFBEB] border-b border-[#FDE68A] text-[11.5px] text-amber-800 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-600" /> 温馨提示：支持上传多张商品图进行批量替换
      </div>
      <div className="px-5 py-4 space-y-4">
        <div>
          <div className="text-[12px] text-gray-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1"><Upload className="w-3 h-3" /> 参考场景图（含商品的原图）</span>
            {refUploaded && <button onClick={() => setRefUploaded(false)} className="text-[10px] text-gray-400 hover:text-red-500">× 重新上传</button>}
          </div>
          <div
            onClick={() => setRefUploaded(true)}
            className={`cursor-pointer h-[180px] rounded-xl border-2 border-dashed ${refUploaded ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-1.5 overflow-hidden relative`}
          >
            {refUploaded ? (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50 flex items-center justify-center">
                <div className="relative">
                  <div className="text-[48px]">🪔</div>
                  <div className="absolute -inset-3 border-2 border-dashed border-[#A78BFA] rounded-xl opacity-60" />
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400" />
                <div className="text-[12px] text-gray-600 font-medium">点击上传参考图</div>
                <div className="text-[10.5px] text-gray-400">PNG / JPG，建议清晰完整的商品场景</div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#8B5CF6]"><ArrowRight className="w-4 h-4" /></div>
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1"><Image className="w-3 h-3" /> 商品图（要替换成的目标商品）</span>
            {targetUploaded && <button onClick={() => setTargetUploaded(false)} className="text-[10px] text-gray-400 hover:text-red-500">× 重新上传</button>}
          </div>
          <div
            onClick={() => setTargetUploaded(true)}
            className={`cursor-pointer h-[180px] rounded-xl border-2 border-dashed ${targetUploaded ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-1.5 overflow-hidden relative`}
          >
            {targetUploaded ? (
              <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
                <div className="relative">
                  <div className="text-[48px] drop-shadow-sm">💡</div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent rotate-[-20deg]" />
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8B5CF6] font-medium whitespace-nowrap">透明底商品</div>
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400" />
                <div className="text-[12px] text-gray-600 font-medium">点击上传商品图</div>
                <div className="text-[10.5px] text-gray-400">建议白底或透明底，商品居中</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 space-y-3">
        <div className="text-[12px] text-gray-700 flex items-center gap-1"><Sliders className="w-3 h-3" /> 场景相似度</div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-500 w-6">不变</span>
          <input type="range" min={0} max={100} value={similarity} onChange={(e) => setSimilarity(Number(e.target.value))} className="flex-1 accent-[#8B5CF6]" />
          <span className="text-[11px] text-[#8B5CF6] font-medium w-6">高</span>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 space-y-2.5">
        <div className="text-[12px] text-gray-700">生成尺寸</div>
        <div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-[12px] text-gray-700 flex items-center justify-between">
          <span>1024 × 1024</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="text-[12px] text-gray-700">生成张数</div>
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {[1, 2, 4, 6].map((n) => (
            <button key={n} onClick={() => setCount(n)} className={`min-w-[36px] px-3 py-1 rounded-md text-[12.5px] transition ${count === n ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}>{n}张</button>
          ))}
        </div>
      </div>
    </>,
    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
      <div className="text-[11.5px] text-red-500">⚠️ 首次生成，消耗 12 星币 / 张</div>
      <button
        onClick={handleGenerate}
        disabled={generating || !refUploaded || !targetUploaded}
        className="h-[40px] px-6 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-purple-200"
      >
        <Play className="w-3.5 h-3.5" />
        {generating ? "正在生成..." : "立即生成（40星币）"}
      </button>
    </div>
  );

  const productReplacePreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      {generating && <div className="mb-4 inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm text-[12px] text-[#8B5CF6] border border-[#DDD6FE]"><div className="w-3 h-3 rounded-full bg-[#8B5CF6] animate-pulse" />商品替换中 · 参考场景 + {similarity >= 70 ? "高相似" : similarity >= 30 ? "中等" : "自由"} · {count}张</div>}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 flex items-center gap-1 border-b border-gray-100">
          <button className="px-3 py-1 rounded-md text-[12.5px] bg-[#F5F3FF] text-[#8B5CF6] font-medium flex items-center gap-1"><Sparkles className="w-3 h-3" /> 生成结果</button>
          <button className="px-3 py-1 rounded-md text-[12.5px] text-gray-600 hover:text-[#8B5CF6] flex items-center gap-1"><Lightbulb className="w-3 h-3" /> 优秀案例</button>
          <div className="flex-1" />
          <span className="text-[11px] text-gray-400 flex items-center gap-1"><History className="w-3 h-3" /> 历史记录</span>
        </div>
        {!refUploaded && !targetUploaded && (
          <div className="h-[520px] flex flex-col items-center justify-center text-center text-gray-400">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3"><Image className="w-8 h-8 text-gray-300" /></div>
            <div className="text-[14px] font-medium text-gray-600 mb-1">暂无生成结果图</div>
            <div className="text-[12px] text-gray-400">快在左侧合成您的第一张商品图吧~</div>
          </div>
        )}
        {refUploaded && targetUploaded && !generating && !done && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 relative aspect-square bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50 flex items-center justify-center"><div className="text-[72px]">🪔</div><div className="absolute top-2 left-2 text-[10px] bg-white/80 px-2 py-0.5 rounded text-gray-600">参考场景图</div></div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 relative aspect-square bg-gray-100 flex items-center justify-center"><div className="text-[72px]">💡</div><div className="absolute top-2 left-2 text-[10px] bg-white/80 px-2 py-0.5 rounded text-gray-600">目标商品图</div><div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /><div className="absolute bottom-12 right-12 w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /></div>
            </div>
            <div className="text-center text-[11px] text-gray-400">点击「立即生成」即可得到替换结果</div>
          </div>
        )}
        {generating && (
          <div className="p-5 grid grid-cols-2 gap-4">{Array.from({ length: count }).map((_, i) => (<div key={i} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square bg-gradient-to-br from-[#EDE9FE]/60 via-white to-[#F5F3FF] flex items-center justify-center"><RotateCcw className="w-6 h-6 text-[#A78BFA] animate-spin" /></div>))}</div>
        )}
        {done && (
          <div className="p-5">
            <div className="mb-4 bg-[#F0FDF4] border border-[#BBF7D0] text-[14px] text-[#166534] px-4 py-3 rounded-xl flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#22C55E] text-white flex items-center justify-center text-[11px]">✓</div>
              <span className="font-medium">商品替换完成！已为你生成 {count} 张结果图</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 relative aspect-square bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50 flex items-center justify-center"><div className="text-[72px]">🪔</div><div className="absolute bottom-3 right-3 bg-white/90 text-[10px] text-gray-600 px-2 py-0.5 rounded">Before</div></div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 relative aspect-square bg-gradient-to-br from-orange-50 via-amber-100 to-rose-100 flex items-center justify-center"><div className="text-[72px]">💡</div><div className="absolute inset-0 pointer-events-none"><div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 text-[10px] font-semibold text-[#8B5CF6] shadow-sm flex items-center gap-1"><ArrowRight className="w-3 h-3" /> 自动替换商品</div></div><div className="absolute bottom-3 right-3 bg-[#8B5CF6] text-white text-[10px] px-2 py-0.5 rounded">After</div></div>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button className="h-[38px] px-5 rounded-lg text-[12.5px] bg-white text-gray-700 border border-gray-200 flex items-center gap-1.5"><DownloadIcon /> 下载全部</button>
              <button onClick={handleGenerate} className="h-[38px] px-5 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] flex items-center gap-1.5 shadow-md shadow-purple-200"><RotateCcw className="w-3 h-3" /> 再来一次</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ==================== TOOL: SCENE FISSION ====================

  const [fissionDesc, setFissionDesc] = useState("");
  const [fissionSizeMode, setFissionSizeMode] = useState<"default" | "custom">("default");
  const [fissionCustomW, setFissionCustomW] = useState(1024);
  const [fissionCustomH, setFissionCustomH] = useState(1024);
  const [fissionLockRatio, setFissionLockRatio] = useState(true);
  const [fissionSizeOpen, setFissionSizeOpen] = useState(false);
  const [fissionStyle, setFissionStyle] = useState<"realistic" | "minimal" | "retro" | "warm">("realistic");
  const [fissionTab, setFissionTab] = useState<"result" | "examples">("result");
  const [fissionLibOpen, setFissionLibOpen] = useState(false);
  const [fissionLibTab, setFissionLibTab] = useState<"mine" | "history">("mine");
  const [fissionLibSelected, setFissionLibSelected] = useState<number[]>([]);
  const [productLibOpen, setProductLibOpen] = useState(false);
  const fissionStyles = [
    { key: "realistic" as const, name: "写实", bg: "from-amber-100 via-orange-50 to-amber-50", e: "☕" },
    { key: "minimal" as const, name: "简约", bg: "from-slate-100 via-gray-50 to-white", e: "🛋️" },
    { key: "retro" as const, name: "复古", bg: "from-amber-200 via-orange-100 to-rose-100", e: "📷" },
    { key: "warm" as const, name: "暖调", bg: "from-rose-100 via-pink-50 to-amber-50", e: "🌅" },
  ];

  const sceneFissionPanel = section(
    "场景裂变",
    "上传商品场景参考图，3 秒裂变相似的多张场景图",
    <>
      <div className="px-5 py-3 space-y-3">
        <div className="relative">
          <div
            onClick={() => setSceneSource(true)}
            className={`cursor-pointer h-[170px] rounded-xl border-2 border-dashed ${sceneSource ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-1.5 overflow-hidden`}
          >
            {sceneSource ? (
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 flex items-center justify-center">
                <div className="text-[56px]">🏞️</div>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] flex items-center justify-center">
                  <div className="w-5 h-5 rounded border-[#A78BFA] border-2 flex flex-col items-center justify-center gap-px">
                    <div className="w-2 h-1 rounded-sm bg-[#8B5CF6]" />
                    <div className="w-1 h-1 rounded-full bg-[#A78BFA]" />
                  </div>
                </div>
                <div className="text-[12.5px] text-gray-700 font-medium">上传参考图</div>
                <div className="text-[10.5px] text-gray-400">10MB 以内，分辨率 384×384 ~ 4096×4096</div>
              </>
            )}
          </div>
          <div className="absolute left-3 bottom-3 flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setSceneSource(true); }}
              className="h-[28px] px-3 rounded-md text-[11px] text-[#8B5CF6] bg-white/95 border border-[#DDD6FE] flex items-center gap-1 hover:bg-white"
            >
              <Upload className="w-3 h-3" /> 从本地上传
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setFissionLibOpen(true); }}
              className="h-[28px] px-3 rounded-md text-[11px] text-[#8B5CF6] bg-white/95 border border-[#DDD6FE] flex items-center gap-1 hover:bg-white"
            >
              <FolderOpen className="w-3 h-3" /> 从作品库选择
            </button>
          </div>
        </div>
        <button className="w-full h-[34px] rounded-lg text-[11.5px] text-[#8B5CF6] bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center gap-1 hover:bg-[#EDE9FE]">
          <Upload className="w-3 h-3" /> 上传多图，体验新功能商品套图 →
        </button>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 space-y-3">
        <div className="bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-amber-800 px-3 py-2 rounded-lg flex items-center gap-1.5">
          <span className="text-amber-500">💡</span> 已选择智能模式，将智能引导自动生成场景
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-1.5 flex items-center justify-between">
            <span>场景描述 <span className="text-[10px] text-gray-400">（可选）</span></span>
            <button className="text-[10px] text-[#8B5CF6] hover:underline flex items-center gap-0.5">
              <Lightbulb className="w-3 h-3" /> 场景描述怎么写？
            </button>
          </div>
          <div className="relative">
            <textarea
              value={fissionDesc}
              onChange={(e) => setFissionDesc(e.target.value.slice(0, 100))}
              rows={3}
              placeholder="描述您想要的场景（在描述中包含上传的商品），例如：把水壶放在客厅茶几上。"
              className="w-full text-[11.5px] text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-[#A78BFA]"
            />
            <div className="absolute right-2 bottom-1.5 text-[10px] text-gray-400">{fissionDesc.length} / 100</div>
          </div>
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-2">生成类型</div>
          <div className="grid grid-cols-4 gap-2">
            {fissionStyles.map((s) => (
              <button
                key={s.key}
                onClick={() => setFissionStyle(s.key)}
                className={`rounded-lg overflow-hidden border-2 transition ${fissionStyle === s.key ? "border-[#8B5CF6] shadow-sm" : "border-gray-100 hover:border-gray-200"} relative aspect-square`}
              >
                <div className={`w-full h-full flex items-center justify-center text-[22px] bg-gradient-to-br ${s.bg}`}>{s.e}</div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/45 text-white text-[10px] py-0.5 text-center">{s.name}</div>
                {fissionStyle === s.key && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px]">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="text-[12px] text-gray-700 mb-2">设置生成尺寸</div>
          <div className="inline-flex rounded-lg bg-gray-100 p-1 w-full">
            <button
              onClick={() => { setFissionSizeMode("default"); setFissionSizeOpen(false); }}
              className={`flex-1 h-[34px] text-[12px] rounded-md transition ${fissionSizeMode === "default" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}
            >
              默认尺寸
            </button>
            <button
              onClick={() => { setFissionSizeMode("custom"); setFissionSizeOpen(true); }}
              className={`flex-1 h-[34px] text-[12px] rounded-md transition ${fissionSizeMode === "custom" ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}
            >
              自定义({fissionCustomW}×{fissionCustomH})
            </button>
          </div>
          {fissionSizeOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setFissionSizeOpen(false)} />
              <div className="absolute left-0 top-[52px] z-40 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#A78BFA]">
                      <input
                        type="number"
                        min={1024}
                        max={2048}
                        value={fissionCustomW}
                        onChange={(e) => {
                          const v = Math.max(1024, Math.min(2048, Number(e.target.value) || 0));
                          setFissionCustomW(v);
                          if (fissionLockRatio) {
                            setFissionCustomH(v);
                          }
                        }}
                        className="w-full h-[34px] px-3 text-[13px] text-gray-800 focus:outline-none"
                      />
                      <span className="px-2 text-[11px] text-gray-400 border-l border-gray-100">px 宽</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFissionLockRatio((v) => !v)}
                    className={`w-[34px] h-[34px] rounded-lg border flex items-center justify-center transition ${fissionLockRatio ? "bg-[#F5F3FF] border-[#DDD6FE] text-[#8B5CF6]" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}
                    title={fissionLockRatio ? "已锁定宽高比" : "已解锁"}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {fissionLockRatio ? (
                        <>
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </>
                      ) : (
                        <>
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0" />
                          <line x1="12" y1="4" x2="12" y2="1" />
                        </>
                      )}
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#A78BFA]">
                      <input
                        type="number"
                        min={1024}
                        max={2048}
                        value={fissionCustomH}
                        onChange={(e) => {
                          const v = Math.max(1024, Math.min(2048, Number(e.target.value) || 0));
                          if (fissionLockRatio) {
                            const ratio = fissionCustomW > 0 ? v / fissionCustomW : 1;
                            setFissionCustomW(Math.round(v / ratio));
                          }
                          setFissionCustomH(v);
                        }}
                        className="w-full h-[34px] px-3 text-[13px] text-gray-800 focus:outline-none"
                      />
                      <span className="px-2 text-[11px] text-gray-400 border-l border-gray-100">px 高</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 leading-relaxed">
                  注意：生成图片长边需大于 <span className="text-[#8B5CF6] font-medium">1024px</span>，小于 <span className="text-[#8B5CF6] font-medium">2048px</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-2">选择生成数量</div>
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setFissionCount(n)}
                className={`min-w-[38px] px-3 py-1.5 rounded-md text-[12px] transition ${fissionCount === n ? "bg-white shadow text-[#8B5CF6] font-medium" : "text-gray-600"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>,
    <div className="px-5 py-3 border-t border-gray-100 space-y-2">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 px-2 py-1 rounded text-[10.5px] text-red-600">
          <span>📢</span> 首次生成，原价 {fissionCount * 0.1} 积分（当月有效）
        </div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={generating || !sceneSource}
        className="w-full h-[40px] rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-purple-200"
      >
        <Play className="w-3.5 h-3.5" />
        {generating ? "裂变中..." : `立即生成（${(fissionCount * 0.1).toFixed(1)} 积分）`}
      </button>
    </div>
  );

  const fissionExamples = [
    { main: "🏕️", mainBg: "from-emerald-100 via-sky-50 to-emerald-50", orig: "🌄", origBg: "from-orange-100 via-amber-50 to-yellow-50", tag: "野外露营" },
    { main: "🛋️", mainBg: "from-slate-100 via-gray-50 to-white", orig: "📐", origBg: "from-slate-200 via-gray-100 to-slate-50", tag: "极简客厅" },
    { main: "🎧", mainBg: "from-purple-100 via-violet-50 to-indigo-50", orig: "🎧", origBg: "from-gray-900 via-purple-900 to-indigo-900", tag: "耳机桌面" },
    { main: "🥤", mainBg: "from-amber-100 via-orange-50 to-rose-50", orig: "🌿", origBg: "from-emerald-50 via-green-50 to-lime-50", tag: "保温杯" },
    { main: "🐱", mainBg: "from-emerald-50 via-teal-50 to-cyan-50", orig: "🐱", origBg: "from-slate-100 via-gray-50 to-white", tag: "猫窝" },
    { main: "☕", mainBg: "from-amber-100 via-orange-50 to-rose-50", orig: "☕", origBg: "from-amber-50 via-orange-50 to-red-50", tag: "咖啡杯" },
    { main: "🧸", mainBg: "from-rose-50 via-pink-50 to-amber-50", orig: "🧸", origBg: "from-slate-100 via-gray-50 to-white", tag: "玩具马" },
    { main: "🌿", mainBg: "from-emerald-100 via-green-50 to-lime-50", orig: "🌿", origBg: "from-emerald-50 via-green-50 to-lime-50", tag: "绿植" },
    { main: "🛏️", mainBg: "from-rose-50 via-amber-50 to-slate-50", orig: "🛏️", origBg: "from-slate-100 via-gray-50 to-white", tag: "卧室" },
  ];

  const sceneFissionPreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      <div className="flex items-center gap-0 border-b border-gray-200 mb-4">
        <button
          onClick={() => setFissionTab("result")}
          className={`px-4 py-2.5 text-[13px] flex items-center gap-1 transition relative ${fissionTab === "result" ? "text-[#8B5CF6] font-medium" : "text-gray-600 hover:text-gray-800"}`}
        >
          <Sparkles className="w-3.5 h-3.5" /> 生成结果
          {fissionTab === "result" && <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#8B5CF6]" />}
        </button>
        <button
          onClick={() => setFissionTab("examples")}
          className={`px-4 py-2.5 text-[13px] flex items-center gap-1 transition relative ${fissionTab === "examples" ? "text-[#8B5CF6] font-medium" : "text-gray-600 hover:text-gray-800"}`}
        >
          <Lightbulb className="w-3.5 h-3.5" /> 优秀案例
          {fissionTab === "examples" && <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#8B5CF6]" />}
        </button>
        <div className="flex-1" />
        <button className="text-[12px] text-gray-500 hover:text-[#8B5CF6] flex items-center gap-1">
          <History className="w-3.5 h-3.5" /> 历史记录
        </button>
      </div>

      {fissionTab === "result" && (
        <>
          <div className="mb-4 text-center">
            <div className="text-[15px] text-gray-700 font-medium">上传商品场景参考图，3 秒裂变多张相似的场景图，快来裂变您的场景图吧~</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-[560px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-5">
                {!sceneSource && (
                  <div className="aspect-[4/3] flex flex-col items-center justify-center text-center text-gray-400">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#F3F4F6] flex items-center justify-center mb-2"><Layers className="w-7 h-7 text-gray-300" /></div>
                    <div className="text-[13.5px] text-gray-600">上传参考图后即可开始裂变</div>
                  </div>
                )}
                {sceneSource && !generating && !done && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 flex items-center justify-center">
                      <div className="text-[72px]">🏞️</div>
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">上传商品场景参考图</div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
                      <div className="text-[56px] opacity-30">✨</div>
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">生成结果</div>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#8B5CF6]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
                {generating && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 flex items-center justify-center">
                      <div className="text-[72px]">🏞️</div>
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">上传商品场景参考图</div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-white flex items-center justify-center">
                      <RotateCcw className="w-7 h-7 text-[#A78BFA] animate-spin" />
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">生成结果</div>
                    </div>
                  </div>
                )}
                {done && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 flex items-center justify-center">
                      <div className="text-[72px]">🏞️</div>
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">上传商品场景参考图</div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br from-rose-100 via-orange-50 to-amber-50 flex items-center justify-center">
                      <div className="text-[68px]">🛋️</div>
                      <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] px-2 py-0.5 rounded-full">生成结果</div>
                      <div className="absolute right-3 top-16 flex flex-col gap-1">
                        <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/80 flex items-center justify-center text-white text-[10px]">1</div>
                        <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/60 flex items-center justify-center text-white text-[10px]">2</div>
                        <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/40 flex items-center justify-center text-white text-[10px]">3</div>
                      </div>
                    </div>
                  </div>
                )}
                {sceneSource && done && (
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {[1, 2].map((i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${i === 1 ? "bg-[#8B5CF6]" : "bg-gray-300"}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="h-[34px] px-4 rounded-lg text-[12px] bg-white text-gray-600 border border-gray-200 hover:border-gray-300 flex items-center gap-1.5"><DownloadIcon /> 下载</button>
                      <button onClick={handleGenerate} className="h-[34px] px-5 rounded-lg text-[12px] text-white bg-gradient-to-r from-[#6366F1] to-[#4F46E5] flex items-center gap-1.5 shadow-sm shadow-indigo-200"><Sparkles className="w-3 h-3" /> 一键做同款</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {fissionTab === "examples" && (
        <div className="grid grid-cols-3 gap-4 pr-1">
          {fissionExamples.map((ex, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md hover:border-[#DDD6FE] transition group cursor-pointer">
              <div className={`aspect-[4/3] bg-gradient-to-br ${ex.mainBg} flex items-center justify-center relative`}>
                <div className="text-[88px]">{ex.main}</div>
                <div className="absolute left-3 bottom-3 w-[68px] h-[68px] rounded-lg overflow-hidden bg-white/90 backdrop-blur border border-gray-200 flex flex-col">
                  <div className="flex-1 bg-gradient-to-br relative">
                    <div className={`w-full h-full bg-gradient-to-br ${ex.origBg} flex items-center justify-center`}>
                      <div className="text-[26px]">{ex.orig}</div>
                    </div>
                  </div>
                  <div className="px-1.5 py-0.5 text-[9.5px] text-gray-500 bg-white border-t border-gray-100 flex items-center justify-between">
                    <span>原图</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  </div>
                </div>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-medium text-gray-800">{ex.tag}</div>
                  <div className="text-[10px] text-gray-400">场景裂变 · 示例 #{i + 1}</div>
                </div>
                <button
                  onClick={() => { setFissionTab("result"); setSceneSource(true); setRefUploaded(true); }}
                  className="h-[28px] px-3 rounded-md text-[11px] text-[#8B5CF6] bg-[#F5F3FF] border border-[#DDD6FE] hover:bg-[#EDE9FE] flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> 做同款
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ==================== TOOL: IMAGE TRANSLATE ====================

  const imageTranslatePanel = section(
    "图片翻译",
    "一键把商品图里的文案翻译成任意语言",
    <>
      <div className="px-5 py-3 space-y-3">
        <div onClick={() => setTranslateSrc(true)} className={`cursor-pointer h-[200px] rounded-xl border-2 border-dashed ${translateSrc ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-2 overflow-hidden relative`}>
          {translateSrc ? (<div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-violet-100 flex items-center justify-center"><div className="relative"><div className="text-[56px]">📦</div><div className="absolute left-1/2 -translate-x-1/2 bottom-[-24px] bg-white text-[10px] px-2 py-0.5 rounded shadow-sm font-medium">"PUREZZA 360°"</div></div></div>) : (<><Upload className="w-6 h-6 text-gray-400" /><div className="text-[12.5px] text-gray-700 font-medium">上传含文案的商品图</div><div className="text-[11px] text-gray-400">PNG / JPG，支持多语言识别</div></>)}
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-2 flex items-center justify-between"><span>目标语言</span><button className="text-[10px] text-gray-400 hover:text-[#8B5CF6] flex items-center gap-0.5"><RotateCcw className="w-3 h-3" /> 自动识别源语言</button></div>
          <div className="grid grid-cols-4 gap-2">{[
            { k: "US", l: "英语", f: "🇺🇸" }, { k: "GB", l: "英语", f: "🇬🇧" }, { k: "DE", l: "德语", f: "🇩🇪" }, { k: "FR", l: "法语", f: "🇫🇷" },
            { k: "ES", l: "西语", f: "🇪🇸" }, { k: "IT", l: "意语", f: "🇮🇹" }, { k: "JP", l: "日语", f: "🇯🇵" }, { k: "KR", l: "韩语", f: "🇰🇷" },
            { k: "RU", l: "俄语", f: "🇷🇺" }, { k: "PT", l: "葡语", f: "🇵🇹" }, { k: "AR", l: "阿语", f: "🇸🇦" }, { k: "TH", l: "泰语", f: "🇹🇭" },
          ].map((x) => (<button key={x.k} onClick={() => setTranslateLang(x.k)} className={`h-[38px] rounded-lg text-[12px] transition ${translateLang === x.k ? "bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE] font-medium" : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-[#C4B5FD]"}`}><div>{x.f}</div><div className="text-[9.5px]">{x.l}</div></button>))}</div>
        </div>
      </div>
    </>,
    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
      <div className="text-[11.5px] text-red-500">⚠️ 每张图 8 星币</div>
      <button onClick={handleGenerate} disabled={generating || !translateSrc} className="h-[40px] px-6 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-purple-200"><Play className="w-3.5 h-3.5" />{generating ? "翻译中..." : `翻译 → ${translateLang}`}</button>
    </div>
  );

  const imageTranslatePreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 flex items-center gap-1 border-b border-gray-100">
          <button className="px-3 py-1 rounded-md text-[12.5px] bg-[#F5F3FF] text-[#8B5CF6] font-medium flex items-center gap-1">翻译结果</button>
          <div className="flex-1" />
        </div>
        {!translateSrc && (
          <div className="h-[480px] flex flex-col items-center justify-center text-center text-gray-400">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3"><Languages className="w-8 h-8 text-gray-300" /></div>
            <div className="text-[14px] text-gray-600 mb-1">上传含文字的商品图开始翻译</div>
          </div>
        )}
        {translateSrc && (
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-gray-100 aspect-square bg-gradient-to-br from-rose-100 via-pink-50 to-violet-100 flex items-center justify-center relative">
                <div className="text-[56px]">📦</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1 rounded-full text-[11px] shadow-sm font-medium text-gray-600">PUREZZA 360°</div>
                <div className="absolute top-3 right-3 text-[10px] bg-white/90 px-2 py-0.5 rounded">原文 IT 🇮🇹</div>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-100 aspect-square bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex items-center justify-center relative">
                <div className="text-[56px]">📦</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1 rounded-full text-[11px] shadow-sm font-semibold text-[#8B5CF6]">PURITY 360°</div>
                <div className="absolute top-3 right-3 text-[10px] bg-[#F5F3FF] text-[#8B5CF6] px-2 py-0.5 rounded">译文 {translateLang}</div>
                <div className="absolute top-3 left-3"><ArrowRight className="w-5 h-5 text-[#8B5CF6]" /></div>
              </div>
            </div>
            {done && <div className="mt-5 flex items-center justify-center gap-2"><button className="h-[38px] px-5 rounded-lg text-[12.5px] bg-white text-gray-700 border border-gray-200 flex items-center gap-1.5"><DownloadIcon /> 下载译文</button><button onClick={handleGenerate} className="h-[38px] px-5 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] flex items-center gap-1.5 shadow-md shadow-purple-200"><RotateCcw className="w-3 h-3" /> 换个语种</button></div>}
          </div>
        )}
      </div>
    </div>
  );

  // ==================== TOOL: HANDHELD ====================

  const handheldPanel = section(
    "手持商品",
    "让真人拿起你的商品，营造真实使用场景",
    <>
      <div className="px-5 py-3 space-y-3">
        <div onClick={() => setHandheldSrc(true)} className={`cursor-pointer h-[180px] rounded-xl border-2 border-dashed ${handheldSrc ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-1.5 overflow-hidden relative`}>
          {handheldSrc ? (<div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 flex items-center justify-center"><div className="text-[72px]">🥤</div></div>) : (<><Upload className="w-6 h-6 text-gray-400" /><div className="text-[12.5px] text-gray-700 font-medium">上传商品图（建议白底）</div><div className="text-[11px] text-gray-400">10M 以内，PNG/JPG</div></>)}
        </div>
        <div>
          <div className="text-[12px] text-gray-700 mb-2">持握角度</div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-500">前倾</span>
            <input type="range" min={-30} max={30} value={handheldAngle} onChange={(e) => setHandheldAngle(Number(e.target.value))} className="flex-1 accent-[#8B5CF6]" />
            <span className="text-[11px] text-gray-500">后仰</span>
          </div>
          <div className="text-[10.5px] text-gray-400 mt-1 text-right">{handheldAngle}°</div>
        </div>
      </div>
    </>,
    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
      <div className="text-[11.5px] text-red-500">⚠️ 4 张 · 18 星币</div>
      <button onClick={handleGenerate} disabled={generating || !handheldSrc} className="h-[40px] px-6 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-purple-200"><Play className="w-3.5 h-3.5" />{generating ? "生成中..." : "立即生成"}</button>
    </div>
  );

  const handheldPreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 flex items-center gap-1 border-b border-gray-100">
          <button className="px-3 py-1 rounded-md text-[12.5px] bg-[#F5F3FF] text-[#8B5CF6] font-medium flex items-center gap-1">手持结果</button>
          <div className="flex-1" />
        </div>
        {!handheldSrc && (
          <div className="h-[480px] flex flex-col items-center justify-center text-center text-gray-400">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3"><Hand className="w-8 h-8 text-gray-300" /></div>
            <div className="text-[14px] text-gray-600 mb-1">上传商品图开始生成手持图</div>
          </div>
        )}
        {handheldSrc && (
          <div className="p-5 grid grid-cols-2 gap-4">
            {[
              { bg: "from-rose-100 to-orange-100", e: "👋" },
              { bg: "from-sky-100 to-emerald-100", e: "🤳" },
              { bg: "from-violet-100 to-pink-100", e: "✋" },
              { bg: "from-amber-100 to-rose-100", e: "🤙" },
            ].map((x, i) => (
              <div key={i} className={`rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gradient-to-br ${x.bg} relative`}>
                <div className="absolute right-8 bottom-12 text-[64px] rotate-[-8deg]">🥤</div>
                <div className="absolute left-4 bottom-3 text-[40px]">{x.e}</div>
                <div className="absolute top-3 right-3 text-[10px] bg-white/90 px-2 py-0.5 rounded text-gray-700 font-medium">#{i + 1}</div>
              </div>
            ))}
            {done && <div className="col-span-2 mt-2 flex items-center justify-center gap-2"><button className="h-[38px] px-5 rounded-lg text-[12.5px] bg-white text-gray-700 border border-gray-200 flex items-center gap-1.5"><DownloadIcon /> 下载全部</button><button onClick={handleGenerate} className="h-[38px] px-5 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] flex items-center gap-1.5 shadow-md shadow-purple-200"><RotateCcw className="w-3 h-3" /> 再来一次</button></div>}
          </div>
        )}
      </div>
    </div>
  );

  // ==================== TOOL: MY PRODUCTS ====================

  const myProductsPanel = section(
    "我的商品",
    "统一管理你的商品素材，随时拖入生成",
    <>
      <div className="px-5 py-3 space-y-2">
        <div className="relative">
          <input
            placeholder="搜索商品 / SKU"
            className="w-full h-[36px] pl-9 pr-3 rounded-lg bg-gray-50 border border-gray-200 text-[12px] focus:outline-none focus:border-[#A78BFA]"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[12px]">🔍</div>
        </div>
        <div className="flex gap-2">
          {["全部", "数码", "家居", "户外", "美妆"].map((t, i) => (
            <button
              key={t}
              className={`px-3 py-1 rounded-full text-[11px] ${i === 0 ? "bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]" : "bg-gray-50 text-gray-500 border border-gray-200"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-3 grid grid-cols-2 gap-2.5">
        {myProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => setTool("product")}
            className="rounded-xl border border-gray-200 overflow-hidden hover:border-[#A78BFA] cursor-pointer transition bg-white group"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center text-[40px]">
              {p.img}
            </div>
            <div className="px-2.5 py-2">
              <div className="text-[11.5px] font-medium text-gray-800 truncate">{p.name}</div>
              <div className="text-[10px] text-gray-400">{p.sku}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100">
        <div className="inline-flex w-full rounded-lg bg-gray-100 p-1">
          <button className="flex-1 h-[32px] text-[12px] text-gray-600 hover:text-[#8B5CF6]">🗂 批量导入</button>
          <button className="flex-1 h-[32px] text-[12px] text-gray-600 hover:text-[#8B5CF6]">📤 导出 SKU</button>
        </div>
      </div>
    </>,
  );

  const myProductsPreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
          <div className="text-[12.5px] font-medium text-gray-800 flex items-center gap-1">
            <FolderOpen className="w-3.5 h-3.5 text-gray-500" /> 我的商品素材
          </div>
          <span className="text-[11px] text-gray-400">共 {myProducts.length} 件</span>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          {myProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-[#A78BFA] transition cursor-pointer group relative"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center text-[64px]">
                {p.img}
              </div>
              <div className="px-3 py-2.5">
                <div className="text-[13px] font-medium text-gray-800 truncate">{p.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">SKU：{p.sku}</div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setTool("product"); setUploaded(true); }}
                  className="w-8 h-8 rounded-lg bg-white/90 shadow-sm text-gray-600 hover:text-[#8B5CF6] flex items-center justify-center"
                  title="开始生成"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setTool("product-replace"); setTargetUploaded(true); }}
                  className="w-8 h-8 rounded-lg bg-white/90 shadow-sm text-gray-600 hover:text-[#8B5CF6] flex items-center justify-center"
                  title="拿去替换"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const [sceneRefUploaded, setSceneRefUploaded] = useState(false);

  const sceneRefPanel = section(
    "场景参考图",
    "保存高质量的场景参考，复用到任意生成",
    <>
      <div className="px-5 py-3">
        <div
          onClick={() => setSceneRefUploaded(true)}
          className={`cursor-pointer h-[190px] rounded-xl border-2 border-dashed ${sceneRefUploaded ? "border-[#A78BFA] bg-[#FAF5FF]" : "border-gray-200 bg-white"} flex flex-col items-center justify-center gap-2 overflow-hidden relative`}
        >
          {sceneRefUploaded ? (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 flex items-center justify-center"><div className="text-[64px]">🏙️</div></div>
          ) : (
            <>
              <Upload className="w-6 h-6 text-gray-400" />
              <div className="text-[12.5px] text-gray-700 font-medium">上传参考场景图</div>
              <div className="text-[11px] text-gray-400">PNG / JPG · 光影、构图、氛围越丰富越好</div>
            </>
          )}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 space-y-2.5">
        <div className="text-[12px] text-gray-700">收藏夹（快速选择）</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { e: "🏔️", n: "户外自然" },
            { e: "🏠", n: "居家客厅" },
            { e: "🏢", n: "办公桌面" },
            { e: "☕", n: "咖啡桌面" },
            { e: "🛋️", n: "极简陈列" },
            { e: "🎨", n: "艺术氛围" },
          ].map((x) => (
            <button
              key={x.n}
              onClick={() => setSceneRefUploaded(true)}
              className="aspect-square rounded-xl border border-gray-200 bg-white hover:border-[#A78BFA] flex flex-col items-center justify-center gap-0.5"
            >
              <span className="text-[28px]">{x.e}</span>
              <span className="text-[10.5px] text-gray-600">{x.n}</span>
            </button>
          ))}
        </div>
      </div>
    </>,
    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
      <div className="text-[11.5px] text-gray-500">提示：选好场景后可去「商品替换」一键合成</div>
      <button
        onClick={() => { if (sceneRefUploaded) { setTool("product-replace"); setRefUploaded(true); } }}
        disabled={!sceneRefUploaded}
        className="h-[36px] px-4 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
      >
        <ArrowRight className="w-3 h-3" /> 去商品替换
      </button>
    </div>,
  );

  const sceneRefPreview = (
    <div className="flex-1 p-6 bg-[#F5F7FB] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
          <div className="text-[12.5px] font-medium text-gray-800 flex items-center gap-1">
            <ScanLine className="w-3.5 h-3.5 text-gray-500" /> 参考场景图库
          </div>
          <div className="text-[11px] text-gray-400">双击可作为参考图</div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              onClick={() => { setSceneRefUploaded(true); setRefUploaded(true); setTool("product-replace"); }}
              className="rounded-xl border border-gray-100 overflow-hidden aspect-[4/3] bg-white hover:border-[#A78BFA] hover:shadow-md transition cursor-pointer relative"
            >
              <div
                className="w-full h-full flex items-center justify-center text-[56px]"
                style={{
                  background: [
                    "linear-gradient(135deg,#FDE68A 0%,#FCA5A5 50%,#FBCFE8 100%)",
                    "linear-gradient(135deg,#BAE6FD 0%,#A5F3FC 50%,#C7D2FE 100%)",
                    "linear-gradient(135deg,#DBEAFE 0%,#E9D5FF 60%,#FBCFE8 100%)",
                  ][i % 3],
                }}
              >
                {["🪔", "☕", "🧴", "🌱", "📦", "🛋️", "🥂", "📷", "🕯️"][i]}
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] bg-black/45 text-white px-2 py-0.5 rounded">
                参考 #{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================

  let activePanel: React.ReactNode;
  let activePreview: React.ReactNode;

  switch (tool) {
    case "product":
      activePanel = productPanel;
      activePreview = productPreview;
      break;
    case "product-replace":
      activePanel = productReplacePanel;
      activePreview = productReplacePreview;
      break;
    case "scene-fission":
      activePanel = sceneFissionPanel;
      activePreview = sceneFissionPreview;
      break;
    case "image-translate":
      activePanel = imageTranslatePanel;
      activePreview = imageTranslatePreview;
      break;
    case "handheld":
      activePanel = handheldPanel;
      activePreview = handheldPreview;
      break;
    case "my-products":
      activePanel = myProductsPanel;
      activePreview = myProductsPreview;
      break;
    case "scene-ref":
      activePanel = sceneRefPanel;
      activePreview = sceneRefPreview;
      break;
    default:
      activePanel = productPanel;
      activePreview = productPreview;
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-[200px] shrink-0 bg-white border-r border-gray-100 py-4">
        <div className="px-4 pb-2 text-[11.5px] text-gray-400 font-medium tracking-wide">商品图 · 工具箱</div>
        {mainTools.map((t) => {
          const active = tool === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTool(t.key)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] transition ${active ? "bg-[#F5F3FF] text-[#7C3AED] font-medium border-r-2 border-[#8B5CF6]" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Icon className={`w-[16px] h-[16px] ${active ? "text-[#8B5CF6]" : "text-gray-400"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
        <div className="mt-4 mx-4 rounded-xl p-3 bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE]">
          <div className="text-[11px] text-[#5B21B6] font-medium">✨ Pro 会员</div>
          <div className="text-[10.5px] text-[#6D28D9] mt-0.5 leading-snug">解锁无限商品替换 & 高清 4K</div>
        </div>
      </div>
      {activePanel}
      {activePreview}
      {floatingUI}

      {productLibOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setProductLibOpen(false)} />
          <div className="fixed z-50 top-[6%] left-1/2 -translate-x-1/2 w-[880px] h-[620px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-gray-100">
              <div className="flex items-center gap-0">
                <button
                  className="px-4 py-2.5 text-[13px] text-[#8B5CF6] font-medium relative"
                >
                  我的
                  <div className="absolute left-2 right-2 -bottom-[1px] h-[2px] bg-[#8B5CF6]" />
                </button>
                <button
                  className="px-4 py-2.5 text-[13px] text-gray-600 hover:text-gray-800 transition relative"
                >
                  历史作图
                </button>
              </div>
              <button
                onClick={() => setProductLibOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex min-h-0">
              <div className="flex-1 flex flex-col border-r border-gray-100">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[12px] text-gray-700">
                    <span>商品素材</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span>商品图</span>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-gray-700">
                    <span>标签</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-[#FAFBFD] flex flex-col items-center justify-center text-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-3">
                    <Upload className="w-7 h-7 text-gray-300" />
                  </div>
                  <div className="text-[14px] text-gray-700 font-medium">暂无传过的图</div>
                  <div className="text-[11.5px] text-gray-400 mt-1.5">去「商品图」上传后即可在此选择</div>
                  <button
                    onClick={() => { setProductLibOpen(false); setMode("upload"); }}
                    className="mt-5 h-[34px] px-5 rounded-lg text-[12px] text-[#8B5CF6] bg-white border border-[#DDD6FE] hover:bg-[#F5F3FF] flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> 去从本地上传
                  </button>
                </div>
              </div>

              <div className="w-[260px] flex flex-col bg-white">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="text-[13px] text-gray-800 font-medium">已选图片 (0/5)</div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 flex flex-col items-center justify-center text-center bg-[#FAFBFD]">
                  <div className="w-[56px] h-[56px] rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-2">
                    <FolderOpen className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="text-[12.5px] text-gray-500">暂无已选图片</div>
                  <div className="text-[10.5px] text-gray-400 mt-1">最多可选择 5 张</div>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => { setProductLibOpen(false); setMode("upload"); }}
                    className="flex-1 h-[36px] rounded-lg text-[12px] text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    disabled
                    className="flex-1 h-[36px] rounded-lg text-[12.5px] text-gray-400 bg-gray-100 cursor-not-allowed"
                  >
                    确认使用
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {fissionLibOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setFissionLibOpen(false)} />
          <div className="fixed z-50 top-[6%] left-1/2 -translate-x-1/2 w-[880px] h-[620px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-gray-100">
              <div className="flex items-center gap-0">
                <button
                  onClick={() => { setFissionLibTab("mine"); setFissionLibSelected([]); }}
                  className={`px-4 py-2.5 text-[13px] transition relative ${fissionLibTab === "mine" ? "text-[#8B5CF6] font-medium" : "text-gray-600 hover:text-gray-800"}`}
                >
                  我的
                  {fissionLibTab === "mine" && <div className="absolute left-2 right-2 -bottom-[1px] h-[2px] bg-[#8B5CF6]" />}
                </button>
                <button
                  onClick={() => { setFissionLibTab("history"); setFissionLibSelected([]); }}
                  className={`px-4 py-2.5 text-[13px] transition relative ${fissionLibTab === "history" ? "text-[#8B5CF6] font-medium" : "text-gray-600 hover:text-gray-800"}`}
                >
                  历史作图
                  {fissionLibTab === "history" && <div className="absolute left-2 right-2 -bottom-[1px] h-[2px] bg-[#8B5CF6]" />}
                </button>
              </div>
              <button
                onClick={() => setFissionLibOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex min-h-0">
              <div className="flex-1 flex flex-col border-r border-gray-100">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                  {fissionLibTab === "mine" && (
                    <>
                      <div className="flex items-center gap-1 text-[12px] text-gray-700">
                        <span>商品素材</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span>商品套图</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-gray-700">
                        <span>标签</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </>
                  )}
                  {fissionLibTab === "history" && (
                    <>
                      <div className="flex items-center gap-1 text-[12px] text-gray-700">
                        <span>全部生图功能</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-gray-600">
                        <input defaultValue="2026-05-28" className="h-[30px] px-2 text-[11px] text-gray-600 border border-gray-200 rounded-md w-[100px]" />
                        <span className="text-gray-400">→</span>
                        <input defaultValue="2026-06-28" className="h-[30px] px-2 text-[11px] text-gray-600 border border-gray-200 rounded-md w-[100px]" />
                        <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-[#FAFBFD] flex flex-col items-center justify-center text-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-3">
                    <Upload className="w-7 h-7 text-gray-300" />
                  </div>
                  <div className="text-[14px] text-gray-700 font-medium">
                    {fissionLibTab === "mine" ? "暂无传过的图" : "暂无历史作图"}
                  </div>
                  <div className="text-[11.5px] text-gray-400 mt-1.5">
                    {fissionLibTab === "mine"
                      ? "去「场景裂变」上传后即可在此选择"
                      : "开始第一次生成后会自动归档到这里"}
                  </div>
                  <button
                    onClick={() => setFissionLibOpen(false)}
                    className="mt-5 h-[34px] px-5 rounded-lg text-[12px] text-[#8B5CF6] bg-white border border-[#DDD6FE] hover:bg-[#F5F3FF] flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> 去从本地上传
                  </button>
                </div>
              </div>

              <div className="w-[260px] flex flex-col bg-white">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="text-[13px] text-gray-800 font-medium">已选图片 ({fissionLibSelected.length}/5)</div>
                  {fissionLibSelected.length > 0 && (
                    <button
                      onClick={() => setFissionLibSelected([])}
                      className="text-[11px] text-[#8B5CF6] hover:underline"
                    >
                      清空
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto p-3 flex flex-col items-center justify-center text-center bg-[#FAFBFD]">
                  {fissionLibSelected.length === 0 && (
                    <>
                      <div className="w-[56px] h-[56px] rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-2">
                        <FolderOpen className="w-5 h-5 text-gray-300" />
                      </div>
                      <div className="text-[12.5px] text-gray-500">暂无已选图片</div>
                      <div className="text-[10.5px] text-gray-400 mt-1">最多可选择 5 张</div>
                    </>
                  )}
                  {fissionLibSelected.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {fissionLibSelected.map((idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center text-3xl border border-gray-100 group">
                          <div>🖼️</div>
                          <button
                            onClick={() => setFissionLibSelected((s) => s.filter((i) => i !== idx))}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 text-white text-[10px] flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setFissionLibOpen(false)}
                    className="flex-1 h-[36px] rounded-lg text-[12px] text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    disabled={fissionLibSelected.length === 0}
                    onClick={() => setFissionLibOpen(false)}
                    className={`flex-1 h-[36px] rounded-lg text-[12.5px] flex items-center justify-center gap-1 shadow-sm ${fissionLibSelected.length > 0 ? "text-white bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] shadow-purple-200" : "text-gray-400 bg-gray-100 cursor-not-allowed"}`}
                  >
                    ✓ 确认使用
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default ProductImages;