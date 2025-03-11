import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
    const { dispatch } = useAuthContext();

    // const toastId = toast.loading('Signing out...');
    
    const signout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
        // toast.success('Signout successful', {id: toastId});
    }

    return { signout };
}