import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { app } from './data';
import '../styles/Login.css';

export function LoginApp() {
  const navigate = useNavigate();

  useEffect(() => {

    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isUserLoggedIn) {
      navigate('/Home');
    }
  }, [navigate]);

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('photoUser', result.user.photoURL);
        localStorage.setItem('nameuser', result.user.displayName);
        localStorage.setItem('correo', result.user.email);
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/Home');
      })
      .catch((error) => {
        console.error('Error de autenticación con Google:', error);
      });
  };

  const handleSignInWithFacebook = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const providerFacebook = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, providerFacebook);
      const user = result.user;

      localStorage.setItem('photoUser', result.user.photoURL);
      localStorage.setItem('nameuser', result.user.displayName);
      localStorage.setItem('correo', result.user.email);
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/Home');

      console.log('Inicio de sesión con Facebook exitoso:', user);
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
    }
  };

  const MESSAGE_START = 'Iniciar con';

  return (
    <div className="PantallaInicio-login">

      <form className="Formulario">
        <button className="LoginBTN" onClick={handleSignInWithGoogle}>
          <img
            src="assets/google.svg"
            alt="google img"
            className="GoogleImg"
          />
          {MESSAGE_START} Google
        </button>

        <button className="FacebookBTN" onClick={handleSignInWithFacebook}>
          <img
            src="assets/facebook.svg"
            alt="facebook img"
            className="FacebookImg"
          />
          {MESSAGE_START} Facebook
        </button>
      </form>

    </div>
  );
}
