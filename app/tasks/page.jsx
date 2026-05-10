"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { INITIAL_BASICS } from '../data/learningContent';
import styles from './tasks.module.css';

export default function TasksPage() {
  // Состояния для прогресса и модалок
  const [completedModules, setCompletedModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizStep, setQuizStep] = useState(false); // false - читаем текст, true - тест

  // Загружаем прогресс из localStorage при запуске
  useEffect(() => {
    const saved = localStorage.getItem('tea_hub_progress');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  // Функция сохранения прогресса
  const markAsCompleted = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newProgress = [...completedModules, moduleId];
      setCompletedModules(newProgress);
      localStorage.setItem('tea_hub_progress', JSON.stringify(newProgress));
    }
    closeModal();
  };

  const closeModal = () => {
    setSelectedModule(null);
    setQuizStep(false);
  };

  return (
    <div className={styles.container}>
      <Navigation />
      
      <header className={styles.header}>
        <h1>Обучение Tea Master</h1>
        <p>Пройдено модулей: {completedModules.length} из 50</p>
      </header>

      <main className={styles.grid}>
        {INITIAL_BASICS.map((section) => (
          <div key={section.id} className={styles.section}>
            <h2>{section.title}</h2>
            {section.modules.map((mod) => (
              <div 
                key={mod.id} 
                className={`${styles.card} ${completedModules.includes(mod.id) ? styles.completed : ''}`}
                onClick={() => setSelectedModule(mod)}
              >
                <h3>{mod.title}</h3>
                <span>{completedModules.includes(mod.id) ? '✅ Пройдено' : '📖 Изучить'}</span>
              </div>
            ))}
          </div>
        ))}
      </main>

      {/* Модальное окно обучения */}
      {selectedModule && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            {!quizStep ? (
              /* ЭТАП 1: Чтение лекции */
              <div>
                <h2>{selectedModule.title}</h2>
                <div className={styles.textBlock}>
                  <p>{selectedModule.t1}</p>
                  <p>{selectedModule.t2}</p>
                  <p>{selectedModule.t3}</p>
                </div>
                <button 
                  className={styles.quizOption} 
                  style={{background: '#fff', color: '#000', textAlign: 'center', fontWeight: 'bold'}}
                  onClick={() => setQuizStep(true)}
                >
                  Перейти к тесту
                </button>
              </div>
            ) : (
              /* ЭТАП 2: Тестирование */
              <div>
                <h2>Проверка знаний</h2>
                {selectedModule.quiz.map((q, i) => (
                  <div key={i}>
                    <p>{q.q}</p>
                    {q.o.map((option, idx) => (
                      <button 
                        key={idx} 
                        className={styles.quizOption}
                        onClick={() => {
                          if (idx === q.c) {
                            alert("Правильно!");
                            markAsCompleted(selectedModule.id);
                          } else {
                            alert("Ошибка, попробуй еще раз");
                          }
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
