import React from 'react';
import './assets/css/categories.css';

const categories = [
  {
    title: 'Elementos químicos',
    description: 'Explora el fascinante mundo de los elementos químicos. Aprende sobre la tabla periódica, la estructura atómica y cómo estos elementos se combinan para formar compuestos que son fundamentales para la vida y la tecnología. '
  },
  {
    title: 'Combinaciones',
    description: 'Sumérgete en el estudio de combinaciones y permutaciones, herramientas esenciales en matemáticas y estadística. Aprende a calcular diferentes formas de agrupar elementos, ya sea en la resolución de problemas de probabilidad o en la planificación de eventos. '
  },
  {
    title: 'Operaciones',
    description: 'Domina las operaciones matemáticas básicas como la suma, resta, multiplicación y división. Aprende cómo estas operaciones se aplican en problemas de la vida real, desde el cálculo de presupuestos hasta la medición de ingredientes en recetas.'
  },
  {
    title: 'Tips',
    description: 'Descubre consejos útiles y trucos prácticos para mejorar tu productividad y creatividad. Desde técnicas de estudio efectivas hasta estrategias de diseño, estos tips están diseñados para ayudarte a optimizar tu tiempo y recursos. '
  },
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
