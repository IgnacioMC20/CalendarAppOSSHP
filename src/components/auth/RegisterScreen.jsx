import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import logo  from '../../img/login-osshp.png';

// ? react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: '',
        rLastname: '',
        rUsername: '',
    });

    const { rName,
        rEmail,
        rPassword,
        rPassword2,
        rLastname,
        rUsername, } = formRegisterValues;

    //Todo: validate form
    const handleRegister = (e) => {
        e.preventDefault();
        if(rName.length === 0 || rEmail.length === 0 || rPassword.length === 0 || rPassword2.length === 0 || rLastname.length === 0 || rUsername.length === 0) {
            return toast.error('Revisa bien tus datos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                })
        }
        if (rPassword !== rPassword2) {
            console.log('Passwords do not match');
            toast.error('Las contraseñas no coinciden', {
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
        dispatch(startRegister({ name: rName, password: rPassword, email: rEmail, lastname: rLastname, username: rUsername }));
    }

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="login-card animate__animated animate__bounceIn">
                    <div className="card-header-login">
                        <img src={logo} alt="" width='175px' />
                        {/* <h3>Ingreso</h3> */}
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisterInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Apellido"
                                name='rLastname'
                                value={rLastname}
                                onChange={handleRegisterInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Usuario"
                                name='rUsername'
                                value={rUsername}
                                onChange={handleRegisterInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                autoComplete='off'
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Contraseña"
                                name='rPassword'
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                placeholder="Repita la contraseña"
                                name='rPassword2'
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
