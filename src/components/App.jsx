import React from 'react';
import '../App.css'; 

export default function App() {
  return (
    <div className="app-container">
      {/* Шапка сайту */}
      <header className="app-header">
        <div className="header-brand">
          <h1>Каталог Елементів</h1>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Пошук за назвою..." />
        </div>
      </header>
      
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
            <div className="filter-sort-bar">
              <div className="filter-group">
                <label>Оберіть жанр</label>
                <select>
                  <option>Усі жанри</option>
                  <option>Action</option>
                  <option>Drama</option>
                </select>
              </div>
            </div>
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