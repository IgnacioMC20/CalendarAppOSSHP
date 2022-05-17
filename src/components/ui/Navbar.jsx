import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { startLogout } from '../../actions/auth';
import { eventLogout } from '../../actions/events';

export const Navbar = () => {

  const { name } = useSelector( state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {

    dispatch(eventLogout());
    dispatch(startLogout());
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-3'>
        <span className='navbar-brand'>
            {name}
        </span>
        <button className='btn btn-outline-danger' onClick={handleLogout}>
            <span>Salir </span>
            <FiLogOut />
        </button>
    </div>
  )
}
