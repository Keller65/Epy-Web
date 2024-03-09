import React from 'react';
import PropTypes from 'prop-types';
import './page.css';
import { PackageOpen, X } from "lucide-react";

export function Lista({ onClose, pedido }) {
  return (
    <React.Fragment>
      <div className="listaProductos">
        <header id="header-page">
          <PackageOpen />

          <button onClick={onClose} className="close-button-page">
            <X size={15} color='#a8a8a8' />
          </button>
        </header>

        {pedido.productos.map((producto, index) =>
          <li key={index} className="product-list">
            {producto.nombre}

            <p id="precio-modal-list">L. {producto.precio.toFixed(2)}</p>
          </li>
        )}
      </div>
    </React.Fragment>
  )
}

Lista.propTypes = {
  onClose: PropTypes.func.isRequired,
  pedido: PropTypes.shape({
    productos: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
