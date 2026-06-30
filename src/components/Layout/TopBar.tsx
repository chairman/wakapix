import React, { useState } from "react";
import { useAppStore } from "@/store/useStore";
import { Search, ChevronDown, Sparkles, X, ArrowRight, Users, UserRound, Check, Settings, Globe, HelpCircle, LogOut, Zap, CreditCard, ChevronRight, Palette, Image, History as HistoryIcon, Home } from "lucide-react";

const navItems = [
  { key: "home" as const, label: "首页", icon: Home },
  { key: "product-images" as const, label: "商品图", icon: Image },
  { key: "model-swap" as const, label: "模特图", icon: UserRound },
];

const UpgradeModal: React.FC = () => {
  const { modal, closeModal } = useAppStore();
  if (!modal.open || modal.kind !== "upgrade") return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
      <div className="w-[460px] bg-white rounded-xl shadow-2xl animate-slideUp overflow-hidden">
        <div className="bg-gradient-to-r from-brand-primary to-[#2A4F7A] p-6 text-white relative">
          <button onClick={closeModal} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs text-white/60">升级到 Pro</div>
          <div className="text-xl font-bold mt-1">解锁每月 2000 张额度</div>
          <div className="text-sm text-white/70 mt-2">品牌风格迁移 · 批量生成 · API 上传</div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div>
              <div className="font-semibold text-sm">Free (当前)</div>
              <div className="text-xs text-gray-500">500 张 / 月</div>
            </div>
            <div className="text-[15px] font-bold text-gray-400">$0</div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border-2 border-brand-accent/40 bg-orange-50">
            <div>
              <div className="font-semibold text-sm flex items-center gap-2">
                Pro <span className="px-1.5 py-0.5 text-[10px] bg-brand-accent text-white rounded">推荐</span>
              </div>
              <div className="text-xs text-gray-600">2000 张 / 月 + 全部高级功能</div>
            </div>
            <div className="text-[18px] font-bold text-brand-accent">
              $49<span className="text-xs text-gray-500 font-normal">/月</span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={closeModal} className="flex-1 waka-btn-outline">
            稍后再说
          </button>
          <button onClick={closeModal} className="flex-1 waka-btn-primary">
            立即升级 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const TopBar: React.FC = () => {
  const { monthQuota, monthUsed, openModal, currentContext, switchContext, teams, personalInfo, logout, setRoute, navKey } = useAppStore();
  const [search, setSearch] = useState("");
  const [showTeamSwitcher, setShowTeamSwitcher] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pct = Math.min(100, Math.round((monthUsed / monthQuota) * 100));
  const isPersonal = currentContext === "personal";
  const currentTeam = teams.find((t) => t.id === currentContext);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 h-[64px]">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-accent to-[#FF8A5D] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-[16px] font-bold tracking-tight text-brand-primary">Wakapix</div>
              <div className="text-[10px] text-gray-500">跨境电商 AI 工作站</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = navKey === item.key;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setRoute(item.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? "bg-brand-accent/10 text-brand-accent"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition"
                onMouseEnter={() => setShowUserMenu(true)}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                  {personalInfo.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-[12px] font-medium text-gray-800">{personalInfo.name}</div>
                  <div className="text-[10px] text-gray-500">免费版</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showUserMenu || showTeamSwitcher ? (
                <div className="absolute right-0 top-full mt-2 flex gap-2 z-40">
                  {showTeamSwitcher && (
                    <div className="w-60 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => {
                          switchContext("personal");
                          setShowTeamSwitcher(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
                          isPersonal ? "bg-purple-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                            isPersonal ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}>
                            {personalInfo.name.charAt(0)}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isPersonal ? "text-gray-800" : "text-gray-600"}`}>
                              {personalInfo.name}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">AI作图 免费版</span>
                              <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded">Agent 免费版</span>
                              <span className="text-xs text-gray-400 ml-1">个人账号</span>
                            </div>
                          </div>
                        </div>
                        {isPersonal && <Check className="w-4 h-4 text-purple-600" />}
                      </button>
                      <div className="border-t border-gray-100 px-4 py-2">
                        <button className="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition">
                          <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <span className="text-xs text-gray-400">+</span>
                          </div>
                          <span>创建团队</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-100 px-3 py-2 text-xs text-gray-500">我的团队</div>
                      {teams.map((team) => (
                        <button
                          key={team.id}
                          onClick={() => {
                            switchContext(team.id);
                            setShowTeamSwitcher(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
                            currentContext === team.id ? "bg-purple-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentContext === team.id ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white" : "bg-gray-100 text-gray-600"
                            }`}>
                              <Users className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${currentContext === team.id ? "text-gray-800" : "text-gray-600"}`}>
                                {team.name}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">AI作图 免费版</span>
                                <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded">Agent 免费版</span>
                              </div>
                            </div>
                          </div>
                          {currentContext === team.id && <Check className="w-4 h-4 text-purple-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                  {showUserMenu && (
                    <div
                      className="w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                      onMouseLeave={() => setShowUserMenu(false)}
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold">
                              {personalInfo.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{personalInfo.name}</div>
                              <div className="text-sm text-gray-500">{isPersonal ? "个人账号" : currentTeam?.name} | {personalInfo.phone}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowTeamSwitcher(true)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            切换团队 <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{personalInfo.availableQuota}</div>
                            <div className="text-xs text-blue-500 mt-1">可用算力</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{personalInfo.availablePoints}</div>
                            <div className="text-xs text-purple-500 mt-1">可用积分</div>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-orange-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-800">Wakapix AI 作图 · 免费版</div>
                                <div className="text-xs text-gray-500">AI 生成高转化文案和全套场景营销素材</div>
                              </div>
                            </div>
                            <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                              立即购买
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-purple-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-800">Wakapix Agent · 免费版</div>
                                <div className="text-xs text-gray-500">从繁杂的数据报表到清晰的决策指令</div>
                              </div>
                            </div>
                            <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                              立即购买
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-700">套餐管理</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => {
                          setRoute("profile");
                          setShowUserMenu(false);
                        }} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <UserRound className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">个人中心</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <Settings className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-700">API 设置</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-700">官网</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm text-gray-700">帮助与客服</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={logout}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-red-500"
                        >
                          <div className="flex items-center gap-3">
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">退出登录</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <UpgradeModal />
    </>
  );
};