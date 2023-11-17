export const deleteRow = (url) => {
    return fetch(url, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(error => console.error('Error:', error));
  };