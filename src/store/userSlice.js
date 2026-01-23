import { createSlice } from "@reduxjs/toolkit";

// Функция загрузки состояния из localStorage
const loadUserState = () => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return {
                level: 1,
                xp: 0,
                requiredXp: 10,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading user state from localStorage:', err);
        return {
            level: 1,
            xp: 0,
            requiredXp: 10,
        };
    }
};

const initialState = loadUserState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addXp: (state, action) => {
            state.xp += action.payload;
            if (state.xp >= state.requiredXp) {
                state.level += 1;
                state.xp -= state.requiredXp;
                state.requiredXp = Math.floor(state.requiredXp * 1.1); 
            }
        }
    }
})

export const { addXp } = userSlice.actions;
export default userSlice.reducer;