import { useEffect, useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLoadingBar } from '../Hooks/useLoadingBar';
// import axios from 'axios';
import api from '../Helpers/api';
import toast from 'react-hot-toast';

export const useSignUp = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();
    const loadingBarRef = useLoadingBar();

    useEffect(() => {
        isLoading ? loadingBarRef.current.continuousStart() : loadingBarRef.current.complete();
    }, [isLoading])

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const toastId = toast.loading('Registering user...');

        const response = async () => {
            let response = await api.post('/auth/signup',
                { email: email, password: password }
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch({type: 'LOGIN', payload: response.data})
                setIsLoading(false);
                toast.success('Registration successful', {id: toastId});
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

    return { error, isLoading, signup };
}