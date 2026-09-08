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

  // Правила диспозиции на местности
  terrain: "border-indigo-500/50! text-indigo-300! bg-[#0b1329]! text-left!",

  // Видимые знаки (Причина)
  sign: "border-slate-700! text-slate-400! bg-slate-950/60! text-left! text-[11px]! w-[240px]",

  // Скрытая суть (Следствие)
  truth:
    "border-amber-500/50! text-amber-300! bg-[#2c1d05]! font-bold text-left! text-[11px]! w-[240px]",

  // Финальный закон контроля
  law: "border-2 border-emerald-500! text-emerald-400! font-bold text-center! bg-emerald-950/40! shadow-[0_0_20px_rgba(16,185,129,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🛰️ ГЛАВА 9. ПОХОД / НАБЛЮДЕНИЕ И РАЗВЕДКА" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Правила диспозиции
  {
    id: "terr-rule",
    data: {
      label:
        "⛰️ ВЫБОР ПОЗИЦИИ\n• В горах держись долин, занимай высоты\n• У реки отходи от воды, встречай врага на берегу\n• В болотах двигайся быстро, держись травы\n• На равнине занимай открытые места, правый фланг к тылу",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.terrain,
  },

  // Уровень 3: Таблица знаков разведки (Причина ➔ Следствие)
  // Пара 1
  {
    id: "s1",
    data: { label: "👁️ ЗНАК: Пыль поднимается столбом" },
    position: { x: 40, y: 270 },
    className: nodeClasses.sign,
  },
  {
    id: "t1",
    data: { label: "🔍 СУТЬ: Идут танки / колесницы врага" },
    position: { x: 10, y: 340 },
    className: nodeClasses.truth,
  },

  // Пара 2
  {
    id: "s2",
    data: { label: "👁️ ЗНАК: Птицы взлетают стаями" },
    position: { x: 300, y: 270 },
    className: nodeClasses.sign,
  },
  {
    id: "t2",
    data: { label: "🔍 СУТЬ: Впереди скрытая засада" },
    position: { x: 300, y: 340 },
    className: nodeClasses.truth,
  },

  // Пара 3
  {
    id: "s3",
    data: { label: "👁️ ЗНАК: Послы врага говорят смиренно" },
    position: { x: 560, y: 270 },
    className: nodeClasses.sign,
  },
  {
    id: "t3",
    data: { label: "🔍 СУТЬ: Враг готовится к наступлению" },
    position: { x: 560, y: 340 },
    className: nodeClasses.truth,
  },

  // Пара 4
  {
    id: "s4",
    data: { label: "👁️ ЗНАК: Солдаты опираются на оружия" },
    position: { x: 860, y: 270 },
    className: nodeClasses.sign,
  },
  {
    id: "t4",
    data: { label: "🔍 СУТЬ: Армия противника голодна и изнурена" },
    position: { x: 860, y: 340 },
    className: nodeClasses.truth,
  },

  // Уровень 4: Высший закон интеграции
  {
    id: "final-law",
    data: {
      label:
        "🤝 ЗАКОН ДИСЦИПЛИНЫ\n«Если наказывать солдат до того, как они привязались к тебе, они не будут повиноваться. Объединяй их гуманностью, подчиняй железной дисциплиной»",
    },
    position: { x: 370, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "terr-rule",
    style: { stroke: "#6366f1" },
  },

  // Связи к знакам
  ...["s1", "s2", "s3", "s4"].map((id) => ({
    id: `e-tr-${id}`,
    source: "terr-rule",
    target: id,
    style: { stroke: "#475569", opacity: 0.5 },
  })),

  // Переходы от Знака к Сути (Следствие)
  { id: "e-p1", source: "s1", target: "t1", style: { stroke: "#f59e0b" } },
  { id: "e-p2", source: "s2", target: "t2", style: { stroke: "#f59e0b" } },
  { id: "e-p3", source: "s3", target: "t3", style: { stroke: "#f59e0b" } },
  { id: "e-p4", source: "s4", target: "t4", style: { stroke: "#f59e0b" } },

  // От сути к общему выводу
  ...["t1", "t2", "t3", "t4"].map((id) => ({
    id: `e-f-${id}`,
    source: id,
    target: "final-law",
    style: { stroke: "#10b981", strokeDasharray: "3,3" },
  })),
];

export default function Chapter9() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-emerald-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Правильное размещение на местности сохраняет ресурсы армии. Внимательное
        наблюдение за мелочами позволяет видеть сквозь маскировку обмана врага.
        Но внешняя бдительность бесполезна без внутреннего баланса мягкости и
        строгости при управлении людьми.
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
