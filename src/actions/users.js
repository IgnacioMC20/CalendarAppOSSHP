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
                // toast('🏥 Usuarios cargados correctamente', {
                //     position: "top-right",
                //     theme: 'dark',
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: true,
                //     progress: undefined,
                // });
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

        if (body.ok) {
            dispatch(adminStatusChanged(body.user))
            toast(`🏥 ${body.msg}`, {
                position: "top-right",
                theme: 'dark',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(body.msg, {
                position: "top-right",
                theme: 'dark',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
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

        if (body.ok) {
            dispatch(adminStatusChanged(body.user))
            toast(`🏥 ${body.msg}`, {
                position: "top-right",
                theme: 'dark',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(body.msg, {
                position: "top-right",
                theme: 'dark',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

export const statusChanged = (payload) => ({
    type: types.usersStartAdmin,
    payload
})

export const loadUser = (id) => {
    return async (dispatch) => {
        const resp = await fetchWithToken(`users/${id}`);
        const body = await resp.json();
        if (body.ok) {
            dispatch(userLoaded(body.user));
        } else {
            toast.error(body.msg, {
                position: "top-right",
            });
        }
    }
}

const userLoaded = (payload) => ({ type: types.userLoaded, payload });

export const activeUserCleared = () => ({ type: types.userCleared});

export const usersCleared = () => ({ type: types.usersCleared});

export const startUpdate = (data, id) => {
    return async (dispatch) => {
      const resp = await fetchWithToken(`users/${id}`, data, 'PUT');
      const body = await resp.json();
      console.log(body);
        if (body.ok){
            // dispatch(userUpdated(body.user));
            toast('Usuario Actualizado correctamente', {
                position: "top-right",
                theme: 'dark',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.error(body.msg, {
                position: "top-right",
                theme: 'dark',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
};

const userUpdated = (payload) => {
  
}

