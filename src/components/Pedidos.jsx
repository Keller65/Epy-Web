import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, CircleDollarSign, CarTaxiFront, CalendarDays } from 'lucide-react';
import { app, db } from './data.js';
import { HeaderComponent } from './header/header.jsx';
import { Lista } from './ListaProductos/page.jsx';
import '../styles/Pedidos.css';

export function Pedidos() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const fetchUserOrders = async (userName) => {
    try {
      const ordersSnapshot = await getDocs(collection(db, 'Pedidos'));
      const userOrders = [];

      ordersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.nombre === userName) {
          userOrders.push({
            nombre: data.nombre,
            pago: data.pago,
            entregado: data.entregado,
            ubicacion: data.ubicacion,
            productos: data.productos,
            tipoEntrega: data.tipoEntrega,
            fechaEntrega: data.fechaEntrega,
          });
        }
      });

      const totalPayments = userOrders.reduce((total, order) => total + parseFloat(order.pago), 0);
      localStorage.setItem('gastos', totalPayments.toFixed(0));

      return userOrders;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      return [];
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const isUserAuthenticated = user !== null;

      if (isUserAuthenticated) {
        console.log('El usuario está autenticado');
        const userName = localStorage.getItem('nameuser');

        // Verificar si el usuario ha cambiado su estado de autenticación
        if (isUserAuthenticated !== userAuthenticated.current) {
          const orders = await fetchUserOrders(userName);
          setUserOrders(orders);
          userAuthenticated.current = isUserAuthenticated;
        }
      } else {
        console.log('El usuario no está autenticado');
        navigate('/');
        userAuthenticated.current = false;
      }
    });

    return unsubscribe;
  }, [auth, navigate]);

  const userAuthenticated = useRef(false);

  const userPhoto = localStorage.getItem('photoUser');

  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardDoubleClick = useCallback((order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  }, []);

  return (
    <React.Fragment>
      <div className="container-payment">
        <header id="header-payment">
          <HeaderComponent />
        </header>

        <div className="cards-container">
          {userOrders.length === 0 && <div className="no-orders">No hay pedidos recientes</div>}

          {userOrders.map((order, index) => (
            <motion.div
              key={index}
              initial={{ y: '100%' }}
              animate={{ y: 'calc(0vw - 0%)' }}
            >
              <div
                className="cardPedido"
                onDoubleClick={() => handleCardDoubleClick(order)}
              >
                <header className="card-header">
                  <img src={userPhoto} alt="foto del usuario" className="foto-payment" />

                  <aside id="aside-container">
                    <h3 className="name">{order.nombre}</h3>
                    <p className="estado">{order.entregado ? 'Entregado' : 'En espera'}</p>
                  </aside>

                  <div className="poppoup">
                    <CalendarDays fill="#FFE7D6" stroke="#EA7E30" size={20} />
                  </div>
                </header>

                <div className="mapa">
                  <div className="list">
                    <Package color="gray" strokeWidth="1.5" />
                    {order.productos.length} Productos
                  </div>

                  <div className="list">
                    <CircleDollarSign color="gray" strokeWidth="1.5" />
                    L. {order.pago}
                  </div>

                  <div className="list">
                    <CarTaxiFront color="gray" strokeWidth="1.5" />
                    {order.tipoEntrega}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedOrder && isModalOpen && (
        <div className="modal-lista">
          <Lista pedido={selectedOrder} onClose={closeModal} />
        </div>
      )}
    </React.Fragment>
  );
}