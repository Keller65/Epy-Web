import React, { useEffect, useState, useMemo } from 'react';
import { HeaderComponent } from './header/header.jsx';
import { listaCards, app, Carrusel } from './data.js';
import { Footer } from './footer/Footer.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Inicio.css';

export function InicioApp() {
  const nameUser = localStorage.getItem("nameuser");
  const foto = localStorage.getItem("photoUser");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const respuesta = await fetch('/marcas/Imagenes.json');
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const datos = await respuesta.json();
        setImagenes(datos);
        console.log('se cargaron los datos')
      } catch (error) {
        console.error("Error al cargar el archivo JSON", error);
      }
    };
    cargarImagenes();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log('El usuario está autenticado');
        Carrusel();
      } else {
        console.log('El usuario no está autenticado');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

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

  const text = `Bienvenido ${nameUser ? nameUser : 'Visitante'}!`.split("  ");

  return (
    <React.Fragment>
      {/*<article className='top-0 left-0 w-full grid place-content-center bg-white py-3 z-50'>
        12% de descuento en todos los productos para este verano
      </article>*/}
      <div className="InicioAppp">
        <header className="menu">
          <aside className='controls'>
            <img src={foto ? foto : 'avatar.svg'} alt="foto del usuarios" className='foto' />
            <HeaderComponent />
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
                className='font-semibold text-marca opacity-0 flex gap-[18px]'
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
              <Link to='/Search' className=' bg-[#FFE4B6] text-[#F0B249] py-[5px] px-[12px]'>
                Empezar
              </Link>

              <button className='bg-[transparent] text-[#000] p-[5px] flex items-center justify-center gap-[2px]'>
                ver mas
                <img src="assets/chevron.svg" alt="chevron" className='h-[18px] w-[18px]' />
              </button>
            </section>
          </section>

          <div className="slider">
            <div className="slide-track">
              {imagenes.map((imagen, index) => (
                <div className="slide" key={index}>
                  <img src={imagen.src} alt={imagen.alt} className='marcaLogos' />
                </div>
              ))}
            </div>
          </div>
        </main>

        <section className='w-full h-auto flex gap-10 justify-center flex-wrap' style={{ opacity: opacity / 500 }}>
          <div className="image-container">
            <img src="assets/shopping-ilustracion.webp" alt="post_ilustracion_shopping" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Kits Personalizables</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>comenzar</Link>
            </div>
          </div>

          <div className="image-container">
            <img src="assets/ilustracion-cart.webp" alt="post_ilustracion_cart" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Descuento Especiales</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>ver descuentos</Link>
            </div>
          </div>

          <div className="image-container">
            <img src="assets/regalos.webp" alt="post_ilustracion_ideas" loading='lazy' />
            <div className="overlay flex flex-col">
              <p className='text-[20px]'>Regalos por Compras</p>
              <Link to='/Kits' className='text-[15px] underline font-[300]'>obtener regalos</Link>
            </div>
          </div>
        </section>

        <section id="seccion-post" className='flex'>
          <img src="assets/post_aplicacion.png" alt="post imagen" className='post_img' />
          <div className='flex gap-3 flex-col'>
            <img src="assets/amigos_regalos.webp" alt="post regalos" className='w-[425px] h-auto aspect-auto grayscale-[100%] hover:grayscale-0 transition-all' />
            <img src="assets/woman_ilustracion.png" alt="post woman" className='w-[425px] h-auto aspect-auto grayscale-[100%] hover:grayscale-0 transition-all' />
          </div>
        </section>

        <section id='ediciones'>

          <div className='makeUp_Ilustracion_picture'>
            <img src="/marcas/Zaha.webp" alt="" className='zahaIMG' />
          </div>

          <div id='carruselSection-cards'>
            {listaCards.map((card, index) => (

              <div key={index} className="card">
                <picture className='container_imagenes'>
                  <img src={card.imagen} alt={`imagen ${card.titulo}`} className='presentacion-img' loading='lazy' />

                  <picture className='imagenHover'>
                    <img src={card.marca} alt='marca imagen hover' />
                  </picture>
                </picture>

                <section className='buttons'>
                  <p className="priceCard">${card.price}</p>
                </section>
              </div>

            ))}
          </div>

        </section>
      </div>
      <section id='promociones'>
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2FBase%20SKIN%20(1).webp?alt=media&token=106f1804-3979-4172-a6ab-b5e7ba19e3c9" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2Fcushion%20Sephora%20(1).webp?alt=media&token=2b91e1ac-d2c2-4428-b4bb-c354f160eaba" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2FGreen%20me%20Kiko%20Milano%20(1).webp?alt=media&token=7ea6445d-134e-4546-8da5-bf5c4524f4e7" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2FAirBush%20(1).webp?alt=media&token=31783803-9ca7-43d5-81ce-cc808c61a925" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2FLabial%20Chanel%20(1).png?alt=media&token=a254ce26-4649-4daa-866c-6c425ea3a39f" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2FKiko%20Milano%20Ultimate%20Stylo%20(1).png?alt=media&token=916b48f7-f0bc-4584-83f6-d140a8b11b3d" alt="" />
        <img loading='lazy' className='imagen_producto_promocion' src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/promocion%2Fkiko%20milano%20Labial%20(2).png?alt=media&token=5f9b94b0-3012-4efc-9c2f-554cf7d735ed" alt="" />
      </section>
      <Footer />
    </React.Fragment>
  );
}