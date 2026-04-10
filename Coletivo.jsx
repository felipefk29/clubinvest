import React, { useState, useMemo, useEffect } from 'react';
import {
  Bell, Home, Wallet, User, Plus, Sparkles, Flame, Rocket, Users,
  TrendingUp, TrendingDown, Target, ChevronRight, ChevronLeft, Lock,
  Send, Mail, Shield, BarChart3, Palette, HelpCircle, FileText, LogOut,
  Moon, Sun, PartyPopper, Trophy, Calendar, UserPlus, Check, Edit3,
  Newspaper, GraduationCap, Zap, Crown, ArrowUpRight, ArrowDownRight,
  PieChart as PieIcon, Activity, AlertTriangle, Info, Heart, MessageCircle,
  Share2, BookOpen, Globe, DollarSign, Bitcoin, Eye, Star, Award, Search,
  Filter, MoreHorizontal, CheckCircle2, Clock
} from 'lucide-react';
import {
  LineChart, Line, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar
} from 'recharts';

/* =========================================================
   COLETIVO — MVP v2 (robust single-file React artifact)
   Mobile-first • Dark default • Tailwind-like utilities inline
   Screens: Feed · Projects · ProjectDetail · Profile
   ========================================================= */

// ============================================================
// 1. MOCK DATA
// ============================================================
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
  xp: 2840,
  xpNext: 3500,
  streak: 12,
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
    participants: [
      { initials: 'LM', name: 'Lucas M.', contribution: 2250 },
      { initials: 'AC', name: 'Ana C.', contribution: 2500 },
      { initials: 'PH', name: 'Pedro H.', contribution: 2250 },
      { initials: 'JS', name: 'Julia S.', contribution: 2000 },
    ],
    participantCount: 4,
    myContribution: 2250, myReturn: 89.2, myReturnPercent: 3.96,
    nextDeposit: '15/mai', nextAmount: 250,
    monthlyData: [800, 1200, 1800, 2500, 3200, 4250, 5100, 6000, 7200, 8100, 8600, 9000],
    status: 'ativo',
    risk: 'Baixo',
    riskScore: 2,
    allocation: [
      { name: 'Tesouro Selic', value: 40, color: '#7C5CFF' },
      { name: 'CDB 110% CDI', value: 35, color: '#00D4AA' },
      { name: 'LCI/LCA', value: 20, color: '#FFD700' },
      { name: 'Caixa', value: 5, color: '#FF6B6B' },
    ],
    benchmarks: { cdi: 5.2, ibov: 3.8, poupanca: 3.1, portfolio: 7.35 },
    deposits: [
      { date: 'Jan', amount: 800 },
      { date: 'Fev', amount: 400 },
      { date: 'Mar', amount: 600 },
      { date: 'Abr', amount: 450 },
      { date: 'Mai', amount: 0 },
    ],
  },
  {
    id: 2, emoji: '✈️', name: 'Eurotrip 2027',
    type: 'Longo prazo', strategy: 'Multimercado',
    goal: 30000, current: 9600, progress: 32,
    participants: [
      { initials: 'LM', name: 'Lucas M.', contribution: 1600 },
      { initials: 'AC', name: 'Ana C.', contribution: 1800 },
      { initials: 'BR', name: 'Bruno R.', contribution: 1500 },
      { initials: 'TG', name: 'Thiago G.', contribution: 1700 },
      { initials: 'RF', name: 'Rafaela F.', contribution: 1600 },
      { initials: 'MC', name: 'Mariana C.', contribution: 1400 },
    ],
    participantCount: 6,
    myContribution: 1600, myReturn: 142.8, myReturnPercent: 8.93,
    nextDeposit: '01/mai', nextAmount: 200,
    monthlyData: [200, 600, 1000, 1300, 1500, 1600, 1900, 2400, 3100, 4000, 5200, 9600],
    status: 'ativo',
    risk: 'Moderado',
    riskScore: 3,
    allocation: [
      { name: 'Ações Brasil', value: 25, color: '#7C5CFF' },
      { name: 'Ações Global', value: 20, color: '#00D4AA' },
      { name: 'Renda Fixa', value: 30, color: '#FFD700' },
      { name: 'Multimercado', value: 15, color: '#FF6B6B' },
      { name: 'Cripto', value: 10, color: '#FF8C00' },
    ],
    benchmarks: { cdi: 5.2, ibov: 3.8, poupanca: 3.1, portfolio: 8.93 },
    deposits: [
      { date: 'Jan', amount: 200 },
      { date: 'Fev', amount: 250 },
      { date: 'Mar', amount: 300 },
      { date: 'Abr', amount: 200 },
      { date: 'Mai', amount: 0 },
    ],
  },
  {
    id: 3, emoji: '🛡️', name: 'Fundo de Emergência da Galera',
    type: 'Sem prazo', strategy: 'Conservador',
    goal: null, current: 8500, progress: null,
    participants: [
      { initials: 'LM', name: 'Lucas M.', contribution: 400 },
      { initials: 'PH', name: 'Pedro H.', contribution: 4200 },
      { initials: 'JS', name: 'Julia S.', contribution: 3900 },
    ],
    participantCount: 3,
    myContribution: 400, myReturn: 80.5, myReturnPercent: 20.13,
    nextDeposit: '10/mai', nextAmount: 100,
    monthlyData: [50, 120, 200, 280, 350, 400, 500, 650, 800, 900, 950, 1000],
    status: 'ativo',
    risk: 'Muito baixo',
    riskScore: 1,
    allocation: [
      { name: 'Tesouro Selic', value: 60, color: '#7C5CFF' },
      { name: 'CDB Liquidez D+0', value: 30, color: '#00D4AA' },
      { name: 'Caixa', value: 10, color: '#FFD700' },
    ],
    benchmarks: { cdi: 5.2, ibov: 3.8, poupanca: 3.1, portfolio: 20.13 },
    deposits: [
      { date: 'Jan', amount: 100 },
      { date: 'Fev', amount: 100 },
      { date: 'Mar', amount: 100 },
      { date: 'Abr', amount: 100 },
      { date: 'Mai', amount: 0 },
    ],
  },
];

const MARKET = [
  { name: 'Ibovespa', value: '128.432', change: 1.24, data: [100, 102, 101, 103, 105, 104, 107, 108, 106, 109, 111, 112] },
  { name: 'Dólar', value: 'R$ 5,12', change: -0.42, data: [112, 110, 111, 109, 108, 107, 108, 106, 105, 107, 106, 105] },
  { name: 'CDI', value: '10,65%', change: 0.15, data: [100, 100, 101, 101, 102, 102, 102, 103, 103, 103, 104, 104] },
  { name: 'Bitcoin', value: 'US$ 68.4k', change: 3.82, data: [100, 98, 102, 105, 103, 108, 110, 107, 112, 115, 114, 118] },
];

const NEWS = [
  {
    id: 'n1',
    source: 'Valor Econômico',
    category: 'Mercado',
    headline: 'Ibovespa fecha em alta de 1,2% puxado por bancos e commodities',
    summary: 'Principal índice da bolsa brasileira reage a dados de inflação acima do esperado nos EUA e ao cenário doméstico positivo.',
    time: 'há 1h',
    image: '📈',
    color: '#7C5CFF',
  },
  {
    id: 'n2',
    source: 'InfoMoney',
    category: 'Renda Fixa',
    headline: 'Copom mantém Selic em 10,75% e sinaliza cautela para próximas reuniões',
    summary: 'Comitê destaca que a desinflação tem sido mais lenta que o esperado e mantém tom conservador.',
    time: 'há 3h',
    image: '🏛️',
    color: '#00D4AA',
  },
  {
    id: 'n3',
    source: 'Bloomberg',
    category: 'Global',
    headline: 'Bitcoin ultrapassa US$ 68 mil após aprovação de novos ETFs',
    summary: 'Criptomoeda tem alta semanal de 8% com entrada de capital institucional e expectativa do halving.',
    time: 'há 5h',
    image: '₿',
    color: '#FFD700',
  },
];

