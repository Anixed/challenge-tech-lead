import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchPosts, selectStatus, selectError } from './features/posts/postsSlice';
import PostFilter from './components/PostFilter';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    // La lista de posts se pide una sola vez, al montar la vista.
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Posts</h1>

      {/* Filtro */}
      <PostFilter />

      {status === 'loading' && <p className="hint">Cargando posts…</p>}
      {error && <p className="error">{error}</p>}

      {/* Lista */}
      <PostList />

      {/* Formulario */}
      <PostForm />
    </div>
  );
}

export default App;
