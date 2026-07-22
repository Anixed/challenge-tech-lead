import axios from 'axios';
import type { Post } from '../../types/post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
});

// GET /posts
// Devuelve el listado completo de posts.
export const fetchPostsRequest = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts');
  return data;
};

// POST /posts
// Crea y devuelve el post creado.
export const createPostRequest = async (input: {
  name: string;
  description: string;
}): Promise<Post> => {
  const { data } = await api.post<Post>('/posts', input);
  return data;
};

// DELETE /posts/:id
// Elimina y devuelve el post eliminado.
export const deletePostRequest = async (id: number): Promise<Post> => {
  const { data } = await api.delete<Post>(`/posts/${id}`);
  return data;
};
