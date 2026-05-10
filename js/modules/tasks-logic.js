// js/modules/tasks-logic.js
import { TRAINING_COURSES, WEEKLY_PLAN } from '../data.js';

export function initTasks() {
    const courseContainer = document.getElementById('courses-list');
    const planContainer = document.getElementById('weekly-plan-list');

    if (courseContainer) {
        courseContainer.innerHTML = TRAINING_COURSES.map(course => `
            <div class="task-item">
                <div>
                    <div style="font-weight: 600;">${course.title}</div>
                    <div style="font-size: 0.7rem; color: gray;">Длительность: ${course.duration}</div>
                </div>
                <span class="badge">Курс</span>
                <button onclick="alert('Запуск курса: ${course.title}')">Начать</button>
            </div>
        `).join('');
    }

    if (planContainer) {
        planContainer.innerHTML = WEEKLY_PLAN.map(item => `
            <div class="task-item">
                <span style="color: ${item.status === 'completed' ? '#4ade80' : 'white'}">
                    День ${item.day}: ${item.task}
                </span>
                <span class="badge" style="opacity: 0.5;">${item.status}</span>
            </div>
        `).join('');
    }
}