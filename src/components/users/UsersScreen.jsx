import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { ToastContainer } from 'react-toastify';
import { LeapFrog } from '@uiball/loaders'
import { UsersTable } from './UsersTable';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../../actions/users';

export const UsersScreen = () => {

    const [loadingUsers, setLoadingUsers] = useState(false);

    const {userList} = useSelector(state => state.users);
    const [columns, setColumns] = useState([]);

    const dispatch = useDispatch();

    const loadUsers = async () => {

        setLoadingUsers(true);

        dispatch(load());

        setTimeout(() => {
            setColumns([
                { Header: 'Nombre', accessor: 'name' },
                { Header: 'Usuario', accessor: 'username' },
                { Header: 'Email', accessor: 'email' },
                { Header: 'Estado', accessor: 'estado' },
                { Header: 'Administrador', accessor: 'isAdmin' }
            ]);
            setLoadingUsers(false);
        }, 1500);

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
                    {(loadingUsers) ? <LeapFrog size={60} speed={2} color="purple" /> : (
                        <div className="card-body w-100 animate__animated animate__fadeIn">
                            <UsersTable columns={columns} data={userList} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
