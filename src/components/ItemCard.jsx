import React from 'react';
import { truncateText } from '../utils/helpers';

export default function ItemCard({ id, title, image, description, rating, genre, onDelete }) {
  return (
    <div className="movie-card">
      <div className="movie-badge">⭐ {rating}</div>
      <img 
        src={image} 
        alt={title} 
        className="movie-poster"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster'; }} 
      />
      <div className="movie-content">
        <span className="movie-tag">{genre}</span>
        <h3>{title}</h3>
        <p>{truncateText(description, 90)}</p>
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Видалити
        </button>
      </div>
    </div>
  );
}