import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    level: 1,
    xp: 0,
    requiredXp: 10,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addXp: (state, action) => {
            state.xp += action.payload;
            if (state.xp >= state.requiredXp) {
                state.level += 1;
                state.xp -= state.requiredXp;
                state.requiredXp = Math.floor(state.requiredXp * 2); 
            }
        }
    }
})

export const { addXp } = userSlice.actions;
export default userSlice.reducer;