import React from "react";
import './Paletas.css'

export function Paletas(){
    return(
        <React.Fragment>
            <section className="paletasSection" id="paletas">

                <aside className="aside1">
                    <h1 className="title-aside1">JACKLYN HILL</h1>
                    <img src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/paletas%2FJackHill.webp?alt=media&token=3e3006cd-ff01-4b79-8fcb-0527ab168a0a" alt="paleta" className="paletasIMG" />
                </aside>

                <aside className="aside2">
                    <img src="https://firebasestorage.googleapis.com/v0/b/margie-store.appspot.com/o/paletas%2FMorphe.webp?alt=media&token=79907cb6-8e24-464c-b66c-d0a58b7a1898" alt="paleta" className="paletasIMG" />
                    <h1 className="title-aside2">MORPHE</h1>
                </aside>

            </section>
        </React.Fragment>
    )
}