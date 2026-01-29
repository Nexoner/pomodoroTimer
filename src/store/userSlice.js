import { createSlice } from "@reduxjs/toolkit";

/** 
 * Состояние по умолчанию для нового пользователя.
 * Включает начальный уровень, опыт, базовые характеристики и пустую историю.
 */
const defaultState = {
    level: 1,
    xp: 0,
    requiredXp: 100, // Опыт, необходимый для достижения следующего уровня
    stats: {
        strength: 10,   // Сила
        stamina: 10,    // Стойкость
        agility: 10,    // Ловкость
        intellect: 10,  // Интеллект
        creativity: 10, // Креативность
    },
    energy: 5,          // Текущий уровень энергии (самочувствие)
    streak: 0,          // Текущая серия дней (фокус)
    history: []         // История начислений опыта и событий
};

/**
 * Функция загрузки состояния из localStorage.
 * Пытается прочитать данные и объединить их с дефолтными значениями, 
 * чтобы избежать ошибок при отсутствии новых полей.
 */
const loadUserState = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return defaultState;
        }
        const loadedState = JSON.parse(serializedState);

        // Объединяем загруженное состояние с дефолтным (для миграции старых данных)
        return {
            ...defaultState,
            ...loadedState,
            stats: {
                ...defaultState.stats,
                ...(loadedState.stats || {})
            }
        };
    } catch (err) {
        console.error('Ошибка при загрузке состояния пользователя из localStorage:', err);
        return defaultState;
    }
};

const initialState = loadUserState();

/**
 * Срез (slice) Redux для управления состоянием игрока.
 * Содержит логику начисления опыта, изменения статов и сохранения прогресса.
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Начисляет опыт и развивает соответствующий атрибут.
         * @param {Object} action.payload - Данные о заработанном опыте.
         * @param {number} action.payload.amount - Базовое количество опыта.
         * @param {string} action.payload.attribute - Название развиваемого атрибута.
         * @param {string} [action.payload.difficulty='medium'] - Сложность задачи (easy, medium, hard).
         */
        addExperience: (state, action) => {
            const { amount, attribute, difficulty = 'medium' } = action.payload;

            // Коэффициенты сложности для расчета итогового опыта
            const coefficients = {
                easy: 0.5,
                medium: 1.0,
                hard: 1.5
            };

            const k_d = coefficients[difficulty];
            const xpGain = amount * k_d;

            // Добавляем опыт к общему значению
            state.xp += xpGain;

            // Рост атрибута: Attr = Attr + (BaseXP * K_d * 0.05)
            // Атрибуты растут медленнее, чем уровень опыта
            if (attribute && state.stats[attribute] !== undefined) {
                state.stats[attribute] += amount * k_d * 0.05;
            }

            // Логика повышения уровня (Level Up)
            // Если опыта достаточно для следующего уровня, повышаем его и увеличиваем порог требуемого опыта
            while (state.xp >= state.requiredXp) {
                state.level += 1;
                state.xp -= state.requiredXp;
                state.requiredXp = Math.floor(state.requiredXp * 1.15); // Прогрессия сложности уровня
            }

            // Записываем событие в историю
            state.history.push({
                type: 'xp_gain',
                amount: xpGain,
                attribute: attribute,
                timestamp: new Date().toISOString()
            });

            // Сохраняем обновленное состояние в локальное хранилище
            localStorage.setItem('userState', JSON.stringify(state));
        },

        /**
         * Обновляет текущий уровень энергии.
         * @param {number} action.payload - Новое значение энергии (1-10).
         */
        updateEnergy: (state, action) => {
            state.energy = action.payload;
            localStorage.setItem('userState', JSON.stringify(state));
        },

        /**
         * Обновляет количество дней в серии.
         * @param {number} action.payload - Новое значение серии.
         */
        updateStreak: (state, action) => {
            state.streak = action.payload;
            localStorage.setItem('userState', JSON.stringify(state));
        }
    }
})

export const { addExperience, updateEnergy, updateStreak } = userSlice.actions;
export default userSlice.reducer;
