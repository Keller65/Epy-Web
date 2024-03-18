import React, { useEffect, useState, useMemo } from 'react';
import { HeaderComponent } from './header/header.jsx';
import { listaCards, app, Carrusel } from './data.js';
import { Footer } from './footer/Footer.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import '../styles/Inicio.css';

export function InicioApp() {
  const nameUser = localStorage.getItem("nameuser");
  const foto = localStorage.getItem("photoUser");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [imagenes, setImagenes] = useState([]);

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

  const text = `Bienvenido ${nameUser ? nameUser : 'Visitante'}!`.split("  ");

  return (
    <React.Fragment>
      <article className='top-0 left-0 w-full grid place-content-center bg-white py-3 z-50'>
        12% de descuento en todos los productos para este verano
      </article>
      <div className="InicioAppp">
        <header className="menu">
          <aside className='controls'>
            <img src={foto ? foto : 'avatar.svg'} alt="foto del usuarios" className='foto' />
            <HeaderComponent />
          </aside>
        </header>

        <main className='content-class-sections'>
          <div>
            <section id='presentacion-screen'>
              <div className='flex justify-center items-center flex-col'>
                {/*<p className='leading-[0]'>Bienvenido {nameUser ? nameUser : 'Visitante'}!</p>*/}
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
                {/*<p className='font-semibold text-marca'>EPY MACKEUP</p>*/}
                <motion.p
                  className='font-semibold text-marca opacity-0'
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{
                    opacity: { ease: "linear" },
                    layout: { duration: 10 }
                  }}
                >
                  EPY MACKEUP
                </motion.p>
              </div>

              <section className='flex gap-4'>
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
          </div>
        </main>

        <section id="seccion-post">
          <img src="/social/PostLogo.webp" alt="post imagen" id='post_img' />
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
      {/*{user ? '' : <LoginModal />}*/}
    </React.Fragment>
  );
}