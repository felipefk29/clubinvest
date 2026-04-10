import React, { useState, useMemo } from 'react';
import {
  Bell, Home, Wallet, User, Plus, Sparkles, Flame, Rocket, Users,
  TrendingUp, Target, ChevronRight, Lock, Send, Mail, Settings,
  Shield, BarChart3, Palette, HelpCircle, FileText, LogOut, Moon, Sun,
  PartyPopper, Trophy, Calendar, UserPlus, Check, X, Edit3
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

/* =========================================================
   COLETIVO — MVP (single-file React artifact)
   Mobile-first • Dark default • Tailwind utilities
   ========================================================= */

// ---------- MOCK DATA ----------
const USER = {
  name: 'Lucas Mendes',
  username: '@lucasmendes',
  avatar: 'LM',
  level: 3,
  levelName: 'Investidor Ativo',
  bio: 'Investindo pro futuro sem abrir mão do presente ✨',
  totalInvested: 4250.0,
  totalReturn: 312.5,
  returnPercent: 7.35,
  activeProjects: 3,
  friends: 12,
  badges: 8,
  totalBadges: 15,
  invitesAvailable: 3,
  invitesSent: [
    { name: 'Ana Clara', status: 'ativo' },
    { name: 'Pedro Henrique', status: 'ativo' },
    { name: 'Mariana Costa', status: 'pendente' },
  ],
};

const PROJECTS = [
  {
    id: 1, emoji: '🏖️', name: 'Réveillon Bahia 2026',
    type: 'Curto prazo', strategy: 'Renda fixa',
    goal: 12000, current: 9000, progress: 75,
    participants: ['LM', 'AC', 'PH', 'JS'], participantCount: 4,
    myContribution: 2250, myReturn: 89.2, myReturnPercent: 3.96,
    nextDeposit: '15/mai', nextAmount: 250,
    monthlyData: [800, 1200, 1800, 2500, 3200, 4250],
    status: 'ativo',
  },
  {
    id: 2, emoji: '✈️', name: 'Eurotrip 2027',
    type: 'Longo prazo', strategy: 'Multimercado',
    goal: 30000, current: 9600, progress: 32,
    participants: ['LM', 'AC', 'BR', 'TG', 'RF', 'MC'], participantCount: 6,
    myContribution: 1600, myReturn: 142.8, myReturnPercent: 8.93,
    nextDeposit: '01/mai', nextAmount: 200,
    monthlyData: [200, 600, 1000, 1300, 1500, 1600],
    status: 'ativo',
  },
  {
    id: 3, emoji: '🛡️', name: 'Fundo de Emergência da Galera',
    type: 'Sem prazo', strategy: 'Conservador',
    goal: null, current: 8500, progress: null,
    participants: ['LM', 'PH', 'JS'], participantCount: 3,
    myContribution: 400, myReturn: 80.5, myReturnPercent: 20.13,
    nextDeposit: '10/mai', nextAmount: 100,
    monthlyData: [50, 120, 200, 280, 350, 400],
    status: 'ativo',
  },
];

const FEED = [
  {
    id: 'f1', type: 'goal_reached',
    user: { name: 'Ana Clara', initials: 'AC' },
    project: 'Réveillon Bahia 2026', milestone: 75,
    current: 9000, goal: 12000, celebrations: 24, time: 'há 30min',
  },
  {
    id: 'f2', type: 'open_project',
    user: { name: 'Bruno Ribeiro', initials: 'BR' },
    project: 'Moto dos Sonhos', emoji: '🏍️',
    strategy: 'Médio prazo · Renda fixa',
    participants: ['BR', 'TG'], spotsLeft: 4, minDeposit: 100, time: 'há 2h',
  },
  {
    id: 'f3', type: 'challenge',
    title: 'Invista 7 dias seguidos',
    daysCompleted: 3, daysTotal: 7,
    reward: "Badge 'Consistente' + Conteúdo Exclusivo",
    participantsCount: 142, time: 'Desafio da Semana',
  },
  {
    id: 'f4', type: 'shared_result',
    user: { name: 'Thiago Garcia', initials: 'TG' },
    returnPercent: 2.3, cdiPercent: 1.1, strategy: 'Moderado',
    reactions: { fire: 18, rocket: 7, clap: 31 }, time: 'há 4h',
    chartData: [100, 102, 101, 103, 105, 104, 107, 108, 106, 109, 111, 112],
  },
  {
    id: 'f5', type: 'open_project',
    user: { name: 'Julia Santos', initials: 'JS' },
    project: 'Apartamento 2030', emoji: '🏠',
    strategy: 'Longo prazo · Diversificado',
    participants: ['JS', 'MC', 'BR'], spotsLeft: 7, minDeposit: 300, time: 'há 6h',
  },
  {
    id: 'f6', type: 'goal_reached',
    user: { name: 'Mariana Costa', initials: 'MC' },
    project: 'Festival Lollapalooza', milestone: 100,
    current: 2400, goal: 2400, celebrations: 89, time: 'ontem',
  },
];

const STORIES = [
  { name: 'Você', initials: 'LM', isUser: true, hasUpdate: true },
  { name: 'Ana', initials: 'AC', hasUpdate: true },
  { name: 'Thiago', initials: 'TG', hasUpdate: true },
  { name: 'Julia', initials: 'JS', hasUpdate: true },
  { name: 'Bruno', initials: 'BR', hasUpdate: false },
  { name: 'Pedro', initials: 'PH', hasUpdate: true },
  { name: 'Mari', initials: 'MC', hasUpdate: false },
];

const BADGES = [
  { emoji: '🚀', name: 'Early Adopter', unlocked: true },
  { emoji: '🔥', name: '7-Day Streak', unlocked: true },
  { emoji: '👥', name: 'Social Investor', unlocked: true },
  { emoji: '📚', name: 'Financ. Esperto', unlocked: true },
  { emoji: '🎯', name: 'Meta Cumprida', unlocked: true },
  { emoji: '💎', name: 'Convidou 5+', unlocked: false },
  { emoji: '🏆', name: 'Top Investidor', unlocked: false },
  { emoji: '🌟', name: 'Influenciador', unlocked: false },
  { emoji: '🎓', name: 'Mestre Financeiro', unlocked: false },
  { emoji: '💰', name: 'R$ 10k Club', unlocked: false },
  { emoji: '🤝', name: '10 Projetos', unlocked: true },
  { emoji: '📈', name: 'Bateu o CDI', unlocked: true },
  { emoji: '⚡', name: 'Aporte Relâmpago', unlocked: true },
  { emoji: '🎪', name: 'Festeiro Investidor', unlocked: false },
  { emoji: '🌍', name: 'Viajante', unlocked: false },
];

// ---------- THEME ----------
const THEMES = {
  dark: {
    bgPrimary: '#0A0A0F',
    bgSecondary: '#13131A',
    bgTertiary: '#1C1C28',
    surface: '#252535',
    textPrimary: '#FFFFFF',
    textSecondary: '#9999AA',
    textMuted: '#555566',
    border: 'rgba(255,255,255,0.06)',
    cardGrad: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    heroGrad: 'linear-gradient(135deg, #1a1a3a 0%, #0f1226 60%, #1a0f2e 100%)',
  },
  light: {
    bgPrimary: '#F5F5FA',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#F0F0F7',
    surface: '#E8E8F0',
    textPrimary: '#0A0A1F',
    textSecondary: '#55556A',
    textMuted: '#AAAABB',
    border: 'rgba(10,10,30,0.08)',
    cardGrad: 'linear-gradient(135deg, #ffffff 0%, #f3f0ff 100%)',
    heroGrad: 'linear-gradient(135deg, #ede7ff 0%, #e0f7f1 100%)',
  },
};

const ACCENT = {
  primary: '#7C5CFF',
  secondary: '#00D4AA',
  tertiary: '#FF6B6B',
  gold: '#FFD700',
  gradPrimary: 'linear-gradient(135deg, #7C5CFF, #00D4AA)',
  gradGold: 'linear-gradient(135deg, #FFD700, #FF8C00)',
  gradCoral: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
};

// ---------- UTILITIES ----------
const fmtBRL = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

const fmtBRLshort = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

// Avatar with gradient ring
const Avatar = ({ initials, size = 40, ring = true, ringGrad, t }) => {
  const s = size;
  return (
    <div
      style={{
        width: s, height: s, minWidth: s,
        padding: ring ? 2 : 0,
        borderRadius: '50%',
        background: ring ? (ringGrad || ACCENT.gradPrimary) : 'transparent',
      }}
    >
      <div
        style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: t.bgTertiary, color: t.textPrimary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: s * 0.38, letterSpacing: '-0.02em',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {initials}
      </div>
    </div>
  );
};

// Stack of avatars
const AvatarStack = ({ items, size = 28, t }) => (
  <div className="flex">
    {items.slice(0, 4).map((init, i) => (
      <div key={i} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i }}>
        <Avatar initials={init} size={size} t={t} />
      </div>
    ))}
  </div>
);

