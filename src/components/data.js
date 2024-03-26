import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const DATBASE_NODE = import.meta.env.VITE_NODE_DATABASE;
export const DATBASE_PRODUCTS = import.meta.env.VITE_NODE_PROUCTS_DATABASE;

export async function HacerPedido(cartItems) {
  const nombre = localStorage.getItem("nameuser");
  const precio = localStorage.getItem("total");
  const fecha = new Date();
  const fechaEntrega = '2024-01-18'
  const ubicacion = localStorage.getItem("Ubicacion");
  const entrega = localStorage.getItem("entrega");

  if (Array.isArray(cartItems)) {
    const datosPedido = {
      fecha: fecha,
      fechaEntrega: fechaEntrega,
      pago: precio,
      nombre: nombre,
      entregado: false,
      tipoEntrega: entrega,
      ubicacion: ubicacion,
      productos: cartItems.map(item => ({
        imagen: item.imagen,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }))
    };

    try {
      const docRef = await addDoc(collection(db, 'Pedidos'), datosPedido);
      console.log('Pedido realizado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al realizar el pedido: ', error);
    }
  } else {
    console.error('Error: cartItems no es un array definido.');
  }
}

let data;
export const listaCards = [];

export async function Carrusel() {
  if (listaCards.length === 0) {
    const CarruselDB = await getDocs(collection(db, 'Carrusel'));

    CarruselDB.forEach((doc) => {
      data = doc.data();
      listaCards.push(data);
    });
  }
}

/*async function descargarProductos() {
  try {
    const productosRef = collection(db, 'Productos');
    const snapshot = await getDocs(productosRef);

    const productosArray = [];
    snapshot.forEach((doc) => {
      const producto = doc.data();
      productosArray.push({ id: doc.id, ...producto });
    });

    const jsonData = JSON.stringify(productosArray, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Crea un enlace de descarga y simula un clic en él
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productos.json';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    // Elimina el enlace después de la descarga
    document.body.removeChild(link);
    console.log('Datos de productos descargados y guardados en productos.json');
  } catch (error) {
    console.error('Error al descargar la colección de productos:', error);
  }
}*/

//descargarProductos();
