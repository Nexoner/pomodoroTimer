import { useState } from 'react';
import { useSelector } from 'react-redux';
import PomodoroTimer from './PomodoroTimer';
import ToDoList from './To-do';
import Profile from './Profile';

/**
 * Основной контейнер приложения (PomodoroContainer).
 * Управляет навигацией между главным экраном (Dashboard) и страницей персонажа (Profile).
 * Обеспечивает общую структуру макета и отображает мини-профиль игрока.
 */
export default function PomodoroContainer() {
    // Состояние активной вкладки: 'dashboard' (панель управления) или 'character' (профиль)
    const [activeTab, setActiveTab] = useState('dashboard');

    // Получение данных уровня и опыта из Redux для мини-заголовка
    const { level, xp, requiredXp } = useSelector((state) => state.user);

    // Расчет процента опыта для шкалы прогресса в мини-профиле
    const xpPercentage = requiredXp > 0
        ? Math.min(100, Math.max(0, (xp / requiredXp) * 100))
        : 0;

    return (
        <div className="flex flex-col min-h-screen bg-game-bg font-sans text-white overflow-x-hidden">

            {/* Верхняя навигационная панель (Tabs) */}
            <nav className="flex justify-center gap-8 p-4 bg-game-card border-b border-white/10 shadow-neon z-20 sticky top-0">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-6 py-2 rounded-lg font-bold uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-game-purple shadow-glow text-white' : 'text-game-text-dim hover:text-white'}`}
                >
                    Панель
                </button>
                <button
                    onClick={() => setActiveTab('character')}
                    className={`px-6 py-2 rounded-lg font-bold uppercase tracking-widest transition-all ${activeTab === 'character' ? 'bg-game-purple shadow-glow text-white' : 'text-game-text-dim hover:text-white'}`}
                >
                    Персонаж
                </button>
            </nav>

            {/* Основной контент */}
            <main className="flex-1 p-6">
                {activeTab === 'dashboard' ? (
                    // Экран Dashboard: Таймер + Список дел + Мини-профиль
                    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
                        <div className="flex-1 flex flex-col gap-6">

                            {/* Мини-панель профиля (Сводка уровня и опыта) */}
                            <div className="bg-game-card rounded-2xl border border-white/10 p-5 shadow-neon">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full border-2 border-game-purple overflow-hidden shadow-glow">
                                            <img
                                                src="https://i.pinimg.com/736x/76/a9/3c/76a93c9d08de3e469e512883ae252e83.jpg"
                                                alt="Аватар"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-game-purple text-[10px] font-bold px-2 py-0.5 rounded-full border border-game-bg">
                                            Ур. {level}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight text-white">Теневой Лорд</h3>
                                        <p className="text-xs text-game-purple font-mono uppercase tracking-widest">Класс: Программист</p>
                                    </div>
                                </div>

                                {/* Шкала опыта в мини-профиле */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] uppercase tracking-tighter font-bold">
                                        <span className="text-game-purple">Опыт</span>
                                        <span>{Math.floor(xp)} / {requiredXp} XP</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full xp-progress-bar transition-all duration-1000 ease-out"
                                            style={{ width: `${xpPercentage}%`, minWidth: xpPercentage > 0 ? '2px' : '0' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Список дел (Квесты) */}
                            <ToDoList />
                        </div>

                        {/* Секция таймера */}
                        <div className="flex-[2] flex">
                            <PomodoroTimer />
                        </div>
                    </div>
                ) : (
                    // Экран Профиля (Подробная статистика персонажа)
                    <div className="max-w-7xl mx-auto">
                        <Profile />
                    </div>
                )}
            </main>
        </div>
    );
}
