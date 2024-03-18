import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { LoginApp } from "./components/Login.jsx";
import { InicioApp } from "./components/Inicio.jsx";
import { Pedidos } from './components/Pedidos.jsx';
import { BuscadorApp } from './components/Buscador';
import Profile from "./components/Profile/Profile.jsx";
import { Loading } from "./components/Loading.jsx";
const Favoritos = lazy(() => import('./components/Profile/Favoritos/Page.jsx'));
import { ProfileCEO } from "./components/Profile/CEO.jsx";
import { Kits } from './components/Kits-Personalizables/Kits.jsx';
import './index.css';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LoginApp />} />
          <Route path="/Home" element={<InicioApp />} />
          <Route path="/Orders" element={<Pedidos />} />
          <Route path="/Search" element={<BuscadorApp />} />
          <Route path="/Profile" element={<Profile />} />

          <Route path="/Profile/Favoritos" element={<Favoritos />} />
          <Route path="/Profile/created" element={<ProfileCEO />} />

          <Route path="/" element={isLoggedIn ? <InicioApp onLogout={handleLogout} /> : <LoginApp onLogin={handleLogin} />} />
        </Routes>
      </Suspense>

    </React.Fragment>
  );
}

export default App;