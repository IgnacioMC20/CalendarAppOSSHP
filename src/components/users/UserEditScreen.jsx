
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import logo from '../../img/login-osshp.png';

// ? react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../ui/Footer';
import { Navbar } from '../ui/Navbar';
// import { Link } from 'react-router-dom';
import { FcUndo } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { LeapFrog } from '@uiball/loaders'
import { activeUserCleared, startUpdate } from '../../actions/users';


export const UserEditScreen = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        return () => {
            dispatch(activeUserCleared())
        }
    }, [])

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    const { name, lastname, email, username, id } = useSelector(state => state.users.activeUser);

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: name,
        rEmail: email,
        rPassword: '',
        rPassword2: '',
        rLastname: lastname,
        rUsername: username
    });


    const { rName,
        rEmail,
        rPassword,
        rPassword2,
        rLastname,
        rUsername } = formRegisterValues;



    //Todo: validate form
    const handleUpdate = (e) => {
        e.preventDefault();
        if (rName.length === 0 || rEmail.length === 0 || rLastname.length === 0 || rUsername.length === 0) {
            return toast.error('Revisa bien tus datos', {
                position: "top-right",
                theme: 'dark',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }

        if ((rPassword.length > 0)) {
            if (rPassword.length < 5) {
                return toast.error('La contraseña debe tener al menos 5 caracteres', {
                    position: "top-right",
                    theme: 'dark',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            }
            if (rPassword !== rPassword2) {
                return toast.error('Las contraseñas no coinciden', {
                    position: "top-right",
                    theme: 'dark',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            }
        }

        console.log({ name: rName, password: rPassword, email: rEmail, lastname: rLastname, username: rUsername, })
        dispatch(startUpdate({ name: rName, password: rPassword, email: rEmail, lastname: rLastname, username: rUsername, }, id))
    }

    // dispatch(startRegister({ name: rName, password: rPassword, email: rEmail, lastname: rLastname, username: rUsername, }));
    return (
        <>
            <Navbar />
            <div className="login-container">
                <ToastContainer />
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="login-card animate__animated animate__bounceIn">
                        <div className="ribbon-wrapper">
                            <Link className="btn bt-light pt-4" to='/users'><FcUndo /></Link>
                        </div>
                        <div className="card-header-login">
                            <img src={logo} alt="" width='175px' />
                            {/* <h3>Ingreso</h3> */}
                        </div>
                        {loading
                            ? <div className="row d-flex justify-content-center my-5 py-5">
                                <LeapFrog size={60} speed={2} color="purple" />
                            </div>
                            : <form onSubmit={handleUpdate}>
                                <div className="col-auto">
                                    <div className="row">
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                className="text-center w-100 h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                                placeholder="Nombre"
                                                name='rName'
                                                value={rName}
                                                onChange={handleRegisterInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                className="text-center w-100 h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                                placeholder="Apellido"
                                                name='rLastname'
                                                value={rLastname}
                                                onChange={handleRegisterInputChange}
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
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
                                {(rPassword.length > 0) && <div className="form-group">
                                    <input
                                        type="password"
                                        className="text-center form-control h-auto text-dark rounded-pill border-0 py-3 px-4 mb-5 shadow-lg"
                                        placeholder="Repita la contraseña"
                                        name='rPassword2'
                                        value={(rPassword.length > 0) ? rPassword2 : rPassword}
                                        onChange={handleRegisterInputChange}
                                        autoComplete='off'
                                    />
                                </div>}
                                <div className="form-group d-flex justify-content-center">
                                    <input
                                        type="submit"
                                        className="btnSubmit"
                                        value="Actualizar" />
                                </div>
                            </form>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
