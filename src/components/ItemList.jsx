import React from 'react';
import ItemCard from './ItemCard';

export default function ItemList({ items, onDelete }) {
  return (
    <div className="movies-grid">
      {items.map(item => (
        <ItemCard key={item.id} {...item} onDelete={onDelete} />
      ))}
    </div>
  );
}