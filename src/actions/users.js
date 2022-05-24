import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { toast } from "react-toastify";


export const load = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('users');
            const body = await resp.json();
            const { users } = body;
            if (body.ok) {
                dispatch(usersLoaded(users));
                toast('🏥 Usuarios cargados correctamente', {
                    position: "top-right",
                    theme: 'dark',
                    autoClose: 2000,
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

export const editAdmin = (id) => {
    return async (dispatch) => {

      const resp = await fetchWithToken(`users/admin/${id}`, {}, 'PUT');
      const body = await resp.json();

      if(body.ok) {
        dispatch(adminStatusChanged(body.user))
        toast(`🏥 ${body.message}`, {
            position: "top-right",
            theme: 'dark',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        }else{
            toast.error(body.msg, {
                position: "top-right",
            });
        }
    }
}

export const adminStatusChanged = (payload) => ({
  type: types.usersStartAdmin,
  payload
})

export const editStatus = (id) => {
  return async (dispatch) => {

    const resp = await fetchWithToken(`users/status/${id}`, {}, 'PUT');
    const body = await resp.json();

    if(body.ok) {
        dispatch(adminStatusChanged(body.user))
        toast(`🏥 ${body.message}`, {
            position: "top-right",
            theme: 'dark',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        }else{
            toast.error(body.msg, {
                position: "top-right",
            });
        }
  }
}

export const statusChanged = (payload) => ({
    type: types.usersStartAdmin,
    payload
  })
  