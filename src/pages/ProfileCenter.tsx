import React, { useState } from "react";
import { useAppStore } from "@/store/useStore";
import {
  ChevronRight,
  ChevronDown,
  Check,
  CreditCard,
  Settings,
  Globe,
  HelpCircle,
  LogOut,
  Users,
  Zap,
  TrendingDown,
  Image as ImageIcon,
  Video,
  UserRound,
  FileText,
  Receipt,
} from "lucide-react";

type TabType = "profile" | "orders" | "consumption" | "subscription";
type PlanTabType = "personal" | "team" | "addon";

const ProfileCenter: React.FC = () => {
  const {
    personalInfo,
    teams,
    currentContext,
    switchContext,
    consumptionRecords,
    subscriptionPlans,
    setRoute,
    logout,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [planTab, setPlanTab] = useState<PlanTabType>("personal");
  const [showTeamSwitcher, setShowTeamSwitcher] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<string | null>("addon-2");
  const [customQuota, setCustomQuota] = useState(2000);

  const currentTeam = teams.find((t) => t.id === currentContext);
  const isPersonal = currentContext === "personal";

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "个人信息", icon: <UserRound className="w-4 h-4" /> },
    { key: "orders", label: "订单中心", icon: <Receipt className="w-4 h-4" /> },
    { key: "consumption", label: "消耗记录", icon: <TrendingDown className="w-4 h-4" /> },
    { key: "subscription", label: "套餐购买", icon: <CreditCard className="w-4 h-4" /> },
  ];

  const planTabs: { key: PlanTabType; label: string }[] = [
    { key: "personal", label: "个人版" },
    { key: "team", label: "团队版" },
    { key: "addon", label: "加油包" },
  ];

  const filteredPlans = subscriptionPlans.filter((p) => p.type === planTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">全部</span>;
      case "failed":
        return <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">失败</span>;
      case "processing":
        return <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">处理中</span>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case "video":
        return <Video className="w-4 h-4 text-purple-500" />;
      case "model-swap":
        return <UserRound className="w-4 h-4 text-orange-500" />;
      default:
        return <ImageIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                {personalInfo.name.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">{personalInfo.name}</div>
                <div className="text-sm text-gray-500">{isPersonal ? "个人账号" : currentTeam?.name}</div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowTeamSwitcher(!showTeamSwitcher)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                {isPersonal ? "个人账号" : currentTeam?.name}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTeamSwitcher ? "rotate-180" : ""}`} />
              </button>
              {showTeamSwitcher && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                  <button
                    onClick={() => {
                      switchContext("personal");
                      setShowTeamSwitcher(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${
                      isPersonal ? "bg-blue-50" : ""
                    }`}
                  >
                    <UserRound className="w-4 h-4" />
                    <span className="text-sm">个人账号</span>
                    {isPersonal && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                  </button>
                  <div className="border-t border-gray-100 px-3 py-2 text-xs text-gray-500">我的团队</div>
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        switchContext(team.id);
                        setShowTeamSwitcher(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${
                        currentContext === team.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{team.name}</span>
                      {currentContext === team.id && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{isPersonal ? personalInfo.availableQuota : currentTeam?.monthQuota - currentTeam?.monthUsed}</div>
              <div className="text-sm text-blue-500 mt-1">可用算力</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{personalInfo.availablePoints}</div>
              <div className="text-sm text-purple-500 mt-1">可用积分</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-green-500 mt-1">优惠券</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-600">免费版</div>
              <div className="text-sm text-orange-500 mt-1">当前套餐</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Vertical Tab Navigation */}
          <aside className="w-[160px] bg-white border-r border-gray-200 rounded-lg shadow-sm flex flex-col py-4">
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-[13px] text-left transition ${
                    activeTab === tab.key
                      ? "bg-brand-accent text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">个人信息</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">手机号</div>
                    <div className="text-sm text-gray-800">{personalInfo.phone}</div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">用户名</div>
                    <div className="text-sm text-gray-800">{personalInfo.name}</div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">密码</div>
                    <button className="text-sm text-brand-accent hover:underline">修改密码</button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">微信绑定</div>
                    <button className="text-sm text-brand-accent hover:underline">绑定微信</button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-600">个人认证</div>
                    <button className="text-sm text-brand-accent hover:underline">去认证</button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="text-sm text-gray-600">注销账号</div>
                    <button className="text-sm text-red-600 hover:underline">注销账号</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">订单记录</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-sm font-medium bg-brand-accent text-white rounded-lg">全部订单</button>
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">已完成</button>
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">处理中</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg" />
                      <span className="text-gray-400">—</span>
                      <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">订单编号</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">商品名称</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">订单金额</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">创建时间</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">订单状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "ORD001", name: "Wakapix AI 作图 - 个人版月度套餐", amount: "¥299", time: "2024-01-15 10:30", status: "已完成" },
                          { id: "ORD002", name: "Wakapix Agent - 500积分加油包", amount: "¥50", time: "2024-01-12 14:20", status: "已完成" },
                          { id: "ORD003", name: "Wakapix AI 作图 - 1000算力加油包", amount: "¥60", time: "2024-01-10 09:15", status: "处理中" },
                          { id: "ORD004", name: "Wakapix AI 作图 - 团队版年度套餐", amount: "¥2999", time: "2024-01-08 16:45", status: "已完成" },
                        ].map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-800">{order.id}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">{order.name}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm font-medium text-gray-800">{order.amount}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-500">{order.time}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`text-sm px-2 py-0.5 rounded-full ${
                                order.status === "已完成" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>{order.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "consumption" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">消耗汇总</h3>
                    <button className="text-blue-600 text-sm hover:underline">购买算力</button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Wakapix AI 作图 可用算力</span>
                        <span className="text-lg font-bold text-blue-600">300</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Wakapix Agent 可用积分</span>
                        <span className="text-lg font-bold text-purple-600">0</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg">Wakapix AI</button>
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">Wakapix Agent</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg" />
                      <span className="text-gray-400">—</span>
                      <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg" />
                      <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
                        <option>状态：全部</option>
                        <option>已完成</option>
                        <option>处理中</option>
                        <option>失败</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">项目名称</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">消耗项目</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">消耗数量</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">时间</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">状态</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">算力类型</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consumptionRecords.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-gray-500">
                              <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                  <TrendingDown className="w-8 h-8 text-gray-400" />
                                </div>
                                <span>暂无记录</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          consumptionRecords.map((record) => (
                            <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  {getTypeIcon(record.type)}
                                  <span className="text-sm text-gray-800">{record.description}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-600">{record.type === "image" ? "图片生成" : record.type === "video" ? "视频生成" : "模特图生成"}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-800">{record.count}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-500">{record.date}</span>
                              </td>
                              <td className="py-4 px-4">{getStatusBadge(record.status)}</td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-blue-600">基础算力</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "subscription" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">当前套餐</h3>
                    <button className="text-blue-600 text-sm hover:underline">升级套餐</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-800">Wakapix AI 作图 · 免费版</span>
                      </div>
                      <div className="text-sm text-gray-500">AI 生成高转化文案和全套场景营销素材</div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">剩余算力：300</span>
                        <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">立即购买</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-gray-800">Wakapix Agent · 免费版</span>
                      </div>
                      <div className="text-sm text-gray-500">从繁杂的数据报表到清晰的决策指令</div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">剩余积分：0</span>
                        <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">购买积分</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-center gap-2 border-b border-gray-200">
                    {planTabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setPlanTab(tab.key)}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${
                          planTab === tab.key
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {planTab === "addon" ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4">
                          {filteredPlans.slice(0, 3).map((plan) => (
                            <button
                              key={plan.id}
                              onClick={() => setSelectedAddon(plan.id)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                selectedAddon === plan.id
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-center">
                                <Zap className={`w-6 h-6 mx-auto mb-2 ${selectedAddon === plan.id ? "text-blue-600" : "text-gray-400"}`} />
                                <div className="text-lg font-bold text-gray-800">{plan.quota.toLocaleString()}算力</div>
                                <div className="text-sm text-gray-500 mt-1">¥{plan.price}</div>
                              </div>
                            </button>
                          ))}
                          <div className="p-4 rounded-xl border-2 border-gray-200">
                            <div className="text-center">
                              <Zap className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                              <div className="text-sm text-gray-500 mb-2">自定义充值</div>
                              <div className="flex items-center justify-center gap-2">
                                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                                <input
                                  type="number"
                                  value={customQuota}
                                  onChange={(e) => setCustomQuota(Math.max(100, parseInt(e.target.value) || 0))}
                                  className="w-20 text-center text-lg font-bold text-gray-800 border-b border-gray-200 focus:outline-none"
                                />
                                <span className="text-sm text-gray-500">算力</span>
                                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">¥{Math.round(customQuota * 0.06)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-medium text-gray-700">支付方式</span>
                            <div className="flex items-center gap-2">
                              <button className="px-4 py-2 rounded-lg border border-blue-600 bg-blue-50 text-blue-600 text-sm">支付宝</button>
                              <button className="px-4 py-2 rounded-lg border border-green-600 bg-green-50 text-green-600 text-sm">微信支付</button>
                            </div>
                          </div>
                          <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">立即购买</button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-6">
                        {filteredPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`relative rounded-xl border-2 p-6 transition-all ${
                              plan.popular
                                ? "border-blue-600 bg-gradient-to-b from-blue-50 to-white"
                                : plan.disabled
                                ? "border-gray-200 opacity-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {plan.popular && (
                              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                推荐
                              </div>
                            )}
                            <div className="text-center mb-6">
                              <h4 className="text-lg font-semibold text-gray-800">{plan.name}</h4>
                              <div className="text-2xl font-bold text-gray-800 mt-2">¥{plan.price}</div>
                              <div className="text-sm text-gray-500">
                                {plan.period === "monthly" ? "每月" : "每年"}
                              </div>
                            </div>
                            <div className="space-y-3 mb-6">
                              {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            <button
                              disabled={plan.disabled}
                              className={`w-full py-2 rounded-lg font-medium transition ${
                                plan.popular
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : plan.disabled
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {plan.disabled ? "暂不可用" : "选择套餐"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileCenter };