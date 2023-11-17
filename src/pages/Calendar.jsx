import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import FetchData from '../api/FetchData';

export default function trainingCalendar() {
    const [trainings, setTrainings] = useState([]);
    const [data, setData] = useState([]);

    const fetchTrainings = FetchData({
        url: 'https://traineeapp.azurewebsites.net/gettrainings',
        setData: setData,
        useContent: false
    });

    useEffect(() => {
        fetchTrainings();
    }, []);

    useEffect(() => {
        const formatData = data.map((training) => {
            if (training.customer) {
                return {
                    title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
                    start: moment(training.date).toDate(),
                    end: moment(training.date).add(training.duration, 'minutes').toDate()
                };
            } else {
                return {
                    title: training.activity,
                    start: moment(training.date).toDate(),
                    end: moment(training.date).add(training.duration, 'minutes').toDate()
                };
            }
        });
        setTrainings(formatData);
    }, [data]);

    const localizer = momentLocalizer(moment);

    return (
        <div>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, width: 1200, margin: 'auto' }}
            />
        </div>
    );
}