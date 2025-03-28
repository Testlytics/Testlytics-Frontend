export const formatDateTime = (isoString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(isoString).toLocaleDateString('en-US', options);
  };
  
  export const calculateDuration = (startIso, endIso) => {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const seconds = Math.floor((end - start) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };