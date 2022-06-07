import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { toast, Flip } from 'react-toastify';


export const startLogin = (username, password) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth', { username, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()); // ?????
            dispatch(login({
                uid: body.uid,
                name: body.name,
                isAdmin: body.isAdmin,
                username: body.username
            }));
        } else {
            toast.error(`🦄 ${body.msg}`, {
                // theme: "dark",
                transition: Flip,
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

export const startRegister = ({ name, email, password, username, lastname, isAdmin }) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/new', { name, email, password, username, lastname, isAdmin }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            // localStorage.setItem('token', body.token);
            // localStorage.setItem('token-init-date', new Date().getTime());

            // dispatch(register({
            //     uid: body.uid,
            //     name: body.name,
            //     isAdmin: body.isAdmin,
            // }));
            toast(`🦄 ${body.msg}`, {
                position: "top-right",
                theme: 'dark',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            // window.location.href = '/';


        } else {
            toast.error(body.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('auth/renew');
            const body = await resp.json();
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(login({
                    uid: body.uid,
                    name: body.name,
                    isAdmin: body.isAdmin,
                    username: body.username
                }));

            } else {
                dispatch(checkingFinished());
            }
        } catch (error) {
            console.log(error);
            dispatch(checkingFinished());
        }
    }
}

const checkingFinished = () => ({ type: types.authCheckingFinished })

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const register = (user) => ({
    type: types.authStartRegister,
    payload: user
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout })