import PomodoroTimer from './PomodoroTimer'
import ToDoList from './To-do'


export default function PomodoroContainer() {

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

                <ToDoList />
            </div>

            {/* Правая панель: TIMER */}
            <PomodoroTimer />

        </div>
    )
};