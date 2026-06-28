import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "@/store/useStore";
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  X,
  ScanLine,
  MessageSquare,
  UserRound,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Gift,
  Star,
  Zap,
  Palette,
  Film,
  Crown,
} from "lucide-react";

type LoginMode = "qrcode" | "sms" | "account";

const Logo: React.FC<{ size?: number; dark?: boolean }> = ({ size = 36, dark }) => (
  <div
    className="flex items-center gap-2 font-bold tracking-tight"
    style={{ color: dark ? "#1E3A5F" : "#fff" }}
  >
    <div
      className="rounded-lg flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #FF6B35 0%, #FF8A5D 100%)",
        boxShadow: "0 6px 20px rgba(255,107,53,0.35)",
      }}
    >
      <Sparkles style={{ width: size * 0.55, height: size * 0.55, color: "#fff" }} />
    </div>
    <div style={{ lineHeight: 1.1 }}>
      <div style={{ fontSize: size * 0.55 }}>Wakapix</div>
      <div
        style={{
          fontSize: size * 0.26,
          opacity: dark ? 0.55 : 0.6,
          fontWeight: 500,
          letterSpacing: "0.08em",
        }}
      >
        AI VISION
      </div>
    </div>
  </div>
);

const PromotionalPanel: React.FC = () => {
  const benefits = [
    { icon: Gift, title: "新用户注册", reward: "送 500 张", tag: "免费额度" },
    { icon: Star, title: "老用户每日登录", reward: "+10 张 / 天", tag: "签到领取" },
  ];
  const features = [
    { icon: Zap, name: "一键生成 Amazon 套图" },
    { icon: Palette, name: "AI 场景迁移 / 品牌风格" },
    { icon: Film, name: "竖版视频封面 + TikTok" },
    { icon: Crown, name: "试用 Pro ¥349 / 月" },
  ];

  return (
    <div className="relative h-full flex flex-col text-white overflow-hidden">
      {/* multi-layer gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0E2142 0%, #1A2B45 45%, #1E3A5F 80%, #FF6B35 120%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(500px 320px at 85% -5%, rgba(255,107,53,0.55), transparent 60%), radial-gradient(420px 260px at -8% 110%, rgba(30,58,95,0.8), transparent 60%), radial-gradient(300px 220px at 60% 70%, rgba(255,160,90,0.25), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 40px)",
        }}
      />
      <div
        className="absolute right-[-80px] top-[140px] w-[320px] h-[320px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,0.6), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative p-8">
        <Logo size={40} />
      </div>

      <div className="relative px-8 mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] tracking-wider uppercase">
          <Star className="w-3 h-3 text-brand-accent" /> Limited Offer
        </div>
        <div className="mt-4 text-[30px] font-extrabold leading-[1.15]">
          登录即享 <span className="text-brand-accent">跨境卖家</span>
          <br />
          <span className="text-white">AI 视觉工作站</span>
        </div>
        <div className="mt-2 text-[13px] text-white/70">
          1 张白底图 → 9 张 Amazon 合规 Listing 全套素材
        </div>
      </div>

      <div className="relative px-8 mt-6 space-y-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-accent/90 flex items-center justify-center flex-shrink-0 shadow-md">
              <b.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium">{b.title}</div>
              <div className="text-[11px] text-white/60">{b.reward}</div>
            </div>
            <span className="px-2 py-0.5 text-[10.5px] rounded-full bg-white/10 border border-white/15">
              {b.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="relative px-8 mt-auto pb-8">
        <div className="text-[10.5px] uppercase tracking-wider text-white/50 mb-2">产品能力</div>
        <div className="grid grid-cols-2 gap-2.5">
          {features.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-[12px]"
            >
              <f.icon className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
              <span className="truncate">{f.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-[11px] text-white/55">
          <ShieldCheck className="w-3.5 h-3.5" /> SSL 加密 · 支持 Amazon / Shopify / TikTok Shop
        </div>
      </div>
    </div>
  );
};

const QrCodePanel: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s + 1) % 180), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center py-4">
      <div
        className="relative w-[210px] h-[210px] rounded-xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden"
      >
        {/* fake QR matrix */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" shapeRendering="crispEdges">
          {Array.from({ length: 11 }).map((_, y) =>
            Array.from({ length: 11 }).map((_, x) => {
              const seed = ((x * 7 + y * 13 + 17) % 11) + ((x + y * 3) % 7);
              const on = seed % 3 === 0 || seed % 5 === 0 || seed % 7 === 0;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={3 + x * (94 / 11)}
                  y={3 + y * (94 / 11)}
                  width={94 / 11 + 0.2}
                  height={94 / 11 + 0.2}
                  fill={on ? "#1E3A5F" : "#fff"}
                />
              );
            }),
          )}
          {/* 3 finder squares */}
          {[
            [5, 5],
            [86, 5],
            [5, 86],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <rect x={cx} y={cy} width={14} height={14} fill="#1E3A5F" />
              <rect x={cx + 1.5} y={cy + 1.5} width={11} height={11} fill="#fff" />
              <rect x={cx + 3} y={cy + 3} width={8} height={8} fill="#1E3A5F" />
            </g>
          ))}
        </svg>

        {/* center logo badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-brand-accent to-[#FF8A5D] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* expiration tick */}
        <div className="absolute bottom-1 left-0 right-0 flex items-center justify-center gap-1 text-[10.5px] text-gray-400">
          <RefreshCw className="w-3 h-3" /> 二维码 {Math.floor((180 - seconds) / 60)}:{String((180 - seconds) % 60).padStart(2, "0")} 后自动刷新
        </div>
      </div>

      <div className="mt-5 text-[13px] text-gray-700">使用微信扫码关注公众号完成登录 / 注册</div>
      <div className="mt-1.5 text-[11.5px] text-gray-400">首次登录将通过短信验证码绑定手机号</div>

      <button className="mt-5 inline-flex items-center gap-1 text-[12px] text-brand-primary hover:text-brand-accent font-medium">
        <MessageSquare className="w-3.5 h-3.5" /> 扫码遇到问题？
      </button>
    </div>
  );
};

