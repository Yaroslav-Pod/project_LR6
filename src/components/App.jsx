import React, { useState, useEffect } from 'react';
import Header from './Header';
import Filter from './Filter';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Section from './Section';
import '../App.css'; 

const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=12'; 

export default function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // 1. Додаємо стан для сортування (за замовчуванням 'default')
  const [sortBy, setSortBy] = useState('default'); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchItems() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Не вдалося завантажити дані з сервера');
        
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title.split(' ').slice(0, 3).join(' '), 
          image: `https://picsum.photos/seed/movie-${item.id}/300/450`,
          rating: (Math.random() * 9 + 1).toFixed(1), 
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
    return () => controller.abort();
  }, []);

  const handleAddItem = (newItem) => {
    setItems(prev => [...prev, { ...newItem, id: Date.now() }]);
  };

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // 2. Спочатку фільтруємо дані
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || item.genre === filter;
    return matchesSearch && matchesFilter;
  });

  // 3. Потім сортуємо відфільтровані дані (створюємо копію масиву через [...spread])
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating; // Від вищого рейтингу до нижчого
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title); // Сортування за алфавітом (А-Я)
    }
    return 0; // 'default' — залишаємо як є
  });

  return (
    <div className="app-container">
      <Header query={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <Section title="Додати новий елемент">
            <AddItemForm onAdd={handleAddItem} />
          </Section>
          
          <Section title="Фільтрація та сортування">
            {/* 4. Передаємо нові пропси для сортування у компонент Filter */}
            <Filter 
              currentFilter={filter} 
              onFilterChange={setFilter} 
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </Section>
        </aside>

        <main className="catalog-main">
          <Section title="Каталог елементів">
            {isLoading && <p className="loading-text">Завантаження даних...</p>}
            
            {error && <p className="error-message">Помилка: {error}</p>}
            
            {/* 5. Рендеримо вже відфільтрований ТА відсортований масив */}
            {!isLoading && !error && sortedAndFilteredItems.length === 0 && (
              <p className="empty-message">Нічого не знайдено 🍿</p>
            )}
            
            {!isLoading && !error && sortedAndFilteredItems.length > 0 && (
              <ItemList items={sortedAndFilteredItems} onDelete={handleDeleteItem} />
            )}
          </Section>
        </main>
      </div>
    </div>
  );
}