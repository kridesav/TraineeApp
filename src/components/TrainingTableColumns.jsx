import React, { useMemo } from "react";
import { ColumnFilter } from '/src/components/ColumnFilter.jsx';
import { MdDelete } from "react-icons/md";

export default function TrainingTableColumns({ handleEdit, handleDelete }) {
    function formatDate(string) {
        var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(string).toLocaleDateString([], options);
    }

    return useMemo(() => [
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
        {
            Header: 'Delete',
            Cell: ({ row }) => (
                <button className="edit-delete-btn" onClick={() => handleDelete(row.original)}>
                    <MdDelete />
                </button>
            ),
        },
    ], []);
}