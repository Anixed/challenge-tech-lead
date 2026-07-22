import { useAppDispatch, useAppSelector } from '../hooks';
import { setNameFilter, selectNameFilter } from '../features/posts/postsSlice';

function PostFilter() {
  const dispatch = useAppDispatch();
  const nameFilter = useAppSelector(selectNameFilter);

  return (
    <form className="row" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Filtro de Nombre"
        value={nameFilter}
        onChange={(e) => dispatch(setNameFilter(e.target.value))}
        aria-label="Filtrar posts por nombre"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default PostFilter;
