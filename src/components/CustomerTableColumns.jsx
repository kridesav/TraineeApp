import React, { useMemo } from "react";
import { ColumnFilter } from '/src/components/ColumnFilter.jsx';

export default function CustomerTableColumns() {
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
  ], []);
}