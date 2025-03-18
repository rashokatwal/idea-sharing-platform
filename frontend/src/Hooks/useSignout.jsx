import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
    const { dispatch } = useAuthContext();
    
    const signout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
    }

    return { signout };
}