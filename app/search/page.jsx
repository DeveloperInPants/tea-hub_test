"use client";

import React, { useState, useMemo } from 'react';
import Navigation from '../components/Navigation';
import { INITIAL_BASICS } from '../data/learningContent';
import styles from './search.module.css';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  // Логика поиска: проходим по всем секциям и модулям
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const results = [];
    const lowerQuery = query.toLowerCase();

    INITIAL_BASICS.forEach(section => {
      section.modules.forEach(module => {
        // Ищем в заголовке или в текстовых блоках t1, t2, t3
        const inTitle = module.title.toLowerCase().includes(lowerQuery);
        const inContent = (module.t1 + module.t2 + module.t3).toLowerCase().includes(lowerQuery);

        if (inTitle || inContent) {
          results.push({
            ...module,
            sectionTitle: section.title
          });
        }
      });
    });

    return results;
  }, [query]);

  return (
    <div className={styles.container}>
      <Navigation />
      
      <div className={styles.searchWrapper}>
        <h1 className={styles.title}>База знаний</h1>
        
        <input 
          type="text" 
          className={styles.searchBar}
          placeholder="Поиск по темам, сортам чая или техникам..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className={styles.resultsList}>
          {filteredResults.length > 0 ? (
            filteredResults.map(result => (
              <div 
                key={result.id} 
                className={styles.resultCard}
                onClick={() => window.location.href = `/tasks?mod=${result.id}`}
              >
                <div style={{ fontSize: '10px', color: '#555', marginBottom: '5px' }}>
                  {result.sectionTitle}
                </div>
                <div className={styles.moduleTitle}>{result.title}</div>
                <p className={styles.previewText}>
                  {result.t1} {result.t2}
                </p>
              </div>
            ))
          ) : query.trim() !== '' ? (
            <div className={styles.emptyState}>Ничего не найдено по вашему запросу</div>
          ) : (
            <div className={styles.emptyState}>Введите запрос, чтобы начать поиск</div>
          )}
        </div>
      </div>
    </div>
  );
}
