import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useLoadingBar } from './useLoadingBar';
// import axios from 'axios';
import api from '../Helpers/api';
import toast from 'react-hot-toast';

export const useSignin = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();
    const loadingBarRef = useLoadingBar();

    useEffect(() => {
        isLoading ? loadingBarRef.current.continuousStart() : loadingBarRef.current.complete();
    }, [isLoading])

    const signin = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const toastId = toast.loading('Signing in...');

        const response = async () => {
            let response = await api.post('/auth/signin',
                { email: email, password: password }
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch({type: 'LOGIN', payload: response.data});
                setIsLoading(false);
                toast.success('Login successful', {id: toastId});
            })
            .catch((error) => {
                toast.error(error.response.data, {id: toastId});
                setError(error.response.data);
                setIsLoading(false);
            })
            return response;
        }
        response();
    }

    return { error, isLoading, signin };
}