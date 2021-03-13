import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices';
import { AppDispatch } from '../redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
