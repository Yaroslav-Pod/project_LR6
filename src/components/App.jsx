import React, { useState } from 'react';
import Header from './Header';
import Filter from './Filter';
import '../App.css'; 

export default function App() {
  // Стани
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="app-container">
      {/* Шапка сайту */}
      <Header query={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="catalog-layout">
        {/* Бокова панель (Сайдбар) */}
        <aside className="catalog-sidebar">
          
          {/* Секція форми додавання */}
          <div className="catalog-section">
            <h2>Додати новий елемент</h2>
            <div className="add-movie-form">
              <input type="text" placeholder="Назва фільму" />
              <select>
                <option>Action</option>
                <option>Drama</option>
              </select>
              <button type="button">Додати</button>
            </div>
          </div>
          
          {/* Секція фільтрації */}
          <div className="catalog-section">
            <h2>Фільтрація</h2>
            <Filter currentFilter={filter} onFilterChange={setFilter} />
          </div>

        </aside>

        {/* Головна частина з картками */}
        <main className="catalog-main">
          <div className="catalog-section">
            <h2>Каталог елементів</h2>
            
            <div className="movies-grid">
              {/* Приклади карток */}
              <div className="movie-card">
                <span className="movie-badge">★ 5</span>
                <img src="https://via.placeholder.com/220x280" alt="Постер" className="movie-poster" />
                <div className="movie-content">
                  <span className="movie-tag">Action</span>
                  <h3>Тестовий Фільм 1</h3>
                  <button className="delete-btn">Видалити</button>
                </div>
              </div>

              <div className="movie-card">
                <span className="movie-badge">★ 4</span>
                <img src="https://via.placeholder.com/220x280" alt="Постер" className="movie-poster" />
                <div className="movie-content">
                  <span className="movie-tag">Drama</span>
                  <h3>Тестовий Фільм 2</h3>
                  <button className="delete-btn">Видалити</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}