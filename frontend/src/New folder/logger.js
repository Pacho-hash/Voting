// frontend/src/utils/logger.js
const logAction = (action, details) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };
    console.log(logEntry); // This can be replaced with a call to a backend service
  };
  
  export default logAction;