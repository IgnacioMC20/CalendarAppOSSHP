import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { ToastContainer } from 'react-toastify';
import { LeapFrog } from '@uiball/loaders'
import { UsersTable } from './UsersTable';
import { useDispatch, useSelector } from 'react-redux';
import { load, usersCleared } from '../../actions/users';
import './users.css'

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
                { Header: 'Admin', accessor: 'isAdmin' }
            ]);
            setLoadingUsers(false);
        }, 1500);

    }

    useEffect(() => {
        loadUsers();

        return () => {
          dispatch(usersCleared());
        }
    }, [])

    // if (loadingUsers) {
    //     return <Loading />
    // }

    return (
        <div className='calendar-screen'>
            <Navbar />
            <ToastContainer />
            <div className="d-flex justify-content-center align-content-center h-100 p-5 users-screen">
                <div className="card w-100 shadow border-0 d-flex align-items-center justify-content-center p-5 users-card">
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
