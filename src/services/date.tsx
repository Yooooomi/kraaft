

const pad = (nb: Number) => nb.toString().padStart(2, '0');
export const dateToMessageTime = (date: Date) => `${pad(date.getDate())}/${pad(date.getMonth())}/${pad(date.getFullYear())} - ${pad(date.getHours())}:${pad(date.getMinutes())}`;
