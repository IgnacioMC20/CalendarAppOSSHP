import React from 'react'
import { useTable } from 'react-table'

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

    const handleEditUser = (event, { username }) => {
      event.preventDefault();
      console.log({username});
    }

    // Render the UI for your table
    return (
        <table {...getTableProps()} className='table table-borderless text-white text-center'>
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
                                <button className='btn btn-outline-light mx-2' data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Permisos de Administrador" onClick={(e) => {
                                        handleEditUser(e, row.values) }}>
                                        Administrador
                                </button>
                                    <button className='btn btn-outline-light mx-2' data-bs-toggle="tooltip" data-bs-placement="top" title="Activar/Desactivar" onClick={(e) => {
                                        handleEditUser(e, row.values)
                                    }}>Estado</button>
                            </td>                            
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
