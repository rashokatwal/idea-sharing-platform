import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useLoadingBar } from './useLoadingBar';
import axios from 'axios';

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

        const response = async () => {
            let response = await axios.post('http://localhost:3000/auth/signin',
                { email: email, password: password }
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch({type: 'LOGIN', payload: response.data});
                setIsLoading(false);
                window.location.href = '/';
            })
            .catch((error) => {
                setError(error.response.data);
                setIsLoading(false);
            })
            return response;
        }
        response();
    }

    return { error, isLoading, signin };
}