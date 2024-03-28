import { useState } from "react";
import { ProductosDB } from './ProductosDB';
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/Buscador.css';

export function BuscadorApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get('q') || '';
  const initialFilter = '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

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

  const SubmitForm = (e) => {
    e.preventDefault();
  }

  return (
    <section className="buscador-container">
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