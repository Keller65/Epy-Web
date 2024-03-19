import { Navbar } from "../Navbar";
import '../header/header.css';

export function HeaderComponent() {

    const foto = localStorage.getItem("photoUser");

    return (
        <nav className="header">
            <Navbar />
            <div className="userContact">
                <img src={foto} alt="foto de perfil" className='FotoUser' />

                <div className="contact">
                    <p id='name'>{localStorage.getItem("nameuser")}</p>
                    <p id="correo">{localStorage.getItem("correo")}</p>
                </div>
            </div>
        </nav>
    )
}