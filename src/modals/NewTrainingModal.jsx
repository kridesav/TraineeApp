import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { newTraining } from '../api/FetchNewTraining';
import moment from 'moment';

export default function NewTrainingModal({ showModal, handleClose, fetchData, customers }) {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const date = form.elements.date.value;
        const time = form.elements.time.value;
        const activity = form.elements.activity.value;
        const duration = form.elements.duration.value;
        const customerName = form.elements.customer.value;

        const customer = customers.find(c => `${c.firstname} ${c.lastname}` === customerName);
        if (!customer) {
            console.error(`Customer not found: ${customerName}`);
            return;
        }

        const customerLink = customer.links.find(link => link.rel === "self");
        const customerId = customerLink.href.split('/').pop();

        const dateTime = moment(`${date} ${time}`).toISOString();

        const trainingData = {
            date: dateTime,
            activity,
            duration,
            customer: `https://traineeapp.azurewebsites.net/api/customers/${customerId}`,
        };

        await newTraining(trainingData, handleClose);
        fetchData();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Add New Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="form-grid">
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name="time" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="number" name="duration" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Activity</Form.Label>
                        <Form.Control type="text" name="activity" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as="select" name="customer" required>
                            {customers.map((customer, index) => (
                                <option key={index} value={customer.id}>{customer.firstname + " " + customer.lastname}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-button">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}