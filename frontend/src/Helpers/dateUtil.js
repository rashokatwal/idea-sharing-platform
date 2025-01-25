export const dateTimeConverter = (passedDate) => {
    const date = new Date(passedDate);
    const dateTime = {
       date: "",
       time: ""
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hour = date.getHours();
    dateTime.date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    dateTime.time = `${String(hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${hour > 12 ? "PM" : "AM"}`;
    return dateTime;
};