import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Дизайн-система: Золотая иерархия приоритетов Сунь-Цзы
const nodeClasses = {
  header:
    "border-2 border-slate-500! text-slate-100! font-bold uppercase tracking-wider text-center! bg-slate-900!",

  // Иерархия нападения (от лучшего к худшему)
  best: "border-amber-400! text-amber-300! bg-amber-950/30! shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold",
  good: "border-indigo-400/60! text-indigo-300! bg-[#0b1329]!",
  bad: "border-indigo-900/60! text-slate-400! bg-slate-950/40!",
  worst:
    "border-rose-500/50! text-rose-300! bg-rose-950/20! shadow-[0_0_15px_rgba(239,68,68,0.1)]",

  // Математика соотношения сил
  math: "border-emerald-500/40! text-emerald-300! bg-[#042417]! text-left",

  // Главная максима главы
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.2)] w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Главная цель
  {
    id: "start",
    data: { label: "⚔️ СТРАТЕГИЧЕСКОЕ НАПАДЕНИЕ (ПОБЕДА БЕЗ БОЯ)" },
    position: { x: 400, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: ИЕРАРХИЯ СТРАТАГЕМ (Слева)
  {
    id: "h1",
    data: { label: "🌟 1. Разбить замыслы врага\n(Высшее искусство воевать)" },
    position: { x: 60, y: 130 },
    className: nodeClasses.best,
  },
  {
    id: "h2",
    data: { label: "🤝 2. Разбить его союзы\n(Изолировать врага дипломатией)" },
    position: { x: 60, y: 210 },
    className: nodeClasses.good,
  },
  {
    id: "h3",
    data: { label: "⚔️ 3. Разбить его войска\n(Прямое столкновение на поле)" },
    position: { x: 60, y: 290 },
    className: nodeClasses.bad,
  },
  {
    id: "h4",
    data: { label: "🏰 4. Осаждать крепости\n(Худшая, вынужденная тактика)" },
    position: { x: 60, y: 370 },
    className: nodeClasses.worst,
  },

  // Уровень 2: МАТЕМАТИКА СООТНОШЕНИЯ СИЛ (Справа)
  {
    id: "m1",
    data: { label: "Если сил 10:1 ➔ Окружай его" },
    position: { x: 740, y: 130 },
    className: nodeClasses.math,
  },
  {
    id: "m2",
    data: { label: "Если сил 5:1 ➔ Нападай на него" },
    position: { x: 740, y: 185 },
    className: nodeClasses.math,
  },
  {
    id: "m3",
    data: { label: "Если сил 2:1 ➔ Разделяй его" },
    position: { x: 740, y: 240 },
    className: nodeClasses.math,
  },
  {
    id: "m4",
    data: { label: "Если силы равны ➔ Сумей сразиться" },
    position: { x: 740, y: 295 },
    className: nodeClasses.math,
  },
  {
    id: "m5",
    data: { label: "Если сил меньше ➔ Сумей обороняться" },
    position: { x: 740, y: 350 },
    className: nodeClasses.math,
  },
  {
    id: "m6",
    data: { label: "Если силы неравны ➔ Сумей уклониться" },
    position: { x: 740, y: 405 },
    className: nodeClasses.math,
  },

  // Уровень 3: Сведение к главной мудрости
  {
    id: "wisdom",
    data: {
      label:
        "⚖️ ЗАКОН ПОЗНАНИЯ\n«Если знаешь его и знаешь себя, сражайся хоть сто раз — опасности не будет»",
    },
    position: { x: 380, y: 490 },
    className: nodeClasses.law,
  },

  // Уровень 4: Три исхода по знанию себя и врага
  {
    id: "r1",
    data: { label: "Знаешь себя + Знаешь врага ➔ 100% ПОБЕДА" },
    position: { x: 20, y: 620 },
    className: "border-emerald-500! text-emerald-400! bg-emerald-950/20!",
  },
  {
    id: "r2",
    data: { label: "Знаешь себя + Не знаешь врага ➔ 50/50 Шансы равны" },
    position: { x: 350, y: 620 },
    className: "border-amber-500/50! text-amber-300! bg-amber-950/10!",
  },
  {
    id: "r3",
    data: { label: "Не знаешь ни себя, ни врага ➔ 100% ПОРАЖЕНИЕ" },
    position: { x: 700, y: 620 },
    className: "border-rose-500! text-rose-400! bg-rose-950/20!",
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта к левой и правой веткам
  {
    id: "e-s1",
    source: "start",
    target: "h1",
    style: { stroke: "#f59e0b", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "m1",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },

  // Связи иерархии (сверху вниз, от лучшего к худшему)
  {
    id: "e-h1-h2",
    source: "h1",
    target: "h2",
    style: { stroke: "#6366f1", opacity: 0.5 },
  },
  {
    id: "e-h2-h3",
    source: "h2",
    target: "h3",
    style: { stroke: "#6366f1", opacity: 0.5 },
  },
  {
    id: "e-h3-h4",
    source: "h3",
    target: "h4",
    style: { stroke: "#ef4444", opacity: 0.4 },
  },

  // Математические связи (зависимости пропорций)
  {
    id: "e-m1-m2",
    source: "m1",
    target: "m2",
    style: { stroke: "#10b981", opacity: 0.4 },
  },
  {
    id: "e-m2-m3",
    source: "m2",
    target: "m3",
    style: { stroke: "#10b981", opacity: 0.4 },
  },
  {
    id: "e-m3-m4",
    source: "m3",
    target: "m4",
    style: { stroke: "#475569", opacity: 0.4 },
  },
  {
    id: "e-m4-m5",
    source: "m4",
    target: "m5",
    style: { stroke: "#ef4444", opacity: 0.4 },
  },
  {
    id: "e-m5-m6",
    source: "m5",
    target: "m6",
    style: { stroke: "#ef4444", opacity: 0.4 },
  },

  // Сведение к центральному закону познания
  {
    id: "e-h-wis",
    source: "h4",
    target: "wisdom",
    style: { stroke: "#6366f1", strokeDasharray: "4,4" },
  },
  {
    id: "e-m-wis",
    source: "m6",
    target: "wisdom",
    style: { stroke: "#6366f1", strokeDasharray: "4,4" },
  },

  // От мудрости к исходам (Анимированные стрелки)
  {
    id: "e-r1",
    source: "wisdom",
    target: "r1",
    animated: true,
    style: { stroke: "#10b981" },
  },
  {
    id: "e-r2",
    source: "wisdom",
    target: "r2",
    style: { stroke: "#f59e0b", strokeDasharray: "2,2" },
  },
  {
    id: "e-r3",
    source: "wisdom",
    target: "r3",
    animated: true,
    style: { stroke: "#ef4444" },
  },
];

export default function Chapter3() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-amber-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Совершенная победа — это деструкция планов и союзов врага до начала
        боевых действий. Если бой неизбежен, тактика строго подчиняется
        пропорции сил. Триумф гарантирует только абсолютное знание себя и
        противника.
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-slate-900 border-slate-800 text-slate-100 fill-slate-100" />
      </ReactFlow>
    </div>
  );
}
