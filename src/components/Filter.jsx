import React from 'react';

// 1. Приймаємо правильні назви пропсів з App.js
export default function Filter({ currentFilter, onFilterChange, sortBy, onSortChange }) {
  
  // Використовуємо масив об'єктів, щоб розділити значення для логіки (value) та текст для людей
  const genres = [
    { value: 'all', label: 'Всі' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Crime', label: 'Crime' }
  ];

  return (
    <div className="filter-sort-bar">
      <div className="filter-group">
        <label htmlFor="genre-select">Жанр:</label>
        <select 
          id="genre-select" 
          value={currentFilter} // Змінено на currentFilter
          onChange={(e) => onFilterChange(e.target.value)} // Змінено на onFilterChange
        >
          {genres.map(g => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Сортувати:</label>
        {/* Сортування працюватиме, якщо ви згодом передадите sortBy та onSortChange з App.js */}
        <select 
          id="sort-select" 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">За замовчуванням</option>
          <option value="rating">Рейтингом (від вищого)</option>
          <option value="title">Назвою (А-Я)</option>
        </select>
      </div>
    </div>
  );
}