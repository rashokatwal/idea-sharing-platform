import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null,
            };
        case 'UPDATE_USER':
            return {
                isAuthenticated: true,
                user: {...state.user,...action.payload},
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}