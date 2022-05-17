import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';
import { BsFillTrashFill } from "react-icons/bs";

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventStartDelete());
    }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
        <BsFillTrashFill />
    </button>
  )
}
