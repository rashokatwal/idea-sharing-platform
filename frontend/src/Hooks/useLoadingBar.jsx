import { LoadingBarContext } from '../Contexts/LoadingBarContext';
import { useContext } from 'react';

export const useLoadingBar = () => {
    const context = useContext(LoadingBarContext);
    return context;
}