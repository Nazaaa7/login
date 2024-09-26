import React from 'react';
import './assets/css/categories.css';

const categories = [
  { title: 'Sports', description: 'Become skillful in the field of sports with free tutorials.' },
  { title: 'Finance', description: 'Learn about financial education to manage your money better.' },
  { title: 'Science', description: 'Explore the wonders of science with easy-to-understand lessons.' },
  { title: 'Design', description: 'Get creative and learn design skills for your projects.' },
];

function Categories() {
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
