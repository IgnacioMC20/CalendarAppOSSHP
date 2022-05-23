import React from 'react'
import { useDispatch } from 'react-redux';
import { iuOpenModal } from '../../actions/ui';
import { BsPlusLg } from "react-icons/bs";

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(iuOpenModal());
    }
    
  return (
    <button className='fab' onClick={handleClick}>
        <span>
          <BsPlusLg />
        </span>
    </button>
  )
}
