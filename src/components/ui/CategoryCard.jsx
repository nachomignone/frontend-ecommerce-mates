import React from 'react';

function CategoryCard({ name, icon, link }) {
  return (
    <a href={link} className="category-card">
      <div className="category-icon">{icon}</div>
      <h4 className="category-name">{name}</h4>
    </a>
  );
}

export default CategoryCard;