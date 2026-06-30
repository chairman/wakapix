import React, { useState, useMemo } from "react";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import {
  Wand2,
  UserRound,
  Mountain,
  Shirt,
  Gem,
  Layers,
  Sparkles,
  Upload,
  ChevronRight,
  Check,
  RefreshCw,
  Eye,
  Download,
  Loader2,
  Star,
  ArrowRight,
  Info,
  Plus,
  ArrowUpRight,
  FileQuestion,
  Eraser,
  Sliders,
  Palette,
  Shuffle,
  PenLine,
  Send,
  CircleHelp,
  Trash2,
  History,
} from "lucide-react";

type MainTool = "model-swap" | "scene" | "outfit" | "accessory" | "free-gen" | "history";

const mainTools: { key: MainTool; label: string; desc: string; icon: React.ReactNode; group: "模特图" | "更多" }[] = [
  { key: "model-swap", label: "AI 换模特", desc: "上传真人 / 预设模特", icon: <UserRound className="w-4 h-4" />, group: "模特图" },
  { key: "scene", label: "AI 换场景", desc: "预设 / 自定义 / 原图", icon: <Mountain className="w-4 h-4" />, group: "模特图" },
  { key: "outfit", label: "AI 穿衣", desc: "商品图直接套模特", icon: <Shirt className="w-4 h-4" />, group: "模特图" },
  { key: "accessory", label: "AI 穿戴", desc: "眼镜 / 配饰 / 发饰", icon: <Gem className="w-4 h-4" />, group: "模特图" },
  { key: "history", label: "历史记录", desc: "查看生成历史", icon: <History className="w-4 h-4" />, group: "更多" },
  { key: "free-gen", label: "自由生图", desc: "纯提示词生成任意图", icon: <Sparkles className="w-4 h-4" />, group: "更多" },
];

const presetModels = [
  { name: "女模特 · 自然妆", grad: "linear-gradient(135deg,#F8F2E8,#E8CFA0)", thumb: "👩" },
  { name: "男模特 · 商务风", grad: "linear-gradient(135deg,#E5E9F0,#CFD6E4)", thumb: "👨" },
  { name: "女模特 · 运动风", grad: "linear-gradient(135deg,#FBE0EC,#F7A7C4)", thumb: "🏃‍♀️" },
  { name: "男模特 · 休闲风", grad: "linear-gradient(135deg,#E9F5F1,#9FD3C3)", thumb: "🧔" },
  { name: "亚洲模特 · 微笑", grad: "linear-gradient(135deg,#F2F4F6,#D7DFE8)", thumb: "😊" },
  { name: "欧式模特 · 酷感", grad: "linear-gradient(135deg,#EAEAFD,#A48EE4)", thumb: "😎" },
];

const presetScenes = [
  { name: "都市咖啡馆", grad: "linear-gradient(135deg,#FBE5D6,#E39667)", thumb: "☕" },
  { name: "户外草地露营", grad: "linear-gradient(135deg,#D8EFD3,#8FD0A8)", thumb: "⛺" },
  { name: "极简白色背景", grad: "linear-gradient(135deg,#F2F4F6,#D7DFE8)", thumb: "◻" },
  { name: "家居温馨客厅", grad: "linear-gradient(135deg,#EAEAFD,#A48EE4)", thumb: "🛋" },
  { name: "高端摄影棚", grad: "linear-gradient(135deg,#E5E9F0,#CFD6E4)", thumb: "💡" },
  { name: "城市夜景", grad: "linear-gradient(135deg,#0F2240,#1E3A5F)", thumb: "🌃" },
];

const previews = [
  { label: "结果 1", grad: "linear-gradient(135deg,#FBE5D6,#E39667)" },
  { label: "结果 2", grad: "linear-gradient(135deg,#D8EFD3,#8FD0A8)" },
  { label: "结果 3", grad: "linear-gradient(135deg,#EAEAFD,#A48EE4)" },
  { label: "结果 4", grad: "linear-gradient(135deg,#E9F5F1,#9FD3C3)" },
];

