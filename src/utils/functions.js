export const convertUTCToLocal = (utcDateString) => {
    const utcDate = new Date(utcDateString); 
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);  
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(localDate.getDate()).padStart(2, '0'); 
    const hours = String(localDate.getHours()).padStart(2, '0'); 
    const minutes = String(localDate.getMinutes()).padStart(2, '0'); 
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  export const convertUTCToLocalv2 = (utcDateString) => {
    const utcDate = new Date(utcDateString); 
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);  
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(localDate.getDate()).padStart(2, '0'); 
 
  
    return `${year}-${month}-${day}`;
  };