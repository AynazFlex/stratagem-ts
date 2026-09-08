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

  // Ветки Обороны и Наступления
  defense:
    "border-indigo-500/50! text-indigo-300! bg-[#0b1329]! shadow-[0_0_15px_rgba(99,102,241,0.1)]! text-left!",
  attack:
    "border-amber-500/50! text-amber-400! bg-amber-950/20! shadow-[0_0_15px_rgba(245,158,11,0.1)]! text-left!",

  // Военная математика
  math: "border-slate-700! text-slate-400! bg-slate-950/40! text-center! text-[11px]! w-[180px]",

  // Итог
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🛡️ ГЛАВА 4. ФОРМА / РАЗВЕРТЫВАНИЕ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Разделение на два правила
  {
    id: "def-root",
    data: {
      label:
        "🔷 ОБОРУДОВАНИЕ НЕПОБЕДИМОСТИ\n• Зависит полностью от ТЕБЯ\n• Применяется, когда сил недостаточно\n• Скрывай свои следы под землей",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.defense,
  },
  {
    id: "att-root",
    data: {
      label:
        "🔶 ВОЗМОЖНОСТЬ ПОБЕДИТЬ ВРАГА\n• Зависит от ОШИБКИ противника\n• Применяется, когда сил в избытке\n• Рази из под небес, как молния",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.attack,
  },

  // Уровень 3: 5 Ступеней военной математики (Центральный упорядоченный каскад)
  {
    id: "m1",
    data: { label: "1. ЗЕМЛЯ\n(Пространство)" },
    position: { x: 440, y: 250 },
    className: nodeClasses.math,
  },
  {
    id: "m2",
    data: { label: "2. ИЗМЕРЕНИЯ\n(Длина и ширина)" },
    position: { x: 440, y: 320 },
    className: nodeClasses.math,
  },
  {
    id: "m3",
    data: { label: "3. ОБЪЕМЫ\n(Ресурсы и армия)" },
    position: { x: 440, y: 390 },
    className: nodeClasses.math,
  },
  {
    id: "m4",
    data: { label: "4. ПОДСЧЕТЫ\n(Оценка сил)" },
    position: { x: 440, y: 460 },
    className: nodeClasses.math,
  },
  {
    id: "m5",
    data: { label: "5. СРАВНЕНИЯ\n➔ ПОБЕДА" },
    position: { x: 440, y: 530 },
    className: nodeClasses.math,
  },

  // Уровень 4: Главная максима главы
  {
    id: "wisdom",
    data: {
      label:
        "🌊 ЗАКОН ВОДЫ\n«Победоносная армия подобна удерживаемой воде, которая срывается в глубокое ущелье»",
    },
    position: { x: 370, y: 630 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта к Обороне и Наступлению
  {
    id: "e-s1",
    source: "start",
    target: "def-root",
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "att-root",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },

  // Сведение логики к математическому каскаду
  {
    id: "e-d-m",
    source: "def-root",
    target: "m1",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-a-m",
    source: "att-root",
    target: "m1",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Последовательная цепочка расчетов
  { id: "e-m1", source: "m1", target: "m2", style: { stroke: "#94a3b8" } },
  { id: "e-m2", source: "m2", target: "m3", style: { stroke: "#94a3b8" } },
  { id: "e-m3", source: "m3", target: "m4", style: { stroke: "#94a3b8" } },
  {
    id: "e-m4",
    source: "m4",
    target: "m5",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },

  // К финальной мудрости
  {
    id: "e-final",
    source: "m5",
    target: "wisdom",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
];

export default function Chapter4() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-indigo-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Непобедимость — это безупречная внутренняя защита (оборона). Победа —
        это внешняя ошибка врага, которой ты мгновенно пользуешься
        (наступление). Кто не просчитал математику ресурсов по цепочке, тот не
        сможет раскрыть этот потенциал.
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
