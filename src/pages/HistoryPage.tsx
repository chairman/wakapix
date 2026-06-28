import React, { useMemo, useState } from "react";
import { useAppStore } from "@/store/useStore";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import {
  Search,
  X,
  RefreshCw,
  List,
  LayoutGrid,
  ChevronDown,
  CalendarDays,
  Check,
  Clock,
  Download,
  ArrowUpRight,
  Trash2,
  MoreHorizontal,
  PlayCircle,
  Layers,
  Shirt,
  UserRound,
  Mountain,
  Sparkles,
  Wand2,
  Filter,
  SortAsc,
  Eye,
  FileDown,
  History as HistoryIcon,
} from "lucide-react";

type TaskTag = "clothing-set" | "model-real" | "model-mannequin" | "scene" | "outfit" | "accessory" | "pack-amazon";
type TaskStatus = "done" | "generating" | "failed";

const tagMeta: Record<TaskTag, { label: string; icon: React.ReactNode; color: string }> = {
  "clothing-set": { label: "服装套图", icon: <Shirt className="w-3.5 h-3.5" />, color: "bg-orange-100 text-orange-700 border-orange-200" },
  "model-real": { label: "真人换模特", icon: <UserRound className="w-3.5 h-3.5" />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  "model-mannequin": { label: "人台换模特", icon: <Sparkles className="w-3.5 h-3.5" />, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  scene: { label: "模特换场景", icon: <Mountain className="w-3.5 h-3.5" />, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  outfit: { label: "AI 穿衣", icon: <Shirt className="w-3.5 h-3.5" />, color: "bg-purple-100 text-purple-700 border-purple-200" },
  accessory: { label: "AI 穿戴", icon: <Layers className="w-3.5 h-3.5" />, color: "bg-pink-100 text-pink-700 border-pink-200" },
  "pack-amazon": { label: "Amazon 套图", icon: <Wand2 className="w-3.5 h-3.5" />, color: "bg-amber-100 text-amber-700 border-amber-200" },
};

const allTags: TaskTag[] = ["clothing-set", "model-real", "model-mannequin", "scene", "outfit", "accessory", "pack-amazon"];

interface HistoryItem {
  id: string;
  name: string;
  tags: TaskTag[];
  status: TaskStatus;
  date: string;
  timeAgo: string;
  thumb: string;
  count: number;
  platform: string;
  prompt?: string;
  downloaded?: boolean;
  progress?: number;
  aplus?: number;
}

const history: HistoryItem[] = [
  { id: "T20260627-001", name: "北欧保温咖啡杯 500ml", tags: ["pack-amazon"], status: "done", date: "2026-06-27 10:24", timeAgo: "2 小时前", thumb: "linear-gradient(135deg,#DDE8F8,#A9C0E5)", count: 9, platform: "Amazon.com", aplus: 3, downloaded: true },
  { id: "T20260627-002", name: "便携陶瓷马克杯", tags: ["clothing-set", "model-real"], status: "done", date: "2026-06-27 09:15", timeAgo: "3 小时前", thumb: "linear-gradient(135deg,#FBE5D6,#E39667)", count: 12, platform: "Amazon.com", downloaded: true },
  { id: "T20260627-003", name: "瑜伽垫 TPE 环保 10mm", tags: ["model-real", "scene"], status: "done", date: "2026-06-27 08:42", timeAgo: "4 小时前", thumb: "linear-gradient(135deg,#FBE0EC,#F7A7C4)", count: 8, platform: "Shopify", downloaded: false },
  { id: "T20260627-004", name: "户外折叠太阳能灯", tags: ["pack-amazon"], status: "generating", date: "2026-06-27 11:02", timeAgo: "生成中 72%", thumb: "linear-gradient(135deg,#EAEAFD,#A48EE4)", count: 9, platform: "Amazon.co.uk", progress: 72 },
  { id: "T20260626-011", name: "厨房硅胶煎蛋铲套装", tags: ["model-mannequin", "outfit"], status: "done", date: "2026-06-26 22:10", timeAgo: "昨天", thumb: "linear-gradient(135deg,#D8EFD3,#8FD0A8)", count: 6, platform: "Amazon.com", downloaded: true },
  { id: "T20260626-009", name: "便携电动打蛋器", tags: ["accessory"], status: "done", date: "2026-06-26 18:30", timeAgo: "昨天", thumb: "linear-gradient(135deg,#E5E9F0,#CFD6E4)", count: 4, platform: "eBay", downloaded: false },
  { id: "T20260626-007", name: "女模特 · 运动风 连衣裙", tags: ["model-real", "scene"], status: "failed", date: "2026-06-26 15:02", timeAgo: "2 天前", thumb: "linear-gradient(135deg,#F2F4F6,#D7DFE8)", count: 1, platform: "-" },
  { id: "T20260626-005", name: "亚马逊 A+ 品牌故事图", tags: ["pack-amazon"], status: "done", date: "2026-06-26 12:20", timeAgo: "2 天前", thumb: "linear-gradient(135deg,#F8F2E8,#E8CFA0)", count: 3, platform: "Amazon.com", aplus: 3, downloaded: true },
  { id: "T20260625-020", name: "极简白色场景 · 保温杯", tags: ["scene"], status: "done", date: "2026-06-25 21:15", timeAgo: "3 天前", thumb: "linear-gradient(135deg,#F2F4F6,#D7DFE8)", count: 4, platform: "Amazon.com", downloaded: true },
];

const statusMeta: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode }> = {
  done: { label: "已完成", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: <Check className="w-3 h-3" /> },
  generating: { label: "生成中", color: "text-brand-accent bg-orange-50 border-orange-200", icon: <Clock className="w-3 h-3 animate-spin" /> },
  failed: { label: "失败", color: "text-red-600 bg-red-50 border-red-200", icon: <Clock className="w-3 h-3" /> },
};

const FilterChip: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  theme?: "dark" | "light";
}> = ({ active, onClick, children, removable, onRemove, theme = "light" }) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] border cursor-pointer transition ${
      active
        ? theme === "dark"
          ? "bg-brand-primary text-white border-brand-primary"
          : "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
    }`}
    onClick={onClick}
  >
    {children}
    {removable && onRemove && (
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="w-3.5 h-3.5 rounded-full hover:bg-white/20 flex items-center justify-center"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    )}
  </div>
);

export const HistoryPage: React.FC = () => {
  const setRoute = useAppStore((s) => s.setRoute);
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState<TaskTag[]>(["clothing-set", "model-real", "scene"]);
  const [downloadFilter, setDownloadFilter] = useState<"all" | "downloaded" | "not">("all");
  const [dateFrom, setDateFrom] = useState("2026-03-27");
  const [dateTo, setDateTo] = useState("2026-06-27");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [sortKey, setSortKey] = useState<"time" | "count">("time");
  const [refreshTick, setRefreshTick] = useState(0);

  const filtered = useMemo(() => {
    let list = [...history];
    if (q) list = list.filter((h) => h.name.toLowerCase().includes(q.toLowerCase()) || h.id.toLowerCase().includes(q.toLowerCase()));
    if (tagFilter.length) list = list.filter((h) => h.tags.some((t) => tagFilter.includes(t)));
    if (downloadFilter === "downloaded") list = list.filter((h) => h.downloaded);
    if (downloadFilter === "not") list = list.filter((h) => !h.downloaded);
    list.sort((a, b) => sortKey === "time" ? b.date.localeCompare(a.date) : b.count - a.count);
    return list;
  }, [q, tagFilter, downloadFilter, sortKey, refreshTick]);

  const toggleTag = (t: TaskTag) =>
    setTagFilter((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 w-[260px]">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="任务ID / 商品名称"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-gray-400"
          />
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-1.5 flex-wrap">
          <FilterChip active={tagFilter.includes("clothing-set")} onClick={() => toggleTag("clothing-set")} removable onRemove={() => toggleTag("clothing-set")}>
            服装套图 ×
          </FilterChip>
          <FilterChip active={tagFilter.includes("model-real")} onClick={() => toggleTag("model-real")} removable onRemove={() => toggleTag("model-real")}>
            真人换模特 ×
          </FilterChip>
          <FilterChip active={tagFilter.includes("scene")} onClick={() => toggleTag("scene")} removable onRemove={() => toggleTag("scene")}>
            模特换场景 <span className="text-gray-400">(下架)</span> ×
          </FilterChip>
          <FilterChip active={tagFilter.includes("model-mannequin")} onClick={() => toggleTag("model-mannequin")} removable onRemove={() => toggleTag("model-mannequin")}>
            人台换模特 ×
          </FilterChip>
          <div className="relative">
            <FilterChip active={false} onClick={() => {}}>
              + {tagFilter.length > 0 ? `更多 (${tagFilter.length})...` : "更多..."}
              <ChevronDown className="w-3 h-3" />
            </FilterChip>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <select
          value={downloadFilter}
          onChange={(e) => setDownloadFilter(e.target.value as any)}
          className="h-[30px] px-2.5 rounded-full bg-white border border-gray-200 text-[12px] text-gray-600"
        >
          <option value="all">是否下载 · 全部</option>
          <option value="downloaded">已下载</option>
          <option value="not">未下载</option>
        </select>

        <div className="flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-[30px] px-2 rounded-md bg-white border border-gray-200 text-[12px] text-gray-600" />
          <span className="text-gray-400 text-[12px]">~</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-[30px] px-2 rounded-md bg-white border border-gray-200 text-[12px] text-gray-600" />
        </div>

        <button
          onClick={() => setRefreshTick((t) => t + 1)}
          className="h-[30px] px-3 rounded-full border border-gray-200 text-[12px] text-brand-primary hover:text-brand-accent hover:border-brand-accent flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3" /> 刷新
        </button>

        <div className="ml-auto flex items-center gap-1">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[12px] text-gray-600">
            <SortAsc className="w-3 h-3" /> 排序
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)} className="bg-transparent outline-none">
              <option value="time">最近时间</option>
              <option value="count">图片最多</option>
            </select>
          </div>
          <button
            onClick={() => setViewMode("card")}
            className={`h-[30px] px-2.5 rounded-full border text-[12px] flex items-center gap-1 ${viewMode === "card" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
          >
            <LayoutGrid className="w-3 h-3" /> 卡片视图
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`h-[30px] px-2.5 rounded-full border text-[12px] flex items-center gap-1 ${viewMode === "list" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
          >
            <List className="w-3 h-3" /> 列表视图
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {filtered.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-24">
            <div className="w-[72px] h-[72px] rounded-2xl bg-gray-100 flex items-center justify-center">
              <HistoryIcon className="w-8 h-8 text-gray-300" />
            </div>
            <div className="mt-4 text-[13px] text-gray-500 font-medium">暂无数据</div>
            <div className="text-[12px] text-gray-400 mt-1">
              调整筛选条件或去创建第一张生成任务
            </div>
          </div>
        ) : viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((h) => <HistoryCard key={h.id} h={h} onView={() => {}} onDownload={() => {}} onRecreate={() => {}} onDel={() => {}} />)}
          </div>
        ) : (
          <div className="waka-card overflow-hidden">
            <table className="w-full text-[12.5px]">
              <thead className="bg-gray-50 text-gray-500 text-[11.5px] uppercase tracking-wider">
                <tr>
                  <th className="text-left py-3 px-4 font-normal w-[60px]">缩略图</th>
                  <th className="text-left py-3 px-4 font-normal">任务名称 / ID</th>
                  <th className="text-left py-3 px-4 font-normal w-[200px]">标签</th>
                  <th className="text-left py-3 px-4 font-normal w-[140px]">时间</th>
                  <th className="text-left py-3 px-4 font-normal w-[120px]">平台</th>
                  <th className="text-left py-3 px-4 font-normal w-[90px]">数量</th>
                  <th className="text-left py-3 px-4 font-normal w-[90px]">状态</th>
                  <th className="text-left py-3 px-4 font-normal w-[180px]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <PlaceholderImage aspect="sq" label="" gradient={h.thumb} className="w-full h-full" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-brand-primary">{h.name}</div>
                      <div className="text-[10.5px] text-gray-400 font-mono">{h.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {h.tags.map((t) => (
                          <span key={t} className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10.5px] border ${tagMeta[t].color}`}>
                            {tagMeta[t].icon} {tagMeta[t].label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{h.date}</div>
                      <div className="text-[10.5px] text-gray-400">{h.timeAgo}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{h.platform}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-gray-400" /> {h.count}
                        {h.aplus ? <span className="text-[10px] text-orange-500">+{h.aplus}A+</span> : null}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border ${statusMeta[h.status].color}`}>
                        {statusMeta[h.status].icon} {statusMeta[h.status].label}
                      </span>
                      {h.status === "generating" && h.progress !== undefined && (
                        <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-accent" style={{ width: `${h.progress}%` }} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button className="h-[28px] px-2 rounded border border-gray-200 text-[11px] text-gray-600 hover:border-brand-accent hover:text-brand-accent">
                          <Eye className="w-3 h-3" /> 查看
                        </button>
                        {h.status === "done" && (
                          <button className="h-[28px] px-2 rounded border border-gray-200 text-[11px] text-gray-600 hover:border-brand-accent hover:text-brand-accent">
                            <FileDown className="w-3 h-3" /> {h.downloaded ? "再次下载" : "下载"}
                          </button>
                        )}
                        {h.status === "failed" && (
                          <button className="h-[28px] px-2 rounded bg-brand-accent text-white text-[11px]">
                            <RefreshCw className="w-3 h-3" /> 重试
                          </button>
                        )}
                        <button className="h-[28px] px-2 rounded border border-gray-200 text-[11px] text-gray-400 hover:text-red-500 hover:border-red-400">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryCard: React.FC<{
  h: HistoryItem;
  onView: () => void;
  onDownload: () => void;
  onRecreate: () => void;
  onDel: () => void;
}> = ({ h, onView, onDownload, onRecreate, onDel }) => {
  const setRoute = useAppStore((s) => s.setRoute);
  return (
    <div className="waka-card group overflow-hidden hover:shadow-cardHover transition">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {h.tags.slice(0, 2).map((t) => (
            <span key={t} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] border backdrop-blur-sm bg-white/95 ${tagMeta[t].color}`}>
              {tagMeta[t].icon} {tagMeta[t].label}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] border ${statusMeta[h.status].color}`}>
            {statusMeta[h.status].icon} {statusMeta[h.status].label}
          </span>
        </div>
        <PlaceholderImage aspect="landscape" label={h.name} gradient={h.thumb} className="w-full h-[150px]" />
        {h.status === "generating" && h.progress !== undefined && (
          <div className="absolute left-0 right-0 bottom-0">
            <div className="h-1.5 bg-black/30">
              <div className="h-full bg-brand-accent" style={{ width: `${h.progress}%` }} />
            </div>
            <div className="px-3 py-1 bg-black/50 backdrop-blur-sm text-[11px] text-white flex items-center justify-between">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 animate-spin" /> 生成中</span>
              <span>{h.progress}%</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button onClick={onView} className="h-[30px] px-2.5 rounded bg-white/95 text-[11px] font-medium flex items-center gap-1 hover:bg-white">
            <Eye className="w-3 h-3" /> 查看
          </button>
          <button onClick={onDownload} className="h-[30px] px-2.5 rounded bg-brand-accent text-white text-[11px] font-medium flex items-center gap-1 hover:bg-brand-accentHover">
            <Download className="w-3 h-3" /> {h.downloaded ? "再次下载" : "下载"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-[13.5px] font-semibold text-brand-primary truncate">{h.name}</div>
            <div className="text-[10.5px] text-gray-400 font-mono mt-0.5">{h.id} · {h.platform}</div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11.5px] text-gray-500">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" /> {h.count} 张{h.aplus ? ` + ${h.aplus} A+` : ""}
          </span>
          <span>{h.timeAgo}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {h.status === "done" && (
            <button onClick={onDownload} className="flex-1 waka-btn-outline h-[30px] text-[11.5px]">
              <FileDown className="w-3 h-3" /> {h.downloaded ? "已下载 · 再次下载" : "下载结果"}
            </button>
          )}
          {h.status === "generating" && (
            <button className="flex-1 waka-btn-outline h-[30px] text-[11.5px] disabled:opacity-60" disabled>
              <Clock className="w-3 h-3 animate-spin" /> 生成中 {h.progress}%
            </button>
          )}
          {h.status === "failed" && (
            <button className="flex-1 waka-btn-primary h-[30px] text-[11.5px]">
              <RefreshCw className="w-3 h-3" /> 重试
            </button>
          )}
          <button
            onClick={() => setRoute("model-swap")}
            className="h-[30px] px-2.5 rounded-lg border border-gray-200 text-[11px] text-gray-600 hover:border-brand-accent hover:text-brand-accent flex items-center gap-1"
          >
            <ArrowUpRight className="w-3 h-3" /> 复刻
          </button>
        </div>
      </div>
    </div>
  );
};
