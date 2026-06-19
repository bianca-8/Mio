const calendar = document.getElementById("calendar");
let isDragging = false;
let startDate = null;
let endDate = null;
let editingEvent = null;
let events = []; // {id, title, start, end}
let nextEventId = 1;

const modal = document.getElementById("eventPlace");
const eventInput = document.getElementById("eventInput");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

// calendar
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderCalendar(year, month) {
    calendar.innerHTML = "";

    document.getElementById("monthTitle").textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < 42; i++) {
        const day = document.createElement("div");
        day.classList.add("day");

        const dayNumber = i - firstDay + 1;

        if (dayNumber > 0 && dayNumber <= daysInMonth) {

            const currentDate = new Date(year, month, dayNumber);

            day.dataset.date = currentDate.toISOString();

            const number = document.createElement("div");
            number.classList.add("dayNumber");
            number.textContent = dayNumber;
            day.appendChild(number);

            events.forEach(event => {
                if (currentDate >= event.start && currentDate <= event.end) {

                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.textContent = event.title;

                    day.appendChild(eventDiv);
                }
            });

            day.addEventListener("mousedown", () => {
                isDragging = true;
                startDate = new Date(year, month, dayNumber);
                endDate = new Date(year, month, dayNumber);
            });

            day.addEventListener("mouseenter", () => {
                if (!isDragging) return;

                endDate = new Date(year, month, dayNumber);
                highlightSelection();
            });

            day.addEventListener("mouseup", () => {
                isDragging = false;

                modal.style.display = "flex";
            });
        }

        day.dataset.index = i;

        calendar.appendChild(day);
    }
}

function highlightSelection() {
    document.querySelectorAll(".day").forEach(day => {
        day.classList.remove("selected");

        if (!day.dataset.date) return;

        const date = new Date(day.dataset.date);

        const start = startDate < endDate ? startDate : endDate;
        const end = startDate < endDate ? endDate : startDate;

        if (date >= start && date <= end) {
            day.classList.add("selected");
        }
    });
}

function clearSelection() {
    startDate = null;
    endDate = null;

    document.querySelectorAll(".day").forEach(day => {
        day.classList.remove("selected");
    });
}

document.addEventListener("mouseup", () => {
    isDragging = false;
});

const today = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

renderCalendar(currentYear, currentMonth);

// button
saveButton.addEventListener("click", () => {
    const text = eventInput.value.trim();

    if (text === "") return;

    const start = startDate < endDate ? startDate : endDate;
    const end = startDate < endDate ? endDate : startDate;

    events.push({
        id: nextEventId++,
        title: text,
        start,
        end
    });

    eventInput.value = "";
    modal.style.display = "none";

    clearSelection();
    renderCalendar(currentYear, currentMonth);
});

cancelButton.addEventListener("click", () => {
    eventInput.value = "";
    modal.style.display = "none";

    clearSelection();
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        eventInput.value = "";
        modal.style.display = "none";

        clearSelection();
    }
});

// switch month
document.getElementById("previousMonth").addEventListener("click", () => {
    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentYear, currentMonth);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentYear, currentMonth);
});

document.getElementById("currMonth").addEventListener("click", () => {
    const today = new Date();

    currentYear = today.getFullYear();
    currentMonth = today.getMonth();

    renderCalendar(currentYear, currentMonth);
});
