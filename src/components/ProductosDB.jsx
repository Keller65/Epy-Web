import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from './data';
import ProductDetails from './ProductDetails';
import '../styles/Productos.css';
import { DATBASE_PRODUCTS } from './data';

export function ProductosDB({ searchTerm }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const auth = getAuth(app);

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, DATBASE_PRODUCTS));
      const datosProductos = [];
      querySnapshot.forEach((doc) => {
        datosProductos.push({ key: doc.id, ...doc.data() });
      });
      setProductos(datosProductos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        obtenerProductos();
      } else {
        console.log('El usuario no está autenticado');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const productosFiltrados = searchTerm
    ? productos.filter((producto) => {
      const productoLowerCase = (producto.producto || '').toLowerCase();
      const marcaLowerCase = (producto.marca || '').toLowerCase();
      const tipoLowerCase = (producto.tipo || '').toLowerCase();
      const keyLowerCase = (producto.key || '').toLowerCase();

      const priceLowerCase = (
        (producto.precio - producto.descuento) || ''
      ).toString();

      return (
        productoLowerCase.includes(searchTerm.toLowerCase()) ||
        marcaLowerCase.includes(searchTerm.toLowerCase()) ||
        tipoLowerCase.includes(searchTerm.toLowerCase()) ||
        priceLowerCase.includes(searchTerm.toLowerCase()) ||
        keyLowerCase.includes(searchTerm.toLowerCase())
      );

    })
    : [];

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return searchTerm ? (
    <React.Fragment>
      <div className='Card_Container'>
        {productosFiltrados.map((producto, index) => (
          <div key={index} className="card-ui">
            <picture className='container-picture' onClick={() => abrirModal(producto)}>
              <img className='Product-img' loading="lazy" src={producto.imagenProduct} alt={producto.producto} />
            </picture>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 5 }}>
              <p className='marcaProducto' onClick={() => abrirModal(producto)}>
                {producto.producto}
              </p>
              <p className='precio'>L .{(producto.precio - producto.descuento).toFixed(0)}</p>
            </div>
          </div>
        ))}
      </div>
      {modalAbierto && <ProductDetails producto={productoSeleccionado} cerrarModal={cerrarModal} />}
    </React.Fragment>
  ) : null;
}

ProductosDB.propTypes = {
  searchTerm: PropTypes.string,
};