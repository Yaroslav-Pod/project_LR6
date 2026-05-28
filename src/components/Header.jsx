import React from 'react';

export default function Header({ query, onSearchChange }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>Фільмотека</h1>
        <p>Каталог кіно</p>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Пошук фільму за назвою..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}