const FEED = [
  {
    id: 'f0', type: 'market_snapshot', time: 'agora'
  },
  {
    id: 'f1', type: 'goal_reached',
    user: { name: 'Ana Clara', initials: 'AC' },
    project: 'Réveillon Bahia 2026', milestone: 75,
    current: 9000, goal: 12000, celebrations: 24, comments: 8, time: 'há 30min',
  },
  {
    id: 'fn1', type: 'news', newsId: 'n1', time: 'há 1h',
  },
  {
    id: 'f7', type: 'level_up',
    user: { name: 'Você', initials: 'LM' },
    newLevel: 3, newLevelName: 'Investidor Ativo',
    xpEarned: 250, time: 'há 1h',
  },
  {
    id: 'f2', type: 'open_project',
    user: { name: 'Bruno Ribeiro', initials: 'BR' },
    project: 'Moto dos Sonhos', emoji: '🏍️',
    strategy: 'Médio prazo · Renda fixa',
    description: 'Bora juntar galera pra comprar as motos dos sonhos em 18 meses. Vou começar com R$100 e aumentar aos poucos.',
    participants: ['BR', 'TG'], spotsLeft: 4, minDeposit: 100, time: 'há 2h',
    likes: 42, comments: 12,
  },
  {
    id: 'f3', type: 'challenge',
    title: 'Invista 7 dias seguidos',
    daysCompleted: 3, daysTotal: 7,
    reward: "Badge 'Consistente' + Conteúdo Exclusivo",
    participantsCount: 142, time: 'Desafio da Semana',
  },
  {
    id: 'f8', type: 'education',
    topic: 'Aula Rápida',
    title: 'O que é diversificação e por que importa?',
    duration: '3 min',
    description: 'Descubra por que colocar todos os ovos na mesma cesta pode destruir seu patrimônio — e como evitar esse erro clássico.',
    time: 'há 3h',
  },
  {
    id: 'fn2', type: 'news', newsId: 'n2', time: 'há 3h',
  },
  {
    id: 'f4', type: 'shared_result',
    user: { name: 'Thiago Garcia', initials: 'TG' },
    returnPercent: 2.3, cdiPercent: 1.1, strategy: 'Moderado',
    caption: 'Bateu o CDI esse mês! A diversificação em ativos globais tá pagando 🌎',
    reactions: { fire: 18, rocket: 7, clap: 31 }, comments: 14, time: 'há 4h',
    chartData: [100, 102, 101, 103, 105, 104, 107, 108, 106, 109, 111, 112],
  },
  {
    id: 'f9', type: 'top_investor',
    user: { name: 'Rafaela Ferreira', initials: 'RF' },
    rank: 1, returnPercent: 12.4, streak: 28,
    badge: 'Top Investidora da Semana',
    time: 'há 5h',
  },
  {
    id: 'fn3', type: 'news', newsId: 'n3', time: 'há 5h',
  },
  {
    id: 'f10', type: 'poll',
    user: { name: 'Pedro Henrique', initials: 'PH' },
    question: 'Qual objetivo é mais importante pra você?',
    options: [
      { label: 'Viagem internacional', votes: 342 },
      { label: 'Comprar imóvel', votes: 218 },
      { label: 'Reserva de emergência', votes: 512 },
      { label: 'Aposentadoria antecipada', votes: 189 },
    ],
    time: 'há 6h',
  },
  {
    id: 'f5', type: 'open_project',
    user: { name: 'Julia Santos', initials: 'JS' },
    project: 'Apartamento 2030', emoji: '🏠',
    strategy: 'Longo prazo · Diversificado',
    description: 'O sonho do apê em 5 anos. Estratégia diversificada com foco em multimercado e ações dividendos.',
    participants: ['JS', 'MC', 'BR'], spotsLeft: 7, minDeposit: 300, time: 'há 6h',
    likes: 67, comments: 23,
  },
  {
    id: 'f11', type: 'streak',
    user: { name: 'Você', initials: 'LM' },
    days: 12, nextMilestone: 14,
    time: 'há 8h',
  },
  {
    id: 'f12', type: 'friend_joined',
    user: { name: 'Marina Oliveira', initials: 'MO' },
    invitedBy: 'Ana Clara',
    time: 'há 10h',
  },
  {
    id: 'f6', type: 'goal_reached',
    user: { name: 'Mariana Costa', initials: 'MC' },
    project: 'Festival Lollapalooza', milestone: 100,
    current: 2400, goal: 2400, celebrations: 89, comments: 34, time: 'ontem',
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
  { name: 'Rafa', initials: 'RF', hasUpdate: true },
  { name: 'Thi', initials: 'TS', hasUpdate: true },
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

const NOTIFICATIONS = [
  { icon: '🎯', text: 'Ana Clara atingiu 75% da meta', time: 'agora' },
  { icon: '💰', text: 'Seu aporte de R$ 250 foi confirmado', time: '1h' },
  { icon: '🔥', text: 'Você está em streak de 12 dias!', time: '2h' },
  { icon: '👥', text: 'Marina Oliveira entrou no Coletivo', time: '10h' },
  { icon: '📈', text: 'Rendimento do mês: +2,3%', time: 'ontem' },
];

// ============================================================
// 2. THEME
// ============================================================
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
    borderStrong: 'rgba(255,255,255,0.12)',
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
    borderStrong: 'rgba(10,10,30,0.15)',
    heroGrad: 'linear-gradient(135deg, #ede7ff 0%, #e0f7f1 100%)',
  },
};

const ACCENT = {
  primary: '#7C5CFF',
  secondary: '#00D4AA',
  tertiary: '#FF6B6B',
  gold: '#FFD700',
  orange: '#FF8C00',
  gradPrimary: 'linear-gradient(135deg, #7C5CFF, #00D4AA)',
  gradGold: 'linear-gradient(135deg, #FFD700, #FF8C00)',
  gradCoral: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
  gradPurple: 'linear-gradient(135deg, #7C5CFF, #B794FF)',
  gradGreen: 'linear-gradient(135deg, #00D4AA, #4ADE80)',
};

// ============================================================
// 3. UTILITIES
// ============================================================
const fmtBRL = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
const fmtBRLshort = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

const timeAgo = (timestamp) => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return 'agora';
  if (seconds < 3600) return `há ${Math.floor(seconds / 60)}min`;
  if (seconds < 86400) return `há ${Math.floor(seconds / 3600)}h`;
  return `há ${Math.floor(seconds / 86400)}d`;
};

// Build sparkline-like data from current value (synthetic but smooth)
const synthSpark = (seed, up = true) => {
  const arr = [];
  let v = 100;
  for (let i = 0; i < 12; i++) {
    const delta = (Math.sin(seed + i * 0.7) + Math.cos(seed * 0.5 + i)) * 1.2;
    v += delta + (up ? 0.4 : -0.4);
    arr.push(Math.round(v * 100) / 100);
  }
  return arr;
};

// ============================================================
// 4. SHARED UI PRIMITIVES
// ============================================================
const Avatar = ({ initials, size = 40, ring = true, ringGrad, t }) => (
  <div
    style={{
      width: size, height: size, minWidth: size,
      padding: ring ? 2 : 0, borderRadius: '50%',
      background: ring ? (ringGrad || ACCENT.gradPrimary) : 'transparent',
    }}
  >
    <div
      style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: t.bgTertiary, color: t.textPrimary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: size * 0.38, letterSpacing: '-0.02em',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {initials}
    </div>
  </div>
);

const AvatarStack = ({ items, size = 28, t, max = 4 }) => (
  <div style={{ display: 'flex' }}>
    {items.slice(0, max).map((init, i) => (
      <div key={i} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i }}>
        <Avatar initials={typeof init === 'string' ? init : init.initials} size={size} t={t} />
      </div>
    ))}
  </div>
);

const ProgressBar = ({ percent, t, grad = ACCENT.gradPrimary, height = 8 }) => (
  <div style={{ width: '100%', height, background: t.surface, borderRadius: 999, overflow: 'hidden' }}>
    <div
      style={{
        width: `${Math.min(100, percent)}%`, height: '100%', background: grad, borderRadius: 999,
        transition: 'width 1.4s cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 0 18px rgba(124,92,255,0.35)',
      }}
    />
  </div>
);

