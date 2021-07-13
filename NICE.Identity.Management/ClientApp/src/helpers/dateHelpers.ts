export const ToFormattedDateString = (date: Date): string => {
    if (!date) return "";
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDate();
    const month = dateToFormat.toLocaleString('default', { month: 'long' });
    const year = dateToFormat.getFullYear();
    const hour = String(dateToFormat.getHours()).padStart(2, '0');
    const minutes = String(dateToFormat.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hour}:${minutes}`;    
}