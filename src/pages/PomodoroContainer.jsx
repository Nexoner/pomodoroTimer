import arrow from './../assets/arrow.svg'

export default function PomodoroContainer() {

    return(
        <>
            <div className="pomodoro-con h-screen text-white flex justify-center w-screen">
                <div className="pomodoro-tasks h-screen bg-black w-2xl flex flex-col justify-between">
                    <ul className="tasklist flex flex-col">
                        <li className="task p-1 m-2 border-b-1" id="task1"><input type="checkbox" /><label htmlFor=""> </label>Task 1</li>
                        <li className="task p-1 m-2 border-b-1" id="task2"><input type="checkbox" /><label htmlFor=""> </label>Task 2</li>
                        <li className="task p-1 m-2 border-b-1" id="task3"><input type="checkbox" /><label htmlFor=""> </label>Task 3</li>
                        <li className="task p-1 m-2 border-b-1" id="task4"><input type="checkbox" /><label htmlFor=""> </label>Task 4</li>
                    </ul>
                    <div className="notasks-message flex flex-col justify-center items-center">
                        <p>У вас сейчас нету заданий, хотите добавить?</p>
                        <button className="create-task-btn size-14 bg-blue-300 rounded-lg flex justify-center items-center">+</button>
                    </div>
                    <form action="#" className="task-creator flex justify-center place-items-end h-1/6 mb-8">
                        <input className="rounded-s-md bg-white text-black p-1 h-1/2 w-1/2" type="text" />
                        <button className='task-btn bg-amber-200 h-1/2 w-auto rounded-br-2xl rounded-tr-2xl p-3'> <img className='w-8' src={arrow} alt="#" /></button>
                    </form>
                </div>
                <div className="pomodoro-time h-screen bg-amber-400 w-7xl flex justify-around flex-col items-center">
                    <div className="state-con border-2 bg-slate-600">
                        <button className="state border-r-2 p-3">state1</button>
                        <button className="state p-3">state2</button>
                        <button className="state p-3 border-l-2">state3</button>
                    </div>
                    <div className="timer-con m-0 p-12 mb-50 border-3 rounded-3xl bg-slate-400">
                        <h1 className="timer font-extrabold text-6xl">25:00</h1>
                        <button className="start-btn font-bold border-2 rounded-2xl w-full h-auto p-1">Start</button>
                        <p className='mt-9 text-2xl'>Add minutes:</p>
                        <div className="bar flex justify-center">
                            <button className="addtime text-lg border-2 border-r-1 p-2 w-1/4 h-1/2">-1</button>
                            <button className="addtime text-lg border-2 border-r-1 border-l-1 p-2 w-1/4 h-1/2">-5</button>
                            <button className="addtime text-lg border-2 border-l-1 border-r-1 p-2 w-1/4 h-1/2">+5</button>
                            <button className="addtime text-lg border-2 border-l-1 p-2 w-1/4 h-1/2">+1</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};