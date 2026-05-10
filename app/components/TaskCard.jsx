import React from 'react';
import styles from '../tasks/tasks.module.css';

export default function TaskCard({ module, isCompleted, onClick }) {
  return (
    <div 
      className={`${styles.card} ${isCompleted ? styles.completed : ''}`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <span className={styles.statusIcon}>{isCompleted ? '✅' : '📖'}</span>
        <h3>{module.title}</h3>
      </div>
      <p className={styles.preview}>Нажмите, чтобы начать изучение</p>
    </div>
  );
}
