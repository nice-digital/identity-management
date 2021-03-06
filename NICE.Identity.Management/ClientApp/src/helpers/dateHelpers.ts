export const ToFormattedDateString = (date : Date) => {
    if (!date) return "";
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDate();
    const month = dateToFormat.toLocaleString('default', { month: 'long' });
    const year = dateToFormat.getFullYear();
    const hour = new String(dateToFormat.getHours()).padStart(2, '0');
    const minutes = new String(dateToFormat.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hour}:${minutes}`;    
}