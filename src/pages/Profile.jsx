import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

/**
 * Компонент Profile (Профиль игрока).
 * Отображает прогресс персонажа, его характеристики, достижения и серию дней.
 * Использует данные из Redux-стора и Framer Motion для анимаций.
 */
export default function Profile() {
    // Получение данных пользователя из глобального состояния
    const user = useSelector(state => state.user);
    const { level, xp, requiredXp, stats, energy, streak } = user;

    // Расчет процента заполнения шкалы опыта
    const xpPercentage = (xp / requiredXp) * 100;

    /**
     * Список характеристик для визуализации.
     * Маппит технические ключи из стора на читаемые названия для интерфейса.
     */
    const statList = [
        { name: 'Концентрация', value: stats?.intellect || 10, label: 'Intellect' },
        { name: 'Развитие', value: stats?.creativity || 10, label: 'Creativity' },
        { name: 'Сила', value: stats?.strength || 10, label: 'Strength' },
        { name: 'Дисциплина', value: stats?.stamina || 10, label: 'Stamina' },
        { name: 'Ловкость', value: stats?.agility || 10, label: 'Agility' },
    ];

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 bg-game-bg min-h-screen text-game-text-bright">
            {/* Заголовок страницы */}
            <header className="text-center mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold tracking-widest uppercase gradient-text-purple px-4 py-2 border-2 border-game-purple/30 rounded-lg inline-block shadow-neon"
                >
                    RPG Life Tracker
                </motion.h1>
                <p className="mt-4 text-game-purple tracking-widest uppercase text-sm font-semibold">Мониторинг прогресса</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левая колонка: Навыки и Аватар */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon relative overflow-hidden">
                        {/* Декоративная линия сверху */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-game-purple to-game-pink opacity-50"></div>
                        <h2 className="text-xl font-bold mb-8 uppercase tracking-wider text-game-purple">Характеристики</h2>

                        <div className="flex flex-col md:flex-row items-center justify-around gap-12">
                            {/* Анимированный аватар (заглушка в стиле RPG) */}
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                <div className="absolute inset-0 border-4 border-game-purple/20 rotate-45 rounded-xl"></div>
                                <div className="absolute inset-2 border-2 border-game-purple/40 -rotate-12 rounded-full border-dashed animate-spin-slow"></div>
                                <div className="w-48 h-48 bg-game-violet-dark/50 rounded-full flex items-center justify-center border border-game-purple/50 shadow-glow overflow-hidden">
                                    <svg viewBox="0 0 24 24" className="w-32 h-32 text-game-purple/30 fill-current">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.25.3-2.43.81-3.47L12 17.17l7.19-10.64C19.7 7.57 20 8.75 20 10c0 4.41-3.59 8-8 8zm0-15c-.83 0-1.54.5-1.84 1.22L7.3 11.23C7.11 10.84 7 10.43 7 10c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .43-.11.84-.3 1.23l-2.86-5.01c-.3-.72-1.01-1.22-1.84-1.22z" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-4 bg-game-card border border-game-purple px-6 py-1 rounded-full text-xs font-bold tracking-tighter uppercase whitespace-nowrap">
                                    Темный Мастер
                                </div>
                            </div>

                            {/* Визуализация характеристик (Прогресс-бары навыков) */}
                            <div className="flex-1 w-full max-w-sm">
                                <div className="space-y-4">
                                    {statList.map((stat, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-xs px-1">
                                                <span className="text-game-text-dim uppercase tracking-tighter">{stat.name}</span>
                                                <span className="text-game-purple font-bold">{Math.floor(stat.value)}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, (stat.value / (level * 20)) * 100)}%` }}
                                                    className="h-full bg-game-purple shadow-glow"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Нижние мини-виджеты */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Календарь привычек (визуализация активности) */}
                        <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon">
                            <h2 className="text-lg font-bold mb-6 uppercase tracking-wider text-game-purple">Привычки (Неделя)</h2>
                            <div className="grid grid-cols-6 gap-2 text-[10px] text-game-text-dim mb-4">
                                <div>Дни</div>
                                <div>Пн</div>
                                <div>Вт</div>
                                <div>Ср</div>
                                <div>Чт</div>
                                <div>Пт</div>
                            </div>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map(day => (
                                    <div key={day} className="grid grid-cols-6 gap-2 items-center">
                                        <div className="text-[10px] text-game-text-dim uppercase">День {day}</div>
                                        {[1, 2, 3, 4, 5].map(cell => (
                                            <div key={cell} className={`h-4 rounded-sm border border-white/5 ${Math.random() > 0.6 ? 'bg-game-purple shadow-glow bg-opacity-40' : 'bg-white/5'}`}></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Последние логи опыта */}
                        <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon flex flex-col justify-between">
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-game-purple">Журнал опыта</h2>
                            <div className="space-y-4">
                                {user.history.slice(-3).reverse().map((log, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-game-text-dim">{new Date(log.timestamp).toLocaleDateString()}</span>
                                        <span className="text-game-pink">+{Math.floor(log.amount)} XP</span>
                                        <span className="text-game-purple uppercase">{log.attribute}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Правая колонка: Главные статы и Мини-виджеты */}
                <div className="space-y-8">
                    {/* Уровень и Основной прогресс опыта */}
                    <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon text-center relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-game-purple opacity-10 rounded-full blur-2xl"></div>
                        <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-game-purple">Статистика</h2>
                        <div className="text-xs text-game-text-dim uppercase mb-2">Общий опыт</div>
                        <div className="text-3xl font-black mb-4">
                            {Math.floor(xp)} <span className="text-game-text-dim text-sm">/ {requiredXp}</span>
                        </div>

                        <div className="space-y-2 mb-6 text-left px-4">
                            <div className="text-[10px] text-game-text-dim uppercase">Шкала прогресса</div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpPercentage}%` }}
                                    className="h-full bg-gradient-to-r from-game-purple to-game-pink shadow-glow"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-game-purple px-1">
                                <span>Ур. {level}</span>
                                <span>Ур. {level + 1}</span>
                            </div>
                        </div>
                    </section>

                    {/* Виджет серии дней (Streak) */}
                    <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon flex flex-col items-center justify-center">
                        <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-game-purple">Серия: {streak} дн.</h2>
                        <div className="relative w-40 h-24 overflow-hidden flex items-end justify-center">
                            {/* Полукруглый индикатор (gauge) */}
                            <div className="absolute top-0 w-40 h-40 border-[12px] border-white/5 rounded-full"></div>
                            <motion.div
                                initial={{ rotate: -90 }}
                                animate={{ rotate: -90 + (Math.min(100, (streak / 30) * 100) * 1.8) }}
                                style={{ transformOrigin: 'bottom center' }}
                                className="absolute top-0 w-40 h-40 border-[12px] border-game-purple border-b-transparent border-l-transparent border-r-transparent rounded-full shadow-glow"
                            ></motion.div>
                            <div className="z-10 text-center pb-2">
                                <div className="text-2xl font-black">{streak}</div>
                                <div className="text-[10px] text-game-text-dim uppercase">Текущий фокус</div>
                            </div>
                        </div>
                    </section>

                    {/* Энергия персонажа */}
                    <section className="bg-game-card rounded-2xl border border-game-border p-6 shadow-neon">
                        <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-game-purple">Энергия</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(energy / 10) * 100}%` }}
                                    className="h-full bg-game-pink shadow-pink-glow"
                                />
                            </div>
                            <span className="text-sm font-bold text-game-pink">{energy}/10</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
