// js/components/navigation.js

/**
 * Функция для инициализации навигации.
 * Она создает HTML-структуру меню и вставляет её в #nav-placeholder.
 */
export function initNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (!navPlaceholder) return;

    // Определяем текущую страницу, чтобы подсветить активную ссылку
    const currentPath = window.location.pathname;
    const page = currentPath.split("/").pop() || 'index.html';

    const navHTML = `
        <nav class="nav-container">
            <div class="nav-content">
                <a href="index.html" class="logo">TEA MASTER HUB</a>
                <div class="nav-links">
                    <a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Главная</a>
                    <a href="search.html" class="${page === 'search.html' ? 'active' : ''}">База знаний</a>
                    <a href="tasks.html" class="${page === 'tasks.html' ? 'active' : ''}">Задачи</a>
                    <a href="profile.html" class="${page === 'profile.html' ? 'active' : ''}">Профиль</a>
                    <a href="admin.html" class="${page === 'admin.html' ? 'active' : ''}" id="admin-link" style="display: none;">Админ</a>
                    <button id="auth-btn" class="auth-button">Войти</button>
                </div>
            </div>
        </nav>
    `;

    navPlaceholder.innerHTML = navHTML;

    // Вызываем проверку прав (показывать ли ссылку на админку)
    checkAdminAccess();
    
    // Вешаем обработчик на кнопку входа
    setupAuthLogic();
}

/**
 * Простая логика отображения кнопки админа
 * В будущем здесь будет проверка сессии Supabase
 */
function checkAdminAccess() {
    const userRole = localStorage.getItem('userRole');
    const adminLink = document.getElementById('admin-link');
    if (userRole === 'admin' && adminLink) {
        adminLink.style.display = 'block';
    }
}

/**
 * Управление текстом кнопки (Войти/Выйти)
 */
function setupAuthLogic() {
    const authBtn = document.getElementById('auth-btn');
    const userRole = localStorage.getItem('userRole');

    if (userRole) {
        authBtn.textContent = 'Выйти';
        authBtn.onclick = () => {
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        };
    } else {
        authBtn.textContent = 'Войти';
        authBtn.onclick = () => {
            // Здесь можно вызывать модальное окно или перенаправлять на логин
            const pass = prompt("Введите пароль (11 - админ, 1 - стажер):");
            if (pass === '11') {
                localStorage.setItem('userRole', 'admin');
                location.reload();
            } else if (pass === '1') {
                localStorage.setItem('userRole', 'user');
                location.reload();
            }
        };
    }
}