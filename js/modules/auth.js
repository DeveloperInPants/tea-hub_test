// js/modules/auth.js

export function initAuth() {
    // Проверка при загрузке: если пользователь на странице админа, но он не админ — выкидываем на главную
    const role = localStorage.getItem('userRole');
    const path = window.location.pathname;

    if (path.includes('admin.html') && role !== 'admin') {
        alert("Доступ запрещен");
        window.location.href = 'index.html';
    }
}

export function login(password) {
    if (password === '11') {
        localStorage.setItem('userRole', 'admin');
        return 'admin';
    } else if (password === '1') {
        localStorage.setItem('userRole', 'user');
        return 'user';
    }
    return null;
}