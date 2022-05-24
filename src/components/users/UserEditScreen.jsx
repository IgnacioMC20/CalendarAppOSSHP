import React from 'react'
import { useParams } from 'react-router-dom'

export const UserEditScreen = () => {

    const { id } = useParams();

    return (
        <div>UserEditScreen</div>
    )
}
