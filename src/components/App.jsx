import React, { useState, useEffect } from 'react';
import Header from './Header';
import Filter from './Filter';
import ItemList from './ItemList';
import '../App.css'; 

// API для тестування (імітація каталогу фільмів)
const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=12'; 

export default function App() {
  // Стани
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Завантаження даних із API при монтуванні (з AbortController)
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchItems() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Не вдалося завантажити дані з сервера');
        
        const data = await response.json();
        // Адаптуємо дані під фільми
        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title.split(' ').slice(0, 3).join(' '), // короткі назви
          image: item.url,
          rating: Math.floor(Math.random() * 5) + 1, // фейковий рейтинг 1-5
          genre: item.id % 2 === 0 ? 'Action' : 'Drama'
        }));
        
        setItems(formattedData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
    return () => controller.abort(); // Cleanup функція
  }, []);

  // Метод управління станом (видалення)
  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Фільтрація та пошук даних
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.genre === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      {/* Шапка з пошуком */}
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
            
            {/* Умовний рендеринг станів інтерфейсу та виклик ItemList */}
            {isLoading && <p className="loading-text">Завантаження даних...</p>}
            
            {error && <p className="error-message">Помилка: {error}</p>}
            
            {!isLoading && !error && filteredItems.length === 0 && (
              <p className="empty-message">Нічого не знайдено 🍿</p>
            )}
            
            {!isLoading && !error && filteredItems.length > 0 && (
              <ItemList items={filteredItems} onDelete={handleDeleteItem} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}