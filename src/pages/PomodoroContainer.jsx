import arrow from './../assets/arrow.svg'
import pc from './../assets/laptop_mac_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import chillIcon from './../assets/relax_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux' // Для будущего начисления XP
import { addXp } from '../store/userSlice' // Твой экшен для опыта

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
    const addMinutes = (m) => setTime(prev => prev + (m * 60));

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-game-bg p-6 gap-6 font-sans text-white">
            
            {/* Левая панель: TASKS (To-Do List) */}
            <div className="flex-1 bg-game-card rounded-2xl border border-white/10 p-6 flex flex-col shadow-neon">
                <h2 className="text-xl font-bold mb-6 tracking-widest uppercase text-game-purple">Quest Log</h2>
                
                <ul className="flex-1 space-y-4 overflow-y-auto mb-6">
                    {['Task 1', 'Task 2', 'Task 3'].map((task, i) => (
                        <li key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-transparent hover-border-game-purple-50 transition-all">
                            <input type="checkbox" className="w-5 h-5 accent-game-purple" />
                            <span>{task}</span>
                        </li>
                    ))}
                </ul>

                <form className="flex gap-2">
                    <input 
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-game-purple" 
                        placeholder="New mission..."
                        type="text" 
                    />
                    <button className="bg-game-purple p-3 rounded-lg hover:scale-105 transition-transform">
                        <img className="w-5" src={arrow} alt="add" />
                    </button>
                </form>
            </div>

            {/* Правая панель: TIMER */}
            <div className="flex-[2] bg-game-card rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center shadow-neon">
                
                {/* Переключатель режимов */}
                <div className="flex bg-white/5 p-1 rounded-xl mb-12 border border-white/10">
                    <button onClick={() => {setChill(0); setTime(1500)}} className={`px-6 py-2 rounded-lg flex gap-2 items-center transition-all ${chill === 0 ? 'bg-game-purple shadow-glow' : 'hover:bg-white/5'}`}>
                        <img src={pc} className="w-5" alt="" /> Work
                    </button>
                    <button onClick={() => {setChill(1); setTime(300)}} className={`px-6 py-2 rounded-lg flex gap-2 items-center transition-all ${chill === 1 ? 'bg-game-pink shadow-glow' : 'hover:bg-white/5'}`}>
                        <img src={chillIcon} className="w-5" alt="" /> Break
                    </button>
                </div>

                {/* Циферблат */}
                <div className="relative flex flex-col items-center">
                    <div className="text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text gradient-text-purple">
                        {formatTime(time)}
                    </div>
                    
                    <button 
                        onClick={startTimer}
                        className={`w-48 py-4 rounded-full font-bold uppercase tracking-widest transition-all ${isRunning ? 'border-2 border-game-pink text-game-pink hover-bg-game-pink-10' : 'bg-game-purple text-white shadow-glow hover:scale-105'}`}
                    >
                        {isRunning ? "Pause" : "Initiate"}
                    </button>
                </div>

                {/* Управление временем */}
                <div className="mt-12 flex gap-4">
                    <button onClick={() => addMinutes(-5)} className="w-12 h-12 rounded-lg border border-white/10 hover:border-game-purple flex items-center justify-center">-5</button>
                    <button onClick={resetTimer} className="w-12 h-12 rounded-lg border border-white/10 hover:border-game-purple flex items-center justify-center">↺</button>
                    <button onClick={() => addMinutes(5)} className="w-12 h-12 rounded-lg border border-white/10 hover:border-game-purple flex items-center justify-center">+5</button>
                </div>
            </div>

        </div>
    )
};