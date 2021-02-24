import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/slices';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
