import React from "react";
import './Footer.css';
import { Clock3, MapPin, Mail, Phone, Tv2 } from "lucide-react";

export function Footer() {
    return (
        <React.Fragment>
            <footer>
                <section className="coordenadas">
                    <ul>
                        <li>
                            <img src="/social/word.svg" alt="word" />
                            <p>Honduras</p>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <MapPin size={20} strokeWidth={1.5} />
                            <p>Chamelecon</p>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <Clock3 size={20} strokeWidth={1.5} />
                            <p>Abierto de 8:30 a 5:30</p>
                        </li>
                    </ul>
                </section>

                <section className="plataformas">
                    <ul>
                        <li>
                            <Tv2 />
                            <p>Desktop</p>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <img src="/social/phone.svg" alt="" />
                            <p>Phone</p>
                        </li>
                    </ul>
                </section>

                <section className="contacto">
                    <ul>
                        <li>
                            <Mail size={20} strokeWidth={1.5} />
                            <p>lopezkeller65@gmail.com</p>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <Phone size={20} strokeWidth={1.5} />
                            <p>+504 9800-7330</p>
                        </li>
                    </ul>
                </section>

                <aside className="redes">
                    <img src="/social/whatsapp.svg" width='20' height='20' alt="icon whatsapp" id="social-icons" />
                    <img src="/social/facebook.svg" width='20' height='20' alt="icon facebook" id="social-icons" />
                    <img src="/social/twitter.svg" width='20' height='20' alt="icon twitter" id="social-icons" />
                    <img src="/social/instagram.svg" width='20' height='20' alt="icon instagram" id="social-icons" />
                </aside>
            </footer>
        </React.Fragment>
    )
}