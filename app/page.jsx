"use client";

import React from 'react';
import Link from 'next/link';
import Navigation from './components/Navigation';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Навигация будет видна на всех страницах */}
      <Navigation />

      <section className={styles.hero}>
        <h1 className={styles.title}>
          TEA MASTER <br /> HUB
        </h1>
        
        <p className={styles.subtitle}>
          Добро пожаловать в образовательную экосистему для чайных мастеров. 
          Изучайте ботанику, совершенствуйте сервис и проходите аттестацию в одном месте.
        </p>

        <div className={styles.buttonGroup}>
          <Link href="/tasks" className={styles.primaryBtn}>
            Начать обучение
          </Link>
          <Link href="/search" className={styles.secondaryBtn}>
            База знаний
          </Link>
        </div>
      </section>

      {/* Футер можно оставить простым текстом */}
      <footer style={{ 
        marginTop: '50px', 
        color: '#444', 
        fontSize: '12px', 
        letterSpacing: '1px' 
      }}>
        © {new Date().getFullYear()} TEA MASTER HUB. STAFF ONLY.
      </footer>
    </main>
  );
}
