import { useState } from 'react';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'sonner';
import { Ticket, X } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/ProductModal.css';

const ProductModal = ({ producto, cerrarModal }) => {
  const [estadoCarrito, setEstadoCarrito] = useState('');
  const [botonTexto, setBotonTexto] = useState('Agregar a la cesta');

  const precio = parseFloat(producto?.precio) ?? 0;
  const descuento = parseFloat(producto?.descuento) ?? 0;
  const precioInicial = precio - descuento;

  const agregarAlCarrito = () => {
    if (!producto) {
      console.error('El objeto producto es undefined');
      return;
    }

    const itemsCarrito = JSON.parse(localStorage.getItem('cartItems')) || [];

    const infoProducto = {
      imagen: producto?.imagenProduct,
      nombre: producto?.producto,
      marca: producto?.marca,
      precio: precio - descuento,
      cantidad: 1,
    };

    itemsCarrito.push(infoProducto);
    localStorage.setItem('cartItems', JSON.stringify(itemsCarrito));

    setEstadoCarrito('Agregado a la cesta!');
    setBotonTexto('Agregar al cesta');

    toast.message(infoProducto.nombre + ' agregada al carrito');
  };

  return (
    <motion.div className="modal-overlay"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ ease: "linear", duration: 0.2 }}
    >
      <motion.div className="modal-content">
        <div className='descuento-icon'>
          {producto.descuento ? <Ticket size={25} fill='transparent' stroke='#ffcc80' strokeWidth={2} /> : ''}
        </div>

        <picture id='container__picture'>
          <img className='imagen-modal' src={producto.imagenProduct} alt="producto imagen" />
          {producto.tonoImage ?
            <img className='imagen-modal-tono' src={producto.tonoImage} alt="producto tono" /> : ''}
        </picture>

        <section className='information'>
          <section id="sec1">
            <p className='nombre-modal'>{producto.producto}</p>
          </section>
          <p className='marca-modal'>{producto.marca}</p>

          <p className='descripcion-modal'>{producto.descripcion}</p>

          <section id='container_tonos'>
            <p id='text_tonos'>tonos</p>
            {Array.isArray(producto.tonos) && producto.tonos.map((tono, index) => (
              <div key={index} className='tonoCircle' style={{ backgroundColor: tono }}></div>
            ))}
          </section>
        </section>

        <section className='button-container'>
          <button className='addtoCart text-neutral-50 after:absolute active:scale-95 active:transition active:after:scale-x-125 active:after:scale-y-150 active:after:opacity-0 active:after:transition active:after:duration-500' onClick={agregarAlCarrito}>
            <img src='../../../public/bolsa-blanca.svg' style={{ height: 25, width: 25, aspectRatio: 1 }} />

            {estadoCarrito || botonTexto}
          </button>

          <p className='precio-modal'>L.{(precioInicial).toFixed(2)}</p>
        </section>

        <button onClick={cerrarModal} id='close'>
          <X color='#bababa' size={20} />
        </button>
      </motion.div>
      <Toaster richColors position="top-right" closeButton />
    </motion.div>
  );
};

ProductModal.propTypes = {
  producto: PropTypes.shape({
    imagenProduct: PropTypes.string.isRequired,
    tonoImage: PropTypes.string,
    producto: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    descuento: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    descripcion: PropTypes.string.isRequired,
    tono: PropTypes.string,
    tonos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  cerrarModal: PropTypes.func.isRequired,
};

export default ProductModal;