// Progress bar
const ProgressBar = ({ percent, t, grad = ACCENT.gradPrimary, height = 8 }) => (
  <div
    style={{
      width: '100%', height, background: t.surface,
      borderRadius: 999, overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: `${Math.min(100, percent)}%`, height: '100%',
        background: grad, borderRadius: 999,
        transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 0 20px rgba(124,92,255,0.35)',
      }}
    />
  </div>
);

// Chip/Tag
const Chip = ({ children, t, color }) => (
  <span
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 8,
      background: color ? `${color}22` : 'rgba(124,92,255,0.12)',
      color: color || ACCENT.primary,
      fontSize: 11, fontWeight: 600,
      border: `1px solid ${color ? `${color}33` : 'rgba(124,92,255,0.25)'}`,
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

// Card
const Card = ({ children, t, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: t.bgSecondary,
      borderRadius: 20,
      border: `1px solid ${t.border}`,
      padding: 16,
      backdropFilter: 'blur(12px)',
      transition: 'transform .2s ease, box-shadow .2s ease',
      ...style,
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {children}
  </div>
);

// Button
const Btn = ({ children, primary, onClick, t, full, icon: Icon, size = 'md' }) => {
  const pad = size === 'sm' ? '8px 14px' : '12px 20px';
  const fs = size === 'sm' ? 12 : 14;
  return (
    <button
      onClick={onClick}
      style={{
        width: full ? '100%' : 'auto',
        padding: pad,
        borderRadius: 12,
        border: primary ? 'none' : `1px solid ${ACCENT.primary}`,
        background: primary ? ACCENT.gradPrimary : 'transparent',
        color: primary ? '#fff' : ACCENT.primary,
        fontWeight: 700, fontSize: fs,
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: primary ? '0 8px 24px -8px rgba(124,92,255,0.6)' : 'none',
        transition: 'transform .15s ease, box-shadow .15s ease',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {Icon && <Icon size={fs + 2} />}
      {children}
    </button>
  );
};

// ---------- FEED CARDS ----------
const GoalReachedCard = ({ data, t, celebrations, onCelebrate }) => (
  <Card t={t}>
    <div className="flex items-center gap-3 mb-3">
      <Avatar initials={data.user.initials} size={40} t={t} />
      <div className="flex-1 min-w-0">
        <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: 14 }}>
          {data.user.name}
        </div>
        <div style={{ fontSize: 11, color: t.textMuted }}>{data.time}</div>
      </div>
      <div
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: ACCENT.gradGold,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
        }}
      >🎯</div>
    </div>
    <div style={{ fontSize: 14, color: t.textPrimary, marginBottom: 12, lineHeight: 1.4 }}>
      O grupo <b>{data.project}</b> atingiu <b>{data.milestone}%</b> da meta!
    </div>
    <div style={{ marginBottom: 8 }}>
      <ProgressBar percent={data.milestone} t={t} />
    </div>
    <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
      <span style={{ fontSize: 12, color: t.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>
        {fmtBRL(data.current)} / {fmtBRL(data.goal)}
      </span>
      <Chip t={t} color={ACCENT.gold}>{data.milestone}%</Chip>
    </div>
    <button
      onClick={onCelebrate}
      style={{
        width: '100%', padding: '10px', borderRadius: 12,
        border: `1px solid ${t.border}`, background: t.bgTertiary,
        color: t.textPrimary, fontWeight: 600, fontSize: 13,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <PartyPopper size={16} color={ACCENT.gold} />
      Celebrar · {celebrations}
    </button>
  </Card>
);

const OpenProjectCard = ({ data, t, onJoin }) => (
  <Card t={t}>
    <div className="flex items-center gap-3 mb-3">
      <Avatar initials={data.user.initials} size={40} t={t} />
      <div className="flex-1">
        <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: 14 }}>
          {data.user.name}
        </div>
        <div style={{ fontSize: 11, color: t.textMuted }}>
          criou um novo projeto · {data.time}
        </div>
      </div>
    </div>
    <div
      style={{
        height: 140, borderRadius: 16,
        background: `linear-gradient(135deg, #7C5CFF33 0%, #00D4AA22 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 64, marginBottom: 12,
        border: `1px solid ${t.border}`,
      }}
    >
      {data.emoji}
    </div>
    <div style={{ fontWeight: 700, fontSize: 18, color: t.textPrimary, marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>
      {data.project}
    </div>
    <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 12 }}>
      {data.strategy}
    </div>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <AvatarStack items={data.participants} t={t} />
        <span style={{ fontSize: 12, color: t.textSecondary }}>+{data.spotsLeft} vagas</span>
      </div>
      <span style={{ fontSize: 12, color: t.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>
        a partir de {fmtBRLshort(data.minDeposit)}/mês
      </span>
    </div>
    <Btn primary full t={t} onClick={onJoin} icon={Sparkles}>Quero Entrar</Btn>
  </Card>
);

const ChallengeCard = ({ data, t }) => (
  <Card t={t} style={{ background: `linear-gradient(135deg, #FF6B6B22 0%, #FFD70022 100%)`, border: `1px solid ${ACCENT.gold}44` }}>
    <div
      style={{
        display: 'inline-block', padding: '4px 10px', borderRadius: 8,
        background: ACCENT.gradGold, color: '#1a1a2e',
        fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
        textTransform: 'uppercase', marginBottom: 12,
      }}
    >
      {data.time}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: ACCENT.gradCoral,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Trophy size={24} color="#fff" />
      </div>
      <div style={{ fontWeight: 700, fontSize: 18, color: t.textPrimary, fontFamily: "'Outfit', sans-serif" }}>
        {data.title}
      </div>
    </div>
    <div className="flex gap-1 mb-3">
      {Array.from({ length: data.daysTotal }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: 28, borderRadius: 6,
            background: i < data.daysCompleted ? ACCENT.gradPrimary : t.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12,
          }}
        >
          {i < data.daysCompleted ? <Check size={14} color="#fff" /> : null}
        </div>
      ))}
    </div>
    <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 4 }}>
      🎁 {data.reward}
    </div>
    <div style={{ fontSize: 11, color: t.textMuted }}>
      {data.participantsCount} pessoas participando
    </div>
  </Card>
);

