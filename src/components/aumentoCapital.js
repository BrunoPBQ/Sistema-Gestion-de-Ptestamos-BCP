import React, { useEffect } from 'react';
import { useAuth } from '../Firebase/AuthContext';

const AumentoCapital = () => {
    const { SolicitudGerente, listarSolicitudGerente, AumentarCapital, RechazarCapital } = useAuth()
    useEffect(() => {
        listarSolicitudGerente()
    }, []);
    return (
        <div className="div-solicitud">
            <div className="container centrar">
                <div className="mis-prestamos">
                    <div className="div-h1">
                        <h1>Consultar aumento de capital</h1>
                    </div>
                    {SolicitudGerente.length === 0 ?
                        <div className="centar">
                            <div className='nohay'>
                                <i className="fas fa-folder-open"></i>
                                <h5>No tiene ninguna solicitud de Aumento de capital</h5>
                            </div>
                        </div>
                        :
                        SolicitudGerente.map(info => (
                            <div className="div-prestamos" key={info.id}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <b>Información:</b>
                                        <p>Id: <label>{info.id}</label></p>
                                        <p>Nombre: <label>{info.nombre}</label></p>
                                        <p>Prestamo: <label>S/{info.monto}</label></p>
                                    </div>
                                    <div className="col-sm-6 out-div-estado">
                                        <div className='in-div-estado'>
                                            <div className='in-div-estado'>
                                                <div className="titulo-Estado centrar">
                                                    <button className="centrar boton-login boton-login2 btn btn-primary" onClick={()=>AumentarCapital(info.id,info.monto)}>Aumentar Capital</button>
                                                </div>
                                                <div className="Estado-Pago centrar">
                                                    <button className="centrar boton-login boton-login2 btn btn-primary mt-3" onClick={()=>RechazarCapital(info.uid,info.nombre,info.monto,info.id)}>Rechazar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AumentoCapital;
