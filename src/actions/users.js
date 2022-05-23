import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { toast } from "react-toastify";


export const load = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('users');
            const body = await resp.json();
            console.log(body);
            if (body.ok) {
                dispatch(usersLoaded(body.users));
                toast('🏥 Usuarios cargados correctamente', {
                    position: "top-right",
                    theme: 'dark',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
            } else {
                toast.error(body.msg, {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const usersLoaded = (payload) => ({ type: types.usersLoaded, payload });