const promptTemplates = [
  { key: "main", label: "主图", desc: "一键生成高清白底图", icon: <Plus className="w-5 h-5" />, tag: "白底图" },
  { key: "closeup", label: "特写图", desc: "生成高清特写展示图", icon: <Eye className="w-5 h-5" />, tag: "特写" },
  { key: "size", label: "尺寸图", desc: "一键添加尺寸信息", icon: <Shuffle className="w-5 h-5" />, tag: "尺寸" },
  { key: "sb-ad", label: "SB广告图", desc: "横幅亚马逊广告场景图", icon: <FileQuestion className="w-5 h-5" />, tag: "广告" },
  { key: "scene-gen", label: "生成场景", desc: "自动生成商品场景图", icon: <Sparkles className="w-5 h-5" />, tag: "场景" },
  { key: "add-model", label: "添加模特", desc: "给商品自动加真人模特", icon: <UserRound className="w-5 h-5" />, tag: "模特" },
  { key: "swap-model", label: "替换模特", desc: "替换原是侧视图的模特", icon: <UserRound className="w-5 h-5" />, tag: "模特" },
  { key: "composite", label: "商品合成", desc: "将多个元素合成一张", icon: <Layers className="w-5 h-5" />, tag: "合成" },
  { key: "crop", label: "商品精修", desc: "高级背景切割与深维元素", icon: <Sliders className="w-5 h-5" />, tag: "精修" },
  { key: "bg-change", label: "更换场景", desc: "自动更换商品的场景图", icon: <Mountain className="w-5 h-5" />, tag: "场景" },
  { key: "style", label: "更换风格", desc: "自动更换图片的风格", icon: <Palette className="w-5 h-5" />, tag: "风格" },
  { key: "color", label: "更换颜色", desc: "一键更换商品的颜色", icon: <Shirt className="w-5 h-5" />, tag: "颜色" },
  { key: "remove", label: "移除元素", desc: "移除图片的指定细节", icon: <Eraser className="w-5 h-5" />, tag: "移除" },
  { key: "fix-shadow", label: "修复阴影", desc: "自动修复图片的瑕疵", icon: <PenLine className="w-5 h-5" />, tag: "修复" },
];

