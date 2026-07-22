import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// Tipos derivados del store para usarlos en toda la app.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
