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

  // 5 объектов поджога
  fireTarget:
    "border-orange-500/50! text-orange-400! bg-[#2c1d05]! text-left! text-[11px]! w-[220px]",

  // Условия и реакция
  reaction:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-left! text-[11px]! w-[240px]",

  // Эмоциональный контроль
  control:
    "border-indigo-500/50! text-indigo-300! bg-[#0b1329]! text-left! text-[11px]! w-[250px]",

  // Финальный закон
  law: "border-2 border-rose-500! text-rose-400! font-bold text-center! bg-rose-950/40! shadow-[0_0_20px_rgba(239,68,68,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🔥 ГЛАВА 12. ОГНЕВОЕ НАПАДЕНИЕ И САМОКОНТРОЛЬ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: 5 вариантов уничтожения инфраструктуры (Левая ветка)
  {
    id: "f1",
    data: { label: "🔥 1. Сжигание людей\n(Живая сила в лагерях)" },
    position: { x: 40, y: 130 },
    className: nodeClasses.fireTarget,
  },
  {
    id: "f2",
    data: { label: "🔥 2. Сжигание запасов\n(Продовольствие и склады)" },
    position: { x: 40, y: 195 },
    className: nodeClasses.fireTarget,
  },
  {
    id: "f3",
    data: { label: "🔥 3. Сжигание обозов\n(Транспорт и снабжение)" },
    position: { x: 40, y: 260 },
    className: nodeClasses.fireTarget,
  },
  {
    id: "f4",
    data: { label: "🔥 4. Сжигание складов\n(Оружие и амуниция)" },
    position: { x: 40, y: 325 },
    className: nodeClasses.fireTarget,
  },
  {
    id: "f5",
    data: { label: "🔥 5. Сжигание отрядов\n(Внесение хаоса в строи)" },
    position: { x: 40, y: 390 },
    className: nodeClasses.fireTarget,
  },

  // Уровень 3: Закон ответа на хаос
  {
    id: "act-fire",
    data: {
      label:
        "⚡️ ПРАВИЛО СИНХРОНИЗАЦИИ\nОгонь вспыхнул внутри ➔ немедленно подкрепляй удар снаружи. Если враг спокоен — жди, не нападай.",
    },
    position: { x: 40, y: 490 },
    className: nodeClasses.reaction,
  },

  // Уровень 2: Хладнокровие лидера (Правая ветка)
  {
    id: "c1",
    data: {
      label:
        "🧠 Гнев не должен рождать войну\nЭмоции правителя изменчивы, а разрушенное государство не вернуть.",
    },
    position: { x: 660, y: 140 },
    className: nodeClasses.control,
  },
  {
    id: "c2",
    data: {
      label:
        "🧠 Обида не должна рождать бой\nПодкомандующие должны действовать из выгоды, а не ради мести.",
    },
    position: { x: 660, y: 230 },
    className: nodeClasses.control,
  },
  {
    id: "c3",
    data: {
      label:
        "🧠 Просветленный лидер бдителен\nОн сдерживает порывы, сохраняя армию в покое, а страну в безопасности.",
    },
    position: { x: 660, y: 320 },
    className: nodeClasses.control,
  },

  // Уровень 4: Абсолютный финал главы
  {
    id: "final-law",
    data: {
      label:
        "⚖️ МАКСИМА ХЛАДНОКРОВИЯ\n«Оружие — это инструмент несчастья. Вступай в бой только тогда, когда нет другого пути»",
    },
    position: { x: 370, y: 580 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки управления
  {
    id: "e-s1",
    source: "start",
    target: "f1",
    style: { stroke: "#f97316", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "c1",
    style: { stroke: "#6366f1", strokeWidth: 1.5 },
  },

  // Цепочка поджогов
  ...["f1", "f2", "f3", "f4"].map((id, index) => ({
    id: `e-f-chain-${index}`,
    source: id,
    target: `f${index + 2}`,
    style: { stroke: "#ea580c", opacity: 0.4 },
  })),
  {
    id: "e-f5-act",
    source: "f5",
    target: "act-fire",
    animated: true,
    style: { stroke: "#f97316" },
  },

  // Цепочка хладнокровия
  {
    id: "e-c1-c2",
    source: "c1",
    target: "c2",
    style: { stroke: "#4f46e5", opacity: 0.5 },
  },
  {
    id: "e-c2-c3",
    source: "c2",
    target: "c3",
    style: { stroke: "#4f46e5", opacity: 0.5 },
  },

  // Сведение к финальной мудрости
  {
    id: "e-fire-final",
    source: "act-fire",
    target: "final-law",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-ctrl-final",
    source: "c3",
    target: "final-law",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
];

export default function Chapter12() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-orange-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Асимметричные удары по базам снабжения и логистике — мощнейший
        инструмент уничтожения. Но внешнее разрушение требует абсолютного
        внутреннего спокойствия. Лидер, действующий на эмоциях гнева или обиды,
        уничтожит собственную систему.
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
