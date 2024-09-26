import React from 'react';
import './assets/css/banner.css';
import bannerImage from '/img/banner.png'; // Cambia la ruta según tu estructura de archivos

function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>QuimiCraft</h2>
        <p>QuimiCraft es una plataforma interactiva orientada al fácil aprendizaje de la química con diferentes métodos y opciones para ayudarte con el proceso didáctico.</p>
        <button className="learn-more">Continuar</button>
      </div>
      <img src={bannerImage} alt="Banner" className="banner-image" /> {/* Imagen añadida */}
    </div>
  );
}

export default Banner;
