import React, { useState, useEffect } from "react";
import FetchData from '../api/FetchData.jsx';
import Table from '/src/components/Table.jsx';
import TrainingTableColumns from '/src/components/TrainingTableColumns.jsx';
import { deleteRow } from '../api/FetchDelete.jsx';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (training) => {
      console.log(training);
      const confirmDelete = window.confirm(`Are you sure you want to delete ${training.activity}?`);
      if (confirmDelete) {
        deleteRow(`http://traineeapp.azurewebsites.net/api/trainings/${training.id}`)
          .then(() => {
            fetchData();
          });
      }
    };
  
    const columns = TrainingTableColumns({ handleDelete });

    const fetchTrainings = FetchData({
      url: 'https://traineeapp.azurewebsites.net/gettrainings',
      setData: setTrainings,
      useContent: false
    });

    const fetchCustomers = FetchData({
      url: 'https://traineeapp.azurewebsites.net/api/customers',
      setData: setCustomers,
      useContent: true
    });

    const fetchData = () => {
      fetchTrainings();
      fetchCustomers();
    };

    return (
        <div>
          <Table columns={columns} data={trainings} fetchData={fetchData} page="Trainings" customers={customers} showModal={showModal} setShowModal={setShowModal}/>
        </div>
      );
}