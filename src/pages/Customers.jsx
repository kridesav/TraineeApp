import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { GlobalFilter } from '/src/components/GlobalFilter.jsx';
import { ColumnFilter } from '/src/components/ColumnFilter.jsx';
import '/src/pages/Table.css';

export default function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status);
            })
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(error => console.error('Error:', error));
    }, []);

    const data = useMemo(() => customers, [customers]);

    const columns = useMemo(() => [
        {
            Header: 'First Name',
            accessor: 'firstname',
            Filter: ColumnFilter,
        },
        {
            Header: 'Last Name',
            accessor: 'lastname',
            Filter: ColumnFilter,
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress',
            Filter: ColumnFilter,
        },
        {
            Header: 'Post Code',
            accessor: 'postcode',
            Filter: ColumnFilter,
        },
        {
            Header: 'City',
            accessor: 'city',
            Filter: ColumnFilter,
        },
        {
            Header: 'Email',
            accessor: 'email',
            Filter: ColumnFilter,
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            Filter: ColumnFilter,
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </div>
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}