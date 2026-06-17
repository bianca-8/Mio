const calendar = document.getElementById("calendar");
let selectedDay = null;

const modal = document.getElementById("eventPlace");
const eventInput = document.getElementById("eventInput");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

// calendar
function renderCalendar(year, month) {
    calendar.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < 42; i++) {
        const day = document.createElement("div");
        day.classList.add("day");

        const dayNumber = i - firstDay + 1;

        if (dayNumber > 0 && dayNumber <= daysInMonth) {
            const number = document.createElement("div");
            number.classList.add("dayNumber");
            number.textContent = dayNumber;

            day.appendChild(number);

            day.addEventListener("click", () => {
                selectedDay = day;
                eventInput.value = "";
                modal.style.display = "flex";
            });
        }

        calendar.appendChild(day);
    }
}

const today = new Date();
renderCalendar(today.getFullYear(), today.getMonth());

// button
const button = document.getElementById("saveButton");

saveButton.addEventListener("click", () => {
    const text = eventInput.value.trim();

    if (text === "") return;

    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.textContent = text;

    selectedDay.appendChild(eventDiv);

    modal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
