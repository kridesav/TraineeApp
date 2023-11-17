import React, { useState, useEffect } from "react";
import FetchData from '../api/FetchData.jsx';
import Table from '/src/components/Table.jsx';
import TrainingTableColumns from '/src/components/TrainingTableColumns.jsx';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);

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
          <Table columns={TrainingTableColumns()} data={trainings} fetchData={fetchData} page="Trainings" customers={customers}/>
        </div>
      );
}