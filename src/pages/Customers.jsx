import React, { useState, useEffect } from "react";
import Table from '/src/components/Table.jsx';
import CustomerTableColumns from '/src/components/CustomerTableColumns';
import FetchData from '../api/FetchData.jsx';
import { deleteRow } from '../api/FetchDelete.jsx';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (customer) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${customer.firstname}?`);
    if (confirmDelete) {
      deleteRow(customer.links[0].href)
        .then(() => {
          fetchData();
        });
    }
  };

  const columns = CustomerTableColumns({ handleEdit, handleDelete });

  const fetchData = FetchData({
    url: 'https://traineeapp.azurewebsites.net/api/customers',
    setData: setCustomers,
    useContent: true
  });

  return (
    <div>
      <Table columns={columns} data={customers} fetchData={fetchData} page="Customers" customers={customers} editCustomer={editCustomer} showModal={showModal} setShowModal={setShowModal} setEditCustomer={setEditCustomer} />
    </div>
  );
}