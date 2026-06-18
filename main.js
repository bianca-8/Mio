const calendar = document.getElementById("calendar");
let selectedDay = null;
let isDragging = false;
let startDate = null;
let endDate = null;

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

        day.addEventListener("mousedown", () => {
            isDragging = true;
            startDate = new Date(year, month, dayNumber);
            endDate = new Date(year, month, dayNumber);
        });

        day.addEventListener("mouseenter", () => {
            if (!isDragging) return;

            endDay = day;
            highlightSelection();
        });

        day.addEventListener("mouseup", () => {
            isDragging = false;

            modal.style.display = "flex";
        });

        day.dataset.index = i;

        calendar.appendChild(day);
    }
}

function highlightSelection() {
    document.querySelectorAll(".day").forEach(day => {
        day.classList.remove("selected");
    });

    const start = Math.min(
        Number(startDay.dataset.index),
        Number(endDay.dataset.index)
    );

    const end = Math.max(
        Number(startDay.dataset.index),
        Number(endDay.dataset.index)
    );

    document.querySelectorAll(".day").forEach(day => {
        const index = Number(day.dataset.index);

        if (index >= start && index <= end) {
            day.classList.add("selected");
        }
    });
}

document.addEventListener("mouseup", () => {
    isDragging = false;
});

const today = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

renderCalendar(today.getFullYear(), today.getMonth());

// button
const button = document.getElementById("saveButton");

saveButton.addEventListener("click", () => {
    const text = eventInput.value.trim();

    if (text === "") return;

    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.textContent = text;

    selectedDays.forEach(day => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.textContent = text;

        day.appendChild(eventDiv);
    });

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
