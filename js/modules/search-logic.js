// js/modules/search-logic.js
import { TEA_DATA, COFFEE_DATA } from '../data.js';

export function initSearch() {
    const container = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    if (!container) return;

    const allItems = [...TEA_DATA, ...COFFEE_DATA];

    const render = (items) => {
        container.innerHTML = items.map(item => `
            <div class="glass-card product-card">
                <span class="product-category">${item.category}</span>
                <h3>${item.name}</h3>
                <div class="strength-meter">
                    ${[1, 2, 3, 4, 5].map(dot => `
                        <div class="dot ${dot <= item.strength ? 'active' : ''}"></div>
                    `).join('')}
                </div>
                <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">${item.description}</p>
                <button style="margin-top: 15px;" onclick="alert('Подробности: ${item.origin || item.process}')">Инфо</button>
            </div>
        `).join('');
    };

    // Слушатель поиска
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allItems.filter(i => i.name.toLowerCase().includes(query));
        render(filtered);
    });

    render(allItems);
}