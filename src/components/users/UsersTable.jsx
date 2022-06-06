import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { useTable } from 'react-table'
import { editAdmin, editStatus, loadUser } from '../../actions/users'

export const UsersTable = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    const dispatch = useDispatch();


    const history = useHistory();

    const { userList } = useSelector( state => state.users);
    const { username } = useSelector( state => state.auth);

    const handleEditUser = (event, username, action) => {
        
        event.preventDefault();

        const { id } = userList.find(user => user.username === username);

        switch (action) {
            case 'admin':
                dispatch(editAdmin(id));
                break;
        
            case 'estado':
                dispatch(editStatus(id));
                break;
        
            case 'edit':
                // console.log('edit')
                dispatch(loadUser(id));
                setTimeout(() => {
                    history.push(`/edit/${id}`);
                }, 250);

                break;
        
            default:
                break;
        }


    }

    // Render the UI for your table
    return (
        <table {...getTableProps()} className='table table-bordered text-dark text-center bg-white rounded-5'>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        <th>No.</th>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                        <th>acciones</th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            <td>{i + 1}</td>
                            {row.cells.map(cell => {
                                // if(cell.column.id === 'username') {
                                //     return <td {...cell.getCellProps()}><span onClick={ (e) => {
                                //         handleEditUser(e, row.values)
                                //     }} style={ { cursor: 'pointer' } }>{cell.render('Cell')}</span></td> 
                                // }
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td>
                                <button className='btn btn-outline-dark mx-2' data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Permisos de Administrador" disabled={(row.values.username === username ? true : false)} onClick={(e) => {
                                    handleEditUser(e, row.values.username, 'admin')
                                }}>
                                    Admin
                                </button>
                                <button className='btn btn-outline-dark mx-2' data-bs-toggle="tooltip" data-bs-placement="top" title="Activar/Desactivar" disabled={(row.values.username === username ? true : false)} onClick={(e) => {
                                    handleEditUser(e, row.values.username, 'estado')
                                }}>Estado</button>
                                {/* todo, change to userid */}
                                <button className='btn btn-outline-dark mx-2' data-bs-toggle="tooltip" data-bs-placement="top" title="Editar usuario" onClick={(e) => {
                                    handleEditUser(e, row.values.username, 'edit')
                                }}>Editar</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
