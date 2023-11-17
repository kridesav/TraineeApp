export async function newCustomer(customer, handleClose, method, url) {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    handleClose();
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}