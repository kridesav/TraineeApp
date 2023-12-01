import React from "react";
import _ from 'lodash';
import FetchData from '../api/FetchData.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { Tabs, Tab } from '@mui/material';

export default function Statistics() {

    const [trainings, setTrainings] = React.useState([]);
    const [tab, setTab] = React.useState(0);

    const fetchTrainings = FetchData({
        url: 'https://traineeapp.azurewebsites.net/gettrainings',
        setData: setTrainings,
        useContent: false
    });

    const groupedTrainings = _.groupBy(trainings, 'activity');

    const averageDurations = _.map(groupedTrainings, (group, activity) => ({
        activity,
        averageDuration: _.meanBy(group, 'duration')
    }));

    const totalDurations = _.map(groupedTrainings, (group, activity) => ({
        activity,
        totalDuration: _.sumBy(group, 'duration')
    }));

    return (
        <div>
            <h1>Statistics</h1>
            <br />
            <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
                <Tab label="Average Duration" />
                <Tab label="Total Duration" />
            </Tabs>
            <br />
            {tab === 0 && (
                <BarChart width={700} height={500} data={averageDurations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis>
                        <Label value="Average duration (min)" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="averageDuration" fill="#8884d8" />
                </BarChart>
            )}
            {tab === 1 && (
                <BarChart width={700} height={500} data={totalDurations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis>
                        <Label value="Total duration (min)" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="totalDuration" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
}