const SharedResultCard = ({ data, t, reactions, onReact }) => {
  const chartData = data.chartData.map((v, i) => ({ i, v }));
  return (
    <Card t={t}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={data.user.initials} size={40} t={t} />
        <div className="flex-1">
          <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: 14 }}>
            {data.user.name}
          </div>
          <div style={{ fontSize: 11, color: t.textMuted }}>
            compartilhou resultados · {data.time}
          </div>
        </div>
        <Chip t={t} color={ACCENT.secondary}>{data.strategy}</Chip>
      </div>
      <div style={{ height: 80, marginBottom: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="sharedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT.secondary} stopOpacity={0.6} />
                <stop offset="100%" stopColor={ACCENT.secondary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone" dataKey="v" stroke={ACCENT.secondary}
              strokeWidth={2} fill="url(#sharedGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <span style={{
          fontSize: 22, fontWeight: 800, color: ACCENT.secondary,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          +{data.returnPercent}%
        </span>
        <span style={{ fontSize: 11, color: t.textMuted }}>
          CDI no período: +{data.cdiPercent}%
        </span>
      </div>
      <div className="flex gap-2">
        {[
          { key: 'fire', emoji: '🔥', count: reactions.fire },
          { key: 'rocket', emoji: '🚀', count: reactions.rocket },
          { key: 'clap', emoji: '👏', count: reactions.clap },
        ].map((r) => (
          <button
            key={r.key}
            onClick={() => onReact(r.key)}
            style={{
              padding: '6px 12px', borderRadius: 999,
              background: t.bgTertiary, border: `1px solid ${t.border}`,
              color: t.textPrimary, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>{r.emoji}</span>
            <span>{r.count}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

// ---------- STORIES BAR ----------
const StoriesBar = ({ t }) => (
  <div
    style={{
      display: 'flex', gap: 14, overflowX: 'auto', padding: '4px 16px 16px',
      scrollbarWidth: 'none',
    }}
  >
    {STORIES.map((s, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 64 }}>
        <div
          style={{
            padding: s.hasUpdate ? 2.5 : 0,
            borderRadius: '50%',
            background: s.isUser
              ? 'linear-gradient(135deg, #FFD700, #FF6B6B, #7C5CFF)'
              : s.hasUpdate
                ? ACCENT.gradPrimary
                : t.border,
          }}
        >
          <div style={{ padding: 2, background: t.bgPrimary, borderRadius: '50%' }}>
            <Avatar initials={s.initials} size={54} ring={false} t={t} />
          </div>
        </div>
        <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>{s.name}</span>
      </div>
    ))}
  </div>
);

// ---------- SCREENS ----------
const FeedScreen = ({ t }) => {
  const [celebrations, setCelebrations] = useState(
    FEED.reduce((a, f) => ({ ...a, [f.id]: f.celebrations || 0 }), {})
  );
  const [reactions, setReactions] = useState({ f4: { fire: 18, rocket: 7, clap: 31 } });
  const [fabOpen, setFabOpen] = useState(false);

  const handleCelebrate = (id) =>
    setCelebrations((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const handleReact = (fid, key) =>
    setReactions((r) => ({
      ...r,
      [fid]: { ...r[fid], [key]: (r[fid]?.[key] || 0) + 1 },
    }));

  return (
    <div style={{ paddingBottom: 120 }}>
      <StoriesBar t={t} />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {FEED.map((item) => {
          if (item.type === 'goal_reached')
            return (
              <GoalReachedCard
                key={item.id} data={item} t={t}
                celebrations={celebrations[item.id]}
                onCelebrate={() => handleCelebrate(item.id)}
              />
            );
          if (item.type === 'open_project')
            return <OpenProjectCard key={item.id} data={item} t={t} onJoin={() => {}} />;
          if (item.type === 'challenge')
            return <ChallengeCard key={item.id} data={item} t={t} />;
          if (item.type === 'shared_result')
            return (
              <SharedResultCard
                key={item.id} data={item} t={t}
                reactions={reactions[item.id] || item.reactions}
                onReact={(k) => handleReact(item.id, k)}
              />
            );
          return null;
        })}
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', right: 20, bottom: 92, zIndex: 30 }}>
        {fabOpen && (
          <div
            style={{
              position: 'absolute', bottom: 70, right: 0,
              display: 'flex', flexDirection: 'column', gap: 8,
              background: t.bgSecondary, padding: 8, borderRadius: 14,
              border: `1px solid ${t.border}`, minWidth: 170,
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
            }}
          >
            <button style={fabItemStyle(t)}>
              <Sparkles size={16} color={ACCENT.primary} /> Criar Projeto
            </button>
            <button style={fabItemStyle(t)}>
              <UserPlus size={16} color={ACCENT.secondary} /> Convidar Amigo
            </button>
          </div>
        )}
        <button
          onClick={() => setFabOpen((o) => !o)}
          style={{
            width: 58, height: 58, borderRadius: '50%',
            background: ACCENT.gradPrimary, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 30px -6px rgba(124,92,255,0.7)',
            cursor: 'pointer',
            transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <Plus size={28} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const fabItemStyle = (t) => ({
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '10px 12px', borderRadius: 10,
  background: 'transparent', border: 'none',
  color: t.textPrimary, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
});

// Projects
const ProjectsScreen = ({ t }) => {
  const [filter, setFilter] = useState('ativos');
  const summaryData = [3600, 3800, 3900, 4050, 4150, 4250].map((v, i) => ({ i, v }));

  const filtered = useMemo(() => {
    if (filter === 'concluidos') return [];
    return PROJECTS;
  }, [filter]);

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Filter tabs */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div
          style={{
            display: 'flex', padding: 4, background: t.bgSecondary,
            borderRadius: 12, border: `1px solid ${t.border}`,
          }}
        >
          {[
            { k: 'ativos', l: 'Ativos' },
            { k: 'concluidos', l: 'Concluídos' },
            { k: 'todos', l: 'Todos' },
          ].map((f) => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flex: 1, padding: '8px', borderRadius: 9,
                border: 'none',
                background: filter === f.k ? ACCENT.gradPrimary : 'transparent',
                color: filter === f.k ? '#fff' : t.textSecondary,
                fontWeight: 700, fontSize: 12, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all .2s ease',
              }}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div
          style={{
            background: t.heroGrad,
            borderRadius: 22, padding: 20,
            border: `1px solid ${t.border}`,
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', top: -40, right: -40, width: 140, height: 140,
              background: 'radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)',
            }}
          />
          <div style={{ fontSize: 12, color: t.textSecondary, fontWeight: 600, marginBottom: 6 }}>
            Total investido
          </div>
          <div
            style={{
              fontSize: 34, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'JetBrains Mono', monospace", marginBottom: 10,
              letterSpacing: '-0.02em',
            }}
          >
            {fmtBRL(USER.totalInvested)}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Chip t={t} color={ACCENT.secondary}>
              <TrendingUp size={12} />
              +{fmtBRL(USER.totalReturn)}
            </Chip>
            <span style={{
              color: ACCENT.secondary, fontSize: 13, fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              +{USER.returnPercent}%
            </span>
          </div>
          <div style={{ height: 56, margin: '0 -8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={summaryData}>
                <Line
                  type="monotone" dataKey="v"
                  stroke={ACCENT.secondary} strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center" style={{ marginTop: 8 }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>Últimos 6 meses</span>
            <span style={{ fontSize: 12, color: t.textSecondary, fontWeight: 600 }}>
              {USER.activeProjects} projetos ativos
            </span>
          </div>
        </div>
      </div>

      {/* Project list */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: 40, textAlign: 'center',
            background: t.bgSecondary, borderRadius: 20,
            border: `1px dashed ${t.border}`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🚀</div>
            <div style={{ color: t.textSecondary, fontSize: 14 }}>
              Nenhum projeto concluído ainda.<br/>Continue investindo!
            </div>
          </div>
        ) : (
          filtered.map((p) => <ProjectCard key={p.id} p={p} t={t} />)
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ p, t }) => (
  <Card t={t}>
    <div className="flex items-start gap-3 mb-3">
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `linear-gradient(135deg, #7C5CFF22, #00D4AA22)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, border: `1px solid ${t.border}`,
      }}>
        {p.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 700, fontSize: 16, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif", marginBottom: 4,
        }}>
          {p.name}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Chip t={t}>{p.type}</Chip>
          <Chip t={t} color={ACCENT.secondary}>{p.strategy}</Chip>
        </div>
      </div>
    </div>

    {p.goal !== null ? (
      <>
        <div style={{ marginBottom: 6 }}>
          <ProgressBar percent={p.progress} t={t} />
        </div>
        <div className="flex justify-between" style={{ marginBottom: 14 }}>
          <span style={{
            fontSize: 12, color: t.textSecondary,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {fmtBRL(p.current)} / {fmtBRL(p.goal)}
          </span>
          <span style={{ fontSize: 12, color: ACCENT.primary, fontWeight: 700 }}>
            {p.progress}% da meta
          </span>
        </div>
      </>
    ) : (
      <div style={{
        marginBottom: 14, padding: 12,
        background: t.bgTertiary, borderRadius: 12,
      }}>
        <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 2 }}>Total acumulado</div>
        <div style={{
          fontSize: 18, fontWeight: 800, color: t.textPrimary,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {fmtBRL(p.current)}
        </div>
      </div>
    )}

    <div className="flex items-center gap-2 mb-3">
      <AvatarStack items={p.participants} size={26} t={t} />
      <span style={{ fontSize: 12, color: t.textSecondary }}>
        {p.participantCount} participantes
      </span>
    </div>

    <div
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        padding: 12, background: t.bgTertiary, borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <div>
        <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 2 }}>Seu aporte</div>
        <div style={{
          fontSize: 14, fontWeight: 700, color: t.textPrimary,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {fmtBRL(p.myContribution)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 2 }}>Rendimento</div>
        <div style={{
          fontSize: 14, fontWeight: 700, color: ACCENT.secondary,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          +{fmtBRL(p.myReturn)}
          <span style={{ fontSize: 10, marginLeft: 4 }}>(+{p.myReturnPercent}%)</span>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div style={{ fontSize: 11, color: t.textSecondary, display: 'flex', alignItems: 'center', gap: 4 }}>
        <Calendar size={12} />
        Próx aporte: <b style={{ color: t.textPrimary }}>{p.nextDeposit}</b> · {fmtBRLshort(p.nextAmount)}
      </div>
      <button style={{
        padding: '6px 12px', borderRadius: 10,
        background: 'transparent', border: `1px solid ${t.border}`,
        color: t.textPrimary, fontSize: 11, fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Detalhes <ChevronRight size={12} />
      </button>
    </div>
  </Card>
);

// Profile
const ProfileScreen = ({ t, theme, onToggleTheme }) => (
  <div style={{ paddingBottom: 120 }}>
    {/* Hero */}
    <div style={{
      background: t.heroGrad,
      padding: '24px 20px 28px',
      margin: '0 16px',
      borderRadius: 22,
      border: `1px solid ${t.border}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -60, left: -30, width: 180, height: 180,
        background: 'radial-gradient(circle, rgba(0,212,170,0.25), transparent 70%)',
      }} />
      <div className="flex items-center gap-4 mb-4" style={{ position: 'relative' }}>
        <Avatar initials={USER.avatar} size={80} ringGrad={ACCENT.gradGold} t={t} />
        <div>
          <div style={{
            fontSize: 20, fontWeight: 800, color: t.textPrimary,
            fontFamily: "'Outfit', sans-serif",
          }}>
            {USER.name}
          </div>
          <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 6 }}>
            {USER.username}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 8,
            background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.35)',
            color: ACCENT.gold, fontSize: 11, fontWeight: 700,
          }}>
            <Flame size={11} /> Nível {USER.level} · {USER.levelName}
          </div>
        </div>
      </div>
      <div style={{
        fontSize: 13, color: t.textSecondary, marginBottom: 14,
        lineHeight: 1.4, position: 'relative',
      }}>
        {USER.bio}
      </div>
      <div className="flex gap-4 mb-4" style={{ position: 'relative' }}>
        {[
          { n: USER.activeProjects, l: 'Projetos' },
          { n: USER.friends, l: 'Amigos' },
          { n: USER.badges, l: 'Badges' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{
              fontSize: 20, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'Outfit', sans-serif",
            }}>
              {s.n}
            </div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{s.l}</div>
          </div>
        ))}
      </div>
      <Btn t={t} icon={Edit3} size="sm">Editar Perfil</Btn>
    </div>

    {/* Badges */}
    <div style={{ padding: '20px 16px 0' }}>
      <div className="flex justify-between items-center mb-3">
        <div style={{
          fontSize: 15, fontWeight: 700, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif",
        }}>
          Conquistas
        </div>
        <span style={{ fontSize: 11, color: t.textMuted }}>
          {USER.badges}/{USER.totalBadges}
        </span>
      </div>
      <div style={{
        display: 'flex', gap: 10, overflowX: 'auto', padding: '4px 0 12px',
        scrollbarWidth: 'none',
      }}>
        {BADGES.map((b, i) => (
          <div
            key={i}
            style={{
              minWidth: 76,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: 20,
                background: b.unlocked ? ACCENT.gradPrimary : t.surface,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, position: 'relative',
                opacity: b.unlocked ? 1 : 0.4,
                boxShadow: b.unlocked ? '0 8px 24px -8px rgba(124,92,255,0.5)' : 'none',
              }}
            >
              {b.unlocked ? b.emoji : <Lock size={20} color={t.textMuted} />}
            </div>
            <span style={{
              fontSize: 10, color: b.unlocked ? t.textSecondary : t.textMuted,
              textAlign: 'center', fontWeight: 600,
            }}>
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Invites */}
    <div style={{ padding: '12px 16px 0' }}>
      <div style={{
        background: `linear-gradient(135deg, #FFD70022, #FF6B6B22)`,
        border: `1px solid ${ACCENT.gold}44`,
        borderRadius: 20, padding: 18,
      }}>
        <div className="flex items-center gap-3 mb-3">
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: ACCENT.gradGold,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mail size={22} color="#1a1a2e" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 15, fontWeight: 700, color: t.textPrimary,
              fontFamily: "'Outfit', sans-serif",
            }}>
              Você tem {USER.invitesAvailable} convites
            </div>
            <div style={{ fontSize: 11, color: t.textSecondary }}>
              Cada amigo que entra destrava benefícios
            </div>
          </div>
        </div>
        <Btn primary full t={t} icon={Send}>Enviar Convite</Btn>
        <div style={{
          marginTop: 14, paddingTop: 14,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {USER.invitesSent.map((inv, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar initials={inv.name.split(' ').map((w) => w[0]).join('').slice(0, 2)} size={32} t={t} />
              <div style={{ flex: 1, fontSize: 13, color: t.textPrimary, fontWeight: 600 }}>
                {inv.name}
              </div>
              <Chip
                t={t}
                color={inv.status === 'ativo' ? ACCENT.secondary : ACCENT.gold}
              >
                {inv.status === 'ativo' ? <Check size={11} /> : null}
                {inv.status}
              </Chip>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Settings */}
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{
        fontSize: 15, fontWeight: 700, color: t.textPrimary, marginBottom: 12,
        fontFamily: "'Outfit', sans-serif",
      }}>
        Configurações
      </div>
      <div style={{
        background: t.bgSecondary, borderRadius: 16,
        border: `1px solid ${t.border}`, overflow: 'hidden',
      }}>
        {[
          { icon: Bell, label: 'Notificações' },
          { icon: Shield, label: 'Segurança & Privacidade' },
          { icon: BarChart3, label: 'Preferências de Investimento' },
          {
            icon: Palette, label: 'Aparência',
            right: (
              <div
                onClick={(e) => { e.stopPropagation(); onToggleTheme(); }}
                style={{
                  width: 44, height: 24, borderRadius: 999,
                  background: theme === 'dark' ? ACCENT.gradPrimary : t.surface,
                  position: 'relative', cursor: 'pointer',
                  transition: 'background .2s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute', top: 2,
                    left: theme === 'dark' ? 22 : 2,
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#fff',
                    transition: 'left .2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {theme === 'dark'
                    ? <Moon size={11} color="#1a1a2e" />
                    : <Sun size={11} color="#FF8C00" />}
                </div>
              </div>
            ),
          },
          { icon: HelpCircle, label: 'Central de Ajuda' },
          { icon: FileText, label: 'Termos de Uso' },
          { icon: LogOut, label: 'Sair', danger: true },
        ].map((item, i, arr) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: t.bgTertiary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <item.icon
                size={16}
                color={item.danger ? ACCENT.tertiary : ACCENT.primary}
              />
            </div>
            <div style={{
              flex: 1, fontSize: 14, fontWeight: 600,
              color: item.danger ? ACCENT.tertiary : t.textPrimary,
            }}>
              {item.label}
            </div>
            {item.right || <ChevronRight size={16} color={t.textMuted} />}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- TAB BAR ----------
const TabBar = ({ active, onChange, t }) => {
  const tabs = [
    { k: 'feed', label: 'Feed', icon: Home },
    { k: 'projects', label: 'Projetos', icon: Wallet },
    { k: 'profile', label: 'Perfil', icon: User },
  ];
  return (
    <div
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: `${t.bgSecondary}ee`,
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`,
        display: 'flex',
        padding: '10px 12px 20px',
        zIndex: 20,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.k;
        return (
          <button
            key={tab.k}
            onClick={() => onChange(tab.k)}
            style={{
              flex: 1, background: 'transparent', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, cursor: 'pointer', padding: '6px 0',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div
              style={{
                padding: '6px 18px', borderRadius: 12,
                background: isActive ? 'rgba(124,92,255,0.15)' : 'transparent',
                transition: 'all .2s ease',
              }}
            >
              <tab.icon
                size={22}
                color={isActive ? ACCENT.primary : t.textMuted}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span
              style={{
                fontSize: 10, fontWeight: 700,
                color: isActive ? ACCENT.primary : t.textMuted,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ---------- HEADER ----------
const Header = ({ activeTab, t }) => {
  const titles = {
    feed: 'Coletivo',
    projects: 'Meus Projetos',
    profile: 'Perfil',
  };
  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 15,
        background: `${t.bgPrimary}dd`,
        backdropFilter: 'blur(20px)',
        padding: '18px 20px 14px',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em',
          fontFamily: "'Outfit', sans-serif",
          background: activeTab === 'feed' ? ACCENT.gradPrimary : 'none',
          WebkitBackgroundClip: activeTab === 'feed' ? 'text' : 'initial',
          WebkitTextFillColor: activeTab === 'feed' ? 'transparent' : t.textPrimary,
          color: t.textPrimary,
        }}
      >
        {titles[activeTab]}
      </div>
      <div style={{ position: 'relative' }}>
        <button
          style={{
            width: 40, height: 40, borderRadius: 12,
            background: t.bgSecondary, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Bell size={18} color={t.textPrimary} />
        </button>
        <div
          style={{
            position: 'absolute', top: -2, right: -2,
            minWidth: 18, height: 18, borderRadius: 9,
            background: ACCENT.tertiary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 10, fontWeight: 800,
            border: `2px solid ${t.bgPrimary}`,
            padding: '0 4px',
          }}
        >
          5
        </div>
      </div>
    </div>
  );
};

// ---------- APP ----------
export default function Coletivo() {
  const [activeTab, setActiveTab] = useState('feed');
  const [theme, setTheme] = useState('dark');
  const t = THEMES[theme];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .items-baseline { align-items: baseline; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .gap-1 { gap: 4px; } .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
        .flex-1 { flex: 1; }
        .flex-wrap { flex-wrap: wrap; }
        .min-w-0 { min-width: 0; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
      `}</style>
      <div
        style={{
          minHeight: '100vh',
          background: `radial-gradient(ellipse at top, ${theme === 'dark' ? '#1a0f2e' : '#eadfff'}, ${t.bgPrimary} 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px 0',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            width: '100%', maxWidth: 430,
            height: '92vh', maxHeight: 920,
            background: t.bgPrimary,
            borderRadius: 36,
            border: `1px solid ${t.border}`,
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Header activeTab={activeTab} t={t} />
          <div
            key={activeTab}
            style={{
              height: 'calc(100% - 78px)',
              overflowY: 'auto',
              animation: 'fadein .35s ease',
            }}
          >
            <style>{`@keyframes fadein { from { opacity: 0; transform: translateY(6px);} to { opacity:1; transform: translateY(0);} }`}</style>
            {activeTab === 'feed' && <FeedScreen t={t} />}
            {activeTab === 'projects' && <ProjectsScreen t={t} />}
            {activeTab === 'profile' && (
              <ProfileScreen
                t={t}
                theme={theme}
                onToggleTheme={() => setTheme((th) => (th === 'dark' ? 'light' : 'dark'))}
              />
            )}
          </div>
          <TabBar active={activeTab} onChange={setActiveTab} t={t} />
        </div>
      </div>
    </>
  );
}
