import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { startLogout } from '../../actions/auth';
import { eventLogout } from '../../actions/events';
import { Link } from 'react-router-dom';
import logo from '../../img/logo-osshp.png';

export const Navbar = () => {

  const { name, isAdmin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {

    dispatch(eventLogout());
    dispatch(startLogout());
  }

  return (
    <div className='navbar d-flex justify-content-between navbar-expand-lg navbar-dark bg-dark px-3 shadow'>
      <span className='navbar-brand'>
        <a href="/">
          <img src={logo} alt="" />
        </a>
      </span>
      <ul className='navbar-nav mr-auto'>
        <li className='navbar-brand'>
         {isAdmin ? <div className="dropdown">
            <button className="btn bg-transparent text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to='/users'>Usuarios</Link>
              <Link className="dropdown-item" to='/register'>Crear Usuario</Link>
            </div>
          </div> : <span className='text-white'>{name}</span>}
        </li>
      </ul>
      <span >
        <button className='buttonLogout' onClick={handleLogout}>
          <span>Salir </span>
          <FiLogOut />
        </button>
      </span>
    </div>
  )
}
