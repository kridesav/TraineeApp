import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { newCustomer } from '../api/FetchNewCustomer';

export default function NewCustomerModal({ showModal, handleClose, fetchData, editCustomer }) {
  const [customer, setCustomer] = useState(editCustomer || { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });

  useEffect(() => {
    setCustomer(editCustomer || { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
  }, [editCustomer]);

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const method = editCustomer ? 'PUT' : 'POST';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (method === 'PUT') {
      await newCustomer(customer, handleClose, method, editCustomer.links[0].href);
    } else {
      await newCustomer(customer, handleClose, method, 'https://traineeapp.azurewebsites.net/api/customers');
    }
    fetchData();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{editCustomer ? 'Edit Customer' : 'New Customer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="form-grid">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" name="firstname" value={customer.firstname} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" name="lastname" value={customer.lastname} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" placeholder="Enter street address" name="streetaddress" value={customer.streetaddress} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPostCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control type="text" placeholder="Enter post code" name="postcode" value={customer.postcode} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" name="city" value={customer.city} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" name="phone" value={customer.phone} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">
              {editCustomer ? 'Save changes' : 'Create'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}