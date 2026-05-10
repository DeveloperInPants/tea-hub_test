// js/modules/admin-logic.js

export function initAdmin() {
    const calendarGrid = document.getElementById('calendar-grid');
    const statsContainer = document.getElementById('employee-stats');
    if (!calendarGrid) return;

    // Генерация календаря (упрощенная)
    const daysInMonth = 31;
    const currentDay = new Date().getDate();
    
    let calendarHTML = '';
    for (let i = 1; i <= daysInMonth; i++) {
        calendarHTML += `<div class="day-cell ${i === currentDay ? 'current' : ''}">${i}</div>`;
    }
    calendarGrid.innerHTML = calendarHTML;

    // Демонстрация прогресса сотрудников
    const staff = [
        { name: "Иван Иванов", progress: 75 },
        { name: "Анна Смирнова", progress: 40 },
        { name: "Петр Сидоров", progress: 95 }
    ];

    if (statsContainer) {
        statsContainer.innerHTML = staff.map(person => `
            <div class="progress-container">
                <div class="progress-label">
                    <span>${person.name}</span>
                    <span>${person.progress}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${person.progress}%"></div>
                </div>
            </div>
        `).join('');
    }
}