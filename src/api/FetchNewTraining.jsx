export async function newTraining(trainingData, handleClose) {
    try {
      const response = await fetch('https://traineeapp.azurewebsites.net/api/trainings', {
        method: 'POST',
        body: JSON.stringify(trainingData),
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