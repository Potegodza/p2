export const dateFormat = (dateString) => {
  if (!dateString) return 'ไม่ระบุ';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'ไม่ระบุ';
  }
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('th-TH', options);
};







