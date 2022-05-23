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
    <button className='fab-danger' onClick={handleDelete}>
      <span>
        <BsFillTrashFill />
      </span>
    </button>
  )
}
