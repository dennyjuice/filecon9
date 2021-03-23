import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
