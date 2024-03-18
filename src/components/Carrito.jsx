import { useEffect, useState } from 'react';
import { HacerPedido } from './data.js';
import { toast, Toaster } from 'sonner';
import { Ticket, Tags, ScanBarcode, BadgeDollarSign, Truck, Store, BaggageClaim } from 'lucide-react';
import '../styles/Shopping.css';
import '../../public/assets/bolsa.svg';

export function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isPedidoRealizado, setIsPedidoRealizado] = useState(false);
  const [isContainerClicked, setIsContainerClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem('entrega', 'Recojer en tienda');
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const total = storedCartItems.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    setTotalCost(total);

  }, []);

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);

    const total = updatedCartItems.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    setCartItems(updatedCartItems);
    setTotalCost(total);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    toast.error("Producto eliminado del carrito");
  };

  const handleToggleAccordion = () => {
    setIsAccordionOpen((prevIsOpen) => !prevIsOpen);
    setIsContainerClicked((prevIsOpen) => !prevIsOpen);
  };

  const containerStyle = {
    height: isAccordionOpen ? '70vh' : '0',
    overflow: 'hidden',
    overflowY: 'scroll',
    transition: 'height 450ms ease',
    padding: '5px 0 0 0',
  };

  let entregaValue;

  const Entregas = (e) => {
    entregaValue = e.target.value;
    localStorage.setItem('entrega', entregaValue);
  }

  const ISV = totalCost.toFixed(2) * 0.15;
  let descuento = 0;

  if (cartItems.length >= 3) {
    descuento = totalCost.toFixed(2) * 0.05;
  } else {
    descuento = 0.00
  }

  const Total = totalCost + ISV - descuento;

  localStorage.setItem('total', Total.toFixed(2));

  const handleMakeOrder = () => {
    if (cartItems == 0) {
      toast.warning("El carrito está vacío");
    } else {
      const promise = () => new Promise((resolve) => setTimeout(resolve, 700));

      HacerPedido(cartItems)
        .then(() => {
          setIsPedidoRealizado(true);
        })
        .catch((error) => {
          console.error('Error al hacer el pedido:', error);
        });

      localStorage.setItem('entrega', "");
      localStorage.removeItem("cartItems");

      toast.promise(promise, {
        loading: 'Loading...',
        success: () => 'Pedido Realizado',
        error: 'Error',
      });
    }
  };

  return (
    <section className='ShoppingApp'>
      <nav className='nav-Shopping'>
        <h1 className='Titulo'>Carrito de Compras ({cartItems.length})</h1>
      </nav>

      <div className='conatiner-view' onClick={handleToggleAccordion}>
        <p id='ver-productos-btn'>Ver Productos</p>
        <img src="assets/leftIcon.svg" alt="icon" className='leftIcon' style={{ transform: isContainerClicked ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 470ms ease' }} />
      </div>

      <main className='container-products' style={containerStyle}>
        <div className={`listaCart ${isAccordionOpen ? 'accordion-open' : ''}`}>
          {cartItems.length > 0 && (
            cartItems.map((item, index) => (
              <div key={index} className='cart-item'>
                <picture className='imagen-carrito'>
                  <img src={item.imagen} alt={item.nombre} className='product-img' />
                </picture>

                <aside className='container_information'>
                  <div className='conatiner-arriba'>
                    <p id='nombre'>{item.nombre}</p>
                    <p id='total'>L. {item.precio.toFixed(0)}</p>
                  </div>
                </aside>

                <button id='Btn-delte' onClick={() => handleDeleteItem(item.id)}>
                  Eliminar
                  <img src='assets/trash.svg' alt='trash' id='trashSVG' />
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <section id='factura'>
        <li>
          <ScanBarcode />
          Sub-Total
          <p id='Subtotal'>L. {totalCost.toFixed(2)}</p>
        </li>

        <li>
          <Tags />
          ISV
          <p id='ISV'>L. {ISV.toFixed(2)}</p>
        </li>

        <li>
          <Ticket />
          Descuento
          <p id='descuento'> - {descuento.toFixed(2)}</p>
        </li>

        <li>
          <BadgeDollarSign />
          Total
          <p id='total-factura'>L. {Total.toFixed(2)}</p>
        </li>

        <main id='container-entregas' >

          <button type='button' value={"Entrega incluida"} className="cardEntrega" onClick={Entregas}>
            <Truck className='icon-truck' size={40} />
            Entrega incluida
          </button>

          <button type='button' value={"Recojer en tienda"} className="cardEntrega" onClick={Entregas}>
            <Store className='icon-truck' size={40} />
            Recoger en tienda
          </button>

        </main>

      </section>

      <div id='payment-container'>
        <button id='payment-btn' onClick={handleMakeOrder} disabled={isPedidoRealizado}>
          <BaggageClaim strokeWidth={2} id="Carrito_Icon" />
          {isPedidoRealizado ? 'Pedido Realizado' : 'Hacer Pedido'}
        </button>

        <aside id='total-container'>
          <p className='text-[13px] text-[#dbd199]'>Total</p>
          <p className='TotalCompra leading-[12px]'>L. {Total.toFixed(2)}</p>
        </aside>
      </div>

      <Toaster position="top-left" richColors closeButton />
    </section>
  );
}