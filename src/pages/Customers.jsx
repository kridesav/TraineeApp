import React, { useState, useEffect } from "react";
import Table from '/src/components/Table.jsx';
import CustomerTableColumns from '/src/components/CustomerTableColumns';
import FetchData from '../api/FetchData.jsx';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const columns = CustomerTableColumns();

  const fetchData = FetchData({
    url: 'https://traineeapp.azurewebsites.net/api/customers',
    setData: setCustomers,
    useContent: true
  });

  return (
    <div>
      <Table columns={columns} data={customers} fetchData={fetchData} page="Customers" customers={customers}/>
    </div>
  );
}