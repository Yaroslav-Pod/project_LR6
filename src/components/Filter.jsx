import React from 'react';

export default function Filter({ activeGenre, onGenreChange, sortBy, onSortChange }) {
  const genres = ["Всі", "Sci-Fi", "Action", "Adventure", "Crime", "Drama"];

  return (
    <div className="filter-sort-bar">
      <div className="filter-group">
        <label htmlFor="genre-select">Жанр:</label>
        <select 
          id="genre-select" 
          value={activeGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Сортувати:</label>
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