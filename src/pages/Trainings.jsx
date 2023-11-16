import React, { useState } from "react";
import FetchData from '/src/components/FetchData.jsx';
import Table from '/src/components/Table.jsx';
import TrainingTableColumns from '/src/components/TrainingTableColumns.jsx';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    return (
        <div>
          <FetchData url='https://traineeapp.azurewebsites.net/gettrainings' setData={setTrainings} useContent={false} />
          <Table columns={TrainingTableColumns()} data={trainings} />
        </div>
      );
}