const Chip = ({ children, t, color, size = 'md' }) => {
  const pad = size === 'sm' ? '3px 8px' : '4px 10px';
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: pad, borderRadius: 8,
        background: color ? `${color}22` : 'rgba(124,92,255,0.12)',
        color: color || ACCENT.primary,
        fontSize: fs, fontWeight: 600,
        border: `1px solid ${color ? `${color}33` : 'rgba(124,92,255,0.25)'}`,
        fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

const Card = ({ children, t, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: t.bgSecondary,
      borderRadius: 20,
      border: `1px solid ${t.border}`,
      padding: 16,
      transition: 'transform .2s ease',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {children}
  </div>
);

const Btn = ({ children, primary, onClick, t, full, icon: Icon, size = 'md', variant }) => {
  const pad = size === 'sm' ? '8px 14px' : '12px 20px';
  const fs = size === 'sm' ? 12 : 14;
  let bg = 'transparent';
  let color = ACCENT.primary;
  let border = `1px solid ${ACCENT.primary}`;
  if (primary) { bg = ACCENT.gradPrimary; color = '#fff'; border = 'none'; }
  if (variant === 'gold') { bg = ACCENT.gradGold; color = '#1a1a2e'; border = 'none'; }
  if (variant === 'coral') { bg = ACCENT.gradCoral; color = '#fff'; border = 'none'; }
  if (variant === 'ghost') { bg = t.bgTertiary; color = t.textPrimary; border = `1px solid ${t.border}`; }
  return (
    <button
      onClick={onClick}
      style={{
        width: full ? '100%' : 'auto',
        padding: pad, borderRadius: 12,
        border, background: bg, color,
        fontWeight: 700, fontSize: fs, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: primary ? '0 8px 24px -8px rgba(124,92,255,0.6)' : 'none',
        transition: 'transform .15s ease',
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

const IconBox = ({ icon: Icon, color = ACCENT.primary, size = 40, t }) => (
  <div
    style={{
      width: size, height: size, minWidth: size,
      borderRadius: 12,
      background: `${color}22`,
      border: `1px solid ${color}33`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    <Icon size={size * 0.5} color={color} />
  </div>
);

const CardHeader = ({ avatar, title, subtitle, right, t }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
    {avatar}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 11, color: t.textMuted }}>{subtitle}</div>
    </div>
    {right}
  </div>
);

const ReactionButton = ({ emoji, count, onClick, t, active }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 12px', borderRadius: 999,
      background: active ? 'rgba(124,92,255,0.2)' : t.bgTertiary,
      border: `1px solid ${active ? ACCENT.primary : t.border}`,
      color: t.textPrimary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    <span>{emoji}</span>
    <span>{count}</span>
  </button>
);

const InteractionBar = ({ likes, comments, onLike, liked, t }) => (
  <div style={{
    display: 'flex', gap: 8, paddingTop: 12, marginTop: 12,
    borderTop: `1px solid ${t.border}`,
  }}>
    <button
      onClick={onLike}
      style={{
        flex: 1, padding: '8px', borderRadius: 10,
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        color: liked ? ACCENT.tertiary : t.textSecondary,
        fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Heart size={14} fill={liked ? ACCENT.tertiary : 'none'} />
      {likes}
    </button>
    <button style={{
      flex: 1, padding: '8px', borderRadius: 10,
      background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      color: t.textSecondary, fontSize: 12, fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <MessageCircle size={14} /> {comments}
    </button>
    <button style={{
      flex: 1, padding: '8px', borderRadius: 10,
      background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      color: t.textSecondary, fontSize: 12, fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Share2 size={14} />
    </button>
  </div>
);

// ============================================================
// 5. FEED CARD VARIANTS
// ============================================================
const MarketSnapshotCard = ({ t, data, loading }) => (
  <Card t={t} style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconBox icon={Globe} color={ACCENT.primary} size={32} t={t} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, fontFamily: "'Outfit', sans-serif" }}>
          Mercado Agora
        </div>
        <div style={{ fontSize: 10, color: t.textMuted }}>
          {loading ? 'Carregando cotações…' : 'Atualizado em tempo real'}
        </div>
      </div>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: loading ? ACCENT.gold : ACCENT.secondary,
        boxShadow: `0 0 10px ${loading ? ACCENT.gold : ACCENT.secondary}`,
        animation: 'pulse 2s ease infinite',
      }} />
    </div>
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
      background: t.border, padding: '0 1px 1px',
    }}>
      {data.map((m, i) => {
        const up = m.change > 0;
        const color = up ? ACCENT.secondary : ACCENT.tertiary;
        return (
          <div key={i} style={{ background: t.bgSecondary, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary }}>{m.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, color,
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {up ? '+' : ''}{m.change}%
              </span>
            </div>
            <div style={{
              fontSize: 15, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'JetBrains Mono', monospace", marginBottom: 4,
            }}>
              {m.value}
            </div>
            <div style={{ height: 24 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={m.data.map((v, idx) => ({ idx, v }))}>
                  <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  </Card>
);

const NewsCard = ({ news, t }) => (
  <Card t={t}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{
        padding: '3px 8px', borderRadius: 6,
        background: `${news.color}22`, color: news.color,
        fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {news.category}
      </div>
      <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{news.source}</span>
      <span style={{ fontSize: 10, color: t.textMuted, marginLeft: 'auto' }}>{news.time}</span>
    </div>
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 14, flexShrink: 0,
        background: `linear-gradient(135deg, ${news.color}33, ${news.color}11)`,
        border: `1px solid ${news.color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32,
      }}>
        {news.image}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: t.textPrimary, lineHeight: 1.3,
          fontFamily: "'Outfit', sans-serif", marginBottom: 6,
        }}>
          {news.headline}
        </div>
        <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>
          {news.summary}
        </div>
      </div>
    </div>
    <div style={{
      marginTop: 12, paddingTop: 10,
      borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{
        fontSize: 11, color: ACCENT.primary, fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <BookOpen size={12} /> Ler matéria completa
      </span>
      <ChevronRight size={14} color={ACCENT.primary} />
    </div>
  </Card>
);

const GoalReachedCard = ({ data, t, celebrations, onCelebrate }) => (
  <Card t={t}>
    <CardHeader
      t={t}
      avatar={<Avatar initials={data.user.initials} size={40} t={t} />}
      title={data.user.name}
      subtitle={`atingiu uma meta · ${data.time}`}
      right={<IconBox icon={Target} color={ACCENT.gold} size={36} t={t} />}
    />
    <div style={{ fontSize: 14, color: t.textPrimary, marginBottom: 12, lineHeight: 1.4 }}>
      O grupo <b>{data.project}</b> atingiu <b>{data.milestone}%</b> da meta!
    </div>
    <ProgressBar percent={data.milestone} t={t} grad={ACCENT.gradGold} />
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginTop: 10, marginBottom: 4,
    }}>
      <span style={{
        fontSize: 12, color: t.textSecondary,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {fmtBRL(data.current)} / {fmtBRL(data.goal)}
      </span>
      <Chip t={t} color={ACCENT.gold}>{data.milestone}%</Chip>
    </div>
    <div style={{
      display: 'flex', gap: 8, paddingTop: 12, marginTop: 8,
      borderTop: `1px solid ${t.border}`,
    }}>
      <button
        onClick={onCelebrate}
        style={{
          flex: 1, padding: '8px', borderRadius: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          color: ACCENT.gold, fontSize: 12, fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <PartyPopper size={14} /> Celebrar · {celebrations}
      </button>
      <button style={{
        flex: 1, padding: '8px', borderRadius: 10,
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        color: t.textSecondary, fontSize: 12, fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <MessageCircle size={14} /> {data.comments}
      </button>
    </div>
  </Card>
);

const OpenProjectCard = ({ data, t, onJoin, likes, onLike, liked }) => (
  <Card t={t}>
    <CardHeader
      t={t}
      avatar={<Avatar initials={data.user.initials} size={40} t={t} />}
      title={data.user.name}
      subtitle={`criou um novo projeto · ${data.time}`}
      right={<MoreHorizontal size={18} color={t.textMuted} />}
    />
    <div style={{
      height: 160, borderRadius: 16,
      background: 'linear-gradient(135deg, #7C5CFF33 0%, #00D4AA22 60%, #FFD70022 100%)',
      border: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 72, marginBottom: 12, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%)',
      }} />
      {data.emoji}
    </div>
    <div style={{
      fontWeight: 800, fontSize: 20, color: t.textPrimary, marginBottom: 4,
      fontFamily: "'Outfit', sans-serif",
    }}>
      {data.project}
    </div>
    <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 8 }}>{data.strategy}</div>
    <div style={{
      fontSize: 13, color: t.textPrimary, lineHeight: 1.4, marginBottom: 12,
      opacity: 0.9,
    }}>
      {data.description}
    </div>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <AvatarStack items={data.participants} t={t} />
        <span style={{ fontSize: 12, color: t.textSecondary }}>+{data.spotsLeft} vagas</span>
      </div>
      <span style={{
        fontSize: 12, color: t.textSecondary,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        a partir de {fmtBRLshort(data.minDeposit)}/mês
      </span>
    </div>
    <Btn primary full t={t} onClick={onJoin} icon={Sparkles}>Quero Entrar</Btn>
    <InteractionBar likes={likes} comments={data.comments} onLike={onLike} liked={liked} t={t} />
  </Card>
);

const ChallengeCard = ({ data, t }) => (
  <Card t={t} style={{
    background: 'linear-gradient(135deg, #FF6B6B22 0%, #FFD70022 100%)',
    border: `1px solid ${ACCENT.gold}44`,
  }}>
    <div style={{
      display: 'inline-block', padding: '4px 10px', borderRadius: 8,
      background: ACCENT.gradGold, color: '#1a1a2e',
      fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
      textTransform: 'uppercase', marginBottom: 12,
    }}>
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
      <div style={{ fontWeight: 800, fontSize: 18, color: t.textPrimary, fontFamily: "'Outfit', sans-serif" }}>
        {data.title}
      </div>
    </div>
    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
      {Array.from({ length: data.daysTotal }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: 28, borderRadius: 6,
            background: i < data.daysCompleted ? ACCENT.gradPrimary : 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {i < data.daysCompleted ? <Check size={14} color="#fff" /> : null}
        </div>
      ))}
    </div>
    <div style={{ fontSize: 12, color: t.textSecondary, marginBottom: 4 }}>🎁 {data.reward}</div>
    <div style={{ fontSize: 11, color: t.textMuted }}>{data.participantsCount} pessoas participando</div>
  </Card>
);

const SharedResultCard = ({ data, t, reactions, onReact }) => {
  const chartData = data.chartData.map((v, i) => ({ i, v }));
  return (
    <Card t={t}>
      <CardHeader
        t={t}
        avatar={<Avatar initials={data.user.initials} size={40} t={t} />}
        title={data.user.name}
        subtitle={`compartilhou resultados · ${data.time}`}
        right={<Chip t={t} color={ACCENT.secondary}>{data.strategy}</Chip>}
      />
      <div style={{ fontSize: 13, color: t.textPrimary, marginBottom: 10, lineHeight: 1.4 }}>
        {data.caption}
      </div>
      <div style={{ height: 90, marginBottom: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`sharedGrad-${data.user.initials}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT.secondary} stopOpacity={0.6} />
                <stop offset="100%" stopColor={ACCENT.secondary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone" dataKey="v" stroke={ACCENT.secondary}
              strokeWidth={2.5} fill={`url(#sharedGrad-${data.user.initials})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12,
      }}>
        <span style={{
          fontSize: 26, fontWeight: 800, color: ACCENT.secondary,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          +{data.returnPercent}%
        </span>
        <span style={{ fontSize: 11, color: t.textMuted }}>
          CDI: +{data.cdiPercent}%
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <ReactionButton emoji="🔥" count={reactions.fire} onClick={() => onReact('fire')} t={t} />
        <ReactionButton emoji="🚀" count={reactions.rocket} onClick={() => onReact('rocket')} t={t} />
        <ReactionButton emoji="👏" count={reactions.clap} onClick={() => onReact('clap')} t={t} />
        <button style={{
          marginLeft: 'auto', padding: '6px 12px', borderRadius: 999,
          background: t.bgTertiary, border: `1px solid ${t.border}`,
          color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <MessageCircle size={12} /> {data.comments}
        </button>
      </div>
    </Card>
  );
};

const LevelUpCard = ({ data, t }) => (
  <Card t={t} style={{
    background: 'linear-gradient(135deg, #7C5CFF22, #FFD70022)',
    border: `1px solid ${ACCENT.primary}44`,
    overflow: 'hidden', position: 'relative',
  }}>
    <div style={{
      position: 'absolute', top: -40, right: -40, width: 160, height: 160,
      background: 'radial-gradient(circle, rgba(124,92,255,0.3), transparent 70%)',
    }} />
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: ACCENT.gradPurple,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px -8px rgba(124,92,255,0.7)',
      }}>
        <Crown size={28} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: ACCENT.primary, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Level Up!
        </div>
        <div style={{
          fontSize: 18, fontWeight: 800, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif",
        }}>
          Nível {data.newLevel} · {data.newLevelName}
        </div>
        <div style={{ fontSize: 11, color: t.textSecondary }}>
          +{data.xpEarned} XP · {data.time}
        </div>
      </div>
    </div>
  </Card>
);

const EducationCard = ({ data, t }) => (
  <Card t={t} style={{
    background: `linear-gradient(135deg, ${ACCENT.secondary}22, ${ACCENT.primary}22)`,
    border: `1px solid ${ACCENT.secondary}44`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <IconBox icon={GraduationCap} color={ACCENT.secondary} size={32} t={t} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 10, color: ACCENT.secondary, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {data.topic} · {data.duration}
        </div>
      </div>
    </div>
    <div style={{
      fontSize: 17, fontWeight: 800, color: t.textPrimary, marginBottom: 6,
      fontFamily: "'Outfit', sans-serif", lineHeight: 1.25,
    }}>
      {data.title}
    </div>
    <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>
      {data.description}
    </div>
    <Btn primary full t={t} size="sm" icon={BookOpen}>Aprender agora</Btn>
  </Card>
);

const TopInvestorCard = ({ data, t }) => (
  <Card t={t} style={{
    background: 'linear-gradient(135deg, #FFD70022, #FF8C0022)',
    border: `1px solid ${ACCENT.gold}55`,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: -30, right: -30, width: 120, height: 120,
      background: 'radial-gradient(circle, rgba(255,215,0,0.25), transparent 70%)',
    }} />
    <div style={{
      display: 'inline-block', padding: '4px 10px', borderRadius: 8,
      background: ACCENT.gradGold, color: '#1a1a2e',
      fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
      textTransform: 'uppercase', marginBottom: 14,
    }}>
      🏆 {data.badge}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
      <Avatar initials={data.user.initials} size={56} ringGrad={ACCENT.gradGold} t={t} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 17, fontWeight: 800, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {data.user.name}
        </div>
        <div style={{
          display: 'flex', gap: 12, marginTop: 4,
          fontSize: 11, color: t.textSecondary,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: ACCENT.secondary, fontWeight: 700 }}>
            <TrendingUp size={12} /> +{data.returnPercent}%
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: ACCENT.gold, fontWeight: 700 }}>
            <Flame size={12} /> {data.streak} dias
          </span>
        </div>
      </div>
    </div>
  </Card>
);

const PollCard = ({ data, t, votes, onVote, votedIdx }) => {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  return (
    <Card t={t}>
      <CardHeader
        t={t}
        avatar={<Avatar initials={data.user.initials} size={40} t={t} />}
        title={data.user.name}
        subtitle={`criou uma enquete · ${data.time}`}
      />
      <div style={{
        fontSize: 15, fontWeight: 700, color: t.textPrimary, marginBottom: 14,
        fontFamily: "'Outfit', sans-serif",
      }}>
        {data.question}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.options.map((opt, i) => {
          const pct = total > 0 ? Math.round((votes[i] / total) * 100) : 0;
          const voted = votedIdx === i;
          return (
            <button
              key={i}
              onClick={() => onVote(i)}
              style={{
                position: 'relative', padding: '12px 14px',
                border: `1px solid ${voted ? ACCENT.primary : t.border}`,
                borderRadius: 12, background: t.bgTertiary,
                cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                width: votedIdx !== null ? `${pct}%` : '0%',
                background: voted
                  ? 'linear-gradient(90deg, rgba(124,92,255,0.3), rgba(0,212,170,0.2))'
                  : 'rgba(255,255,255,0.04)',
                transition: 'width .6s cubic-bezier(.2,.8,.2,1)',
              }} />
              <div style={{
                position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{opt.label}</span>
                {votedIdx !== null && (
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: voted ? ACCENT.primary : t.textSecondary,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: t.textMuted, textAlign: 'center' }}>
        {total} votos
      </div>
    </Card>
  );
};

const StreakCard = ({ data, t }) => (
  <Card t={t} style={{
    background: 'linear-gradient(135deg, #FF6B6B22, #FF8C0022)',
    border: `1px solid ${ACCENT.orange}44`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: ACCENT.gradCoral,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px -8px rgba(255,107,107,0.7)',
      }}>
        <Flame size={32} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 11, color: ACCENT.tertiary, fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          Streak em chamas!
        </div>
        <div style={{
          fontSize: 22, fontWeight: 800, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {data.days} dias consecutivos
        </div>
        <div style={{ fontSize: 11, color: t.textSecondary }}>
          Faltam {data.nextMilestone - data.days} dias pro próximo badge 🏆
        </div>
      </div>
    </div>
  </Card>
);

const FriendJoinedCard = ({ data, t }) => (
  <Card t={t} style={{ padding: '14px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar initials={data.user.initials} size={44} ringGrad={ACCENT.gradGreen} t={t} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: t.textPrimary }}>
          <b>{data.user.name}</b> entrou no Coletivo 🎉
        </div>
        <div style={{ fontSize: 11, color: t.textMuted }}>
          Convidado por {data.invitedBy} · {data.time}
        </div>
      </div>
      <Btn t={t} size="sm" variant="ghost" icon={UserPlus}>Seguir</Btn>
    </div>
  </Card>
);

// ============================================================
// 6. STORIES BAR + FEED SCREEN
// ============================================================
const StoriesBar = ({ t }) => (
  <div style={{
    display: 'flex', gap: 14, overflowX: 'auto',
    padding: '4px 16px 16px', scrollbarWidth: 'none',
  }}>
    {STORIES.map((s, i) => (
      <div key={i} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 64,
      }}>
        <div style={{
          padding: s.hasUpdate ? 2.5 : 0, borderRadius: '50%',
          background: s.isUser
            ? 'linear-gradient(135deg, #FFD700, #FF6B6B, #7C5CFF)'
            : s.hasUpdate ? ACCENT.gradPrimary : t.borderStrong,
        }}>
          <div style={{ padding: 2, background: t.bgPrimary, borderRadius: '50%' }}>
            <Avatar initials={s.initials} size={54} ring={false} t={t} />
          </div>
        </div>
        <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>{s.name}</span>
      </div>
    ))}
  </div>
);

const FeedScreen = ({ t, marketData, newsData, marketLoading, onCreate, onDeposit }) => {
  const [celebrations, setCelebrations] = useState(
    FEED.reduce((a, f) => ({ ...a, [f.id]: f.celebrations || 0 }), {})
  );
  const [reactions, setReactions] = useState({
    f4: { fire: 18, rocket: 7, clap: 31 },
  });
  const [likes, setLikes] = useState({ f2: 42, f5: 67 });
  const [liked, setLiked] = useState({});
  const [pollVotes, setPollVotes] = useState(
    FEED.find((f) => f.type === 'poll').options.reduce((a, o, i) => ({ ...a, [i]: o.votes }), {})
  );
  const [pollVoted, setPollVoted] = useState(null);
  const [fabOpen, setFabOpen] = useState(false);

  const handleCelebrate = (id) =>
    setCelebrations((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const handleReact = (fid, key) =>
    setReactions((r) => ({ ...r, [fid]: { ...r[fid], [key]: (r[fid]?.[key] || 0) + 1 } }));
  const handleLike = (id) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setLikes((lk) => ({ ...lk, [id]: (lk[id] || 0) + (liked[id] ? -1 : 1) }));
  };
  const handleVote = (i) => {
    if (pollVoted !== null) return;
    setPollVoted(i);
    setPollVotes((v) => ({ ...v, [i]: v[i] + 1 }));
  };

  return (
    <div style={{ paddingBottom: 120 }}>
      <StoriesBar t={t} />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {FEED.map((item, idx) => {
          if (item.type === 'market_snapshot')
            return <MarketSnapshotCard key={item.id} t={t} data={marketData} loading={marketLoading} />;
          if (item.type === 'news') {
            // Pull news from real feed by slot index, fall back to mock
            const newsIdx = ['fn1', 'fn2', 'fn3'].indexOf(item.id);
            const news =
              (newsData && newsData[newsIdx]) ||
              NEWS.find((n) => n.id === item.newsId);
            if (!news) return null;
            return <NewsCard key={item.id} news={news} t={t} />;
          }
          if (item.type === 'goal_reached')
            return (
              <GoalReachedCard
                key={item.id} data={item} t={t}
                celebrations={celebrations[item.id]}
                onCelebrate={() => handleCelebrate(item.id)}
              />
            );
          if (item.type === 'open_project')
            return (
              <OpenProjectCard
                key={item.id} data={item} t={t} onJoin={() => {}}
                likes={likes[item.id]} onLike={() => handleLike(item.id)}
                liked={liked[item.id]}
              />
            );
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
          if (item.type === 'level_up')
            return <LevelUpCard key={item.id} data={item} t={t} />;
          if (item.type === 'education')
            return <EducationCard key={item.id} data={item} t={t} />;
          if (item.type === 'top_investor')
            return <TopInvestorCard key={item.id} data={item} t={t} />;
          if (item.type === 'poll')
            return (
              <PollCard
                key={item.id} data={item} t={t}
                votes={pollVotes} onVote={handleVote} votedIdx={pollVoted}
              />
            );
          if (item.type === 'streak')
            return <StreakCard key={item.id} data={item} t={t} />;
          if (item.type === 'friend_joined')
            return <FriendJoinedCard key={item.id} data={item} t={t} />;
          return null;
        })}
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', right: 20, bottom: 92, zIndex: 30 }}>
        {fabOpen && (
          <div style={{
            position: 'absolute', bottom: 70, right: 0,
            display: 'flex', flexDirection: 'column', gap: 4,
            background: t.bgSecondary, padding: 8, borderRadius: 14,
            border: `1px solid ${t.border}`, minWidth: 190,
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
          }}>
            <button
              style={fabItemStyle(t)}
              onClick={() => { setFabOpen(false); onCreate(); }}
            >
              <Sparkles size={16} color={ACCENT.primary} /> Criar Projeto
            </button>
            <button
              style={fabItemStyle(t)}
              onClick={() => { setFabOpen(false); onDeposit(); }}
            >
              <Zap size={16} color={ACCENT.gold} /> Novo Aporte
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
            boxShadow: '0 12px 30px -6px rgba(124,92,255,0.7)', cursor: 'pointer',
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
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '10px 12px', borderRadius: 10,
  background: 'transparent', border: 'none',
  color: t.textPrimary, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
  justifyContent: 'flex-start',
});

// ============================================================
// 7. PROJECTS SCREEN
// ============================================================
const ProjectsScreen = ({ t, onOpenProject, projects, onCreate, onDeposit, totals }) => {
  const [filter, setFilter] = useState('ativos');
  const summaryData = [3600, 3800, 3900, 4050, 4150, totals.invested].map((v, i) => ({ i, v }));
  const filtered = useMemo(() => {
    if (filter === 'concluidos') return [];
    return projects;
  }, [filter, projects]);

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Filter */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{
          display: 'flex', padding: 4, background: t.bgSecondary,
          borderRadius: 12, border: `1px solid ${t.border}`,
        }}>
          {[
            { k: 'ativos', l: 'Ativos' },
            { k: 'concluidos', l: 'Concluídos' },
            { k: 'todos', l: 'Todos' },
          ].map((f) => (
            <button
              key={f.k} onClick={() => setFilter(f.k)}
              style={{
                flex: 1, padding: '8px', borderRadius: 9, border: 'none',
                background: filter === f.k ? ACCENT.gradPrimary : 'transparent',
                color: filter === f.k ? '#fff' : t.textSecondary,
                fontWeight: 700, fontSize: 12, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", transition: 'all .2s ease',
              }}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{
          background: t.heroGrad, borderRadius: 22, padding: 20,
          border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            background: 'radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)',
          }} />
          <div style={{ fontSize: 12, color: t.textSecondary, fontWeight: 600, marginBottom: 6 }}>
            Total investido
          </div>
          <div style={{
            fontSize: 34, fontWeight: 800, color: t.textPrimary,
            fontFamily: "'JetBrains Mono', monospace", marginBottom: 10,
            letterSpacing: '-0.02em',
          }}>
            {fmtBRL(totals.invested)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Chip t={t} color={ACCENT.secondary}>
              <TrendingUp size={12} /> +{fmtBRL(totals.return)}
            </Chip>
            <span style={{
              color: ACCENT.secondary, fontSize: 13, fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              +{totals.returnPercent.toFixed(2)}%
            </span>
            <button
              onClick={onDeposit}
              style={{
                marginLeft: 'auto', padding: '6px 12px', borderRadius: 10,
                background: ACCENT.gradPrimary, border: 'none', color: '#fff',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Zap size={12} /> Aportar
            </button>
          </div>
          <div style={{ height: 56, margin: '0 -8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={summaryData}>
                <Line type="monotone" dataKey="v" stroke={ACCENT.secondary} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>Últimos 6 meses</span>
            <span style={{ fontSize: 12, color: t.textSecondary, fontWeight: 600 }}>
              {projects.length} projetos ativos
            </span>
          </div>
        </div>
      </div>

      {/* New project CTA */}
      <div style={{ padding: '0 16px', marginBottom: 14 }}>
        <button
          onClick={onCreate}
          style={{
            width: '100%', padding: '14px',
            background: 'transparent',
            border: `1.5px dashed ${ACCENT.primary}66`,
            borderRadius: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: ACCENT.primary, fontSize: 13, fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Plus size={16} /> Criar novo projeto
        </button>
      </div>

      {/* List */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: 40, textAlign: 'center',
            background: t.bgSecondary, borderRadius: 20,
            border: `1px dashed ${t.borderStrong}`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🚀</div>
            <div style={{ color: t.textSecondary, fontSize: 14 }}>
              Nenhum projeto concluído ainda.<br/>Continue investindo!
            </div>
          </div>
        ) : (
          filtered.map((p) => (
            <ProjectCard
              key={p.id} p={p} t={t}
              onOpen={() => onOpenProject(p.id)}
              onDeposit={() => onDeposit(p.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ p, t, onOpen, onDeposit }) => (
  <Card t={t}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: 'linear-gradient(135deg, #7C5CFF22, #00D4AA22)',
        border: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28,
      }}>
        {p.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 800, fontSize: 16, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif", marginBottom: 4,
        }}>
          {p.name}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip t={t} size="sm">{p.type}</Chip>
          <Chip t={t} color={ACCENT.secondary} size="sm">{p.strategy}</Chip>
          <Chip t={t} color={ACCENT.gold} size="sm">Risco: {p.risk}</Chip>
        </div>
      </div>
    </div>

    {p.goal !== null ? (
      <>
        <ProgressBar percent={p.progress} t={t} />
        <div style={{
          marginTop: 6, marginBottom: 14,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 12, color: t.textSecondary,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {fmtBRL(p.current)} / {fmtBRL(p.goal)}
          </span>
          <span style={{ fontSize: 12, color: ACCENT.primary, fontWeight: 700 }}>
            {p.progress}%
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

    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <AvatarStack items={p.participants} size={26} t={t} />
      <span style={{ fontSize: 12, color: t.textSecondary }}>
        {p.participantCount} participantes
      </span>
    </div>

    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
      padding: 12, background: t.bgTertiary, borderRadius: 12, marginBottom: 12,
    }}>
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

    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={onDeposit}
        style={{
          padding: '8px 12px', borderRadius: 10,
          background: 'transparent', border: `1px solid ${ACCENT.gold}66`,
          color: ACCENT.gold, fontSize: 11, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Zap size={12} /> Aportar
      </button>
      <button
        onClick={onOpen}
        style={{
          marginLeft: 'auto',
          padding: '8px 14px', borderRadius: 10,
          background: ACCENT.gradPrimary, border: 'none',
          color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: '0 4px 14px -4px rgba(124,92,255,0.6)',
        }}
      >
        Ver Detalhes <ChevronRight size={12} />
      </button>
    </div>
  </Card>
);

// ============================================================
// 8. PROJECT DETAIL SCREEN (robust analytics)
// ============================================================
const ProjectDetailScreen = ({ projectId, t, onBack, projects, onDeposit }) => {
  const p = projects.find((x) => x.id === projectId);
  if (!p) return null;

  const perfData = p.monthlyData.map((v, i) => ({
    m: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
    v,
    cdi: Math.round(v * (0.85 + i * 0.008)),
  }));

  const benchmarkData = [
    { name: 'Poupança', value: p.benchmarks.poupanca, color: '#9999AA' },
    { name: 'CDI', value: p.benchmarks.cdi, color: '#FFD700' },
    { name: 'Ibov', value: p.benchmarks.ibov, color: '#FF6B6B' },
    { name: 'Você', value: p.benchmarks.portfolio, color: '#00D4AA' },
  ];

  // Projection (linear + 7% aa)
  const projectionMonths = 12;
  const monthlyAvg = p.deposits.reduce((a, d) => a + d.amount, 0) / p.deposits.length;
  const projection = Array.from({ length: projectionMonths }).map((_, i) => {
    const base = p.current + monthlyAvg * (i + 1);
    const withYield = base * Math.pow(1 + 0.007, i + 1);
    return { m: `M${i + 1}`, base: Math.round(base), proj: Math.round(withYield) };
  });

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Back header */}
      <div style={{
        padding: '0 16px', display: 'flex', alignItems: 'center',
        gap: 12, marginBottom: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            width: 40, height: 40, borderRadius: 12,
            background: t.bgSecondary, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color={t.textPrimary} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted }}>Projeto</div>
          <div style={{
            fontSize: 16, fontWeight: 800, color: t.textPrimary,
            fontFamily: "'Outfit', sans-serif",
          }}>
            {p.name}
          </div>
        </div>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          background: t.bgSecondary, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <MoreHorizontal size={18} color={t.textPrimary} />
        </button>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* HERO */}
        <div style={{
          background: t.heroGrad,
          borderRadius: 22, padding: 20,
          border: `1px solid ${t.border}`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, left: -30, width: 180, height: 180,
            background: 'radial-gradient(circle, rgba(0,212,170,0.25), transparent 70%)',
          }} />
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18,
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${t.borderStrong}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 34,
            }}>
              {p.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                <Chip t={t} size="sm">{p.type}</Chip>
                <Chip t={t} color={ACCENT.secondary} size="sm">{p.strategy}</Chip>
              </div>
              <div style={{ fontSize: 11, color: t.textMuted }}>
                {p.participantCount} participantes
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Valor atual</div>
            <div style={{
              fontSize: 34, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.02em',
            }}>
              {fmtBRL(p.current)}
            </div>
            {p.goal && (
              <>
                <div style={{ marginTop: 10 }}>
                  <ProgressBar percent={p.progress} t={t} grad={ACCENT.gradGreen} height={10} />
                </div>
                <div style={{
                  marginTop: 8, display: 'flex', justifyContent: 'space-between',
                  fontSize: 12, color: t.textSecondary,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  <span>Meta {fmtBRL(p.goal)}</span>
                  <span style={{ color: ACCENT.secondary, fontWeight: 700 }}>{p.progress}%</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <KPI label="Seu aporte" value={fmtBRL(p.myContribution)} t={t} />
          <KPI
            label="Rendimento"
            value={`+${fmtBRL(p.myReturn)}`}
            sub={`+${p.myReturnPercent}%`}
            color={ACCENT.secondary} t={t}
          />
          <KPI
            label="Risco"
            value={p.risk}
            sub={`Nível ${p.riskScore}/5`}
            color={ACCENT.gold} icon={Shield} t={t}
          />
          <KPI
            label="Próx. aporte"
            value={fmtBRLshort(p.nextAmount)}
            sub={p.nextDeposit}
            icon={Calendar} t={t}
          />
        </div>

        {/* Performance chart */}
        <Card t={t}>
          <SectionTitle icon={Activity} title="Performance" subtitle="vs CDI · últimos 12 meses" t={t} />
          <div style={{ height: 180, margin: '0 -8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perfData}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ACCENT.secondary} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={ACCENT.secondary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="m" axisLine={false} tickLine={false}
                  tick={{ fill: t.textMuted, fontSize: 10 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: t.bgTertiary, border: `1px solid ${t.border}`,
                    borderRadius: 10, fontSize: 12,
                  }}
                  labelStyle={{ color: t.textPrimary }}
                />
                <Area
                  type="monotone" dataKey="cdi" stroke={t.textMuted}
                  strokeWidth={1.5} strokeDasharray="4 4" fill="transparent"
                />
                <Area
                  type="monotone" dataKey="v" stroke={ACCENT.secondary}
                  strokeWidth={2.5} fill="url(#perfGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            display: 'flex', gap: 14, marginTop: 8,
            fontSize: 10, color: t.textMuted,
          }}>
            <LegendDot color={ACCENT.secondary} label="Portfolio" t={t} />
            <LegendDot color={t.textMuted} label="CDI" t={t} dashed />
          </div>
        </Card>

        {/* Allocation pie */}
        <Card t={t}>
          <SectionTitle icon={PieIcon} title="Composição" subtitle="Alocação por classe" t={t} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 140, height: 140, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={p.allocation} dataKey="value" innerRadius={48} outerRadius={68}
                    paddingAngle={2} stroke="none"
                  >
                    {p.allocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', pointerEvents: 'none',
              }}>
                <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 700 }}>CLASSES</div>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: t.textPrimary,
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {p.allocation.length}
                </div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.allocation.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 11,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 3, background: a.color,
                  }} />
                  <span style={{ color: t.textPrimary, fontWeight: 600, flex: 1 }}>{a.name}</span>
                  <span style={{
                    color: t.textSecondary, fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {a.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Benchmarks comparison */}
        <Card t={t}>
          <SectionTitle icon={BarChart3} title="Comparação" subtitle="vs benchmarks (6M)" t={t} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {benchmarkData.map((b, i) => {
              const max = Math.max(...benchmarkData.map((x) => x.value));
              const pct = (b.value / max) * 100;
              return (
                <div key={i}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: 4,
                    fontSize: 11,
                  }}>
                    <span style={{ color: t.textPrimary, fontWeight: 600 }}>{b.name}</span>
                    <span style={{
                      color: b.color, fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      +{b.value}%
                    </span>
                  </div>
                  <div style={{
                    height: 6, background: t.surface, borderRadius: 999, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${pct}%`, height: '100%', background: b.color,
                      borderRadius: 999, transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)',
                      boxShadow: `0 0 12px ${b.color}55`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Risk / Exposure */}
        <Card t={t}>
          <SectionTitle icon={AlertTriangle} title="Exposição & Risco" t={t} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{
              padding: 12, background: t.bgTertiary, borderRadius: 12,
            }}>
              <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 4 }}>Volatilidade (anual)</div>
              <div style={{
                fontSize: 18, fontWeight: 800, color: ACCENT.gold,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {(p.riskScore * 3.2).toFixed(1)}%
              </div>
            </div>
            <div style={{
              padding: 12, background: t.bgTertiary, borderRadius: 12,
            }}>
              <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 4 }}>Sharpe Ratio</div>
              <div style={{
                fontSize: 18, fontWeight: 800, color: ACCENT.secondary,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {(1.8 - p.riskScore * 0.2).toFixed(2)}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>Nível de risco</span>
            <span style={{ fontSize: 11, color: ACCENT.gold, fontWeight: 700 }}>{p.risk}</span>
          </div>
          <div style={{
            display: 'flex', gap: 4, height: 10, borderRadius: 999, overflow: 'hidden',
          }}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                style={{
                  flex: 1,
                  background: lvl <= p.riskScore
                    ? `linear-gradient(90deg, ${ACCENT.secondary}, ${ACCENT.gold}, ${ACCENT.tertiary})`
                    : t.surface,
                  opacity: lvl <= p.riskScore ? 0.6 + lvl * 0.08 : 1,
                }}
              />
            ))}
          </div>
          <div style={{
            marginTop: 10, padding: 10,
            background: 'rgba(255,215,0,0.08)',
            border: `1px solid ${ACCENT.gold}33`,
            borderRadius: 10,
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <Info size={14} color={ACCENT.gold} style={{ marginTop: 1 }} />
            <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>
              Projeto com perfil <b style={{ color: t.textPrimary }}>{p.risk.toLowerCase()}</b>.
              Indicado para quem busca {p.riskScore < 3 ? 'preservação de capital' : 'crescimento moderado de longo prazo'}.
            </div>
          </div>
        </Card>

        {/* Projection */}
        <Card t={t}>
          <SectionTitle
            icon={TrendingUp} title="Projeção"
            subtitle="próximos 12 meses · estimativa"
            t={t}
          />
          <div style={{ height: 140, margin: '0 -8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projection}>
                <defs>
                  <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ACCENT.primary} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={ACCENT.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="m" axisLine={false} tickLine={false}
                  tick={{ fill: t.textMuted, fontSize: 9 }}
                />
                <YAxis hide />
                <Area
                  type="monotone" dataKey="base" stroke={t.textMuted}
                  strokeDasharray="4 4" strokeWidth={1.5} fill="transparent"
                />
                <Area
                  type="monotone" dataKey="proj" stroke={ACCENT.primary}
                  strokeWidth={2.5} fill="url(#projGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            marginTop: 8, display: 'flex', justifyContent: 'space-between',
            fontSize: 11,
          }}>
            <span style={{ color: t.textMuted }}>Estimativa (7% a.a.)</span>
            <span style={{
              color: ACCENT.primary, fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {fmtBRL(projection[projection.length - 1].proj)}
            </span>
          </div>
        </Card>

        {/* Deposits history */}
        <Card t={t}>
          <SectionTitle icon={DollarSign} title="Histórico de Aportes" t={t} />
          <div style={{ height: 120, margin: '0 -8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={p.deposits}>
                <XAxis
                  dataKey="date" axisLine={false} tickLine={false}
                  tick={{ fill: t.textMuted, fontSize: 10 }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(124,92,255,0.08)' }}
                  contentStyle={{
                    background: t.bgTertiary, border: `1px solid ${t.border}`,
                    borderRadius: 10, fontSize: 12,
                  }}
                />
                <Bar dataKey="amount" fill={ACCENT.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Participants */}
        <Card t={t}>
          <SectionTitle
            icon={Users} title="Participantes"
            subtitle={`${p.participantCount} pessoas nesse projeto`} t={t}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.participants.map((part, i) => {
              const share = (part.contribution / p.current) * 100;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 10, background: t.bgTertiary, borderRadius: 12,
                }}>
                  <Avatar initials={part.initials} size={38} t={t} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: t.textPrimary,
                    }}>
                      {part.name}
                      {part.initials === USER.avatar && (
                        <span style={{
                          marginLeft: 6, fontSize: 9, color: ACCENT.primary,
                          fontWeight: 700,
                        }}>(você)</span>
                      )}
                    </div>
                    <div style={{
                      marginTop: 4,
                      height: 4, background: t.surface, borderRadius: 999, overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${share}%`, height: '100%', background: ACCENT.gradPrimary,
                      }} />
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: t.textPrimary,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {fmtBRLshort(part.contribution)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn primary full t={t} icon={Plus} onClick={() => onDeposit(p.id)}>Novo Aporte</Btn>
          <Btn t={t} variant="ghost" icon={Share2}>Compartilhar</Btn>
        </div>
      </div>
    </div>
  );
};

const KPI = ({ label, value, sub, color, icon: Icon, t }) => (
  <div style={{
    padding: 14, background: t.bgSecondary,
    border: `1px solid ${t.border}`, borderRadius: 16,
  }}>
    <div style={{
      fontSize: 10, color: t.textMuted, fontWeight: 600, marginBottom: 6,
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {Icon && <Icon size={11} />} {label}
    </div>
    <div style={{
      fontSize: 16, fontWeight: 800, color: color || t.textPrimary,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {value}
    </div>
    {sub && (
      <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{sub}</div>
    )}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle, t }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 10,
      background: `${ACCENT.primary}22`, border: `1px solid ${ACCENT.primary}33`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={16} color={ACCENT.primary} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: 14, fontWeight: 800, color: t.textPrimary,
        fontFamily: "'Outfit', sans-serif",
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 10, color: t.textMuted }}>{subtitle}</div>
      )}
    </div>
  </div>
);

const LegendDot = ({ color, label, t, dashed }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <div style={{
      width: 14, height: 2, background: color,
      borderTop: dashed ? `2px dashed ${color}` : 'none',
      background: dashed ? 'transparent' : color,
    }} />
    <span style={{ color: t.textSecondary, fontWeight: 600 }}>{label}</span>
  </div>
);

// ============================================================
// 9. PROFILE SCREEN
// ============================================================
const ProfileScreen = ({ t, theme, onToggleTheme }) => (
  <div style={{ paddingBottom: 120 }}>
    {/* Hero */}
    <div style={{
      background: t.heroGrad, padding: '24px 20px 24px', margin: '0 16px',
      borderRadius: 22, border: `1px solid ${t.border}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -60, left: -30, width: 180, height: 180,
        background: 'radial-gradient(circle, rgba(0,212,170,0.25), transparent 70%)',
      }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
        <Avatar initials={USER.avatar} size={82} ringGrad={ACCENT.gradGold} t={t} />
        <div style={{ minWidth: 0 }}>
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
        fontSize: 13, color: t.textSecondary, marginBottom: 12, position: 'relative',
      }}>
        {USER.bio}
      </div>
      {/* XP progress */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 10, color: t.textMuted, marginBottom: 4,
        }}>
          <span>XP {USER.xp}</span>
          <span>{USER.xpNext}</span>
        </div>
        <ProgressBar percent={(USER.xp / USER.xpNext) * 100} t={t} grad={ACCENT.gradGold} height={6} />
      </div>
      <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
        {[
          { n: USER.activeProjects, l: 'Projetos' },
          { n: USER.friends, l: 'Amigos' },
          { n: USER.badges, l: 'Badges' },
          { n: `${USER.streak}d`, l: 'Streak' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: 10,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${t.border}`,
            borderRadius: 12, textAlign: 'center',
          }}>
            <div style={{
              fontSize: 17, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'Outfit', sans-serif",
            }}>
              {s.n}
            </div>
            <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 600 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, position: 'relative' }}>
        <Btn t={t} icon={Edit3} size="sm" full variant="ghost">Editar Perfil</Btn>
      </div>
    </div>

    {/* Badges */}
    <div style={{ padding: '22px 16px 0' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
      }}>
        <div style={{
          fontSize: 15, fontWeight: 800, color: t.textPrimary,
          fontFamily: "'Outfit', sans-serif",
        }}>
          Conquistas
        </div>
        <span style={{ fontSize: 11, color: t.textMuted }}>{USER.badges}/{USER.totalBadges}</span>
      </div>
      <div style={{
        display: 'flex', gap: 10, overflowX: 'auto',
        padding: '4px 0 12px', scrollbarWidth: 'none',
      }}>
        {BADGES.map((b, i) => (
          <div key={i} style={{
            minWidth: 76, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: b.unlocked ? ACCENT.gradPrimary : t.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, opacity: b.unlocked ? 1 : 0.4,
              boxShadow: b.unlocked ? '0 8px 24px -8px rgba(124,92,255,0.5)' : 'none',
            }}>
              {b.unlocked ? b.emoji : <Lock size={20} color={t.textMuted} />}
            </div>
            <span style={{
              fontSize: 10, textAlign: 'center', fontWeight: 600,
              color: b.unlocked ? t.textSecondary : t.textMuted,
            }}>
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Invites */}
    <div style={{ padding: '10px 16px 0' }}>
      <div style={{
        background: 'linear-gradient(135deg, #FFD70022, #FF6B6B22)',
        border: `1px solid ${ACCENT.gold}44`,
        borderRadius: 20, padding: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: ACCENT.gradGold,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mail size={22} color="#1a1a2e" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 15, fontWeight: 800, color: t.textPrimary,
              fontFamily: "'Outfit', sans-serif",
            }}>
              Você tem {USER.invitesAvailable} convites
            </div>
            <div style={{ fontSize: 11, color: t.textSecondary }}>
              Cada amigo destrava benefícios
            </div>
          </div>
        </div>
        <Btn variant="gold" full t={t} icon={Send}>Enviar Convite</Btn>
        <div style={{
          marginTop: 14, paddingTop: 14,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {USER.invitesSent.map((inv, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar
                initials={inv.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                size={32} t={t}
              />
              <div style={{ flex: 1, fontSize: 13, color: t.textPrimary, fontWeight: 600 }}>
                {inv.name}
              </div>
              <Chip t={t} color={inv.status === 'ativo' ? ACCENT.secondary : ACCENT.gold}>
                {inv.status === 'ativo' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                {inv.status}
              </Chip>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Settings */}
    <div style={{ padding: '22px 16px 0' }}>
      <div style={{
        fontSize: 15, fontWeight: 800, color: t.textPrimary, marginBottom: 12,
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
                <div style={{
                  position: 'absolute', top: 2,
                  left: theme === 'dark' ? 22 : 2,
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#fff',
                  transition: 'left .2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
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
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: t.bgTertiary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <item.icon size={16} color={item.danger ? ACCENT.tertiary : ACCENT.primary} />
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

// ============================================================
// 10. TAB BAR + HEADER + NOTIFICATIONS DROPDOWN
// ============================================================
const TabBar = ({ active, onChange, t }) => {
  const tabs = [
    { k: 'feed', label: 'Feed', icon: Home },
    { k: 'projects', label: 'Projetos', icon: Wallet },
    { k: 'profile', label: 'Perfil', icon: User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: `${t.bgSecondary}ee`,
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${t.border}`,
      display: 'flex', padding: '10px 12px 20px', zIndex: 20,
    }}>
      {tabs.map((tab) => {
        const isActive = active === tab.k;
        return (
          <button
            key={tab.k} onClick={() => onChange(tab.k)}
            style={{
              flex: 1, background: 'transparent', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, cursor: 'pointer', padding: '6px 0',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div style={{
              padding: '6px 18px', borderRadius: 12,
              background: isActive ? 'rgba(124,92,255,0.15)' : 'transparent',
              transition: 'all .2s ease',
            }}>
              <tab.icon
                size={22}
                color={isActive ? ACCENT.primary : t.textMuted}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: isActive ? ACCENT.primary : t.textMuted,
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Header = ({ activeTab, t, onNotifClick, notifOpen, setNotifOpen }) => {
  const titles = {
    feed: 'Coletivo',
    projects: 'Meus Projetos',
    profile: 'Perfil',
    projectDetail: 'Detalhes',
  };
  if (activeTab === 'projectDetail') return null;
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 25,
      background: `${t.bgPrimary}dd`,
      backdropFilter: 'blur(20px)',
      padding: '18px 20px 14px',
      borderBottom: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{
        fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em',
        fontFamily: "'Outfit', sans-serif",
        background: activeTab === 'feed' ? ACCENT.gradPrimary : 'none',
        WebkitBackgroundClip: activeTab === 'feed' ? 'text' : 'initial',
        WebkitTextFillColor: activeTab === 'feed' ? 'transparent' : t.textPrimary,
        color: t.textPrimary,
      }}>
        {titles[activeTab]}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {activeTab === 'feed' && (
          <button style={{
            width: 40, height: 40, borderRadius: 12,
            background: t.bgSecondary, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Search size={18} color={t.textPrimary} />
          </button>
        )}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: t.bgSecondary, border: `1px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Bell size={18} color={t.textPrimary} />
          </button>
          <div style={{
            position: 'absolute', top: -2, right: -2,
            minWidth: 18, height: 18, borderRadius: 9,
            background: ACCENT.tertiary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 10, fontWeight: 800,
            border: `2px solid ${t.bgPrimary}`, padding: '0 4px',
          }}>
            5
          </div>
          {notifOpen && (
            <div style={{
              position: 'absolute', top: 48, right: 0, width: 280,
              background: t.bgSecondary, border: `1px solid ${t.borderStrong}`,
              borderRadius: 16, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
              zIndex: 50, overflow: 'hidden',
            }}>
              <div style={{
                padding: '12px 14px', borderBottom: `1px solid ${t.border}`,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: t.textPrimary }}>Notificações</span>
                <span style={{ fontSize: 11, color: ACCENT.primary, fontWeight: 700 }}>Marcar lidas</span>
              </div>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                  borderBottom: i < NOTIFICATIONS.length - 1 ? `1px solid ${t.border}` : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: t.bgTertiary, fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{n.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: t.textPrimary, fontWeight: 600 }}>{n.text}</div>
                    <div style={{ fontSize: 10, color: t.textMuted }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 10.5  MODALS — Create Project + Deposit
// ============================================================
const Modal = ({ open, onClose, title, children, t }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex', alignItems: 'flex-end',
        animation: 'fadein .25s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: t.bgPrimary,
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          border: `1px solid ${t.borderStrong}`,
          padding: '14px 20px 30px',
          maxHeight: '88%',
          overflowY: 'auto',
          animation: 'slideup .35s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div style={{
          width: 44, height: 4, borderRadius: 2,
          background: t.borderStrong, margin: '0 auto 16px',
        }} />
        <div style={{
          fontSize: 22, fontWeight: 800, color: t.textPrimary, marginBottom: 18,
          fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em',
        }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

const FormLabel = ({ children, t }) => (
  <div style={{
    fontSize: 10, color: t.textSecondary, fontWeight: 800, marginBottom: 8,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }}>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text', t, prefix }) => (
  <div style={{ position: 'relative', marginBottom: 14 }}>
    {prefix && (
      <span style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: t.textMuted, fontSize: 14, fontWeight: 700, pointerEvents: 'none',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {prefix}
      </span>
    )}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: prefix ? '14px 14px 14px 42px' : '14px',
        background: t.bgTertiary,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        color: t.textPrimary, fontSize: 15, fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif", outline: 'none',
      }}
    />
  </div>
);

const SelectChips = ({ options, value, onChange, t }) => (
  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        style={{
          padding: '8px 14px', borderRadius: 10,
          background: value === opt ? ACCENT.gradPrimary : t.bgTertiary,
          border: `1px solid ${value === opt ? 'transparent' : t.border}`,
          color: value === opt ? '#fff' : t.textPrimary,
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {opt}
      </button>
    ))}
  </div>
);

const CreateProjectModal = ({ open, onClose, onCreate, t }) => {
  const [form, setForm] = useState({
    emoji: '🎯',
    name: '',
    type: 'Curto prazo',
    strategy: 'Renda fixa',
    goal: '',
    minDeposit: '100',
  });
  const emojis = ['🎯', '🏖️', '✈️', '🏠', '🚗', '🏍️', '💍', '🎓', '📱', '🎮', '🛡️', '🌍', '🎸', '🍔'];
  const types = ['Curto prazo', 'Médio prazo', 'Longo prazo', 'Sem prazo'];
  const strategies = ['Conservador', 'Renda fixa', 'Moderado', 'Multimercado', 'Agressivo'];

  const submit = () => {
    if (!form.name.trim()) return;
    onCreate({
      emoji: form.emoji,
      name: form.name.trim(),
      type: form.type,
      strategy: form.strategy,
      goal: form.goal ? Number(form.goal) : null,
      minDeposit: Number(form.minDeposit) || 100,
    });
    setForm({ emoji: '🎯', name: '', type: 'Curto prazo', strategy: 'Renda fixa', goal: '', minDeposit: '100' });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Criar Projeto" t={t}>
      <FormLabel t={t}>Ícone</FormLabel>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {emojis.map((e) => (
          <button
            key={e}
            onClick={() => setForm({ ...form, emoji: e })}
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: form.emoji === e ? ACCENT.gradPrimary : t.bgTertiary,
              border: `1px solid ${form.emoji === e ? 'transparent' : t.border}`,
              fontSize: 22, cursor: 'pointer',
              boxShadow: form.emoji === e ? '0 6px 16px -6px rgba(124,92,255,0.6)' : 'none',
            }}
          >
            {e}
          </button>
        ))}
      </div>

      <FormLabel t={t}>Nome do projeto</FormLabel>
      <Input
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        placeholder="Ex: Réveillon na Bahia"
        t={t}
      />

      <FormLabel t={t}>Prazo</FormLabel>
      <SelectChips options={types} value={form.type} onChange={(v) => setForm({ ...form, type: v })} t={t} />

      <FormLabel t={t}>Estratégia</FormLabel>
      <SelectChips options={strategies} value={form.strategy} onChange={(v) => setForm({ ...form, strategy: v })} t={t} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <FormLabel t={t}>Meta (R$)</FormLabel>
          <Input
            value={form.goal}
            onChange={(v) => setForm({ ...form, goal: v })}
            placeholder="12000" type="number" t={t}
          />
        </div>
        <div>
          <FormLabel t={t}>Aporte mín.</FormLabel>
          <Input
            value={form.minDeposit}
            onChange={(v) => setForm({ ...form, minDeposit: v })}
            placeholder="100" type="number" t={t}
          />
        </div>
      </div>

      <div style={{
        padding: 12, background: 'rgba(124,92,255,0.08)',
        border: `1px solid ${ACCENT.primary}33`, borderRadius: 12,
        marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <Info size={14} color={ACCENT.primary} style={{ marginTop: 1 }} />
        <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>
          Você será o primeiro participante. Convide amigos depois pra dividir o objetivo.
        </div>
      </div>

      <Btn primary full t={t} onClick={submit} icon={Sparkles}>
        Criar Projeto
      </Btn>
    </Modal>
  );
};

const DepositModal = ({ open, onClose, onDeposit, projects, defaultProjectId, t }) => {
  const [projectId, setProjectId] = useState(defaultProjectId || (projects[0] && projects[0].id));
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (open) {
      setProjectId(defaultProjectId || (projects[0] && projects[0].id));
      setAmount('');
    }
  }, [open, defaultProjectId, projects]);

  const presets = [50, 100, 250, 500];
  const project = projects.find((p) => p.id === projectId);
  const amountNum = Number(amount) || 0;

  const submit = () => {
    if (!amountNum || !projectId) return;
    onDeposit(projectId, amountNum);
    setAmount('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Novo Aporte" t={t}>
      <FormLabel t={t}>Projeto</FormLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {projects.map((p) => {
          const selected = projectId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setProjectId(p.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 12,
                background: selected ? 'rgba(124,92,255,0.15)' : t.bgTertiary,
                border: `1px solid ${selected ? ACCENT.primary : t.border}`,
                borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 24 }}>{p.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 10, color: t.textMuted }}>
                  {p.strategy} · {fmtBRL(p.current)}
                </div>
              </div>
              {selected && (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: ACCENT.gradPrimary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={13} color="#fff" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <FormLabel t={t}>Valor do aporte</FormLabel>
      <Input
        value={amount}
        onChange={setAmount}
        placeholder="0,00"
        type="number" t={t} prefix="R$"
      />

      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        {presets.map((pv) => (
          <button
            key={pv}
            onClick={() => setAmount(String(pv))}
            style={{
              flex: 1, padding: '10px', borderRadius: 10,
              background: t.bgTertiary, border: `1px solid ${t.border}`,
              color: t.textPrimary, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            R${pv}
          </button>
        ))}
      </div>

      {project && amountNum > 0 && (
        <div style={{
          padding: 14, background: t.bgSecondary, borderRadius: 14,
          border: `1px solid ${t.border}`, marginBottom: 18,
        }}>
          <div style={{
            fontSize: 10, color: t.textMuted, marginBottom: 8, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Resumo
          </div>
          <Row label="Aporte" value={fmtBRL(amountNum)} t={t} />
          <Row label="Saldo atual" value={fmtBRL(project.current)} t={t} />
          <div style={{ height: 1, background: t.border, margin: '8px 0' }} />
          <Row
            label="Novo total no projeto"
            value={fmtBRL(project.current + amountNum)}
            color={ACCENT.secondary} bold t={t}
          />
        </div>
      )}

      <Btn primary full t={t} onClick={submit} icon={Zap}>
        Confirmar Aporte
      </Btn>
    </Modal>
  );
};

const Row = ({ label, value, t, color, bold }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between',
    fontSize: 13, marginBottom: 4,
  }}>
    <span style={{ color: t.textSecondary }}>{label}</span>
    <span style={{
      color: color || t.textPrimary,
      fontWeight: bold ? 800 : 700,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {value}
    </span>
  </div>
);

// ============================================================
// 11. APP ROOT
// ============================================================
export default function Coletivo() {
  const [activeTab, setActiveTab] = useState('feed');
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [projects, setProjects] = useState(PROJECTS);
  const [marketData, setMarketData] = useState(MARKET);
  const [marketLoading, setMarketLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [depositTargetId, setDepositTargetId] = useState(null);
  const [toast, setToast] = useState(null);
  const t = THEMES[theme];

  // ---- Fetch real market data (currencies + crypto) ----
  useEffect(() => {
    let cancelled = false;
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data) return;
        const items = [
          { key: 'USDBRL', name: 'Dólar', prefix: 'R$ ' },
          { key: 'EURBRL', name: 'Euro', prefix: 'R$ ' },
          { key: 'BTCBRL', name: 'Bitcoin', prefix: 'R$ ' },
          { key: 'ETHBRL', name: 'Ethereum', prefix: 'R$ ' },
        ];
        const transformed = items
          .map((item, i) => {
            const d = data[item.key];
            if (!d) return null;
            const value = parseFloat(d.bid);
            const pct = parseFloat(d.pctChange);
            const formatted =
              value > 1000
                ? value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
                : value.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
            return {
              name: item.name,
              value: item.prefix + formatted,
              change: isNaN(pct) ? 0 : Math.round(pct * 100) / 100,
              data: synthSpark(i + value, pct >= 0),
            };
          })
          .filter(Boolean);
        if (transformed.length) {
          setMarketData(transformed);
          setMarketLoading(false);
        }
      })
      .catch(() => setMarketLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Fetch real PT-BR financial news (InfoMoney RSS via rss2json) ----
  useEffect(() => {
    let cancelled = false;
    const feeds = [
      { url: 'https://www.infomoney.com.br/mercados/feed/', source: 'InfoMoney', cat: 'Mercados', emoji: '📈', color: '#7C5CFF' },
      { url: 'https://www.infomoney.com.br/economia/feed/', source: 'InfoMoney', cat: 'Economia', emoji: '🏛️', color: '#00D4AA' },
      { url: 'https://www.infomoney.com.br/feed/', source: 'InfoMoney', cat: 'Geral', emoji: '📰', color: '#FFD700' },
    ];
    Promise.all(
      feeds.map((f) =>
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f.url)}`)
          .then((r) => r.json())
          .then((d) => ({ feed: f, items: d?.items || [] }))
          .catch(() => ({ feed: f, items: [] }))
      )
    ).then((results) => {
      if (cancelled) return;
      const news = [];
      results.forEach(({ feed, items }) => {
        items.slice(0, 2).forEach((it, idx) => {
          if (!it.title) return;
          // Strip HTML from description
          const cleanDesc = (it.description || '')
            .replace(/<[^>]*>/g, '')
            .replace(/&[a-z]+;/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          const ts = it.pubDate ? Math.floor(new Date(it.pubDate).getTime() / 1000) : Math.floor(Date.now() / 1000);
          news.push({
            id: `rn-${feed.cat}-${idx}`,
            source: feed.source,
            category: feed.cat,
            headline: it.title,
            summary: cleanDesc.slice(0, 150).trim() + (cleanDesc.length > 150 ? '…' : ''),
            time: timeAgo(ts),
            image: feed.emoji,
            color: feed.color,
            url: it.link,
          });
        });
      });
      if (news.length) setNewsData(news.slice(0, 6));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Totals derived from projects state ----
  const totals = useMemo(() => {
    const invested = projects.reduce((a, p) => a + p.myContribution, 0);
    const ret = projects.reduce((a, p) => a + p.myReturn, 0);
    return {
      invested,
      return: ret,
      returnPercent: invested > 0 ? (ret / invested) * 100 : 0,
    };
  }, [projects]);

  // ---- Actions ----
  const openProject = (id) => {
    setSelectedProject(id);
    setActiveTab('projectDetail');
  };
  const closeProject = () => {
    setSelectedProject(null);
    setActiveTab('projects');
  };
  const openDepositFor = (id) => {
    setDepositTargetId(id || null);
    setDepositOpen(true);
  };
  const showToast = (text, color) => {
    setToast({ text, color });
    setTimeout(() => setToast(null), 2400);
  };

  const handleCreateProject = (form) => {
    const newId = Math.max(...projects.map((p) => p.id), 0) + 1;
    const newProject = {
      id: newId,
      emoji: form.emoji,
      name: form.name,
      type: form.type,
      strategy: form.strategy,
      goal: form.goal,
      current: 0,
      progress: form.goal ? 0 : null,
      participants: [{ initials: USER.avatar, name: USER.name, contribution: 0 }],
      participantCount: 1,
      myContribution: 0,
      myReturn: 0,
      myReturnPercent: 0,
      nextDeposit: '—',
      nextAmount: form.minDeposit,
      monthlyData: [0, 0, 0, 0, 0, 0],
      status: 'ativo',
      risk: form.strategy === 'Conservador' ? 'Muito baixo'
        : form.strategy === 'Renda fixa' ? 'Baixo'
        : form.strategy === 'Moderado' ? 'Moderado'
        : form.strategy === 'Multimercado' ? 'Moderado'
        : 'Alto',
      riskScore: form.strategy === 'Conservador' ? 1
        : form.strategy === 'Renda fixa' ? 2
        : form.strategy === 'Moderado' ? 3
        : form.strategy === 'Multimercado' ? 3 : 4,
      allocation: [
        { name: 'Tesouro Selic', value: 50, color: '#7C5CFF' },
        { name: 'CDB', value: 35, color: '#00D4AA' },
        { name: 'Caixa', value: 15, color: '#FFD700' },
      ],
      benchmarks: { cdi: 5.2, ibov: 3.8, poupanca: 3.1, portfolio: 0 },
      deposits: [
        { date: 'Jan', amount: 0 }, { date: 'Fev', amount: 0 },
        { date: 'Mar', amount: 0 }, { date: 'Abr', amount: 0 },
        { date: 'Mai', amount: 0 },
      ],
    };
    setProjects((prev) => [...prev, newProject]);
    showToast(`✨ Projeto "${form.name}" criado!`, ACCENT.primary);
  };

  const handleDeposit = (projectId, amount) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const newCurrent = p.current + amount;
        const newMyContribution = p.myContribution + amount;
        const newMonthly = [...p.monthlyData.slice(1), newCurrent];
        const newDeposits = [...p.deposits];
        newDeposits[newDeposits.length - 1] = {
          ...newDeposits[newDeposits.length - 1],
          amount: newDeposits[newDeposits.length - 1].amount + amount,
        };
        return {
          ...p,
          current: newCurrent,
          myContribution: newMyContribution,
          progress: p.goal ? Math.min(100, Math.round((newCurrent / p.goal) * 100)) : null,
          monthlyData: newMonthly,
          deposits: newDeposits,
          participants: p.participants.map((part) =>
            part.initials === USER.avatar
              ? { ...part, contribution: part.contribution + amount }
              : part
          ),
        };
      })
    );
    showToast(`⚡ Aporte de ${fmtBRL(amount)} confirmado!`, ACCENT.secondary);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadein { from { opacity: 0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
        @keyframes slideup { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.25); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at top, ${theme === 'dark' ? '#1a0f2e' : '#eadfff'}, ${t.bgPrimary} 70%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px 0', fontFamily: "'DM Sans', sans-serif",
      }}>
        <div
          onClick={() => notifOpen && setNotifOpen(false)}
          style={{
            width: '100%', maxWidth: 430,
            height: '94vh', maxHeight: 940,
            background: t.bgPrimary,
            borderRadius: 36,
            border: `1px solid ${t.border}`,
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <Header
            activeTab={activeTab} t={t}
            notifOpen={notifOpen} setNotifOpen={setNotifOpen}
          />
          <div
            key={activeTab + (selectedProject || '')}
            style={{
              height: activeTab === 'projectDetail' ? '100%' : 'calc(100% - 78px)',
              paddingTop: activeTab === 'projectDetail' ? 20 : 0,
              overflowY: 'auto',
              animation: 'fadein .35s ease',
            }}
          >
            {activeTab === 'feed' && (
              <FeedScreen
                t={t}
                marketData={marketData}
                marketLoading={marketLoading}
                newsData={newsData}
                onCreate={() => setCreateOpen(true)}
                onDeposit={() => openDepositFor(null)}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsScreen
                t={t}
                projects={projects}
                totals={totals}
                onOpenProject={openProject}
                onCreate={() => setCreateOpen(true)}
                onDeposit={(id) => openDepositFor(id)}
              />
            )}
            {activeTab === 'projectDetail' && selectedProject && (
              <ProjectDetailScreen
                projectId={selectedProject} t={t} onBack={closeProject}
                projects={projects}
                onDeposit={(id) => openDepositFor(id)}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileScreen
                t={t} theme={theme}
                onToggleTheme={() => setTheme((th) => (th === 'dark' ? 'light' : 'dark'))}
              />
            )}
          </div>
          {activeTab !== 'projectDetail' && (
            <TabBar active={activeTab} onChange={setActiveTab} t={t} />
          )}

          {/* Modals */}
          <CreateProjectModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            onCreate={handleCreateProject}
            t={t}
          />
          <DepositModal
            open={depositOpen}
            onClose={() => setDepositOpen(false)}
            onDeposit={handleDeposit}
            projects={projects}
            defaultProjectId={depositTargetId}
            t={t}
          />

          {/* Toast */}
          {toast && (
            <div style={{
              position: 'absolute', top: 90, left: '50%',
              transform: 'translateX(-50%)',
              background: t.bgSecondary,
              border: `1px solid ${toast.color}55`,
              borderLeft: `4px solid ${toast.color}`,
              borderRadius: 14, padding: '12px 18px',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
              color: t.textPrimary, fontSize: 13, fontWeight: 700,
              zIndex: 200,
              animation: 'toastIn .35s cubic-bezier(.2,.8,.2,1)',
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: '85%',
            }}>
              {toast.text}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
