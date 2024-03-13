import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'sonner';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import '../styles/ProductModal.css';

const ProductModal = ({ producto, cerrarModal }) => {
  const [estadoCarrito, setEstadoCarrito] = useState('');
  const [botonTexto, setBotonTexto] = useState('Agregar a la cesta');
  const [favoritos, setFavoritos] = useState({});

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

  const addFav = (producto) => {
    setFavoritos((prevFavoritos) => {
      const claveUnicaProducto = producto.key;
      const isFavorito = prevFavoritos[claveUnicaProducto];
      const nuevosFavoritos = { ...prevFavoritos, [claveUnicaProducto]: !isFavorito };

      const favoritosActuales = JSON.parse(localStorage.getItem('Favoritos')) || [];
      const { imagenProduct, precio, producto: nombreProducto, key } = producto;
      const productoEnFavoritos = { imagenProduct, precio, producto: nombreProducto, key };

      if (isFavorito) {
        const nuevosFavoritosActuales = favoritosActuales.filter(
          (fav) => fav.key !== claveUnicaProducto
        );
        localStorage.setItem('Favoritos', JSON.stringify(nuevosFavoritosActuales));
      } else {
        favoritosActuales.push(productoEnFavoritos);
        localStorage.setItem('Favoritos', JSON.stringify(favoritosActuales));
      }

      return nuevosFavoritos;
    });
  };

  const carruselRef = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);

  const startScroll = (direction) => {
    stopScroll();
    const interval = setInterval(() => {
      if (carruselRef.current) {
        const { scrollLeft } = carruselRef.current;
        const scrollAmount = direction === 'left' ? -20 : 20;
        carruselRef.current.scrollTo({ left: scrollLeft + scrollAmount });
      }
    }, 100);
    setScrollInterval(interval);
  };

  const stopScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
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
          {producto.descuento ?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.8 9.2C20.4 8.8 20.2 8.3 20.2 7.8C20.2 5.6 18.4 3.8 16.2 3.8C15.7 3.8 15.2 3.6 14.8 3.2C13.2 1.6 10.7 1.6 9.1 3.2C8.8 3.6 8.3 3.8 7.8 3.8C5.6 3.8 3.8 5.6 3.8 7.8C3.8 8.3 3.6 8.8 3.2 9.2C1.6 10.8 1.6 13.3 3.2 14.9C3.6 15.3 3.8 15.8 3.8 16.3C3.8 18.5 5.6 20.3 7.8 20.3C8.3 20.3 8.8 20.5 9.2 20.9C10 21.6 11 22 12 22C13 22 14.1 21.6 14.8 20.8C15.2 20.4 15.7 20.2 16.2 20.2C18.4 20.2 20.2 18.4 20.2 16.2C20.2 15.7 20.4 15.2 20.7 14.8C22.4 13.3 22.4 10.7 20.8 9.2ZM19.4 13.4C18.6 14.2 18.2 15.2 18.2 16.2C18.2 17.3 17.3 18.2 16.2 18.2C15.1 18.2 14.1 18.6 13.4 19.4C12.6 20.2 11.4 20.2 10.6 19.4C9.8 18.6 8.8 18.2 7.8 18.2C6.7 18.2 5.8 17.3 5.8 16.2C5.8 15.1 5.4 14.1 4.6 13.4C3.8 12.6 3.8 11.4 4.6 10.6C5.4 9.8 5.8 8.8 5.8 7.8C5.8 6.7 6.7 5.8 7.8 5.8C8.9 5.8 9.9 5.4 10.6 4.6C11 4.2 11.5 4 12 4C12.5 4 13 4.2 13.4 4.6C14.2 5.4 15.2 5.8 16.2 5.8C17.3 5.8 18.2 6.7 18.2 7.8C18.2 8.9 18.6 9.9 19.4 10.6C20.2 11.4 20.2 12.6 19.4 13.4Z" fill="#FFD130" />
              <path d="M14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15Z" fill="#FFD130" />
              <path d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z" fill="#FFD130" />
              <path d="M13.3 9.3L9.3 13.3C8.9 13.7 8.9 14.3 9.3 14.7C9.5 14.9 9.7 15 10 15C10.3 15 10.5 14.9 10.7 14.7L14.7 10.7C15.1 10.3 15.1 9.7 14.7 9.3C14.3 8.9 13.7 8.9 13.3 9.3Z" fill="#FFD130" />
            </svg>
            : ''}
        </div>

        <picture id='container__picture'>
          <img className='imagen-modal' src={producto.imagenProduct} alt="producto imagen" />
          {producto.tonoImage ?
            <img className='imagen-modal-tono' loading='lazy' src={producto.tonoImage} alt="producto tono" /> : ''}
        </picture>

        <section className='information'>
          <section id="sec1">
            <p className='nombre-modal'>{producto.producto}</p>
            <Heart
              onClick={() => addFav(producto)}
              stroke='#000'
              size={30}
              className={`favorite__button ${favoritos[producto.key] ? 'favorite__button__favorite' : ''
                }`}
            />
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
            <img src='./bolsa-blanca.svg' style={{ height: 25, width: 25, aspectRatio: 1 }} />

            {estadoCarrito || botonTexto}
          </button>

          <div className="precio-modal">
            <p className='text-[13px] font-semibold text-[#dbd199]'>Total</p>
            <p className='leading-[15px]'>L.{(precioInicial).toFixed(2)}</p>
          </div>
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