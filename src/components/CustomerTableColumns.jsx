import React, { useMemo } from "react";
import { ColumnFilter } from '/src/components/ColumnFilter.jsx';
import { MdEdit, MdDelete } from "react-icons/md";

export default function CustomerTableColumns({ handleEdit, handleDelete }) {
    return useMemo(() => [
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
        {
            Header: 'Edit',
            Cell: ({ row }) => (
              <button className="edit-delete-btn" onClick={() => handleEdit(row.original)}>
                <MdEdit />
              </button>
            ),
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