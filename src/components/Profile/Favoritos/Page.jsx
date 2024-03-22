import { useState, useEffect } from 'react';
import { Bookmark, ChevronLeft } from 'lucide-react';
import { Navbar } from '../../Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import './Page.css';

export default function FavoritosPage() {
    const favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
    const navigate = useNavigate();
    const [, setNewfavoritos] = useState([]);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isUserLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const DeleteFav = (key) => {
        const nuevosFavoritos = favoritos.filter(producto => producto.key !== key);

        localStorage.setItem('Favoritos', JSON.stringify(nuevosFavoritos));
        setNewfavoritos(nuevosFavoritos);

        console.log('Se eliminó el producto con key:', key);
        toast.success('Producto eliminado');
    }

    return (
        <div className="FavoritosPage">
            <nav className='w-full flex justify-end'>
                <Navbar />
            </nav>
            <section className='section__filter'>
                <Link to="/Profile">
                    <ChevronLeft size={40} id='exit' strokeWidth={1} />
                </Link>
            </section>

            <main className='content__card'>
                {favoritos.length === 0 ? (
                    <p>No hay favoritos</p>
                ) : (
                    favoritos.reduce((uniqueProducts, items) => {
                        const existingProduct = uniqueProducts.find(product => product.key === items.key);

                        if (!existingProduct) {
                            uniqueProducts.push(items);
                        }

                        return uniqueProducts;
                    }, []).map((uniqueProduct, key) => (
                        <div className="Producto__Card" key={key} onClick={() => DeleteFav(uniqueProduct.key)}>
                            <Bookmark size={18} className='icon__fav' fill='black' />
                            <img src={uniqueProduct.imagenProduct} alt={uniqueProduct.producto} />
                        </div>
                    ))
                )}
            </main>

            <Toaster position="top-left" closeButton />
        </div>
    );
}