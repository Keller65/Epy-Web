import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import { listaCards, Carrusel } from './data.js';
import { Footer } from './footer/Footer.jsx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Inicio.css';

export function InicioApp() {
  const nameUser = localStorage.getItem("nameuser");
  const foto = localStorage.getItem("photoUser") ?? 'assets/avatar.svg';
  const [, setUserCountry] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const [likes, setLikes] = useState(Array(listaCards.length).fill(false));

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const respuesta = await fetch('/marcas/Imagenes.json');
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const datos = await respuesta.json();
        setImagenes(datos);
      } catch (error) {
        console.error("Error al cargar el archivo JSON", error);
      }
    };
    cargarImagenes();
    Carrusel();
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const country = data.address.country;
          const state = data.address.suburb;
          setUserCountry(`${state} - ${country} `);

          const LocationDB = data.display_name;
          localStorage.setItem("Ubicacion", LocationDB);
          localStorage.setItem("Pais", country)
        } catch (error) {
          console.error("Error fetching country information", error);
          setUserCountry("Could not determine your country");
        }
      });
    } else {
      setUserCountry("Geolocation is not available in your browser");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = scrollPosition;
      setOpacity(newOpacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const text = `Bienvenido ${nameUser ? nameUser : 'Inicia sesion para comenzar'}!`.split("  ");

  const toggleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
    //const audioUrl = 'social/tap.mp3';
    //const audio = new Audio(audioUrl);
    //audio.play();
  };

  return (
    <React.Fragment>
      {/*<article className='top-0 left-0 w-full grid place-content-center bg-white py-3 z-50'>
        12% de descuento en todos los productos para este verano
      </article>*/}
      <div className="InicioAppp">
        <header className="menu">
          <aside className='controls'>
            <img src={foto ? foto : 'avatar.svg'} alt="foto del usuarios" className='foto' />
            <Navbar />
          </aside>
        </header>

        <main className='content-class-sections'>
          <section id='presentacion-screen'>
            <div className='flex justify-center items-center flex-col'>
              {text.map((el, i) => (
                <motion.span
                  className='leading-[0]'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: i / 10,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
              <motion.div
                className='font-semibold w-auto h-auto text-marca opacity-0 flex gap-[18px]'
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{
                  opacity: { ease: "linear" },
                  layout: { duration: 2 }
                }}
              >
                EPY <p className='text_gradient'>MACKEUP</p>
              </motion.div>
            </div>

            <section className='flex gap-4 mt-6'>
              <Link to='/Search' title='Ir al Buscador de productos' aria-description='' className='bg-[#ffefd3] text-[#4b3816] py-[5px] px-[12px]'>
                Buscar Productos
              </Link>

              <a href='#products' className='bg-[transparent] text-[#000] p-[5px] flex items-center justify-center gap-[2px]'>
                ver mas
                <img src="assets/chevron.svg" alt="chevron" className='h-[18px] w-[18px]' />
              </a>
            </section>
          </section>

          <div className="slider">
            <div className="slide-track">
              {imagenes.map((imagen, index) => (
                <div className="slide" key={index}>
                  <img width="80" height="50" src={imagen.src} alt={imagen.alt} className='h-[80px] w-50px aspect-[80/50]' loading='lazy' />
                </div>
              ))}
            </div>
          </div>
        </main>

        <section className='w-full h-auto flex gap-10 justify-center flex-wrap' style={{ opacity: opacity / 500 }}>
          <div className="image-container">
            <img className='image-cover w-[320px] h-[237px] aspect-[320/237]' src="assets/shopping-ilustracion.webp" alt="post_ilustracion_shopping" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Kits Personalizables</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>comenzar</Link>
            </div>
          </div>

          <div className="image-container">
            <img className='image-cover w-[320px] h-[237px] aspect-[320/237]' src="assets/ilustracion-cart.webp" alt="post_ilustracion_cart" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Descuento Especiales</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>ver descuentos</Link>
            </div>
          </div>

          <div className="image-container">
            <img className='image-cover w-[320px] h-[237px] aspect-[320/237]' src="assets/regalos.webp" alt="post_ilustracion_ideas" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Regalos por Compras</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>obtener regalos</Link>
            </div>
          </div>
        </section>

        <section className='w-full flex flex-col my-4 overflow-hidden overflow-x-scroll justify-center'>
          <div id='products' className="w-full flex items-center justify-center gap-2 pt-10">
            <img src="assets/sparkle.svg" alt="sparkle.svg" className='' />
            <h1 className='text-xl'>Productos en Promocion</h1>
          </div>
          <div id='carrusel_products' className='w-full flex gap-4 my-4 overflow-hidden overflow-x-scroll justify-center'>
            {listaCards.map((card, index) => (
              <div key={index} className="flex flex-col w-[200px] h-fit"> {/*e7f6ff*/}
                <picture className='h-fit w-[200px] bg-[#fffaee] flex items-center justify-center aspect-video select-none'>
                  <img className='h-[150px] w-[150px]' src={card.imagen} alt={`imagen ${card.titulo}`} loading='lazy' />
                </picture>

                <section className='w-full flex flex-col gap-[12px]'>
                  <div className='flex flex-col gap-[3px]'>
                    <p className='font-semibold text-[18px]'>{card.marca}</p>
                    <p className='text-[12px] text-[#b9b9b9] leading-3 text-pretty fon'>{card.edition}</p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className="tooltip">
                      <p>L.{(card.price - card.descuento).toFixed(0)}</p>
                      <span className="tooltiptext">Antes L.{(card.price).toFixed(0)}</span>
                    </div>

                    <svg onClick={() => toggleLike(index)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_153_33)">
                        <path fill={likes[index] ? 'black' : 'transparent'} stroke="black" strokeWidth="1.5" d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_153_33">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </section>

        {/*
        <section id="seccion-post" className='flex'>
          <img height='100%' width='auto' src="assets/post_aplicacion.webp" alt="post imagen" className='post_img' />
          <div className='flex gap-3 flex-col'>
            <img width='425' height='auto' src="assets/amigos_regalos.webp" alt="post regalos" className='w-[425px] h-auto aspect-auto grayscale-[100%] hover:grayscale-0 transition-all' />
            <img width='425' height='auto' src="assets/woman_ilustracion.webp" alt="post woman" className='w-[425px] h-auto aspect-auto grayscale-[100%] hover:grayscale-0 transition-all' />
          </div>
        </section>
        */}
      </div>
      <Footer />
    </React.Fragment>
  );
}