import React, { useState } from "react";
import FetchData from '/src/components/FetchData.jsx';
import Table from '/src/components/Table.jsx';
import CustomerTableColumns from "../components/CustomerTableColumns";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const columns = CustomerTableColumns();
  
    return (
      <div>
        <FetchData url='https://traineeapp.azurewebsites.net/api/customers' setData={setCustomers} />
        <Table columns={columns} data={customers} />
      </div>
    );
  }