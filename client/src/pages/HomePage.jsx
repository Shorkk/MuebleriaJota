import React from 'react'
import Catalogo from "./Catalogo.jsx" 
// import "../styles/homepage.css"
 
const HomePage = () => {
  return (
    <>
      <h1>MUEBLERÍA JOTA</h1>
      <h4>¡Bienvenido a nuestra increíble aplicación!</h4>
      <h2>¡Productos Destacados del día!</h2>
      <div className="productos-grid">
          <div className="card">
            <img
              src="https://raw.githubusercontent.com/PiaAchigarITBA/img_muebleria/master/img/aparador_uspallata.png"
              alt="Aparador Uspallata"
              className="product-card__img"
            />
            <h3>Aparador Uspallata</h3>
            <p><s>$28000</s></p>
            <p><strong>$18000</strong></p>
          </div>
          <div className="card">
            <img
              src="https://raw.githubusercontent.com/PiaAchigarITBA/img_muebleria/master/img/mesa_de_centro_araucaria.png"
              alt="Mesa de Centro Araucaria"
              className="product-card__img"
            />
            <h3>Mesa de Centro Araucaria</h3>
            <p><s>$30000</s></p>
            <p><strong>$22000</strong></p>
          </div>
      </div>
    </>
  )
}

export default HomePage;