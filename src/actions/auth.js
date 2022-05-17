import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }));
        } else {
            console.log(body);
            Swal.fire('Error', body, 'error');
        }
    }
}

export const startRegister = ({ name, email, password, username, lastname }) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/new', { name, email, password, username, lastname }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(register({
                uid: body.uid,
                name: body.name,
            }));

        } else {
            Swal.fire('Error', body.msg, 'error');
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