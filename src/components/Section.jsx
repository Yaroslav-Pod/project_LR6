import React from 'react';

export default function Section({ title, children }) {
  return (
    <section className="catalog-section">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}