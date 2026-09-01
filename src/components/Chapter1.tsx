import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Общие Tailwind-классы для различных типов узлов (Дизайн-система)
const nodeClasses = {
  header:
    "bg-slate-900! border-2 border-slate-600! text-slate-100! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(148,163,184,0.15)]! max-w-xs md:max-w-none",

  category:
    "bg-slate-950! border border-slate-700! text-slate-400! text-xs p-2 rounded text-center! tracking-wide",

  factor:
    "bg-[#0b0f19]! border border-indigo-500/40! text-indigo-300! text-xs p-2.5 rounded shadow-[0_0_10px_rgba(99,102,241,0.05)]! w-[260px] text-left!",

  calc: "bg-[#051c14]! border border-emerald-500/30! text-emerald-400! text-[11px] p-2 rounded w-[290px] text-left!",

  law: "bg-amber-950/30! border-2 border-amber-500/70! text-amber-400! font-bold p-3 rounded text-center! shadow-[0_0_20px_rgba(245,158,11,0.15)]! w-[300px]",

  subLaw:
    "bg-slate-950! border border-amber-500/30! text-slate-300! text-xs p-2 rounded text-center! w-[240px]",

  resultWin:
    "bg-emerald-950/80! border-2 border-emerald-500! text-emerald-400! font-bold p-2.5 rounded tracking-widest text-center! shadow-[0_0_15px_rgba(16,185,129,0.2)]!",

  resultLose:
    "bg-rose-950/80! border-2 border-rose-500! text-rose-400! font-bold p-2.5 rounded tracking-widest text-center! shadow-[0_0_15px_rgba(239,68,68,0.2)]!",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт анализа
  {
    id: "start",
    data: { label: "🧠 ПЛАНИРОВАНИЕ" },
    position: { x: 430, y: 40 },
    className: nodeClasses.header,
  },

  // Уровень 2: Две оси входящего анализа
  {
    id: "cat-factors",
    data: { label: "📋 5 ОСНОВНЫХ ФАКТОРОВ\n(Внутренний аудит сил)" },
    position: { x: 130, y: 130 },
    className: nodeClasses.category,
  },
  {
    id: "cat-calcs",
    data: { label: "📊 7 СРАВНИТЕЛЬНЫХ РАСЧЕТОВ\n(Сопоставление с врагом)" },
    position: { x: 570, y: 130 },
    className: nodeClasses.category,
  },

  // Уровень 3: Левая ветка (5 факторов)
  {
    id: "f1",
    data: { label: "1. ПУТЬ (Единство народа и правителя)" },
    position: { x: 50, y: 220 },
    className: nodeClasses.factor,
  },
  {
    id: "f2",
    data: { label: "2. НЕБО (Погода, время, сезоны)" },
    position: { x: 50, y: 280 },
    className: nodeClasses.factor,
  },
  {
    id: "f3",
    data: { label: "3. ЗЕМЛЯ (Местность, расстояния, рельеф)" },
    position: { x: 50, y: 340 },
    className: nodeClasses.factor,
  },
  {
    id: "f4",
    data: { label: "4. ПОЛКОВОДЕЦ (Мудрость, мужество, строгость)" },
    position: { x: 50, y: 400 },
    className: nodeClasses.factor,
  },
  {
    id: "f5",
    data: { label: "5. ЗАКОН (Организация, армия, снабжение)" },
    position: { x: 50, y: 480 },
    className: nodeClasses.factor,
  },

  // Уровень 3: Правая ветка (7 расчетов)
  {
    id: "c1",
    data: { label: "1. Кто из государей обладает Путем?" },
    position: { x: 620, y: 220 },
    className: nodeClasses.calc,
  },
  {
    id: "c2",
    data: { label: "2. У кого из полководцев больше таланта?" },
    position: { x: 620, y: 270 },
    className: nodeClasses.calc,
  },
  {
    id: "c3",
    data: { label: "3. Кто лучше использовал Небо и Землю?" },
    position: { x: 620, y: 320 },
    className: nodeClasses.calc,
  },
  {
    id: "c4",
    data: { label: "4. Чьи законы и приказы выполняются?" },
    position: { x: 620, y: 370 },
    className: nodeClasses.calc,
  },
  {
    id: "c5",
    data: { label: "5. Чьё войско сильнее?" },
    position: { x: 620, y: 420 },
    className: nodeClasses.calc,
  },
  {
    id: "c6",
    data: { label: "6. Чьи командиры и воины лучше обучены?" },
    position: { x: 620, y: 470 },
    className: nodeClasses.calc,
  },
  {
    id: "c7",
    data: { label: "7. У кого в наградах и наказаниях больше порядка?" },
    position: { x: 620, y: 520 },
    className: nodeClasses.calc,
  },

  // Уровень 4: Главный закон тактики
  {
    id: "deception",
    data: { label: "🎭 ГЛАВНЫЙ ЗАКОН ДЕЙСТВИЯ\n«Война — это путь обмана»" },
    position: { x: 320, y: 650 },
    className: nodeClasses.law,
  },

  // Уровень 5: Варианты реализации обмана
  {
    id: "dec1",
    data: { label: "Если силен ➔ Показывай слабость" },
    position: { x: 60, y: 750 },
    className: nodeClasses.subLaw,
  },
  {
    id: "dec2",
    data: { label: "Если близок ➔ Показывай, что далеко" },
    position: { x: 330, y: 750 },
    className: nodeClasses.subLaw,
  },
  {
    id: "dec3",
    data: { label: "Если враг готов ➔ Изнуряй и будь наготове" },
    position: { x: 640, y: 750 },
    className: nodeClasses.subLaw,
  },

  // Уровень 6: Закономерный итог
  {
    id: "res-win",
    data: { label: "📈 РАСЧЕТОВ МНОГО ➔ ПОБЕДА" },
    position: { x: 180, y: 820 },
    className: nodeClasses.resultWin,
  },
  {
    id: "res-lose",
    data: { label: "📉 РАСЧЕТОВ МАЛО ➔ ПОРАЖЕНИЕ" },
    position: { x: 500, y: 820 },
    className: nodeClasses.resultLose,
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта к категориям анализа
  {
    id: "e-s1",
    source: "start",
    target: "cat-factors",
    style: { stroke: "#475569", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "cat-calcs",
    style: { stroke: "#475569", strokeWidth: 1.5 },
  },

  // Распределение по спискам
  ...["f1", "f2", "f3", "f4", "f5"].map((id) => ({
    id: `e-f-${id}`,
    source: "cat-factors",
    target: id,
    style: { stroke: "#4f46e5", opacity: 0.6 },
  })),
  ...["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((id) => ({
    id: `e-c-${id}`,
    source: "cat-calcs",
    target: id,
    style: { stroke: "#10b981", opacity: 0.6 },
  })),

  // Переход к скрытой доктрине (пунктир)
  {
    id: "e-f-dec",
    source: "f5",
    target: "deception",
    style: { stroke: "#f59e0b", strokeDasharray: "4,4" },
  },
  {
    id: "e-c-dec",
    source: "c7",
    target: "deception",
    style: { stroke: "#f59e0b", strokeDasharray: "4,4" },
  },

  // От закона к тактическим шагам
  {
    id: "e-d1",
    source: "deception",
    target: "dec1",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-d2",
    source: "deception",
    target: "dec2",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-d3",
    source: "deception",
    target: "dec3",
    style: { stroke: "#d97706" },
  },

  // Импульсы финального исхода (Анимированные стрелки)
  {
    id: "e-win",
    source: "dec1",
    target: "res-win",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  {
    id: "e-lose",
    source: "dec3",
    target: "res-lose",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },
];

export default function Chapter1() {
  return (
    <div className="w-full h-full relative">
      {/* Адаптивная плашка с ключевым выводом главы */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-indigo-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Исход любого противостояния моделируется в залах расчетов задолго до
        столкновения сторон. Побеждает тот, кто провел детальный аудит по пяти
        неизменным факторам и скорректировал действия через призму искусства
        обмана.
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
