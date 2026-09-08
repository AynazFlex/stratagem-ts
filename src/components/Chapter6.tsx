import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeClasses = {
  header:
    "bg-slate-900! border-2 border-slate-600! text-slate-100! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(148,163,184,0.15)]!",

  // Концепты Полноты и Пустоты
  fullness: "border-rose-500/50! text-rose-400! bg-rose-950/20! text-left!",
  emptiness:
    "border-cyan-400! text-cyan-300! bg-[#062430]! shadow-[0_0_15px_rgba(34,211,238,0.15)]! font-bold text-left!",

  // Тактические действия
  action:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-left! text-[11px]! w-[250px]",

  // Высший закон
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🌊 ГЛАВА 6. ПОЛНОТА И ПУСТОТА (СИЛА И СЛАБОСТЬ)" },
    position: { x: 400, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Базовая дихотомия
  {
    id: "node-full",
    data: {
      label:
        "🔴 ПОЛНОТА (Враг силен)\n• Укрепленные позиции\n• Концентрация войск\n• Готовность к удару\n➔ ИЗБЕГАЙ ЭТОГО",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.fullness,
  },
  {
    id: "node-empty",
    data: {
      label:
        "🔵 ПУСТОТА (Враг слаб)\n• Оголенные участки\n• Изнурение и паника\n• Просчеты в логистике\n➔ АТАКУЙ СЮДА",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.emptiness,
  },

  // Уровень 3: Управление инициативой
  {
    id: "act1",
    data: {
      label:
        "🎯 Навязывай свою волю\nЗаставляй врага двигаться туда, куда нужно тебе, управляя его выгодой и страхом.",
    },
    position: { x: 60, y: 300 },
    className: nodeClasses.action,
  },
  {
    id: "act2",
    data: {
      label:
        "🎭 Будь бесформенным\nПусть враг не знает, где ты ударишь. Тогда ему придется разделять свои силы.",
    },
    position: { x: 660, y: 300 },
    className: nodeClasses.action,
  },

  // Уровень 4: Метафора воды
  {
    id: "water-law",
    data: {
      label:
        "💧 ЗАКОН ТЕКУЧЕСТИ\n«Война подобна воде: вода избегает высот и стремится вниз; армия избегает силы и бьет по слабости»",
    },
    position: { x: 370, y: 450 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "node-full",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "node-empty",
    style: { stroke: "#22d3ee", strokeWidth: 2 },
  },

  {
    id: "e-f-a1",
    source: "node-full",
    target: "act1",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-e-a2",
    source: "node-empty",
    target: "act2",
    style: { stroke: "#22d3ee" },
  },

  // Сведение к закону воды (Анимированные стрелки)
  {
    id: "e-w1",
    source: "act1",
    target: "water-law",
    style: { stroke: "#6366f1" },
  },
  {
    id: "e-w2",
    source: "act2",
    target: "water-law",
    animated: true,
    style: { stroke: "#22d3ee", strokeWidth: 2 },
  },
];

export default function Chapter6() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-cyan-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Управление войной — это управление пустотой и полнотой. Не бейся там,
        где враг крепок. Скрой свою форму, заставь его растянуть силы и наноси
        точечные удары туда, где он тебя совершенно не ждет.
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
