import authUserRequest from "../Helpers/authRequestHandler";
import { useAuthContext } from "./useAuthContext";

export const useUpdateUser = () => {
    const {dispatch, user} = useAuthContext();

    const updateUser = async (field, value, id) => {
        await authUserRequest.patch(`/auth/updateUserDetails/${user._id}`,
            {[field]: value}
        )
        .then((response) => {
            let updatedUserDetails = {...user, ...response.data.updatedUserDetails}
            localStorage.setItem("user", JSON.stringify(updatedUserDetails));
            dispatch({type: "UPDATE_USER", payload: updatedUserDetails});
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    }
    return {updateUser};
}