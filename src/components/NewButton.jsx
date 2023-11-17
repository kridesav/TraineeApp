import React from "react";
import { Button } from 'react-bootstrap';

export default function NewButton({ handleShow, page }) {
  const label = page === 'Customers' ? 'New Customer' : 'New Training';

  return (
    <Button variant="primary" onClick={handleShow} className="new-button">
      {label}
    </Button>
  );
}