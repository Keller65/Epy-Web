import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Carrito } from './Carrito.jsx';
import { X } from 'lucide-react';
import '../styles/navbar.css';

export function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [fillHome, setFillHome] = useState(false);
    const [fillSearch, setFillSearch] = useState(false);
    const [fillOrders, setFillOrders] = useState(false);
    const [fillProfile, setFillProfile] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const foto = localStorage.getItem("photoUser");

    useEffect(() => {
        const pathname = location.pathname;
        setFillHome(pathname === '/Home');
        setFillSearch(pathname === '/Search');
        setFillOrders(pathname === '/Orders');
        setFillProfile(pathname === '/Profile');
    }, [location]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <nav className="navbar backdrop-blur-[5px]">
                <Link to="/Home" className='icon' onClick={() => navigate('/Home')} title='Ir a la página de Inicio'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill={fillHome ? 'black' : 'transparent'} stroke="black" strokeWidth="2" d="M3 12.1836C3 10.1235 3 9.0939 3.468 8.2407C3.9342 7.3866 4.7883 6.8574 6.4956 5.7972L8.2956 4.6803C10.1001 3.5598 11.0028 3 12 3C12.9972 3 13.899 3.5598 15.7044 4.6803L17.5044 5.7972C19.2117 6.8574 20.0658 7.3866 20.5329 8.2407C21 9.0939 21 10.1235 21 12.1827V13.5525C21 17.0625 21 18.8184 19.9452 19.9092C18.8913 21 17.1939 21 13.8 21H10.2C6.8061 21 5.1087 21 4.0548 19.9092C3 18.8184 3 17.0634 3 13.5525V12.1836Z" />
                        <path d="M9.2998 15.6C10.0648 16.167 10.9963 16.5 11.9998 16.5C13.0033 16.5 13.9348 16.167 14.6998 15.6" stroke={fillHome ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </Link>

                <Link to="/Search" className='icon' onClick={() => navigate('/Search')} title='Ir a la página de Busqueda'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.9999 21L16.6499 16.65" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="11" cy="11" r="6" fill={fillSearch ? 'black' : ''} />
                    </svg>
                </Link>

                <Link to="/Orders" className='icon' onClick={() => navigate('/Orders')} title='Ir a la página de Pedidos'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99997 5C2.69895 5.47158 3 7.5 3 7.5H19.5C19.5 6.5 19.5 5 19 4.00003C18.4343 2.86866 17.1666 2.83336 16.5 3.00003C12.8333 3.83336 8.60871 4.62732 5.99997 5Z" stroke="black" strokeWidth="1.5" />
                        <path d="M3 18V7.5H18C20 7.5 21 9.19199 21 10.5V18C21 19.2 20 21 18 21H6C4 21 3 19.5 3 18Z" fill={fillOrders ? 'black' : ''} stroke="black" strokeWidth="1.5" />
                        <path d="M15.9999 16.5H20.9999L21 12H15.9999C15 12 13.5 12.1963 13.5 14.5C13.5 16 15 16.5 15.9999 16.5Z" fill={fillOrders ? 'white' : ''} stroke="black" strokeWidth="1.5" />
                    </svg>
                </Link>

                <div className='icon' onClick={openModal}>
                    <img src="assets/bolsa.svg" alt="" className='h-[25px] w-[25px] cursor-pointer' />
                </div>

                <Link to="/Profile" className='icon' onClick={() => navigate('/Profile')} title='Ir a la página de Ajustes'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0483 8.19612C20.2928 8.54618 20.5068 8.91654 20.6881 9.30315L23.3186 10.7656C23.647 12.2368 23.6505 13.7618 23.3287 15.2344L20.6881 16.6969C20.5068 17.0835 20.2928 17.4539 20.0483 17.8039L20.099 20.8203C18.9842 21.8362 17.6648 22.6015 16.2295 23.0649L13.6397 21.511C13.2136 21.5414 12.786 21.5414 12.36 21.511L9.78028 23.0547C8.34044 22.5998 7.01666 21.8374 5.9006 20.8203L5.95138 17.8141C5.70892 17.4592 5.49497 17.0856 5.31153 16.6969L2.68107 15.2344C2.35261 13.7633 2.34915 12.2382 2.67091 10.7656L5.31153 9.30315C5.49281 8.91654 5.70687 8.54618 5.95138 8.19612L5.9006 5.17971C7.0154 4.16385 8.33483 3.39851 9.77013 2.93518L12.36 4.48909C12.786 4.45861 13.2136 4.45861 13.6397 4.48909L16.2193 2.94534C17.6592 3.40023 18.983 4.16262 20.099 5.17971L20.0483 8.19612Z" fill={fillProfile ? 'black' : 'transparent'} stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 17.875C15.6924 17.875 17.875 15.6924 17.875 13C17.875 10.3076 15.6924 8.125 13 8.125C10.3076 8.125 8.125 10.3076 8.125 13C8.125 15.6924 10.3076 17.875 13 17.875Z" stroke={fillProfile ? 'white' : 'black'} fill={fillProfile ? 'black' : 'transparent'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className="userContact">
                    <img src={foto} alt="foto de perfil" className='FotoUser' />

                    <div className="contact">
                        <p id='name'>{localStorage.getItem("nameuser")}</p>
                        <p id="correo">{localStorage.getItem("correo")}</p>
                    </div>
                </div>
                <Outlet />
            </nav>

            {modalOpen && (
                <div className="modal">
                    <button onClick={closeModal} className='btnModal-close'>
                        <X stroke='gray' size={20} className='icon-img' />
                    </button>

                    <Carrito />
                </div>
            )}
        </React.Fragment>
    );
}