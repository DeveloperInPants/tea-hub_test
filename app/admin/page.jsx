"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './admin.module.css';

const MONTH_NAMES = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function AdminPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [stats, setStats] = useState({
    basicsCount: 0,
    userName: 'Сотрудник'
  });

  useEffect(() => {
    // Загрузка заметок
    const savedNotes = localStorage.getItem('admin_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    // Загрузка статистики
    const progress = JSON.parse(localStorage.getItem('tea_hub_progress') || '[]');
    const name = localStorage.getItem('user_name') || 'Ярик';
    setStats({ basicsCount: progress.length, userName: name });
  }, []);

  // --- Логика Календаря ---
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  // Корректировка для старта с Понедельника
  const startShift = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleDayClick = (day) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setSelectedDay(day);
    setNoteText(notes[key] || "");
  };

  const saveNote = () => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDay}`;
    const newNotes = { ...notes };
    if (noteText.trim()) newNotes[key] = noteText;
    else delete newNotes[key];
    
    setNotes(newNotes);
    localStorage.setItem('admin_notes', JSON.stringify(newNotes));
    setSelectedDay(null);
  };

  return (
    <div className={styles.container}>
      <Navigation />
      
      <div className={styles.dashboardGrid}>
        {/* ЛЕВАЯ ЧАСТЬ: Календарь */}
        <div className={styles.calendarCard}>
          <div className={styles.calendarHeader}>
            <button onClick={() => changeMonth(-1)}>←</button>
            <h2>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <button onClick={() => changeMonth(1)}>→</button>
          </div>

          <div className={styles.calendarGrid}>
            {DAYS_OF_WEEK.map(d => <div key={d} className={styles.dayName}>{d}</div>)}
            
            {Array(startShift).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
            
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
              
              return (
                <div 
                  key={day} 
                  className={`${styles.dayCell} ${isToday ? styles.today : ''} ${notes[key] ? styles.hasNote : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Инфо и Заметки */}
        <div className={styles.sidebar}>
          {/* Блок управления заметками */}
          <div className={styles.statBox}>
            <h3>{selectedDay ? `Заметка на ${selectedDay} число` : 'Выберите дату'}</h3>
            {selectedDay && (
              <>
                <textarea 
                  className={styles.inputField} 
                  rows="4" 
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Введите текст..."
                />
                <button className={styles.actionBtn} onClick={saveNote}>Сохранить</button>
              </>
            )}
          </div>

          {/* Статистика сотрудника */}
          <div className={styles.statBox}>
            <h3>Статистика: {stats.userName}</h3>
            <p>Курс "Основы": {stats.basicsCount} / 50</p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(stats.basicsCount / 50) * 100}%` }} 
              />
            </div>
            <button className={styles.actionBtn} style={{background: 'transparent', color: '#fff', border: '1px solid #333'}}>
              Сбросить прогресс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
