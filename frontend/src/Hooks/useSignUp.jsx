import { useEffect, useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLoadingBar } from '../Hooks/useLoadingBar';
// import axios from 'axios';
import api from '../Helpers/api';

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

        const response = async () => {
            let response = await api.post('/auth/signup',
                { email: email, password: password }
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch({type: 'LOGIN', payload: response.data})
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.response.data);
                setIsLoading(false);
            })
            return response;
        }
        response();
    }

    return { error, isLoading, signup };
}