const SmsPanel: React.FC = () => {
  const { login } = useAppStore();
  const [phone, setPhone] = useState("13800138000");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [cd, setCd] = useState(0);
  const sent = useRef(false);

  const sendCode = () => {
    if (sending) return;
    setSending(true);
    sent.current = true;
    setCd(60);
    setTimeout(() => setSending(false), 200);
    const t = setInterval(() => {
      setCd((n) => {
        if (n <= 1) {
          clearInterval(t);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  };

  return (
    <div className="py-4 space-y-4">
      <div>
        <label className="waka-label">手机号</label>
        <div className="flex items-center gap-2">
          <div className="w-[92px] px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[13px] text-gray-700 font-medium">
            +86 CN
          </div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            className="waka-input flex-1"
            placeholder="请输入 11 位手机号"
          />
        </div>
        <div className="text-[11px] text-gray-400 mt-1.5">中国大陆以外请切换账号密码登录</div>
      </div>

      <div>
        <label className="waka-label">短信验证码</label>
        <div className="flex items-center gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="waka-input flex-1"
            placeholder="6 位验证码"
          />
          <button
            onClick={sendCode}
            disabled={cd > 0 || phone.length < 11}
            className="flex-shrink-0 h-[42px] px-3.5 rounded-lg border border-gray-200 text-[12.5px] font-medium text-brand-primary hover:text-brand-accent hover:border-brand-accent disabled:opacity-40 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:border-gray-200"
          >
            {cd > 0 ? `${cd}s 后重发` : sent.current ? "重新获取" : "获取验证码"}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2 text-[11.5px] text-gray-500 pt-1">
        <input type="checkbox" defaultChecked className="accent-brand-accent mt-0.5" />
        <span>
          我已阅读并同意
          <a className="text-brand-accent hover:underline mx-1">《用户协议》</a>
          和
          <a className="text-brand-accent hover:underline mx-1">《隐私政策》</a>
        </span>
      </label>

      <button
        onClick={() => login(phone + "@waka.io")}
        disabled={phone.length !== 11 || code.length < 4}
        className="waka-btn-primary w-full h-[42px]"
      >
        登录 / 注册 <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const AccountPanel: React.FC = () => {
  const { login, openModal } = useAppStore();
  const [email, setEmail] = useState("leo@crossborder.co");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="py-4 space-y-4">
      <div>
        <label className="waka-label">邮箱 / 用户名</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="waka-input" placeholder="you@example.com" />
      </div>
      <div>
        <label className="waka-label">密码</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="waka-input pr-10"
            placeholder="请输入密码（至少 8 位）"
          />
          <button
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[12px]">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" defaultChecked className="accent-brand-accent" />
          记住登录状态
        </label>
        <button
          onClick={() => openModal({ kind: "forgot", title: "forgot" })}
          className="text-brand-accent hover:underline font-medium"
        >
          忘记密码？
        </button>
      </div>

      <button
        onClick={() => login(email)}
        disabled={pwd.length < 6}
        className="waka-btn-primary w-full h-[42px]"
      >
        登录 <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3 text-[12px] text-gray-400 pt-1">
        <div className="flex-1 h-px bg-gray-200" />
        或
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => login("google@user.com")}
          className="waka-btn-outline h-[40px] flex items-center justify-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.6 35 26.9 36 24 36c-5.2 0-9.7-3.3-11.3-8l-6.6 4.8C9.7 39.7 16.3 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.2 5.2C41 34 44 29.4 44 24c0-1.2-.1-2.3-.4-3.5z" />
          </svg>
          Google
        </button>
        <button
          onClick={() => login("apple@waka.io")}
          className="waka-btn-outline h-[40px] flex items-center justify-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple
        </button>
        <button
          onClick={() => login("github@waka.io")}
          className="waka-btn-outline h-[40px] flex items-center justify-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
};

const Tabs: React.FC<{ mode: LoginMode; setMode: (m: LoginMode) => void }> = ({ mode, setMode }) => {
  const tabs: { key: LoginMode; label: string; icon: React.ReactNode }[] = [
    { key: "qrcode", label: "扫码登录", icon: <ScanLine className="w-4 h-4" /> },
    { key: "sms", label: "短信登录", icon: <Smartphone className="w-4 h-4" /> },
    { key: "account", label: "账号登录", icon: <UserRound className="w-4 h-4" /> },
  ];
  return (
    <div className="flex items-center">
      {tabs.map((t, i) => {
        const active = mode === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setMode(t.key)}
            className={`relative px-5 py-3 text-[13.5px] font-medium transition-colors flex items-center gap-2 ${
              active ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t.icon}
            {t.label}
            {active && (
              <span className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full bg-brand-accent" />
            )}
            {i < tabs.length - 1 && <span className="absolute right-0 top-3 bottom-3 w-px bg-gray-100" />}
          </button>
        );
      })}
    </div>
  );
};

export const Login: React.FC = () => {
  const { setRoute } = useAppStore();
  const [mode, setMode] = useState<LoginMode>("qrcode");

  const Panel = useMemo(() => {
    if (mode === "qrcode") return <QrCodePanel />;
    if (mode === "sms") return <SmsPanel />;
    return <AccountPanel />;
  }, [mode]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] via-[#EEF2F8] to-[#F8F9FA]">
      <div className="fixed top-6 right-8 text-[12px] text-gray-400 z-20 hidden md:flex items-center gap-3">
        <a className="hover:text-brand-accent">帮助中心</a>
        <span className="w-px h-3 bg-gray-200" />
        <a className="hover:text-brand-accent">中文 / EN</a>
        <span className="w-px h-3 bg-gray-200" />
        <a className="hover:text-brand-accent">隐私 & 条款</a>
      </div>

      <div className="w-[1040px] max-w-[94vw] h-[620px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(30,58,95,0.18)] flex bg-white">
        {/* left promotional panel */}
        <div className="w-[42%] shrink-0 relative">
          <PromotionalPanel />
        </div>

        {/* right login panel */}
        <div className="flex-1 flex flex-col bg-white">
          {/* top: logo + close */}
          <div className="h-[60px] flex items-center justify-between px-8 border-b border-gray-100">
            <div className="md:hidden">
              <Logo size={32} dark />
            </div>
            <div className="hidden md:block">
              <Logo size={32} dark />
            </div>
            <button
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400"
              aria-label="close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* tabs */}
          <div className="px-4 pt-2">
            <div className="border-b border-gray-100">
              <Tabs mode={mode} setMode={setMode} />
            </div>
          </div>

          {/* login body */}
          <div className="flex-1 overflow-auto px-10">
            {Panel}
          </div>

          {/* footer */}
          <div className="px-10 py-4 border-t border-gray-100 flex items-center justify-between text-[12px]">
            <div className="text-gray-500">
              没有账号？
              <button
                onClick={() => setRoute("register")}
                className="ml-1 text-brand-accent hover:underline font-medium inline-flex items-center"
              >
                立即注册 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" /> SSL 256-bit 加密
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Register: React.FC = () => {
  const { setRoute, login } = useAppStore();
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2240] to-[#1E3A5F]">
      <div className="w-[460px] bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <div className="text-lg font-bold text-brand-primary">创建账号</div>
          <div className="text-xs text-gray-500 mt-1">3 步完成注册 · 送 500 张免费额度</div>
        </div>
        <div className="mt-6 space-y-3">
          <input className="waka-input" placeholder="公司 / 店铺名称" />
          <input className="waka-input" placeholder="邮箱" />
          <input className="waka-input" placeholder="密码（至少 8 位）" />
          <select className="waka-input" defaultValue="amazon">
            <option value="amazon">主要销售平台：Amazon</option>
            <option value="shopify">Shopify</option>
            <option value="tiktok">TikTok Shop</option>
            <option value="multi">多平台经营</option>
          </select>
          <label className="flex items-start gap-2 text-[11.5px] text-gray-500 pt-1">
            <input type="checkbox" defaultChecked className="accent-brand-accent mt-0.5" />
            <span>
              我已阅读并同意
              <a className="text-brand-accent hover:underline mx-1">《用户协议》</a>
              和
              <a className="text-brand-accent hover:underline mx-1">《隐私政策》</a>
            </span>
          </label>
          <button onClick={() => login("new@waka.com")} className="waka-btn-primary w-full h-[42px] mt-2">
            创建并开始免费试用
          </button>
        </div>
        <div className="text-center text-[12px] text-gray-500 mt-6">
          已有账号？
          <button onClick={() => setRoute("login")} className="ml-1 text-brand-accent hover:underline font-medium">
            返回登录
          </button>
        </div>
      </div>
    </div>
  );
};
