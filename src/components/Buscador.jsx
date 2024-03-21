import { useState, useEffect, useRef } from "react";
import '../styles/Buscador.css';
import { ProductosDB } from './ProductosDB';
import { HeaderComponent } from './header/header.jsx';
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BuscadorApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const navigate = useNavigate();
  const isVerifiedRef = useRef(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isUserLoggedIn && !isVerifiedRef.current) {
      console.log('esta verify');
      isVerifiedRef.current = true;
    } else if (!isUserLoggedIn) {
      navigate('/');
      isVerifiedRef.current = false;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = searchParams.get('q');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [navigate]);

  const SubmitForm = (e) => {
    e.preventDefault();
  }

  const handleInputChange = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    navigate(`/Search?q=${encodeURIComponent(newTerm)}`);
  };

  const onclickFilter = (valor) => {
    setSelectedFilter(valor);
    setSearchTerm(valor);
    navigate(`/Search?q=${encodeURIComponent(valor)}`);
  };

  return (
    <section className="buscador-container">
      <header id="header-buscador">
        <HeaderComponent />
      </header>

      <form onSubmit={SubmitForm} id="form">
        <span className="lupa-icon">
          <Search size={20} strokeWidth="1.7" stroke="gray" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar Producto"
          className="buscador"
          name="buscador"
        />
        <span className="clear-button" onClick={() => handleInputChange({ target: { value: '' } })}>
          {searchTerm ? <X strokeWidth={2.5} stroke="#7E7E7E" /> : ''}
        </span>
      </form>

      <form name="formuario__filtros" className="filtros" onSubmit={(e) => e.preventDefault()}>
        <button type="button" className={selectedFilter === 'Rostro' ? 'filterSelected bg-black text-white' : 'filter'} onClick={() => onclickFilter('Rostro')}>Rostro</button>
        <button type="button" className={selectedFilter === 'Cejas' ? 'filterSelected bg-black text-white' : 'filter'} onClick={() => onclickFilter('Cejas')}>Cejas</button>
        <button type="button" className={selectedFilter === 'Labial' ? 'filterSelected bg-black text-white' : 'filter'} onClick={() => onclickFilter('Labial')}>Labial</button>
        <button type="button" className={selectedFilter === 'Pestañas' ? 'filterSelected bg-black text-white' : 'filter'} onClick={() => onclickFilter('Pestañas')}>Pestañas</button>
      </form>

      <ProductosDB searchTerm={searchTerm} filter={selectedFilter} />
    </section>
  );
}