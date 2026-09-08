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

  // 6 местностей
  terrain:
    "border-cyan-500/40! text-cyan-300! bg-[#062430]! text-left! text-[11px]! w-[220px]",

  // 6 причин краха
  fail: "border-rose-500/40! text-rose-300! bg-[#240c12]! text-left! text-[11px]! w-[240px]",

  // Главная доктрина
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.25)]! w-[325px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🗺️ ГЛАВА 10. ФОРМЫ МЕСТНОСТИ / ТОПОГРАФИЯ И КРАХ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: 6 типов местности (Левый блок)
  {
    id: "m1",
    data: {
      label:
        "🛣️ Открытая (Пересекающаяся)\nКто первый займет высоты и наладит логистику — победит.",
    },
    position: { x: 40, y: 130 },
    className: nodeClasses.terrain,
  },
  {
    id: "m2",
    data: {
      label:
        "🪤 Втягивающая (Увязающая)\nВыйти легко, вернуться трудно. Если враг готов — не суйся.",
    },
    position: { x: 40, y: 195 },
    className: nodeClasses.terrain,
  },
  {
    id: "m3",
    data: {
      label:
        "🛡️ Нейтральная (Блокирующая)\nВыгода никому. Выманивай врага ложным отступлением.",
    },
    position: { x: 40, y: 260 },
    className: nodeClasses.terrain,
  },
  {
    id: "m4",
    data: {
      label:
        "⛰️ Узкая (Ущелья)\nЗайми её первым и заблокируй проход. Если враг успел — не штурмуй.",
    },
    position: { x: 40, y: 325 },
    className: nodeClasses.terrain,
  },
  {
    id: "m5",
    data: {
      label:
        "🏰 Крутизны (Преграды)\nЗанимай солнечные вершины. Если враг там — уходи.",
    },
    position: { x: 40, y: 390 },
    className: nodeClasses.terrain,
  },
  {
    id: "m6",
    data: {
      label:
        "🌌 Далекая (Удаленная)\nСилы равны ➔ вызывать на бой невыгодно, марш изнурит армию.",
    },
    position: { x: 40, y: 455 },
    className: nodeClasses.terrain,
  },

  // Уровень 2: 6 причин краха из-за вины лидера (Правый блок)
  {
    id: "f1",
    data: {
      label:
        "💥 1. Бегство (Бросок на врага)\n➔ Нападение 1 на 10 без расчета сил.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.fail,
  },
  {
    id: "f2",
    data: {
      label:
        "📉 2. Неподчинение (Слабость)\n➔ Солдаты сильны, а командиры слабы.",
    },
    position: { x: 660, y: 195 },
    className: nodeClasses.fail,
  },
  {
    id: "f3",
    data: {
      label: "🌪️ 3. Крах (Развал)\n➔ Командиры сильны, а солдаты слабы.",
    },
    position: { x: 660, y: 260 },
    className: nodeClasses.fail,
  },
  {
    id: "f4",
    data: {
      label: "🔥 4. Возмущение (Гнев)\n➔ Командиры бунтуют из-за личных обид.",
    },
    position: { x: 660, y: 325 },
    className: nodeClasses.fail,
  },
  {
    id: "f5",
    data: {
      label: "🪵 5. Беспорядок (Хаос)\n➔ Полководец дрябл, приказы нечеткие.",
    },
    position: { x: 660, y: 390 },
    className: nodeClasses.fail,
  },
  {
    id: "f6",
    data: {
      label:
        "💀 6. Поражение (Разгром)\n➔ Полководец кидает в бой необученных.",
    },
    position: { x: 660, y: 455 },
    className: nodeClasses.fail,
  },

  // Уровень 3: Великое заключение о лидерстве
  {
    id: "final-conclusion",
    data: {
      label:
        "👑 ВЫСШИЙ ЗАКОН ЧЕСТИ\n«Идти вперед без мысли о славе, отступать без страха наказания, думать только о спасении народа — это сокровище государства»",
    },
    position: { x: 370, y: 550 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к блокам
  {
    id: "e-s1",
    source: "start",
    target: "m1",
    style: { stroke: "#06b6d4", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "f1",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Цепочки зависимостей рельефа
  ...["m1", "m2", "m3", "m4", "m5"].map((id, index) => ({
    id: `e-m-chain-${index}`,
    source: id,
    target: `m${index + 2}`,
    style: { stroke: "#0891b2", opacity: 0.4 },
  })),

  // Цепочки зависимостей ошибок
  ...["f1", "f2", "f3", "f4", "f5"].map((id, index) => ({
    id: `e-f-chain-${index}`,
    source: id,
    target: `f${index + 2}`,
    style: { stroke: "#b91c1c", opacity: 0.4 },
  })),

  // Сведение к финальной доктрине чести
  {
    id: "e-m-final",
    source: "m6",
    target: "final-conclusion",
    style: { stroke: "#6366f1", strokeDasharray: "4,4" },
  },
  {
    id: "e-f-final",
    source: "f6",
    target: "final-conclusion",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
];

export default function Chapter10() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-cyan-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Рельеф местности — лучший помощник армии, но правильное его
        использование зависит от ума лидера. Поражения редко случаются из-за
        погоды или судьбы, в 90% случаев это следствие 6 ошибок полководца,
        потерявшего контроль над своей структурой.
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
