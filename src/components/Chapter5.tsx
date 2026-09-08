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

  // Компоненты управления силой
  control:
    "border-indigo-500/50! text-indigo-300! bg-[#0b1329]! shadow-[0_0_15px_rgba(99,102,241,0.1)]! text-left!",

  // Две оси боя
  zheng: "border-cyan-500/40! text-cyan-300! bg-[#062430]! text-left!",
  qi: "border-amber-500/40! text-amber-300! bg-[#2c1d05]! text-left!",

  // Ключевые состояния энергии
  energy:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-center! text-[11px]! w-[220px]",

  // Финал
  result:
    "border-2 border-rose-500! text-rose-400! font-bold text-center! bg-rose-950/40! shadow-[0_0_20px_rgba(239,68,68,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Начало
  {
    id: "start",
    data: { label: "⚡️ ГЛАВА 5. ДВИЖУЩАЯ СИЛА" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Управление и Организация массы
  {
    id: "management",
    data: {
      label:
        "📊 УПРАВЛЕНИЕ МАССАМИ\n«Управлять многими людьми так же легко, как и немногими: вопрос в организации, знаках и сигналах»",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.control,
  },

  // Уровень 3: Две бесконечные комбинации ударов
  {
    id: "strike-direct",
    data: {
      label:
        "🔹 ЧЖЭН (Прямой бой)\n• Связывание врага\n• Фронтальное столкновение\n• Очевидные действия",
    },
    position: { x: 80, y: 250 },
    className: nodeClasses.zheng,
  },
  {
    id: "strike-indirect",
    data: {
      label:
        "🔸 ЦИ (Маневренный бой)\n• Заход с флангов и тыла\n• Скрытые стратагемы\n• Приносит чистую победу",
    },
    position: { x: 620, y: 250 },
    className: nodeClasses.qi,
  },

  // Уровень 4: Состояния накопления и удара
  {
    id: "e-potential",
    data: { label: "🏹 Потенциал (Ши)\nПодобен натянутому арбалету" },
    position: { x: 120, y: 400 },
    className: nodeClasses.energy,
  },
  {
    id: "e-timing",
    data: { label: "🎯 Расчет момента (Цзе)\nПодобен пикированию ястреба" },
    position: { x: 500, y: 400 },
    className: nodeClasses.energy,
  },

  // Уровень 5: Итоговая максима о силе
  {
    id: "wisdom",
    data: {
      label:
        "🪵 ЗАКОН ИНЕРЦИИ\n«Тот, кто использует мощь, катит круглые камни с горы в тысячу саженей»",
    },
    position: { x: 370, y: 520 },
    className: nodeClasses.result,
  },
];

const initialEdges: Edge[] = [
  // От старта к управлению
  {
    id: "e-s1",
    source: "start",
    target: "management",
    style: { stroke: "#6366f1" },
  },

  // Разветвление на тактики боя
  {
    id: "e-m-z",
    source: "management",
    target: "strike-direct",
    style: { stroke: "#06b6d4", strokeWidth: 1.5 },
  },
  {
    id: "e-m-q",
    source: "management",
    target: "strike-indirect",
    style: { stroke: "#f59e0b", strokeWidth: 1.5 },
  },

  // Перекрестное взаимодействие тактик (они порождают друг друга)
  {
    id: "e-zq",
    source: "strike-direct",
    target: "strike-indirect",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Сведение к состояниям кинетики
  {
    id: "e-z-pot",
    source: "strike-direct",
    target: "e-potential",
    style: { stroke: "#06b6d4" },
  },
  {
    id: "e-q-tim",
    source: "strike-indirect",
    target: "e-timing",
    style: { stroke: "#f59e0b" },
  },

  // Финальный сброс энергии (Анимированные пульсирующие стрелки)
  {
    id: "e-p-final",
    source: "e-potential",
    target: "wisdom",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },
  {
    id: "e-t-final",
    source: "e-timing",
    target: "wisdom",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },
];

export default function Chapter5() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-rose-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Сила рождается из безупречной структуры управления, а победа — из
        бесконечного комбинирования очевидных (Чжэн) и скрытых (Ци) маневров.
        Копи потенциал скрытно, как арбалет, но высвобождай его мгновенно и с
        сокрушительной инерцией.
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
