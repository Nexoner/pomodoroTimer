import arrow from './../assets/arrow.svg'

export default function ToDoList() {
    return (
    <>
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
    </>
    )
}