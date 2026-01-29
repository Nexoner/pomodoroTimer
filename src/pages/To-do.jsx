import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addExperience } from '../store/userSlice'
import arrow from './../assets/arrow.svg'

/**
 * Начальный список задач (квестов) для демонстрации.
 */
const initialTasks = [
    { id: 'task-1', text: 'Проверка кода (Code Review)', completed: false, type: 'task' },
    { id: 'task-2', text: 'Изучить Redux Toolkit', completed: false, type: 'task' },
    { id: 'task-3', text: 'Ежедневная тренировка', completed: false, type: 'task' },
];

/**
 * Компонент ToDoList (Список квестов).
 * Позволяет добавлять задачи и отмечать их выполнение, начисляя интеллект персонажу.
 */
export default function ToDoList() {
    const dispatch = useDispatch();

    // Локальное состояние для списка задач и значения поля ввода
    const [tasks, setTasks] = useState(initialTasks);
    const [inputValue, setInputValue] = useState('');

    /**
     * Переключает статус выполнения задачи.
     * Если задача отмечается как выполненная впервые, начисляется опыт интеллекта.
     * @param {string} id - Уникальный идентификатор задачи.
     */
    const toggleTask = (id) => {
        // Находим задачу перед обновлением, чтобы проверить её текущий статус
        const task = tasks.find(t => t.id === id);
        const wasNotCompleted = task && !task.completed;

        // Обновляем состояние задач
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

        // Начисляем XP только если задача была завершена (wasNotCompleted === true)
        if (wasNotCompleted) {
            // Начисляем 10 XP к интеллекту (intellect) с легкой сложностью
            dispatch(addExperience({ amount: 10, attribute: 'intellect', difficulty: 'easy' }));
        }
    };

    /**
     * Добавляет новую задачу в список.
     * @param {Event} e - Событие отправки формы.
     */
    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTask = {
            id: `task-${Date.now()}`, // Генерация уникального ID на основе времени
            text: inputValue,
            completed: false,
            type: 'task'
        };

        setTasks([...tasks, newTask]);
        setInputValue(''); // Очистка поля ввода
    };

    return (
        <>
            <div className="flex-1 bg-game-card rounded-2xl border border-white/10 p-6 flex flex-col shadow-neon">
                <h2 className="text-xl font-bold mb-6 tracking-widest uppercase text-game-purple">Журнал квестов</h2>

                {/* Список задач с анимацией появления/удаления */}
                <ul className="flex-1 space-y-4 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.li
                                key={task.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${task.completed
                                    ? 'bg-white/5 border-transparent opacity-60'
                                    : 'bg-white/5 border-white/5 hover:border-game-purple/30'
                                    }`}
                            >
                                {/* Кастомный чекбокс */}
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                        className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                                    />
                                    <div className={`w-full h-full rounded border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-game-purple border-game-purple' : 'border-game-purple/50'
                                        }`}>
                                        {task.completed && (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-3 h-3 text-white"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            >
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </motion.svg>
                                        )}
                                    </div>
                                </div>

                                {/* Текст задачи */}
                                <span className={`flex-1 transition-all duration-500 ${task.completed ? 'text-game-purple/50 line-through decoration-game-pink italic' : 'text-white'
                                    }`}>
                                    {task.text}
                                </span>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {/* Форма добавления нового квеста */}
                <form onSubmit={addTask} className="flex gap-2">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-game-purple transition-colors"
                        placeholder="Принять новый квест..."
                        type="text"
                    />
                    <button
                        type="submit"
                        className="bg-game-purple p-3 rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-glow"
                    >
                        <img className="w-5" src={arrow} alt="добавить" />
                    </button>
                </form>
            </div>
        </>
    )
}
