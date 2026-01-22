import arrow from './../assets/arrow.svg'
import pc from './../assets/laptop_mac_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import chillIcon from './../assets/relax_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' // Для будущего начисления XP
import { addXp } from '../store/userSlice' // Твой экшен для опыта
import PomodoroTimer from './PomodoroTimer'

const stages = [
    { chill: 1, time: 300 },   
    { chill: 2, time: 1500 },  
    { chill: 3, time: 300 },   
    { chill: 4, time: 1500 },  
    { chill: 5, time: 300 },   
    { chill: 6, time: 1500 },  
    { chill: 0, time: 900 },   
];

export default function PomodoroContainer() {
    const dispatch = useDispatch();

    // Получаем данные игрока из Redux
    const { level, xp, requiredXp } = useSelector((state) => state.user);
    
    // Вычисляем процент заполнения шкалы
    const xpPercentage = Math.min(100, Math.floor((xp / requiredXp) * 100));
    
    // Состояния (оставляем твою логику с localStorage)
    const [chill, setChill] = useState(() => {
        const saved = localStorage.getItem("pomodoroState");
        return saved ? JSON.parse(saved).chill : 0;
    });
    const [time, setTime] = useState(() => {
        const saved = localStorage.getItem("pomodoroState");
        return saved ? JSON.parse(saved).time : 1500;
    });
    const [isRunning, setIsRunning] = useState(() => {
        const saved = localStorage.getItem("pomodoroState");
        return saved ? JSON.parse(saved).isRunning : false;
    });

    // ... твоя useEffect логика сохраняется без изменений ...
    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        if (time === 0 && isRunning) {
            // ПРИМЕР: Начисляем 25 XP за завершение сессии
            dispatch(addXp(25)); 
            
            const currentIndex = stages.findIndex(s => s.chill === chill);
            const nextIndex = (currentIndex + 1) % stages.length;
            setChill(stages[nextIndex].chill);
            setTime(stages[nextIndex].time);
            setIsRunning(false);
        }
    }, [time, isRunning, chill, dispatch]);

    // Сохранение состояния в localStorage
    useEffect(() => {
        localStorage.setItem("pomodoroState", JSON.stringify({ chill, time, isRunning }));
    }, [chill, time, isRunning]);

    // Функции форматирования и управления (оставляем твои)
    const startTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => { setTime(1500); setIsRunning(false); };
    const addMinutes = (m) => {
        setTime(prev => {
            const newTime = prev + (m * 60);
            // Предотвращаем отрицательное время
            return Math.max(0, newTime);
        });
    };

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-game-bg p-6 gap-6 font-sans text-white">

<div className="flex-1 flex flex-col gap-6">
                
                {/* --- НОВЫЙ БЛОК: PROFILE HEADER --- */}
                <div className="bg-game-card rounded-2xl border border-white/10 p-5 shadow-neon">
                    <div className="flex items-center gap-4 mb-4">
                        {/* Аватар с неоновым ободком */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-2 border-game-purple overflow-hidden shadow-glow">
                                <img 
                                    src="https://i.pinimg.com/736x/76/a9/3c/76a93c9d08de3e469e512883ae252e83.jpg" 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-game-purple text-[10px] font-bold px-2 py-0.5 rounded-full border border-game-bg">
                                LVL {level}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold tracking-tight">Shadow Monarch</h3>
                            <p className="text-xs text-game-purple font-mono uppercase tracking-widest">Player Class: Programmer</p>
                        </div>
                    </div>

                    {/* Шкала опыта */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] uppercase tracking-tighter font-bold">
                            <span className="text-game-purple">Experience</span>
                            <span>{xp} / {requiredXp} XP</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                                className="h-full bg-gradient-to-r from-game-purple to-game-pink transition-all duration-500 ease-out progress-glow"
                                style={{ width: `${xpPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                {/* --- КОНЕЦ БЛОКА PROFILE --- */}

                {/* TASKS (To-Do List) */}
                <div className="flex-1 bg-game-card rounded-2xl border border-white/10 p-6 flex flex-col shadow-neon">
                    <h2 className="text-xl font-bold mb-6 tracking-widest uppercase text-game-purple">Quest Log</h2>
                    {/* ... твой текущий список задач и форма ... */}
                    <ul className="flex-1 space-y-4 overflow-y-auto mb-6">
                        {['Code Review', 'Learn Redux', 'Workout'].map((task, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-transparent hover:border-game-purple/30 transition-all group">
                                <input type="checkbox" className="w-5 h-5 accent-game-purple cursor-pointer" />
                                <span className="group-hover:text-game-purple transition-colors">{task}</span>
                            </li>
                        ))}
                    </ul>
                    <form className="flex gap-2">
                        <input 
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-game-purple transition-colors" 
                            placeholder="New mission..."
                            type="text" 
                        />
                        <button className="bg-game-purple p-3 rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-glow">
                            <img className="w-5" src={arrow} alt="add" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Правая панель: TIMER */}
            <PomodoroTimer />

        </div>
    )
};