import React from "react";
import './Footer.css';
import { Clock3, MapPin, Mail, Phone, Tv2 } from "lucide-react";

export function Footer() {
    return (
        <React.Fragment>
            <footer>
                <section className="coordenadas">
                    <li>
                        <img src="/social/word.svg" alt="" />
                        <p>Honduras</p>
                    </li>

                    <li>
                        <MapPin size={20} strokeWidth={1.5} />
                        <p>Chamelecon</p>
                    </li>

                    <li>
                        <Clock3 size={20} strokeWidth={1.5} />
                        <p>Abierto de 8:30 a 5:30</p>
                    </li>
                </section>

                <section className="plataformas">
                    <li>
                        <Tv2 />
                        <p>Desktop</p>
                    </li>

                    <li>
                        <img src="/social/phone.svg" alt="" />
                        <p>Phone</p>
                    </li>
                </section>

                <section className="contacto">
                    <li>
                        <Mail size={20} strokeWidth={1.5} />
                        <p>lopezkeller65@gmail.com</p>
                    </li>

                    <li>
                        <Phone size={20} strokeWidth={1.5} />
                        <p>+504 9800-7330</p>
                    </li>
                </section>

                <aside className="redes">
                    <img src="/social/whatsapp.svg" alt="" id="social-icons" />
                    <img src="/social/facebook.svg" alt="" id="social-icons" />
                    <img src="/social/twitter.svg" alt="" id="social-icons" />
                    <img src="/social/instagram.svg" alt="" id="social-icons" />
                </aside>
            </footer>
        </React.Fragment>
    )
}