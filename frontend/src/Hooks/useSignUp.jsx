import { useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import axios from 'axios';

export const useSignUp = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = async () => {
            await axios.post('http://localhost:3000/auth/signup',
                { email: email, password: password }
            )
            .then((response) => {
                console.log(response.data);
                return {user: response.data, ok: true};
            })
            .catch((error) => {
                console.log(error.response.data.error);
                return {error: error.response.data, ok: false};
            })
        }

        console.log(await response());

        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false);
        }
    }

    return { error, isLoading, signup };
}