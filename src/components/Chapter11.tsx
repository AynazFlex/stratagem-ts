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
  light:
    "border-slate-700! text-slate-400! bg-slate-950/50! text-left! text-[11px]! w-[220px]",
  medium:
    "border-indigo-500/40! text-indigo-300! bg-[#0b1329]! text-left! text-[11px]! w-[220px]",
  heavy:
    "border-amber-500/40! text-amber-300! bg-[#2c1d05]! text-left! text-[11px]! w-[220px]",
  death:
    "border-2 border-rose-500! text-rose-400! font-bold bg-rose-950/30! shadow-[0_0_20px_rgba(239,68,68,0.2)]! text-left! text-[11px]! w-[240px]",
  law: "border-2 border-purple-500! text-purple-300! font-bold text-center! bg-[#1a0f2e]! shadow-[0_0_20px_rgba(168,85,247,0.25)]! w-[335px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🗺️ ГЛАВА 11. ДЕВЯТЬ МЕСТНОСТЕЙ И ПСИХОЛОГИЯ ТОЛПЫ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: 9 Местностей (Полная матрица 3х3 для красивой структуры)
  {
    id: "m1",
    data: {
      label:
        "🏠 1. Рассеивающая\nСвоя земля. Солдаты близко к дому, склонны бежать. Не сражайся здесь.",
    },
    position: { x: 10, y: 130 },
    className: nodeClasses.light,
  },
  {
    id: "m2",
    data: {
      label:
        "🪵 2. Неглубокая\nЧужая земля, но близко к границе. Легко отступить. Не останавливайся.",
    },
    position: { x: 10, y: 220 },
    className: nodeClasses.light,
  },
  {
    id: "m3",
    data: {
      label:
        "🔑 3. Оспариваемая\nВыгода обоим. Кто занял — тот ведет. Не нападай в лоб.",
    },
    position: { x: 10, y: 310 },
    className: nodeClasses.light,
  },

  {
    id: "m4",
    data: {
      label:
        "🛣️ 4. Смешанная (Узел)\nПерекресток дорог. Управляй горизонтальными связями.",
    },
    position: { x: 360, y: 130 },
    className: nodeClasses.medium,
  },
  {
    id: "m5",
    data: {
      label:
        "🌐 5. Путей-сообщений\nСрединная земля. Граничит со многими. Заключай союзы.",
    },
    position: { x: 360, y: 220 },
    className: nodeClasses.medium,
  }, // <-- ВОТ ОНА, ДЕВА ТАЯ!
  {
    id: "m6",
    data: {
      label:
        "🌾 6. Тяжелая (Глубокая)\nТы глубоко в тылу врага. Логистика отрезана. Занимайся фуражированием.",
    },
    position: { x: 360, y: 310 },
    className: nodeClasses.medium,
  },

  {
    id: "m7",
    data: {
      label:
        "🪤 7. Трудная (Плохая)\nБолота, леса, ущелья. Двигайся без остановок, уходи отсюда.",
    },
    position: { x: 710, y: 130 },
    className: nodeClasses.heavy,
  },
  {
    id: "m8",
    data: {
      label:
        "🏹 8. Окруженная\nВход узкий, выход трудный. Применяй скрытые стратагемы.",
    },
    position: { x: 710, y: 220 },
    className: nodeClasses.heavy,
  },
  {
    id: "m9",
    data: {
      label:
        "🩸 9. Местность Смерти\nВыхода нет. Выживание только через яростный бой. Бросай людей сюда.",
    },
    position: { x: 710, y: 310 },
    className: nodeClasses.death,
  },

  // Уровень 3: Закон змеи
  {
    id: "snake-law",
    data: {
      label:
        "🐍 ЗАКОН ВЗАИМОДЕЙСТВИЯ (ШУАЙЖАНЬ)\n«Будь подобен горецкой змее: ударишь по голове — ударит хвост; ударишь по хвосту — ударит голова; ударишь по середине — ударят оба вместе»",
    },
    position: { x: 360, y: 430 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки захода
  { id: "e-s1", source: "start", target: "m1", style: { stroke: "#475569" } },
  { id: "e-s2", source: "start", target: "m4", style: { stroke: "#6366f1" } },
  { id: "e-s3", source: "start", target: "m7", style: { stroke: "#f43f5e" } },

  // Внутренние связи матрицы
  {
    id: "e-m1-m2",
    source: "m1",
    target: "m2",
    style: { stroke: "#475569", opacity: 0.4 },
  },
  {
    id: "e-m2-m3",
    source: "m2",
    target: "m3",
    style: { stroke: "#475569", opacity: 0.4 },
  },
  {
    id: "e-m4-m5",
    source: "m4",
    target: "m5",
    style: { stroke: "#6366f1", opacity: 0.4 },
  },
  {
    id: "e-m5-m6",
    source: "m5",
    target: "m6",
    style: { stroke: "#6366f1", opacity: 0.4 },
  },
  {
    id: "e-m7-m8",
    source: "m7",
    target: "m8",
    style: { stroke: "#ef4444", opacity: 0.4 },
  },
  {
    id: "e-m8-m9",
    source: "m8",
    target: "m9",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Пунктир к центральному закону связей
  {
    id: "e-m3-law",
    source: "m3",
    target: "snake-law",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-m6-law",
    source: "m6",
    target: "snake-law",
    style: { stroke: "#6366f1", strokeDasharray: "4,4" },
  },
  {
    id: "e-m9-law",
    source: "m9",
    target: "snake-law",
    animated: true,
    style: { stroke: "#a855f7", strokeWidth: 2 },
  },
];

export default function Chapter11() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-purple-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        География определяет психологию масс. Полная матрица из девяти типов
        ситуаций требует гибких решений: от союзов на срединных землях до
        отчаянного боя на местности смерти. Органы управления должны быть
        связаны как тело змеи Шуайжань — мгновенно передавая импульсы от головы
        к хвосту.
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
