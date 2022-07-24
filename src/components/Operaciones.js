import React from 'react';
import { Link } from 'react-router-dom';
import '../css/operaciones.css'
import { useAuth } from '../Firebase/AuthContext';

const Operaciones = () => {
    const { Tipo, currentUser } = useAuth()
    return (
        <section className='pt-4 pb-5'>

            <div className="container">
                <h1 className='titulo-op pb-3'>Mis Operaciones {Tipo === "Usuario" ? <></> : <label> Cargo: {Tipo}</label>}</h1>
                <div className="nav-scroller">
                    <div className="div-op">
                        <div className="card-op">
                            <Link to={`prestamos/${currentUser}`} className="item item--1 ">
                                <i className="fa fa-solid fa-envelope"></i>
                                <span className="quantity">Mis Prestamos</span>
                            </Link>
                        </div>
                        <div className="card-op">
                            <Link to={"solicitud/prestamo"} className="item item--1">
                                <i className="fa fa-solid fa-coins"></i>
                                <span className="quantity">Solictud de Prestamo</span>
                            </Link>
                        </div>

                        {Tipo === "Cobrador" ?
                            <>
                                <div className="card-op">
                                    <Link to={"consulta/prestamos"} className="item item--1">
                                        <i className="fa fa-solid fa-file-circle-exclamation"></i>
                                        <span className="quantity">Prestamos Pendientes</span>
                                    </Link>
                                </div>
                            </>
                            :
                            <></>
                        }

                        {Tipo === "Administrador" ?
                            <>
                                <div className="card-op">
                                    <Link to={"solicitud/capital"} className="item item--1">
                                        <i className="fa fa-solid fa-file-arrow-up"></i>
                                        <span className="quantity">Solicitud de Capital</span>
                                    </Link>
                                </div>
                            </>
                            :
                            <></>
                        }
                        {Tipo === "Gerente" ?
                            <>
                                <div className="card-op">
                                    <Link to={"consulta/capital"} className="item item--1">
                                    <i className="fa fa-solid fa-sack-dollar"></i>
                                        <span className="quantity">Aumento de Capital</span>
                                    </Link>
                                </div>
                            </>
                            :
                            <></>
                        }

                    </div>
                </div>
            </div>
        </section >
    );
}

export default Operaciones;
