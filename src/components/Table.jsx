import React, { useState } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import GlobalFilter from "./GlobalFilter";
import NewButton from "./NewButton";
import NewCustomerModal from "../modals/NewCustomerModal";
import NewTrainingModal from "../modals/NewTrainingModal";
import "../styles/Table.css";

export default function Table({ columns, data, fetchData, page, customers, editCustomer, showModal, setShowModal, setEditCustomer }) {

    const handleShow = () => {
        if (page === 'Customers') {
            setEditCustomer(null);
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        if (page === 'Customers') {
            setEditCustomer(null);
        }
    };

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

    const ModalComponent = page === 'Customers' ? NewCustomerModal : NewTrainingModal;

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <NewButton handleShow={handleShow} page={page} />
            <ModalComponent
                showModal={showModal}
                handleClose={handleClose}
                fetchData={fetchData}
                customers={customers}
                editCustomer={editCustomer}
            />
            <table className="table-custom" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className="th-custom" {...column.getHeaderProps()}>
                                    <div className="sort-custom"{...column.getSortByToggleProps()}>
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
                <tbody className="td-custom" {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td className="td-custom" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}