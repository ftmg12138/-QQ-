// Define the function to get the current date
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Update all elements with class "mv_list__info" on script load
updateDates();

// Define the global variable on the window object
if (!window.currentDate) {
    window.currentDate = getCurrentDate();
}

// Periodically update all elements with class "mv_list__info"
setInterval(updateDates, 1000); // Update every 1000 milliseconds (1 second)

// Update the date in all elements with class "mv_list__info"
function updateDates() {
    const dateElements = document.querySelectorAll('.mv_list__info');
    if (dateElements) {
        dateElements.forEach((dateElement) => {
            dateElement.textContent = getCurrentDate();
        });
    }
}
