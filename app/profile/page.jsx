"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Загрузка...',
    tg: '@username',
    basicsCount: 0
  });

  useEffect(() => {
    // Получаем имя из localStorage (как в оригинальном коде)
    const savedName = localStorage.getItem('user_name') || 'Сотрудник';
    const savedTg = localStorage.getItem('user_tg') || '@kroll';
    
    // Получаем прогресс обучения
    const progress = JSON.parse(localStorage.getItem('tea_hub_progress') || '[]');

    setUser({
      name: savedName,
      tg: savedTg,
      basicsCount: progress.length
    });
  }, []);

  const handleLogout = () => {
    if (confirm('Выйти из профиля?')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      
      <div className={styles.profileCard}>
        <div className={styles.avatarCircle}>
          {user.name.charAt(0)}
        </div>
        
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.info}>{user.tg}</p>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user.basicsCount}</span>
            <span className={styles.statLabel}>Модулей пройдено</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {Math.round((user.basicsCount / 50) * 100)}%
            </span>
            <span className={styles.statLabel}>Прогресс курса</span>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
