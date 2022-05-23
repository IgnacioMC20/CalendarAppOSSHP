import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import logo  from '../../img/login-osshp.png';

import 'animate.css';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import { Footer } from '../ui/Footer';


export const LoginScreen = () => {

    // Todo: change email to username

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lUsername: '',
        lPassword: ''
    });

    const { lUsername, lPassword } = formLoginValues;
    
    const handleLogin = (e) => {
        e.preventDefault();
        
        if(lUsername.length < 4) {
            toast.warn('Revisa tu usuario', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                })
            return;
        }
        
        if(lPassword.length < 5) {
            toast.warn('Revisa tu contraseña', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                })
            return;
        }

        dispatch(startLogin(lUsername, lPassword))
    }


    return (
        <>
            <div className="login-container">
                <ToastContainer />
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="login-card animate__animated animate__bounceIn">
                        <div className="card-header-login">
                            <img src={logo} alt="" width='175px' />
                            {/* <h3>Ingreso</h3> */}
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-group my-4">
                                {/* <label htmlFor="" ><b>Usuario</b></label> */}
                                <input
                                    type="text"
                                    className={`text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg`}
                                    placeholder="Usuario"
                                    autoComplete='off'
                                    name='lUsername'
                                    value={lUsername}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group my-4">
                                {/* <label htmlFor=""><b>Contraseña</b></label> */}
                                <input
                                    type="password"
                                    className={`text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg ${ (lPassword.length > 0 && lPassword.length < 5) && 'is-invalid' }`}
                                    placeholder="Contraseña"
                                    autoComplete='off'
                                    name='lPassword'
                                    value={lPassword}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group my-4 d-flex justify-content-center">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login"
                                />
                            </div>
                            <div className="form-group my-4 d-flex justify-content-center">
                            </div>
                        </form>
                    </div>
                </div>
            <Footer />
            </div>
        </>
    )
}