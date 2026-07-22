import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';

// GET /api/posts
// Devuelve TODOS los posts.
export const getPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// POST /api/posts
// Crea un post y devuelve el post creado.
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body as { name?: string; description?: string };

    if (!name?.trim() || !description?.trim()) {
      return res.status(400).json({ message: 'name y description son requeridos' });
    }

    const post = await Post.create({ name: name.trim(), description: description.trim() });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id
// Elimina un post y devuelve el post eliminado.
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    await post.destroy();

    res.json(post);
  } catch (error) {
    next(error);
  }
};
