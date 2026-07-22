import { Request, Response, NextFunction } from 'express';

// Middleware de errores.
export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({ message: 'Error interno del servidor' });
};
