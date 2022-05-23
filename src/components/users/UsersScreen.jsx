import React, { useEffect, useState } from 'react'
import { fetchWithoutToken } from '../../helpers/fetch';
import { Navbar } from '../ui/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { LeapFrog } from '@uiball/loaders'
import { UsersTable } from './UsersTable';
import { useDispatch } from 'react-redux';
import { load } from '../../actions/users';

export const UsersScreen = () => {

    const [loadingUsers, setLoadingUsers] = useState(false);

    const [usersList, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);

    const dispatch = useDispatch();

    const loadUsers = async () => {

        setLoadingUsers(true);

        dispatch(load());
        // try {
        //     setLoadingUsers(true);
        //     const resp = await fetchWithoutToken(`users/`, null, 'GET');
        //     const { users } = await resp.json();

        //     console.log(users);

        //     if (users.length === 0) {
        //         toast.error('🦄 algo salió mal!', {
        //             theme: 'dark',
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     } else {
        //         setUsers(users);
        //         setColumns([
        //             { Header: 'Nombre', accessor: 'name' },
        //             { Header: 'Usuario', accessor: 'username' },
        //             { Header: 'Email', accessor: 'email' },
        //             { Header: 'Estado', accessor: 'estado' },
        //             { Header: 'Administrador', accessor: 'isAdmin' }
                    
        //         ]);
        //         setTimeout(() => {
        //             setLoadingUsers(false);
        //         }, 2000);
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    }

    useEffect(() => {
        loadUsers();
    }, [])

    // if (loadingUsers) {
    //     return <Loading />
    // }

    return (
        <div className='calendar-screen bg-dark'>
            <Navbar />
            <ToastContainer />
            <div className="d-flex justify-content-center align-content-center h-100 m-5 p-5">
                <div className="card w-100 shadow border-0 bg-dark text-white d-flex align-items-center justify-content-center p-5">
                    {(loadingUsers) ? <LeapFrog size={60} speed={2} color="white" /> : (
                        <div className="card-body w-100 animate__animated animate__fadeIn">
                           <UsersTable columns={columns} data={usersList} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
