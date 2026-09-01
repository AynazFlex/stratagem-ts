import { ReactFlow, Background, Controls, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Дизайн-система: Промышленно-ресурсный дашборд
const nodeClasses = {
  header: "bg-slate-900 border-2 border-slate-600 text-slate-100 p-3 rounded font-bold uppercase tracking-wider text-center shadow-[0_0_15px_rgba(148,163,184,0.15)]",
  danger: "bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs p-2.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.1)] w-[260px] text-left",
  consequence: "bg-slate-950 border border-rose-700/60 text-rose-400/90 text-[11px] p-2 rounded w-[240px] text-left",
  law: "bg-amber-950/30 border-2 border-amber-500/70 text-amber-400 font-bold p-3 rounded text-center shadow-[0_0_20px_rgba(245,158,11,0.15)] w-[300px]",
  solution: "bg-[#051c14] border border-emerald-500/50 text-emerald-300 text-xs p-2.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.1)] w-[280px] text-left",
  reward: "bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs p-2 rounded text-center w-[240px]",
  result: "bg-indigo-950/80 border-2 border-indigo-500 text-indigo-300 font-bold p-2.5 rounded tracking-widest text-center shadow-[0_0_15px_rgba(99,102,241,0.2)]"
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  { id: 'start', data: { label: '💰 ЭКОНОМИКА И ВЕДЕНИЕ ВОЙНЫ' }, position: { x: 450, y: 20 }, className: nodeClasses.header },

  // Уровень 2: Главный риск (сдвинут ниже и левее)
  { id: 'risk-long', data: { label: '⏳ ЗАТЯЖНАЯ ВОЙНА\n(Главный враг государства)' }, position: { x: 100, y: 140 }, className: nodeClasses.danger },

  // Уровень 3: Последствия затяжной войны (Красная ветка — увеличен шаг по Y)
  { id: 'c1', data: { label: '📉 Оружие притупляется, дух падает' }, position: { x: 60, y: 260 }, className: nodeClasses.consequence },
  { id: 'c2', data: { label: '💸 Силы истощаются, казна пустеет' }, position: { x: 60, y: 330 }, className: nodeClasses.consequence },
  { id: 'c3', data: { label: '🌋 Кризис дома ➔ восстание соседей' }, position: { x: 60, y: 400 }, className: nodeClasses.consequence },

  // Уровень 4: Аксиома (Центр — опущена ниже, чтобы не пересекаться с боковыми ветками)
  { id: 'axiom', data: { label: '⚡️ СТРАТЕГИЧЕСКАЯ АКСИОМА\n«Не бывало, чтобы долгая война принесла выгоду государству»' }, position: { x: 340, y: 620 }, className: nodeClasses.law },

  // Уровень 5: Мудрые решения (Правая ветка — раздвинута по оси X до 780 и увеличен шаг по Y)
  { id: 's1', data: { label: '🌾 Снабжение за счет врага\n(1 воз врага = 20 возам своего)' }, position: { x: 740, y: 220 }, className: nodeClasses.solution },
  { id: 's2', data: { label: '🔥 Быстрота действий\n(Умный берет быстротой, а не упорством)' }, position: { x: 740, y: 300 }, className: nodeClasses.solution },
  { id: 's3', data: { label: '🏆 Награда за трофеи\n(Стимулируй воинов забирать ресурсы)' }, position: { x: 740, y: 380 }, className: nodeClasses.solution },

  // Уровень 6: Работа с пленными
  { id: 'reward-rule', data: { label: '🤝 Интеграция пленных:\n«Используй врага для усиления себя»' }, position: { x: 740, y: 490 }, className: nodeClasses.reward },

  // Уровень 7: Итог главы
  { id: 'final-result', data: { label: '👑 УСПЕХ = УМЕЛОЕ УПРАВЛЕНИЕ РЕСУРСАМИ' }, position: { x: 340, y: 720 }, className: nodeClasses.result }
];

const initialEdges: Edge[] = [
  // От старта к рискам и решениям
  { id: 'e-s1', source: 'start', target: 'risk-long', style: { stroke: '#ef4444', strokeWidth: 1.5 } },
  { id: 'e-s2', source: 'start', target: 's1', style: { stroke: '#10b981', strokeWidth: 1.5 } },

  // Связи последствий
  ...['c1', 'c2', 'c3'].map(id => ({ id: `e-risk-${id}`, source: 'risk-long', target: id, style: { stroke: '#f43f5e', opacity: 0.6 } })),

  // Связи решений
  { id: 'e-s-s2', source: 's1', target: 's2', style: { stroke: '#10b981', opacity: 0.6 } },
  { id: 'e-s-s3', source: 's1', target: 's3', style: { stroke: '#10b981', opacity: 0.6 } },
  { id: 'e-s3-reward', source: 's3', target: 'reward-rule', style: { stroke: '#34d399' } },

  // Сведение к аксиоме и финалу
  { id: 'e-c-axiom', source: 'c3', target: 'axiom', style: { stroke: '#ef4444', strokeDasharray: '4,4' } },
  { id: 'e-r-axiom', source: 'reward-rule', target: 'axiom', style: { stroke: '#10b981', strokeDasharray: '4,4' } },
  
  { id: 'e-axiom-final', source: 'axiom', target: 'final-result', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }
];

export default function Chapter2() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur border border-slate-800 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-400 shadow-2xl">
        <span className="text-rose-400 font-bold block mb-1">⚡️ СУТЬ ГЛАВЫ:</span>
        Война истощает. Любая затяжная кампания обречена на провал из-за нехватки ресурсов. Умный лидер побеждает максимально быстро и гасит свои затраты за счет ресурсов противника.
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
