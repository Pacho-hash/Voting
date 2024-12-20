// frontend/src/utils/logger.js
const logAction = (action, details) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };
    console.log(logEntry); 
  };
  
  export default logAction;