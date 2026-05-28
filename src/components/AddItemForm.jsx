import React, { useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: 'Drama',
    rating: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.rating) {
      alert('Будь ласка, заповніть усі поля форми!');
      return;
    }

    const newMovie = {
      id: Date.now(), // Унікальний ID
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      rating: parseFloat(formData.rating) || 0,
      image: `https://picsum.photos/seed/${Date.now()}/300/450`
    };

    onAdd(newMovie);
    
    // Очищення полів форми
    setFormData({ title: '', description: '', genre: 'Drama', rating: '' });
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h3>Додати фільм</h3>
      
      <input
        type="text"
        placeholder="Назва фільму"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      
      <textarea
        placeholder="Короткий опис"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      
      <div className="form-inline">
        <select
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        >
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
        </select>
        
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="Рейтинг (0-10)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
      </div>
      
      <button type="submit">Зберегти до каталогу</button>
    </form>
  );
}