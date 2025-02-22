document.addEventListener("DOMContentLoaded", async function() {
    const calendarBody = document.querySelector("#calendar tbody");
    const monthYear = document.querySelector("#monthYear");

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    function generateCalendar(year, month) {
        calendarBody.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                const dateEle = document.createElement("p");
                dateEle.classList.add("date");
                cell.appendChild(dateEle);
                if (i === 0 && j < firstDay) {
                    dateEle.textContent = "";
                } else if (date > lastDate) {
                    break;
                } else {
                    const dateStr = `${year}-${zeroPad(month + 1, 2)}-${date}`;
                    dateEle.textContent = date;
                    if (date === currentDay && month === currentMonth && year === currentYear) {
                        cell.classList.add("today");
                    }
                    if (holiday[dateStr]) {
                        cell.classList.add("holiday");
                    }
                    date++;
                }
                
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    const holiday = await $.getJSON('https://holidays-jp.github.io/api/v1/date.json');

    generateCalendar(currentYear, currentMonth);
});

function zeroPad(num, length) {
    return String(num).padStart(length, '0');
}