export const AiModelSwap: React.FC = () => {
  const [mainTool, setMainTool] = useState<MainTool>("free-gen");

  const [realType, setRealType] = useState<"real" | "mannequin">("mannequin");
  const [uploaded, setUploaded] = useState(false);
  const [sceneMode, setSceneMode] = useState<"preset" | "custom" | "original">("custom");
  const [sceneUploaded, setSceneUploaded] = useState(false);
  const [modelIdx, setModelIdx] = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [similarity, setSimilarity] = useState(70);
  const [size, setSize] = useState("2560");
  const [count, setCount] = useState(1);

  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // free-gen
  const [prompt, setPrompt] = useState("");
  const [refUploaded, setRefUploaded] = useState(false);
  const [proModel, setProModel] = useState(false);
  const [ratio, setRatio] = useState("1:1");
  const [hd2k, setHd2k] = useState(true);
  const [templateMode, setTemplateMode] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setUploaded(true); };
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.length) setUploaded(true); };
  const onSceneUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.length) setSceneUploaded(true); };
  const onRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.length) setRefUploaded(true); };

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    setDone(false);
    const p = setInterval(() => {
      setProgress((x) => {
        const n = x + Math.random() * 14 + 6;
        if (n >= 100) { clearInterval(p); setProgress(100); setGenerating(false); setDone(true); return 100; }
        return n;
      });
    }, 200);
  };

  const info = useMemo(() => {
    if (mainTool === "model-swap") return "上传真人 / 人台试穿图，一键换模特和换背景";
    if (mainTool === "scene") return "保留模特姿势，只替换背景场景（可用原图做底）";
    if (mainTool === "outfit") return "上传商品白底图，自动 P 到模特身上";
    if (mainTool === "accessory") return "眼镜 / 配饰 / 帽子一键 AI 穿戴";
    if (mainTool === "history") return "查看模特图生成历史记录";
    return "纯提示词自由生图，任意场景 / 商品 / 模特";
  }, [mainTool]);

  const costText = useMemo(() => `开始生成 ${count * 30}星币`, [count]);
  const isFreeGen = mainTool === "free-gen";
  const isHistory = mainTool === "history";

  const groups = ["模特图", "更多"] as const;
  const costPerImg = isFreeGen ? 20 : 30;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧工具选择 */}
        <aside className="w-[200px] border-r border-gray-200 bg-white flex flex-col py-4 overflow-y-auto">
          {groups.map((g) => {
            const items = mainTools.filter((t) => t.group === g);
            return (
              <div key={g} className="mb-2">
                <div className="px-4 pb-1.5 text-[10.5px] uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  {g === "更多" ? <Layers className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  {g}
                </div>
                {items.map((t) => {
                  const active = mainTool === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setMainTool(t.key)}
                      className={`relative flex items-center gap-2.5 mx-2 my-0.5 px-3 py-2.5 rounded-lg text-[13px] text-left transition ${
                        active ? "bg-orange-50 text-brand-primary font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${active ? "bg-brand-accent text-white" : "bg-gray-100 text-gray-600"}`}>
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{t.label}</div>
                        <div className="text-[10.5px] text-gray-500 truncate">{t.desc}</div>
                      </div>
                      {active && <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-brand-accent" />}
                    </button>
                  );
                })}
              </div>
            );
          })}

          <div className="mt-auto pt-3 border-t border-gray-100 mx-4 mb-4">
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <Star className="w-3 h-3 text-brand-accent" /> 生成消耗 {costPerImg} 张
            </div>
            <div className="text-[11px] text-gray-400 mt-1">每月剩余 342 张</div>
          </div>
        </aside>

        {/* 自由生图独立界面 */}
        {isFreeGen ? (
          <FreeGenPanel
            prompt={prompt} setPrompt={setPrompt}
            refUploaded={refUploaded} setRefUploaded={setRefUploaded}
            proModel={proModel} setProModel={setProModel}
            ratio={ratio} setRatio={setRatio}
            hd2k={hd2k} setHd2k={setHd2k}
            templateMode={templateMode} setTemplateMode={setTemplateMode}
            activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate}
            generating={generating} progress={progress} done={done}
            onGenerate={handleGenerate}
            count={count} setCount={setCount}
            onRefUpload={onRefUpload}
          />
        ) : isHistory ? (
          <div className="flex-1 bg-[#F5F7FB] overflow-y-auto">
            {/* 历史记录界面 */}
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                  <div className="text-[12.5px] font-medium text-gray-800 flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-gray-500" /> 模特图生成历史
                  </div>
                  <span className="text-[11px] text-gray-400">最近 30 天</span>
                </div>
                <div className="p-5 grid grid-cols-3 gap-4">
                  {[
                    { id: "M001", name: "女模特 · 运动风 连衣裙", count: 4, status: "done", time: "2小时前", thumb: "linear-gradient(135deg,#FBE0EC,#F7A7C4)" },
                    { id: "M002", name: "男模特 · 商务风 西装", count: 6, status: "done", time: "3小时前", thumb: "linear-gradient(135deg,#E5E9F0,#CFD6E4)" },
                    { id: "M003", name: "亚洲模特 · 微笑 休闲装", count: 3, status: "done", time: "4小时前", thumb: "linear-gradient(135deg,#F2F4F6,#D7DFE8)" },
                    { id: "M004", name: "欧式模特 · 酷感 街拍", count: 5, status: "generating", time: "生成中", thumb: "linear-gradient(135deg,#EAEAFD,#A48EE4)" },
                    { id: "M005", name: "女模特 · 自然妆 家居", count: 8, status: "done", time: "昨天", thumb: "linear-gradient(135deg,#F8F2E8,#E8CFA0)" },
                    { id: "M006", name: "男模特 · 休闲风 户外", count: 2, status: "done", time: "昨天", thumb: "linear-gradient(135deg,#E9F5F1,#9FD3C3)" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:border-brand-accent transition cursor-pointer group relative"
                    >
                      <div className="aspect-square flex items-center justify-center" style={{ background: item.thumb }}>
                        <div className="text-[48px] opacity-0.3 group-hover:opacity-100 transition">👩</div>
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
          </div>
        ) : (
          <>
            {/* 中间配置 */}
            <aside className="w-[360px] border-r border-gray-200 bg-white flex flex-col overflow-hidden">
              <div className="h-[56px] border-b border-gray-100 px-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-brand-primary">
                    {mainTools.find((t) => t.key === mainTool)?.label}
                  </div>
                  <div className="text-[10.5px] text-gray-500 truncate">{info}</div>
                </div>
              </div>

              <div className="flex-1 overflow-auto px-5 py-4 space-y-5">
                {mainTool === "model-swap" && (
                  <div>
                    <div className="inline-flex bg-gray-50 rounded-lg p-1 w-full">
                      <button onClick={() => setRealType("real")} className={`flex-1 py-2 rounded-md text-[13px] font-medium transition ${realType === "real" ? "bg-white shadow-sm text-brand-primary" : "text-gray-600"}`}>真人试穿图</button>
                      <button onClick={() => setRealType("mannequin")} className={`flex-1 py-2 rounded-md text-[13px] font-medium transition ${realType === "mannequin" ? "bg-white shadow-sm text-brand-primary" : "text-gray-600"}`}>人台试穿图</button>
                    </div>
                  </div>
                )}

                {mainTool === "model-swap" && realType === "mannequin" && (
                  <div>
                    {!uploaded ? (
                      <label onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="block rounded-xl border border-dashed border-gray-300 hover:border-brand-accent hover:bg-indigo-50/40 transition text-center py-10 cursor-pointer">
                        <input type="file" className="hidden" onChange={onUpload} />
                        <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center"><Plus className="w-5 h-5 text-gray-400" /></div>
                        <div className="text-[13px] text-gray-700 mt-3">上传人台试穿图</div>
                        <div className="text-[10.5px] text-gray-400 mt-0.5">JPG / PNG / WEBP，建议 ≥ 1536px</div>
                      </label>
                    ) : (
                      <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <PlaceholderImage aspect="sq" label="已上传人台图" gradient="linear-gradient(135deg,#EAEAFD,#A48EE4)" className="w-full h-[160px]" />
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 text-[11.5px]">
                          <span className="truncate text-gray-600">mannequin.jpg</span>
                          <button onClick={() => setUploaded(false)} className="text-brand-accent hover:underline">重新上传</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {mainTool === "model-swap" && realType === "real" && (
                  <div>
                    {!uploaded ? (
                      <label onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="block rounded-xl border border-dashed border-gray-300 hover:border-brand-accent hover:bg-indigo-50/40 transition text-center py-10 cursor-pointer">
                        <input type="file" className="hidden" onChange={onUpload} />
                        <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center"><Plus className="w-5 h-5 text-gray-400" /></div>
                        <div className="text-[13px] text-gray-700 mt-3">上传真人试穿图</div>
                        <div className="text-[10.5px] text-gray-400 mt-0.5">单人全身 · 站姿端正</div>
                      </label>
                    ) : (
                      <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <PlaceholderImage aspect="sq" label="已上传真人图" gradient="linear-gradient(135deg,#FBE0EC,#F7A7C4)" className="w-full h-[160px]" />
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 text-[11.5px]">
                          <span className="truncate text-gray-600">real.jpg</span>
                          <button onClick={() => setUploaded(false)} className="text-brand-accent hover:underline">重新上传</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {mainTool === "model-swap" && (
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-brand-accent hover:shadow-sm transition text-left">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-2xl" style={{ background: presetModels[modelIdx].grad }}>{presetModels[modelIdx].thumb}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-gray-900">预设模特</div>
                      <div className="text-[11.5px] text-gray-500 truncate">选择需要生成的模特 · {presetModels[modelIdx].name}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                )}

                {mainTool !== "outfit" && (
                  <div>
                    <div className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> 场景
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-lg">
                      {[["preset", "预设场景"], ["custom", "自定义场景"], ["original", "原图场景"]].map(([v, l]) => (
                        <button key={v} onClick={() => setSceneMode(v as any)} className={`py-2 rounded-md text-[12.5px] font-medium transition ${sceneMode === v ? "bg-white shadow-sm text-[#2563EB]" : "text-gray-600"}`}>{l}</button>
                      ))}
                    </div>

                    {sceneMode === "custom" && (
                      <div className="mt-3">
                        {!sceneUploaded ? (
                          <label className="block cursor-pointer">
                            <input type="file" className="hidden" onChange={onSceneUpload} />
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-brand-accent hover:shadow-sm transition">
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-2xl" style={{ background: "linear-gradient(135deg,#D8EFD3,#8FD0A8)" }}>🌳</div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-[14px] font-semibold text-gray-900">上传自定义场景</div>
                                <div className="text-[11.5px] text-gray-500 truncate">模特所处的地点和周边环境</div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </label>
                        ) : (
                          <div className="rounded-xl border border-gray-200 overflow-hidden">
                            <PlaceholderImage aspect="landscape" label="已上传场景" gradient="linear-gradient(135deg,#D8EFD3,#8FD0A8)" className="w-full h-[110px]" />
                            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 text-[11.5px]">
                              <span className="truncate text-gray-600">custom-scene.jpg</span>
                              <button onClick={() => setSceneUploaded(false)} className="text-brand-accent hover:underline">重新上传</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {sceneMode === "preset" && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {presetScenes.map((s, i) => (
                          <button key={s.name} onClick={() => setSceneIdx(i)} className={`rounded-lg overflow-hidden border-2 ${sceneIdx === i ? "border-brand-accent" : "border-transparent"}`}>
                            <div className="h-[52px] flex items-center justify-center text-xl" style={{ background: s.grad }}>{s.thumb}</div>
                            <div className="px-1.5 py-1 text-[10px] truncate text-gray-600">{s.name}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {sceneMode === "original" && (
                      <div className="mt-3 text-[11.5px] text-gray-500 p-3 rounded-lg bg-gray-50 border border-gray-200">直接使用上传底图的背景，仅替换模特 / 商品</div>
                    )}
                  </div>
                )}

                {mainTool !== "outfit" && (
                  <div>
                    <div className="flex items-center justify-between text-[12.5px] text-gray-700 mb-2">
                      <span className="flex items-center gap-2">场景相似度</span>
                      <span className="text-[11px] text-gray-400">
                        <span className="mr-1 px-2 py-0.5 rounded bg-gray-100 text-gray-600">低</span>
                        <span className="ml-1 px-2 py-0.5 rounded text-[#8B5CF6]">高</span>
                      </span>
                    </div>
                    <input type="range" min={0} max={100} value={similarity} onChange={(e) => setSimilarity(Number(e.target.value))} className="w-full accent-[#8B5CF6]" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 mb-2">尺寸</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[["2560", "长边2560像素"], ["original", "原分辨率"]].map(([v, l]) => (
                      <button key={v} onClick={() => setSize(v)} className={`py-2.5 rounded-lg text-[13px] border font-medium transition ${size === v ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-700"}`}>{l}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-800 mb-2">张数</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button key={n} onClick={() => setCount(n)} className={`py-2.5 rounded-lg text-[14px] border font-bold transition ${count === n ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-700"}`}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 space-y-3">
                {generating && (
                  <div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> 生成中 {Math.round(progress)}%
                    </div>
                  </div>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={!uploaded || generating}
                  className="w-full h-[44px] text-[13.5px] rounded-full font-semibold text-white flex items-center justify-center gap-2 transition"
                  style={{ background: "linear-gradient(135deg,#A5B4FC,#8B5CF6)" }}
                >
                  <Sparkles className="w-4 h-4" /> {costText}
                </button>
                {done && (
                  <button className="w-full waka-btn-outline h-[42px] text-[13px] justify-center">
                    <RefreshCw className="w-4 h-4" /> 再来一次
                  </button>
                )}
              </div>
            </aside>

            {/* 右侧预览 */}
            <div className="flex-1 flex flex-col bg-[#F5F7FA] overflow-hidden">
              <div className="h-[56px] border-b border-gray-200 bg-white px-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] text-gray-600">
                  <Eye className="w-3.5 h-3.5 text-gray-400" /> 预览区 · 左侧底图 + 右侧 = 右侧为最终效果示意
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Info className="w-3.5 h-3.5" /> 提示：AI 合成结果以实际输出为准
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="w-[520px]">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-white/90 text-[10px] text-brand-primary font-semibold">最终效果预览</div>
                      <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
                        <div className="relative">
                          <PlaceholderImage aspect="sq" label="上传底图" gradient="linear-gradient(135deg,#EAEAFD,#A48EE4)" className="w-full h-[380px]" />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-black/60 text-white">Before</div>
                        </div>
                        <div className="relative">
                          <PlaceholderImage aspect="sq" label="生成结果预览" gradient="linear-gradient(135deg,#D8EFD3,#8FD0A8)" className="w-full h-[380px]" />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] bg-brand-accent text-white">After</div>
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white/90 text-[10px] text-brand-accent flex items-center gap-0.5"><Check className="w-2.5 h-2.5" /> AI 合成</div>
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-lg"><ArrowRight className="w-6 h-6" /></div>
                    </div>
                  </div>
                </div>

                {done && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[13px] font-semibold text-brand-primary flex items-center gap-1.5">
                        生成结果 <span className="text-[11px] text-gray-400 font-normal">· {count} 张 · 每张 30 张</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="waka-btn-outline text-[12px] h-[30px]"><Download className="w-3.5 h-3.5" /> 全部下载</button>
                        <button className="waka-btn-primary text-[12px] h-[30px]"><Sparkles className="w-3.5 h-3.5" /> 导入到项目</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {previews.slice(0, count === 1 ? 1 : count === 2 ? 2 : count >= 3 ? 4 : 4).map((p, i) => (
                        <div key={i} className="group relative rounded-lg overflow-hidden shadow-card hover:shadow-cardHover transition">
                          <PlaceholderImage aspect="sq" label={`结果 ${i + 1}`} gradient={p.grad} className="w-full" />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow"><Eye className="w-3.5 h-3.5 text-gray-700" /></button>
                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow"><Download className="w-3.5 h-3.5 text-gray-700" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {!done && !generating && (
                  <div className="text-center py-16 text-gray-400">
                    <Sparkles className="w-8 h-8 mx-auto opacity-60" />
                    <div className="text-[13px] mt-2">上传底图 → 配置参数 → 开始生成</div>
                  </div>
                )}

                {generating && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
                      <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-brand-accent border-t-transparent animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-brand-primary">{Math.round(progress)}%</div>
                    </div>
                    <div className="text-[13px] text-gray-600 mt-3">AI 正在换模特 · 保持姿势一致</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ========================= 自由生图面板 ========================= */
interface FreeGenProps {
  prompt: string; setPrompt: (v: string) => void;
  refUploaded: boolean; setRefUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  proModel: boolean; setProModel: React.Dispatch<React.SetStateAction<boolean>>;
  ratio: string; setRatio: (v: string) => void;
  hd2k: boolean; setHd2k: React.Dispatch<React.SetStateAction<boolean>>;
  templateMode: boolean; setTemplateMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeTemplate: string | null; setActiveTemplate: (v: string | null) => void;
  generating: boolean; progress: number; done: boolean;
  count: number; setCount: (n: number) => void;
  onGenerate: () => void;
  onRefUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FreeGenPanel: React.FC<FreeGenProps> = ({
  prompt, setPrompt, refUploaded, setRefUploaded, proModel, setProModel,
  ratio, setRatio, hd2k, setHd2k, templateMode, setTemplateMode,
  activeTemplate, setActiveTemplate, generating, progress, done,
  count, setCount, onGenerate, onRefUpload,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#F5F7FA] overflow-hidden">
      {/* 顶部 tab 栏 */}
      <div className="h-[60px] border-b border-gray-200 bg-white px-6 flex items-center gap-3">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium bg-white shadow-sm text-brand-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 创建新对话
          </button>
        </div>
        <div className="flex-1" />
        <div className="text-[12px] text-gray-400 flex items-center gap-1">
          <CircleHelp className="w-3.5 h-3.5" /> 帮助文档
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧列：对话辅助 */}
        <aside className="w-[260px] border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4">
            <button className="w-full py-2.5 rounded-lg bg-blue-50 text-[#2563EB] text-[13px] font-medium flex items-center justify-center gap-1.5 border border-blue-100 hover:bg-blue-100 transition">
              <Plus className="w-3.5 h-3.5" /> 创建新对话
            </button>
          </div>
          <div className="px-4 pb-3 text-[11px] text-gray-400 flex items-center gap-1">
            <Star className="w-3 h-3 text-brand-accent" /> 星币余额
            <span className="ml-auto text-[12px] font-semibold text-gray-700">0 ★</span>
          </div>
          <div className="px-4 pb-3 text-[10.5px] text-gray-400">
            快速功能
          </div>
          <button className="mx-4 mb-2 py-2 rounded-lg text-[12px] text-gray-600 hover:bg-gray-50 text-left flex items-center gap-2 border border-gray-100">
            <HistoryIconImpl className="w-3.5 h-3.5" /> 历史对话
          </button>
          <button className="mx-4 mb-2 py-2 rounded-lg text-[12px] text-gray-600 hover:bg-gray-50 text-left flex items-center gap-2 border border-gray-100">
            <Trash2 className="w-3.5 h-3.5" /> 清空对话
          </button>

          <div className="mt-auto p-4 border-t border-gray-100">
            <div className="text-[10.5px] text-gray-400 mb-1">提示词模板已选中</div>
            {activeTemplate ? (
              <div className="px-2.5 py-1.5 rounded bg-blue-50 text-[11px] text-[#2563EB] font-medium">
                {promptTemplates.find((p) => p.key === activeTemplate)?.label}
              </div>
            ) : (
              <div className="text-[11px] text-gray-500">未选择模板 · 可手动输入</div>
            )}
          </div>
        </aside>

        {/* 右侧主区 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 模板网格 */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FileQuestion className="w-4 h-4" />
              </div>
              <div className="text-[15px] font-bold text-gray-800">提示词模板</div>
              <div className="ml-auto text-[11px] text-gray-400 flex items-center gap-1">
                共 {promptTemplates.length} 个
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {promptTemplates.map((t) => {
                const active = activeTemplate === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTemplate(active ? null : t.key)}
                    className={`group relative text-left rounded-xl border p-3 transition ${
                      active ? "border-[#2563EB] bg-blue-50/60 ring-2 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-[#2563EB] text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-[#2563EB]"}`}>
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13px] font-semibold ${active ? "text-[#2563EB]" : "text-gray-800"}`}>{t.label}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5 truncate">{t.desc}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{t.tag}</span>
                      {active && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {done && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                    生成结果
                    <span className="text-[11px] text-gray-400 font-normal">· {count} 张 · 每张 20 星币</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="waka-btn-outline text-[12px] h-[30px]"><Download className="w-3.5 h-3.5" /> 全部下载</button>
                    <button className="waka-btn-primary text-[12px] h-[30px]"><Sparkles className="w-3.5 h-3.5" /> 导入到项目</button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {previews.slice(0, 4).map((p, i) => (
                    <div key={i} className="group relative rounded-lg overflow-hidden shadow-card hover:shadow-cardHover transition">
                      <PlaceholderImage aspect="sq" label={`结果 ${i + 1}`} gradient={p.grad} className="w-full" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                        <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow"><Eye className="w-3.5 h-3.5 text-gray-700" /></button>
                        <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow"><Download className="w-3.5 h-3.5 text-gray-700" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generating && (
              <div className="mt-8 flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-brand-accent border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-brand-primary">{Math.round(progress)}%</div>
                </div>
                <div className="text-[13px] text-gray-600 mt-3">AI 正在自由生图</div>
              </div>
            )}
          </div>

          {/* 底部输入区 */}
          <div className="border-t border-gray-200 bg-white px-6 py-4 space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="请输入图片提示词  例如：极简北欧白色陶瓷马克杯，干净背景，柔和侧光，商业摄影，f/2.8，85mm"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[13px] outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* 参考图 */}
              <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border cursor-pointer transition ${refUploaded ? "border-blue-200 bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}>
                <input type="file" className="hidden" onChange={onRefUpload} />
                <Upload className="w-3.5 h-3.5" /> 参考图
                {refUploaded && <Check className="w-3 h-3" />}
              </label>

              <button onClick={() => setProModel((v) => !v)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border transition ${proModel ? "border-blue-200 bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}>
                <Sparkles className="w-3.5 h-3.5" /> Pro 模型
                {proModel && <Check className="w-3 h-3" />}
              </button>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] text-gray-600">
                <span>比例</span>
                <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="bg-transparent outline-none">
                  {["1:1", "3:4", "4:3", "9:16", "16:9"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <button onClick={() => setHd2k((v) => !v)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border transition ${hd2k ? "border-blue-200 bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}>
                <span>高清 2K</span>
                {hd2k && <Check className="w-3 h-3" />}
              </button>

              <button onClick={() => setTemplateMode((v) => !v)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border transition ${templateMode ? "border-blue-200 bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}>
                <Wand2 className="w-3.5 h-3.5" /> 模板
                {templateMode && <Check className="w-3 h-3" />}
              </button>

              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] text-gray-600">
                <Layers className="w-3.5 h-3.5" /> 张数
                <div className="flex items-center gap-0.5 ml-1">
                  {[1, 2, 4].map((n) => (
                    <button key={n} onClick={() => setCount(n)} className={`w-6 h-6 rounded text-[11px] ${count === n ? "bg-[#2563EB] text-white font-bold" : "text-gray-600"}`}>{n}</button>
                  ))}
                </div>
              </div>

              <div className="flex-1" />

              <button
                onClick={onGenerate}
                disabled={!prompt.trim() || generating}
                className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-blue-400 to-[#8B5CF6] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                title={`生成 · ${count * 20} 星币`}
              >
                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-[10.5px] text-gray-400 flex items-center gap-1 pt-1">
              <Info className="w-3 h-3" /> 提示：免费赠送使用本 AI 生成人物形象的图片或视频，必须确保用户本人同意使用“此图片包含 AI 生成人物”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryIconImpl: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h5l1 4" />
    <path d="M3 13a9 9 0 1 0 3-9.7" />
    <path d="M3 8h5" />
    <path d="M3 13h9" />
    <circle cx="12" cy="17" r="1" />
    <path d="M12 17v-5" />
  </svg>
);
