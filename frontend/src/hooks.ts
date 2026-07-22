import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';

// Hooks tipados que se usan en toda la app en lugar de useDispatch/useSelector.
// Se definen una sola vez aquí para tener type-safety y autocompletado.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
