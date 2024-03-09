import React, { useEffect, useState } from 'react';
import { HeaderComponent } from './header/header.jsx';
import { listaCards, app, Carrusel } from './data.js';
import { Footer } from './footer/Footer.jsx';
import { Paletas } from './Paletas/Paletas.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Inicio.css';

/*Awebo creando readme .md*/

export function InicioApp() {
  const nameUser = localStorage.getItem("nameuser");
  const foto = localStorage.getItem("photoUser");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [, setUser] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);
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
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = scrollPosition / 400;
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  return (
    <React.Fragment>
      <div className="InicioAppp">
        <header className="menu">
          <aside className='controls'>
            <img src={foto} alt="foto del usuarios" className='foto' />
            <HeaderComponent />
          </aside>
        </header>

        <main className='content-class-sections'>
          <div>
            <section id='seccion-izquierda'>
              <h1 className='Saludo'>
                Hey
                <span>
                  {nameUser}
                  <img src="./saludo.svg" alt="" />
                </span>
              </h1>

              <p className="ubicacion">
                <MapPin size={20} />
                {userCountry !== null ? userCountry : "Loading..."}
              </p>

              <p className='eslogan'>
                Descubre la Belleza que Reside en Ti: Donde la Elegancia se Encuentra con la Innovación,
                y Cada Toque es una Celebración de Tu Auténtica Belleza.
              </p>

              <a href="#paletas" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14">
                <p className="z-10 pr-2 text-white text-[15px]">Ver Paletas</p>
                <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                  <div className="mr-3.5 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor">
                      </path>
                    </svg>
                  </div>
                </div>
              </a>

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
      <Paletas />
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