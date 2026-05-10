/**
 * ГЛАВНЫЙ ФАЙЛ УПРАВЛЕНИЯ (Entry Point)
 * Этот скрипт подключается ко всем HTML-страницам.
 */

// Импортируем компоненты и модули
import { initNavigation } from './components/navigation.js';
import { initAuth } from './modules/auth.js';
import { initSearch } from './modules/search-logic.js';
import { initTasks } from './modules/tasks-logic.js';
import { initAdmin } from './modules/admin-logic.js';

// Основная функция инициализации, которая сработает после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация общих элементов
    // Вставляет меню во все страницы через <div id="nav-placeholder">
    initNavigation();
    
    // Проверка прав доступа и текущей сессии пользователя
    initAuth();

    // 2. Определение текущей страницы по URL
    const currentPath = window.location.pathname;
    
    // Чистое имя файла (например, "search.html")
    const currentPage = currentPath.split("/").pop() || 'index.html';

    console.log(`[System] Загружена страница: ${currentPage}`);

    // 3. Запуск логики в зависимости от страницы
    try {
        switch (currentPage) {
            case 'index.html':
                initHomePage();
                break;
            
            case 'search.html':
                initSearch();
                break;
            
            case 'tasks.html':
                initTasks();
                break;
            
            case 'admin.html':
                initAdmin();
                break;
            
            case 'profile.html':
                initProfilePage();
                break;

            default:
                // Если мы в корне или на неизвестной странице
                if (currentPage === '' || currentPage === '/') {
                    initHomePage();
                }
                break;
        }
    } catch (error) {
        console.error(`[Error] Ошибка при инициализации модуля ${currentPage}:`, error);
    }
});

/**
 * Вспомогательная логика для Главной страницы
 */
function initHomePage() {
    console.log("Логика главной страницы запущена");
    // Здесь можно добавить анимации появления карточек (Reveal effect)
}

/**
 * Вспомогательная логика для Профиля
 */
function initProfilePage() {
    const role = localStorage.getItem('userRole') || 'Гость';
    const profileName = document.getElementById('profile-user-name');
    
    if (profileName) {
        profileName.textContent = role === 'admin' ? 'Администратор HUB' : 'Сотрудник магазина';
    }
}