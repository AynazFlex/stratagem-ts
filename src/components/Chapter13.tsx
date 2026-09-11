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

  // 5 типов шпионов
  spy: "border-emerald-500/50! text-emerald-300! bg-[#051c14]! text-left! text-[11px]! w-[230px]",

  // Главное условие работы сети
  condition:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-left! text-[11px]! w-[250px]",

  // Финал всей книги
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_25px_rgba(99,102,241,0.35)]! w-[340px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт (Слева вверху)
  {
    id: "start",
    data: { label: "👁️ ГЛАВА 13. ИСПОЛЬЗОВАНИЕ ШПИОНОВ" },
    position: { x: 40, y: 20 },
    className: nodeClasses.header,
  },

  // Ступенчатая лестница из 5 типов шпионов (Каждый шаг: +80px по X, +75px по Y)
  {
    id: "s1",
    data: {
      label:
        "👥 1. Местные шпионы\nЖители деревень противника. Источник базовых слухов.",
    },
    position: { x: 40, y: 130 },
    className: nodeClasses.spy,
  },
  {
    id: "s2",
    data: {
      label:
        "👔 2. Внутренние шпионы\nЧиновники врага. Взлом структуры изнутри.",
    },
    position: { x: 120, y: 205 },
    className: nodeClasses.spy,
  },
  {
    id: "s3",
    data: {
      label:
        "🔄 3. Перевербованные\nДвойные агенты врага. Самый ценный ресурс.",
    },
    position: { x: 200, y: 280 },
    className: nodeClasses.spy,
  },
  {
    id: "s4",
    data: {
      label:
        "💀 4. Смертники\nСкормят врагу дезу. Будут казнены при раскрытии.",
    },
    position: { x: 280, y: 355 },
    className: nodeClasses.spy,
  },
  {
    id: "s5",
    data: {
      label:
        "🕊️ 5. Живые шпионы\nВозвращаются из стана врага с точными картами.",
    },
    position: { x: 360, y: 430 },
    className: nodeClasses.spy,
  },

  // Уровень 3: Менеджмент сети (Сдвинут вправо, по центру высоты лестницы)
  {
    id: "spy-management",
    data: {
      label:
        "🔑 ИСКУССТВО ИНТЕГРАЦИИ\n«Нельзя использовать шпионов, не обладая высшей мудростью. Нельзя получить от них правду, не будучи тонким»",
    },
    position: { x: 670, y: 220 },
    className: nodeClasses.condition,
  },

  // Уровень 4: Высший итог всей книги (В самом низу, по центру)
  {
    id: "absolute-final",
    data: {
      label:
        "🧠 ВЫСШИЙ ИТОГ СТРАТЕГИИ\n«Шпионы — это то, на что опирается армия при каждом движении. Знание рождает непобедимость»",
    },
    position: { x: 550, y: 560 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Раздача от старта к сети шпионов
  ...["s1", "s2", "s3", "s4", "s5"].map((id) => ({
    id: `e-start-${id}`,
    source: "start",
    target: id,
    animated: true,
    style: { stroke: "#10b981", opacity: 0.7 },
  })),

  // Сведение от шпионов к менеджменту
  ...["s1", "s2", "s3", "s4", "s5"].map((id) => ({
    id: `e-manage-${id}`,
    source: id,
    target: "spy-management",
    style: { stroke: "#475569", strokeDasharray: "3,3" },
  })),

  // Финальный шаг к мудрости книги
  {
    id: "e-final-step",
    source: "spy-management",
    target: "absolute-final",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2.5 },
  },
];

export default function Chapter13() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-emerald-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Просветленные правители побеждают там, где другие терпят крах, потому
        что они знают ситуацию заранее. Это знание нельзя получить от духов или
        богов, его приносят только люди — 5 типов шпионов. Информация — это
        фундамент, на котором стоит вся архитектура «Искусства войны».
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
