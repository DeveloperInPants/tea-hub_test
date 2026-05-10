"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navigation.module.css';

const Navigation = () => {
  const pathname = usePathname();

  // Список ссылок для навигации
  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Задания', href: '/tasks' },
    { name: 'Поиск', href: '/search' },
    { name: 'Профиль', href: '/profile' },
    { name: 'Админ', href: '/admin' },
  ];

  return (
    <nav className={styles.nav}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link 
            key={link.href} 
            href={link.href}
            className={`${styles.link} ${isActive ? styles.active : ''}`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
