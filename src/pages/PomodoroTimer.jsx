import { useEffect, useState } from 'react'
import pc from './../assets/laptop_mac_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import chillIcon from './../assets/relax_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import { useDispatch } from 'react-redux'
import { addExperience } from '../store/userSlice'

/**
 * Этапы таймера Помидора.
 * chill: четные - работа, нечетные - короткий перерыв, 0 - длинный перерыв.
 * time: время в секундах.
 */
const stages = [
    { chill: 1, time: 300 },
    { chill: 2, time: 1500 },
    { chill: 3, time: 300 },
    { chill: 4, time: 1500 },
    { chill: 5, time: 300 },
    { chill: 6, time: 1500 },
    { chill: 0, time: 900 },
];

/**
 * Компонент PomodoroTimer (Таймер Помодоро).
 * Управляет циклами фокусировки и отдыха, начисляет опыт за завершенные сессии.
 */
export default function PomodoroTimer() {
    const dispatch = useDispatch();

    // Состояния таймера, инициализируемые из localStorage
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

    /**
     * Эффект обратного отсчета.
     * Запускает интервал раз в секунду, если таймер активен.
     */
    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    /**
     * Логика завершения сессии.
     * Когда время достигает 0 при активном таймере:
     * 1. Начисляется 100 XP (влияет на характеристику 'stamina').
     * 2. Таймер переключается на следующий этап (работа/отдых).
     */
    useEffect(() => {
        if (time === 0 && isRunning) {
            // Начисляем 100 XP за завершение сессии, фокусируясь на выносливости (stamina)
            dispatch(addExperience({ amount: 100, attribute: 'stamina', difficulty: 'medium' }));

            const currentIndex = stages.findIndex(s => s.chill === chill);
            const nextIndex = (currentIndex + 1) % stages.length;
            setChill(stages[nextIndex].chill);
            setTime(stages[nextIndex].time);
            setIsRunning(false);
        }
    }, [time, isRunning, chill, dispatch]);

    /**
     * Сохранение текущего прогресса таймера в localStorage.
     */
    useEffect(() => {
        localStorage.setItem("pomodoroState", JSON.stringify({ chill, time, isRunning }));
    }, [chill, time, isRunning]);

    /**
     * Переключает состояние таймера (старт/пауза).
     */
    const startTimer = () => setIsRunning(!isRunning);

    /**
     * Сбрасывает таймер к начальному значению (25 минут).
     */
    const resetTimer = () => { setTime(1500); setIsRunning(false); };

    /**
     * Добавляет или убавляет минуты к текущему времени.
     * @param {number} m - Количество минут.
     */
    const addMinutes = (m) => {
        setTime(prev => {
            const newTime = prev + (m * 60);
            return Math.max(0, newTime); // Не позволяем времени уйти за 0
        });
    };

    /**
     * Форматирует секунды в строку вида "ММ:СС".
     * @param {number} seconds - Время в секундах.
     * @returns {string} Отформатированное время.
     */
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return (
        <>
            <div className="flex-[2] bg-game-card rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center shadow-neon">

                {/* Переключатель режимов: Работа / Отдых */}
                <div className="flex bg-white/5 p-1 rounded-xl mb-12 border border-white/10">
                    <button
                        onClick={() => { setChill(0); setTime(1500); setIsRunning(false); }}
                        className={`px-6 py-2 rounded-lg flex gap-2 items-center transition-all ${chill % 2 == 0 ? 'bg-game-purple shadow-glow' : 'hover:bg-white/5'}`}
                    >
                        <img src={pc} className="w-5" alt="" /> Фокус
                    </button>
                    <button
                        onClick={() => { setChill(1); setTime(300); setIsRunning(false); }}
                        className={`px-6 py-2 rounded-lg flex gap-2 items-center transition-all ${chill % 2 !== 0 ? 'bg-game-pink shadow-glow' : 'hover:bg-white/5'}`}
                    >
                        <img src={chillIcon} className="w-5" alt="" /> Отдых
                    </button>
                </div>

                {/* Отображение времени и кнопка запуска */}
                <div className="relative flex flex-col items-center">
                    <div className="text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text gradient-text-purple">
                        {formatTime(time)}
                    </div>

                    <button
                        onClick={startTimer}
                        className={`w-48 py-4 rounded-full font-bold uppercase tracking-widest transition-all ${isRunning ? 'border-2 border-game-pink text-game-pink hover-bg-game-pink-10' : 'bg-game-purple text-white shadow-glow hover:scale-105'}`}
                    >
                        {isRunning ? "Пауза" : "Запуск"}
                    </button>
                </div>

                {/* Быстрое управление временем (±5 минут) и сброс */}
                <div className="mt-12 flex gap-4">
                    <button
                        onClick={() => addMinutes(-5)}
                        disabled={time < 300}
                        className={`w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center transition-all ${time < 300
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-game-purple cursor-pointer'
                            }`}
                    >
                        -5
                    </button>
                    <button onClick={resetTimer} className="w-12 h-12 rounded-lg border border-white/10 hover:border-game-purple flex items-center justify-center">↺</button>
                    <button onClick={() => addMinutes(5)} className="w-12 h-12 rounded-lg border border-white/10 hover:border-game-purple flex items-center justify-center">+5</button>
                </div>
            </div>
        </>
    )
}
