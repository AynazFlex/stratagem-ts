import { ReactFlow, Background, Controls, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeClasses = {
  header:
    "bg-slate-900! border-2 border-slate-600! text-slate-100! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(148,163,184,0.15)]!",

  // Ключевой парадокс
  paradox: "border-amber-500/50! text-amber-300! bg-amber-950/20! text-left!",

  // Метафоры стихий
  element:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-center! text-[11px]! w-[190px]",

  // Четыре управления
  control:
    "border-purple-500/40! text-purple-300! bg-[#1a0f2e]! text-left! w-[260px]",

  // Правило финала
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🚩 ГЛАВА 7. БОРЬБА НА ВОЙНЕ / МАНЕВРИРОВАНИЕ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Искусство обходного пути
  {
    id: "maneuver",
    data: {
      label:
        "🔄 ПАРАДОКС МАНЕВРА\n«Сделать обходной путь прямым, сделать беду выгодой. Выйти позже врага, но прийти раньше него»",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.paradox,
  },

  // Уровень 3: Четыре стихии армии (Левая ветка)
  {
    id: "el-wind",
    data: { label: "💨 Скоротечен, как ветер" },
    position: { x: 60, y: 240 },
    className: nodeClasses.element,
  },
  {
    id: "el-forest",
    data: { label: "🌲 Спокоен, как лес" },
    position: { x: 60, y: 295 },
    className: nodeClasses.element,
  },
  {
    id: "el-fire",
    data: { label: "🔥 Всепожирающий, как огонь" },
    position: { x: 60, y: 350 },
    className: nodeClasses.element,
  },
  {
    id: "el-mountain",
    data: { label: "⛰️ Неподвижен, как гора" },
    position: { x: 60, y: 405 },
    className: nodeClasses.element,
  },

  // Уровень 3: Четыре искусства управления (Правая ветка)
  {
    id: "ctrl-spirit",
    data: {
      label:
        "🧠 Управление ДУХОМ\n(Утром дух бодр, к вечеру угасает. Избегай бодрого врага)",
    },
    position: { x: 660, y: 220 },
    className: nodeClasses.control,
  },
  {
    id: "ctrl-heart",
    data: {
      label:
        "❤️ Управление СЕРДЦЕМ\n(Сохраняй порядок и спокойствие среди шума и беспорядка врага)",
    },
    position: { x: 660, y: 295 },
    className: nodeClasses.control,
  },
  {
    id: "ctrl-force",
    data: {
      label:
        "💪 Управление СИЛОЙ\n(Приходи на поле боя первым, пусть враг бежит к тебе изнуренным)",
    },
    position: { x: 660, y: 370 },
    className: nodeClasses.control,
  },

  // Уровень 4: Главный запрет главы
  {
    id: "final-law",
    data: {
      label:
        "🛑 ТАКТИЧЕСКИЙ ПРЕДЕЛ\n«Не окружай врага полностью — оставь ему проход. Не нападай на отчаявшегося врага»",
    },
    position: { x: 370, y: 520 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "maneuver",
    style: { stroke: "#f59e0b", strokeWidth: 1.5 },
  },

  // К стихиям
  ...["el-wind", "el-forest", "el-fire", "el-mountain"].map((id) => ({
    id: `e-m-${id}`,
    source: "maneuver",
    target: id,
    style: { stroke: "#475569" },
  })),

  // К управлениям
  ...["ctrl-spirit", "ctrl-heart", "ctrl-force"].map((id) => ({
    id: `e-c-${id}`,
    source: "maneuver",
    target: id,
    style: { stroke: "#a855f7" },
  })),

  // Сведение к финальному правилу окружения (Анимированные стрелки)
  {
    id: "e-f1",
    source: "el-mountain",
    target: "final-law",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-f2",
    source: "ctrl-force",
    target: "final-law",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
];

export default function Chapter7() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-purple-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Борьба на войне опасна: армия без снабжения гибнет. Маневрирование
        требует обмана врага. Управляй психологическим состоянием (духом и
        сердцем) своих и чужих войск, и никогда не загоняй разбитого врага в
        абсолютный тупик, чтобы не вызвать яростное сопротивление обреченных.
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
