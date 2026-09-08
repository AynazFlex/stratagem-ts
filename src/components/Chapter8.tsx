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

  // Принцип дуализма и гибкости
  flexibility:
    "border-amber-500/50! text-amber-300! bg-amber-950/25! text-left!",

  // 5 Пороков (Ловушки)
  trap: "border-rose-500/40! text-rose-300! bg-[#240c12]! text-left! w-[250px] text-[11px]!",

  // Тактические запреты
  variation:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-left! text-[11px]! w-[220px]",

  // Высший закон
  law: "border-2 border-indigo-500! text-indigo-300! font-bold text-center! bg-indigo-950/40! shadow-[0_0_20px_rgba(99,102,241,0.25)]! w-[320px]",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🧩 ГЛАВА 8. ДЕВЯТЬ ПЕРЕМЕННЫХ / ТАКТИЧЕСКИЕ ВАРИАЦИИ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главный закон мышления
  {
    id: "core-law",
    data: {
      label:
        "⚖️ БАЛАНС ВЫГОДЫ И ВРЕДА\n«Умный человек обязательно смешивает свои расчеты: в выгоде он видит вред (риски), во вреде он видит выгоду (возможности)»",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.flexibility,
  },

  // Уровень 3: Пять тактических исключений (Левая ветка)
  {
    id: "v1",
    data: { label: "🛣️ Есть дороги, по которым не ходят" },
    position: { x: 60, y: 250 },
    className: nodeClasses.variation,
  },
  {
    id: "v2",
    data: { label: "⚔️ Есть армии, на которые не нападают" },
    position: { x: 60, y: 305 },
    className: nodeClasses.variation,
  },
  {
    id: "v3",
    data: { label: "🏰 Есть крепости, которые не штурмуют" },
    position: { x: 60, y: 360 },
    className: nodeClasses.variation,
  },
  {
    id: "v4",
    data: { label: "🗺️ Есть земли, из-за которых не борются" },
    position: { x: 60, y: 415 },
    className: nodeClasses.variation,
  },
  {
    id: "v5",
    data: { label: "👑 Есть приказы государя, коим не подчиняются" },
    position: { x: 60, y: 470 },
    className: nodeClasses.variation,
  },

  // Уровень 3: Пять смертельных пороков полководца (Правая ветка)
  {
    id: "t1",
    data: {
      label: "💥 1. Стремление умереть\n➔ ведет к гибели и убийству лидера",
    },
    position: { x: 660, y: 240 },
    className: nodeClasses.trap,
  },
  {
    id: "t2",
    data: { label: "🛡️ 2. Стремление жить\n➔ ведет к трусости и пленению" },
    position: { x: 660, y: 295 },
    className: nodeClasses.trap,
  },
  {
    id: "t3",
    data: { label: "🔥 3. Вспыльчивость\n➔ ведет к глупости из-за провокаций" },
    position: { x: 660, y: 350 },
    className: nodeClasses.trap,
  },
  {
    id: "t4",
    data: {
      label: "💎 4. Излишняя щепетильность\n➔ ведет к позору от оскорблений",
    },
    position: { x: 660, y: 405 },
    className: nodeClasses.trap,
  },
  {
    id: "t5",
    data: {
      label: "🫂 5. Чрезмерная любовь к людям\n➔ ведет к слабости из-за заботы",
    },
    position: { x: 660, y: 460 },
    className: nodeClasses.trap,
  },

  // Уровень 4: Финальный вывод главы
  {
    id: "final-conclusion",
    data: {
      label:
        "🧠 ИТОГ ГЛАВЫ\n«Полководец, который понимает пользу девяти изменений, знает, как вести войну. Кто не понимает — не сможет извлечь выгоду»",
    },
    position: { x: 370, y: 560 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "core-law",
    style: { stroke: "#f59e0b", strokeWidth: 1.5 },
  },

  // К вариациям
  ...["v1", "v2", "v3", "v4", "v5"].map((id) => ({
    id: `e-v-${id}`,
    source: "core-law",
    target: id,
    style: { stroke: "#d97706", opacity: 0.5 },
  })),

  // К порокам/ловушкам
  ...["t1", "t2", "t3", "t4", "t5"].map((id) => ({
    id: `e-t-${id}`,
    source: "core-law",
    target: id,
    style: { stroke: "#f43f5e", strokeWidth: 1.2 },
  })),

  // Сведение к финалу (Анимированные импульсы от пороков к краху, и обычные от вариаций)
  {
    id: "e-fv",
    source: "v5",
    target: "final-conclusion",
    style: { stroke: "#6366f1", strokeDasharray: "4,4" },
  },
  {
    id: "e-ft",
    source: "t5",
    target: "final-conclusion",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
];

export default function Chapter8() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-amber-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Слепое следование шаблонам — путь к катастрофе. Любое преимущество
        содержит скрытую угрозу, а любая неудача — зерно победы. Полководец
        обязан подстраиваться под местность и ломать догмы, избегая пяти ловушек
        собственного эго и эмоций.
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
