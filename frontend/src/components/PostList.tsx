import { useAppDispatch, useAppSelector } from '../hooks';
import { selectFilteredPosts, deletePost } from '../features/posts/postsSlice';

function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFilteredPosts);

  return (
    <table className="post-list">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 ? (
          <tr>
            <td colSpan={3} className="empty">
              No hay posts.
            </td>
          </tr>
        ) : (
          posts.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>
                <button className="link" onClick={() => dispatch(deletePost(post.id))}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default PostList;
