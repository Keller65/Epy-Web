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
            <nav className="navbar">
                <Link to="/Home" className='icon' onClick={() => navigate('/Home')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill={fillHome ? 'black' : 'white'} stroke="black" strokeWidth="2" d="M3 12.1836C3 10.1235 3 9.0939 3.468 8.2407C3.9342 7.3866 4.7883 6.8574 6.4956 5.7972L8.2956 4.6803C10.1001 3.5598 11.0028 3 12 3C12.9972 3 13.899 3.5598 15.7044 4.6803L17.5044 5.7972C19.2117 6.8574 20.0658 7.3866 20.5329 8.2407C21 9.0939 21 10.1235 21 12.1827V13.5525C21 17.0625 21 18.8184 19.9452 19.9092C18.8913 21 17.1939 21 13.8 21H10.2C6.8061 21 5.1087 21 4.0548 19.9092C3 18.8184 3 17.0634 3 13.5525V12.1836Z" />
                        <path d="M9.2998 15.6C10.0648 16.167 10.9963 16.5 11.9998 16.5C13.0033 16.5 13.9348 16.167 14.6998 15.6" stroke={fillHome ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </Link>

                <Link to="/Search" className='icon' onClick={() => navigate('/Search')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.9999 21L16.6499 16.65" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="11" cy="11" r="6" fill={fillSearch ? 'black' : ''} />
                    </svg>
                </Link>

                <Link to="/Orders" className='icon' onClick={() => navigate('/Orders')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99997 5C2.69895 5.47158 3 7.5 3 7.5H19.5C19.5 6.5 19.5 5 19 4.00003C18.4343 2.86866 17.1666 2.83336 16.5 3.00003C12.8333 3.83336 8.60871 4.62732 5.99997 5Z" stroke="black" strokeWidth="1.5" />
                        <path d="M3 18V7.5H18C20 7.5 21 9.19199 21 10.5V18C21 19.2 20 21 18 21H6C4 21 3 19.5 3 18Z" fill={fillOrders ? 'black' : ''} stroke="black" strokeWidth="1.5" />
                        <path d="M15.9999 16.5H20.9999L21 12H15.9999C15 12 13.5 12.1963 13.5 14.5C13.5 16 15 16.5 15.9999 16.5Z" fill={fillOrders ? 'white' : ''} stroke="black" strokeWidth="1.5" />
                    </svg>
                </Link>

                <div className='icon' onClick={openModal}>
                    <img src="/bolsa.svg" alt="" className='icon-img' />
                </div>

                <Link to="/Profile" className='icon' onClick={()=> navigate('/Profile')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.982 18.725C17.2833 17.7999 16.3793 17.0496 15.3412 16.5334C14.3031 16.0171 13.1594 15.749 12 15.75C10.8407 15.749 9.6969 16.0171 8.65883 16.5334C7.62077 17.0496 6.71675 17.7999 6.01801 18.725M17.982 18.725C19.3455 17.5122 20.3071 15.9136 20.7412 14.1411C21.1753 12.3686 21.0603 10.5061 20.4115 8.80049C19.7627 7.09488 18.6107 5.62679 17.1084 4.59091C15.6061 3.55503 13.8244 3.00031 11.9995 3.00031C10.1747 3.00031 8.39295 3.55503 6.89062 4.59091C5.38829 5.62679 4.23634 7.09488 3.58755 8.80049C2.93875 10.5061 2.82376 12.3686 3.25783 14.1411C3.6919 15.9136 4.65451 17.5122 6.01801 18.725M17.982 18.725C16.336 20.1932 14.2056 21.0032 12 21C9.79404 21.0034 7.66425 20.1934 6.01801 18.725M15 9.75001C15 10.5457 14.6839 11.3087 14.1213 11.8713C13.5587 12.4339 12.7957 12.75 12 12.75C11.2044 12.75 10.4413 12.4339 9.87869 11.8713C9.31608 11.3087 9.00001 10.5457 9.00001 9.75001C9.00001 8.95436 9.31608 8.1913 9.87869 7.62869C10.4413 7.06608 11.2044 6.75001 12 6.75001C12.7957 6.75001 13.5587 7.06608 14.1213 7.62869C14.6839 8.1913 15 8.95436 15 9.75001Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.5 7L9.5 8L9 10.5L10 11.5L11 12H13.5L15 10L13.5 7.5L11.5 7Z" fill={fillProfile ? 'black' : ''} />
                        <circle cx="12" cy="12" r="9.15" stroke="black" strokeWidth="1.7" />
                        <path d="M12 15C8.5 15 6.55455 17.1091 5.5 18.1636C6.20303 19.0424 8.10902 20.8 12.3272 20.8C17.0727 20.8 17.7941 18.6909 18.3213 18.1636C17.5 17 16 15 12 15Z" fill={fillProfile ? 'black' : ''} strokeWidth="0.3" />
                    </svg>
                </Link>

                {modalOpen && (
                    <div className="modal">
                        <button onClick={closeModal} className='btnModal-close'>
                            <X stroke='gray' size={20} className='icon-img' />
                        </button>

                        <Carrito />
                    </div>
                )}

                <Outlet />
            </nav>
        </React.Fragment>
    );
}