import './Footer.css';

export function Footer() {
    return (
        <footer className="flex flex-col gap-12 mt-10">
            <section className="flex items-center justify-between w-full">
                <h1 className="text-black font-medium text-[32px] leading-[30px]">Puedes Comunicarte <p className="">con el Soporte de Epy</p> </h1>

                <div className="flex gap-2 flex-col">
                    <form className="flex gap-4">
                        <input type="email" name="correo" id="correo_suscribe" placeholder="Ingresa tu correo" />
                        <input className="bg-black text-white py-[6px] px-[14px] text-[16px] cursor-pointer rounded-[6px]" type="submit" value="suscribete" />
                    </form>
                    <p className="text-[12px] text-[#858585]">*Recibe notificaciones de promociones y productos</p>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <div className="w-[350px] text-pretty">
                    <p className="text-sm">Puedes Seguirnos en nuestras redes sociales para estar al tanto de nuevas actualizaciones, regalos y promociones</p>
                </div>

                <div className="flex gap-4">
                    <img src="assets/github.svg" alt="github.svg" height='20' width='20' className='aspect-[1]' />
                    <img src="assets/instagram.svg" alt="github.svg" height='20' width='20' className='aspect-[1]' />
                    <img src="assets/whatsapp.svg" alt="github.svg" height='23' width='23' className='aspect-[1]' />
                    <img src="assets/facebook.svg" alt="github.svg" height='21' width='21' className='aspect-[1]' />
                </div>
            </section>

            <section className="w-full flex justify-center border-t pt-4">
                <p className="text-[14px] text-[#858585]">&copy; 2024 derechos reservados Epy</p>
            </section>
        </footer>
    )
}