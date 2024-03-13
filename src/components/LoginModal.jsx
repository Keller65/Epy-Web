import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { app } from './data.js';

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
        })
        .catch((error) => {
            console.error('Error de autenticación con Google:', error);
        });
};

export default function LoginModal() {
    return (
        <article className="fixed z-50 h-full w-full top-0 left-0 bg-[#5959593f]">
            <section className='w-full h-[45%] fixed z-50 bg-[#fffcf7] bottom-0 left-0 rounded-ss-[18px] rounded-se-[18px] p-[10px]'>
                <p>Iniciar Sesion para Continuar</p>
                <section className='w-full h-auto justify-center flex items-center gap-4'>
                    <button onClick={handleSignInWithGoogle} className='w-auto flex items-center gap-1 h-auto p-3 border-[1px] text-[12px] cursor-pointer'>
                        <img src="/social/google.svg" alt="facebook img" className="h-[20px] w-[20px]" />
                    </button>

                    <button onClick={handleSignInWithGoogle} className='w-auto flex items-center gap-1 h-auto p-3 border-[1px] text-[12px]'>
                        <img src="facebook.svg" alt="facebook img" className="h-[20px] w-[20px] cursor-pointer" />
                    </button>
                </section>
            </section>
        </article>
    )
}