import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Middleware для сохранения состояния в localStorage
const saveToLocalStorage = (store) => (next) => (action) => {
    const result = next(action);
    
    // Сохраняем состояние пользователя после каждого действия
    if (action.type?.startsWith('user/')) {
        const state = store.getState();
        try {
            localStorage.setItem('userState', JSON.stringify(state.user));
        } catch (err) {
            console.error('Error saving user state to localStorage:', err);
        }
    }
    
    return result;
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveToLocalStorage),
});
