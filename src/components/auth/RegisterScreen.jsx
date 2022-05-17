import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import logo  from '../../img/login-osshp.png';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Ignacio',
        rEmail: 'ign@ign.com',
        rPassword: '123456',
        rPassword2: '123456',
    });

    const { rName,
        rEmail,
        rPassword,
        rPassword2, } = formRegisterValues;

    //Todo: validate form
    const handleRegister = (e) => {
        e.preventDefault();
        if (rPassword !== rPassword2) {
            console.log('Passwords do not match');
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }
        dispatch(startRegister({ name: rName, password: rPassword, email: rEmail }));
    }

    return (
        <div className="login-container">
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="login-card animate__animated animate__bounceIn">
                    <div className="card-header-login">
                        <img src={logo} alt="" width='175px' />
                        {/* <h3>Ingreso</h3> */}
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-md"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="email"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-md"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="password"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-md"
                                placeholder="Contraseña"
                                name='rPassword'
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="password"
                                className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-md"
                                placeholder="Repita la contraseña"
                                name='rPassword2'
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group my-2 d-flex justify-content-center">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                        <div className="form-group my-2 d-flex justify-content-center">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
