import { useEffect, useRef, useState } from "react";
import Chapter1 from "./components/Chapter1";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";
import Chapter4 from "./components/Chapter4";
import Chapter5 from "./components/Chapter5";
import Chapter6 from "./components/Chapter6";
import Chapter7 from "./components/Chapter7";
import Chapter8 from "./components/Chapter8";
import Chapter9 from "./components/Chapter9";
import Chapter10 from "./components/Chapter10";
import Chapter11 from "./components/Chapter11";
import Chapter12 from "./components/Chapter12";
import Chapter13 from "./components/Chapter13";

interface Chapter {
  id: number;
  title: string;
  available: boolean;
}

const chapters: Chapter[] = [
  { id: 1, title: "1. Планирование", available: true },
  { id: 2, title: "2. Ведение войны", available: true },
  { id: 3, title: "3. Стратегическое нападение", available: true },
  { id: 4, title: "4. Развертывание", available: true },
  { id: 5, title: "5. Движущая сила", available: true },
  { id: 6, title: "6. Полнота и пустота", available: true },
  { id: 7, title: "7. Маневрирование", available: true },
  { id: 8, title: "8. Девять переменных", available: true },
  { id: 9, title: "9. Поход", available: true },
  { id: 10, title: "10. Формы местности", available: true },
  { id: 11, title: "11. Девять местностей", available: true },
  { id: 12, title: "12. Огневое нападение", available: true },
  { id: 13, title: "13. Использование шпионов", available: true },
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Создаем рефы для сайдбара и для кнопки меню
  const asideRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Используем MouseEvent, так как слушаем событие "click"
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (!target) return;

      // Проверяем: если клик был ВНЕ сайдбара И ВНЕ кнопки открытия меню — закрываем
      if (
        asideRef.current &&
        !asideRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      // Добавляем слушатель с небольшой задержкой (setTimeout) или используем capture-фазу,
      // но проверка на menuButtonRef — самый надежный и чистый способ.
      document.addEventListener("click", clickHandler);
    }

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex h-screen w-screen bg-[#030712] text-slate-100 overflow-auto font-mono relative">
      {/* КНОПКА МЕНЮ — Добавили ref */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden absolute top-4 right-4 z-50 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 p-1.5 rounded border border-indigo-400/30 text-white font-bold text-xs uppercase tracking-wider transition-all"
      >
        {isMenuOpen ? "✕ Закрыть" : "☰ Меню"}
      </button>

      {/* ЛЕВАЯ ПАНЕЛЬ — Добавили ref */}
      <aside
        ref={asideRef}
        className={`
          fixed md:static inset-y-0 left-0 w-72 bg-[#0b0f19] border-r border-slate-800/80 flex flex-col justify-between p-4 z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* ... (внутренности сайдбара остаются прежними) ... */}
        <div className="scroll-auto h-full overflow-y-auto">
          <div className="mb-6 p-2 border-b border-indigo-500/20">
            <h1 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
              ИСКУССТВО ВОЙНЫ
            </h1>
          </div>
          <nav className="space-y-1">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                disabled={!ch.available}
                onClick={() => {
                  setActiveChapter(ch.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-xs cursor-pointer ${
                  activeChapter === ch.id
                    ? "bg-indigo-950/40 text-indigo-400"
                    : "text-slate-400"
                }`}
              >
                {ch.title}
              </button>
            ))}
          </nav>
        </div>
        <div className="text-[9px] text-slate-600 text-center border-t border-slate-900 pt-4">
          CONSPECTUS V1.0
        </div>
      </aside>

      {/* ПРАВАЯ ЧАСТЬ */}
      <main className="flex-1 h-full bg-[#05070f] relative w-full">
        {activeChapter === 1 && <Chapter1 />}
        {activeChapter === 2 && <Chapter2 />}
        {activeChapter === 3 && <Chapter3 />}
        {activeChapter === 4 && <Chapter4 />}
        {activeChapter === 5 && <Chapter5 />}
        {activeChapter === 6 && <Chapter6 />}
        {activeChapter === 7 && <Chapter7 />}
        {activeChapter === 8 && <Chapter8 />}
        {activeChapter === 9 && <Chapter9 />}
        {activeChapter === 10 && <Chapter10 />}
        {activeChapter === 11 && <Chapter11 />}
        {activeChapter === 12 && <Chapter12 />}
        {activeChapter === 13 && <Chapter13 />}
        {activeChapter > 13 && (
          <div className="flex items-center justify-center h-full text-slate-600 text-xs tracking-widest uppercase">
            Раздел заблокирован. Ожидание разбора главы.
          </div>
        )}
      </main>
    </div>
  );
}
