import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { newCustomer } from '../api/FetchNewCustomer';

export default function NewCustomerModal({ showModal, handleClose, fetchData }) {
  const handleSubmit = async (event) => {
    await newCustomer(event, handleClose);
    fetchData();
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
        <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="form-grid">
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="firstname" required />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lastname" required />
          </Form.Group>

          <Form.Group controlId="formStreetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control type="text" placeholder="Enter street address" name="streetaddress" required />
          </Form.Group>

          <Form.Group controlId="formPostCode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control type="text" placeholder="Enter post code" name="postcode" required />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" name="city" required />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" required />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" name="phone" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}