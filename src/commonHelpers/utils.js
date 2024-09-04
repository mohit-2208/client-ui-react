export const dateFormatter = (dateString) => {
    const dateObject = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    return formattedDate;
};

export const appendTimestampToUrl = (url) => {
	if (url === null) {
		return ""
	} else if (url.includes('?')) {
		return url + "&timestamp=" + Date.now()
	} else {
		return url + "?timestamp=" + Date.now()
	}
}