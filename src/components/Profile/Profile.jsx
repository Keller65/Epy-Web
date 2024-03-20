import React, { useEffect, useState, useRef, useMemo } from "react";
import { HeaderComponent } from "../header/header";
import { BadgeCheck, ChevronRight, Heart, WalletCards, MessagesSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../data";
import './Profile.css';
import { DATBASE_NODE } from '../data.js';

const GetStories = (callback) => {
    const database = getDatabase(app);
    const historyRef = ref(database, DATBASE_NODE);

    try {
        onValue(historyRef, (snapshot) => {
            const historia = snapshot.val();
            callback(historia);
            console.log(historia);
        });
    } catch (error) {
        console.error("Error al obtener datos del historial:", error.message);
    }
};

const Profile = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    //const favoritosFromStorage = JSON.parse(localStorage.getItem('Favoritos')) || [];
    const favoritosFromStorage = useMemo(() => JSON.parse(localStorage.getItem('Favoritos')) || [], []);

    const bills = localStorage.getItem('gastos');
    const formattedBills = parseFloat(bills).toLocaleString();

    const [fotoProfile, setFotoProfile] = useState(null);
    const [nameProfile, setNameProfile] = useState('Visitante');
    const [favoritos, setFavoritos] = useState(0);
    const [historia, setHistoria] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const videoRef = useRef(null);

    const handleCanPlay = () => {
        const video = videoRef.current;
        const videoDuration = video.duration;
        setVideoDuration(videoDuration);
        setTimeRemaining(videoDuration);

        const countdownInterval = setInterval(() => {
            setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        video.addEventListener("ended", () => {
            clearInterval(countdownInterval);
        });

        return () => {
            clearInterval(countdownInterval);
        };
    };

    const singOut = async () => {
        try {
            await signOut(auth);
            auth.setPersistence();

            localStorage.clear();
            sessionStorage.clear();

            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFotoProfile(user.photoURL || null);
                setNameProfile(user.displayName || 'Visitante');
                GetStories(setHistoria);
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        setFavoritos(
            favoritosFromStorage.filter(
                (producto, index, self) => self.findIndex((p) => p.key === producto.key) === index
            ).length
        );
    }, [favoritosFromStorage]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener("canplay", handleCanPlay);
            return () => {
                video.removeEventListener("canplay", handleCanPlay);
            };
        }
    }, [historia?.path]);

    const name = localStorage.getItem('nameuser');

    const LinkMessage = `
    https://api.whatsapp.com/send?phone=50498007330&text=Hola! soy ${name}`;


    return (
        <React.Fragment>
            <div className="Profile">
                <HeaderComponent />

                <header className="header__profile">
                    <img src={fotoProfile} alt="foto del usuario" className="foto__profile" />

                    <aside className="information__user">
                        <h1 className="saludo__profile">Hello,</h1>

                        <div className="name__container">
                            <BadgeCheck size={20} fill="#70BAFF" stroke="#fffcf7" />
                            <p>{nameProfile}</p>
                        </div>
                    </aside>

                    <button onClick={singOut} type="button" id="cerrar__sesion">
                        salir
                    </button>
                </header>

                <main className="carrusel__profile">
                    <div className="card__profile">
                        <div className="information_card">
                            <p className="title__card">Productos Chanel</p>
                            <p className="Subtitle__card">descuentos especiales</p>

                            <button type="button" id="button__profile">ver colección</button>
                        </div>

                        <img loading="lazy" src="social/ChanelProductos.webp" alt="img" id="ediciones__profile" />
                    </div>

                    <div className="card__profile__2">
                        <div className="information_card">
                            <p className="title__card">Ediciones 2024</p>
                            <p className="Subtitle__card">descuentos especiales</p>

                            <button type="button" id="button__profile__2">ver Ediciones</button>
                        </div>

                        <img loading="lazy" src="social/EdicionesZaha.webp" alt="img" id="ediciones__profile" />
                    </div>
                </main>

                <div className="favoritos">
                    <div className="iconfav">
                        <Heart size={20} stroke="#cf82ff" fill="#cf82ff" />
                        {favoritos ? <p id="favoritos__total">{favoritos}</p> : ''}
                    </div>

                    <Link to="Favoritos" className="link">
                        ver Favoritos
                    </Link>

                    <ChevronRight className="chevron__container" strokeWidth={1.5} />
                </div>

                <div className="gastos__card">
                    <div className="iconbills">
                        <WalletCards size={20} stroke="#b19a61" />
                    </div>

                    ${formattedBills ? formattedBills : '0.00'}
                </div>

                <div className="container__regalos">
                    <picture className="iconRegalos">
                        <img src="./marcas/margie.jpg" alt="margie.jpg" className="margie_jpg" />

                        <BadgeCheck size={20} fill="#ffdc38" stroke="#fffcf7" className="verify__ceo" />
                    </picture>

                    <Link to="created" className="link__ceo">
                        <p className="name__tag">Margie Lopez</p>
                        <p className="username_tag">@margie_lopez.wwh</p>
                    </Link>

                    <ChevronRight className="chevron__container" strokeWidth={1.5} />
                </div>

                <div className="container__regalos">
                    <div className="iconSMS">
                        <MessagesSquare size={20} stroke="#ba9b7f" />
                    </div>

                    <a className="link__ceo" href={LinkMessage}>
                        <p className="name__tag">Enviar Mensaje</p>
                    </a>

                    <ChevronRight className="chevron__container" strokeWidth={1.5} />
                </div>

                {historia ? (
                    <div id="story">
                        <video autoPlay muted loop ref={videoRef}>
                            <source src={historia.path} type="video/mp4" />
                        </video>

                        <section width="100%" height="100%" id="profile__story">
                            <img src="./marcas/margie.jpg" alt="foto del usuario" className="photo_user__story" />

                            <div>
                                <p className="role_story">Creator</p>
                                <p className="name__story">@margie_lopez</p>
                            </div>
                        </section>

                        <progress
                            id="file"
                            value={(videoDuration - timeRemaining).toFixed(0)}
                            max={videoDuration.toFixed(2)}
                        ></progress>
                    </div>
                )
                    : (
                        ""
                    )}
            </div>

        </React.Fragment>
    );
};

export default Profile;