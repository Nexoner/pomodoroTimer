import arrow from './../assets/arrow.svg'
import coffe from './../assets/local_cafe_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import pc from './../assets/laptop_mac_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import chill from './../assets/relax_20dp_E3E3E3_FILL0_wght400_GRAD0_opsz20.png'
import { useEffect, useState } from 'react'

export default function PomodoroContainer() {
    const [chil, setChill] = useState(0)
    const [time, setTime] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
            setTime((prev) => prev - 1);
            }, 1000);
        } else if(time < 0) {
            setTime(0)
        }
        return() => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        if(time == 0 && chil == 0) {
            setChill(1);
            setTime(300);
            setIsRunning(false);
        } else if(time == 0 && chil == 1) {
            setChill(2);
            setTime(1500);
            setIsRunning(false);
        } else if(time == 0 && chil == 2) {
            setChill(3);
            setTime(300);
            setIsRunning(false);
        } else if(time == 0 && chil == 3) {
            setChill(4);
            setTime(1500);
            setIsRunning(false);
        } else if(time == 0 && chil == 4) {
            setChill(5);
            setTime(300);
            setIsRunning(false);
        } else if(time == 0 && chil == 5) {
            setChill(6);
            setTime(1500);
            setIsRunning(false);
        } else if(time == 0 && chil == 6) {
            setChill(0);
            setTime(900);
            setIsRunning(false);
        }
    }, [time, chil])

    const resetTimer = () => {
    setTime(1500);
    setIsRunning(false);
    };

    const startTimer = () => {
        setIsRunning((prev) => !prev);
        console.log(time)
    }

    const addTime = (t) => {
        setTime(time + t)
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }

    const setWork = () => {
        setChill(0)
        setTime(1500)
    }
    const setChil = () => {
        setChill(1)
        setTime(300)
    }
    const setDeepChill = () => {
        setChill(6)
        setTime(900)
    }

    return(
        <>
            <div className="pomodoro-con h-screen text-white flex justify-center w-screen">
                <div className="pomodoro-tasks h-screen bg-[#44c2b1] w-2xl flex flex-col justify-between">
                    <ul className="tasklist flex flex-col">
                        <li className="task p-1 m-2 border-b-1" id="task1"><input type="checkbox" /><label htmlFor="">  </label>Task 1</li>
                        <li className="task p-1 m-2 border-b-1" id="task2"><input type="checkbox" /><label htmlFor="">  </label>Task 2</li>
                        <li className="task p-1 m-2 border-b-1" id="task3"><input type="checkbox" /><label htmlFor="">  </label>Task 3</li>
                        <li className="task p-1 m-2 border-b-1" id="task4"><input type="checkbox" /><label htmlFor="">  </label>Task 4</li>
                    </ul>
                    <div className="notasks-message flex flex-col justify-center items-center">
                        <p>У вас сейчас нету заданий, хотите добавить?</p>
                        <button className="create-task-btn size-14 bg-blue-400 rounded-lg flex justify-center items-center">+</button>
                    </div>
                    <form action="#" className="task-creator flex justify-center place-items-end h-1/6 mb-8">
                        <input className="rounded-s-md bg-white text-black p-1 h-1/2 w-1/2" type="text" />
                        <button className='task-btn bg-[#C38D9E] h-1/2 w-auto rounded-br-2xl rounded-tr-2xl p-3'> <img className='w-8' src={arrow} alt="#" /></button>
                    </form>
                </div>
                <div className="pomodoro-time h-screen bg-[#E8A87C] w-7xl flex justify-around flex-col items-center">
                    <div className="state-con bg-[#C38D9E] border-2">
                        <button 
                            onClick={() => setWork()}
                            className={`state border-r-2 p-3 h-full ${chil === 0 || chil === 2 || chil === 4 ? "bg-[#9e707e]" : ""}`}
                        >
                            <img src={pc} alt="" />
                        </button>
                        <button 
                            onClick={() => setChil()}
                            className={`state p-3 h-full ${chil === 1 || chil === 3 || chil === 5 ? "bg-[#9e707e]" : ""}`}
                        >
                            <img src={chill} alt="" />
                        </button>
                        <button 
                            onClick={() => setDeepChill()}
                            className={`state p-3 border-l-2 h-full ${chil === 6 ? "bg-[#9e707e]" : ""}`}
                        >
                            <img src={coffe} alt="" />
                        </button>
                    </div>
                    <div className="timer-con m-0 p-12 mb-50 border-3 rounded-3xl bg-[#E27D60]">
                        <h1 className="timer font-extrabold text-6xl">{formatTime(time)}</h1>
                        <button onClick={startTimer} className="start-btn font-bold border-2 rounded-2xl w-full h-auto p-1">Start</button>
                        <p className='mt-9 text-2xl'>Add minutes:</p>
                        <div className="bar flex justify-center bg-[#C38D9E]">
                            <button onClick={() => addTime(-60)} className="addtime text-lg border-2 border-r-1 p-2 w-1/4 h-1/2">-1</button>
                            <button onClick={() => addTime(-300)} className="addtime text-lg border-2 border-r-1 border-l-1 p-2 w-1/4 h-1/2">-5</button>
                            <button onClick={resetTimer} className="reset text-lg border-2 border-r-1 border-l-1 p-2 w-1/4 h-1/2">&#8634;</button>
                            <button onClick={() => addTime(300)} className="addtime text-lg border-2 border-l-1 border-r-1 p-2 w-1/4 h-1/2">+5</button>
                            <button onClick={() => addTime(60)} className="addtime text-lg border-2 border-l-1 p-2 w-1/4 h-1/2">+1</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};