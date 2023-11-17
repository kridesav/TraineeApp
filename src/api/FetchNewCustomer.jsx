export async function newCustomer(event, handleClose) {
    event.preventDefault();
    const data = new FormData(event.target);
  
    try {
      const response = await fetch('https://traineeapp.azurewebsites.net/api/customers', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data)),
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