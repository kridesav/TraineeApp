import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { GlobalFilter } from '/src/components/GlobalFilter.jsx';
import { ColumnFilter } from '/src/components/ColumnFilter.jsx';
import '/src/pages/Table.css';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    function formatDate(string){
        var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(string).toLocaleDateString([], options);
    }

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status);
            })
            .then(response => response.json())
            .then(data => setTrainings(data || []))
            .catch(error => console.error('Error:', error));
    }, []);

    const data = useMemo(() => trainings, [trainings]);

    const columns = useMemo(() => [
        {
            Header: 'Date',
            accessor: d => formatDate(d.date),
            id: 'date',
            Filter: ColumnFilter,
        },
        {
            Header: 'Duration',
            accessor: 'duration',
            Filter: ColumnFilter,
        },
        {
            Header: 'Activity',
            accessor: 'activity',
            Filter: ColumnFilter,
        },
        {
            Header: 'Customer First Name',
            accessor: 'customer.firstname',
            Filter: ColumnFilter,
        },
        {
            Header: 'Customer Last Name',
            accessor: 'customer.lastname',
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