import {
  createSlice,
  createAsyncThunk,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Post } from '../../types/post';
import { fetchPostsRequest, createPostRequest, deletePostRequest } from './postsApi';

interface PostsState {
  items: Post[];
  status: 'initial' | 'loading' | 'success' | 'failed';
  error: string | null;
  nameFilter: string;
}

const initialState: PostsState = {
  items: [],
  status: 'initial',
  error: null,
  nameFilter: '',
};

// Pide la lista completa de posts. La opción "condition" garantiza que solo se ejecute
// cuando el estado es 'initial', evitando llamadas duplicadas.
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  () => fetchPostsRequest(),
  {
    condition: (_arg, { getState }) => {
      const { status } = (getState() as RootState).posts;
      return status === 'initial';
    },
  }
);

// Crear y eliminar devuelven el post afectado.
// Actualizamos el store con esa respuesta sin necesidad de volver a pedir la lista completa.
export const createPost = createAsyncThunk(
  'posts/createPost',
  (input: { name: string; description: string }) => createPostRequest(input)
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  (id: number) => deletePostRequest(id)
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error al cargar los posts';
      })
      // El post creado se agrega al inicio de la lista.
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error al crear el post';
      })
      // El post eliminado se quita de la lista por id.
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error al eliminar el post';
      });
  },
});

export const { setNameFilter } = postsSlice.actions;

// Funciones para leer el estado desde los componentes (con useAppSelector()).
// Centralizan el acceso al store. Si la forma del estado cambia, solo se ajusta aquí.
export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectNameFilter = (state: RootState) => state.posts.nameFilter;
export const selectStatus = (state: RootState) => state.posts.status;
export const selectError = (state: RootState) => state.posts.error;

// Calcula la lista filtrada por nombre a partir de items + nameFilter.
// Solo recalcula si los items o el nameFilter cambian.
export const selectFilteredPosts = createSelector(
  [selectAllPosts, selectNameFilter],
  (posts, nameFilter) => {
    const term = nameFilter.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) => post.name.toLowerCase().includes(term));
  }
);

export default postsSlice.reducer;
