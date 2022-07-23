import React from 'react';
import '../css/menu.css'
import { useAuth } from '../Firebase/AuthContext';
import Operaciones from './Operaciones';

const Menu = () => {
    const { Nombre, Apellido } = useAuth()
    return (
        <>
            <section>
                <div className="div-bienvenida">
                    <div className="div-text-bienvenida">
                        <div className='div-saludo'>
                            <h1 className='saludo'>Hola,<p className='nombre'>{Nombre} {Apellido}</p></h1>
                            <div className='div-frase-saludo'>
                                <p>¿Que haremos hoy?</p>
                            </div>
                        </div>
                    </div>
                    <div className="div-img-bienvenida">
                    </div>
                </div>
            </section>
            <Operaciones/>
        </>
    );
}

export default Menu;
