import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/prestamos.css'
import { useAuth } from '../Firebase/AuthContext';

const MisPrestamos = () => {
    const { PrestamosxUser, DatosPrestamosxUser } = useAuth()
    let { uid } = useParams();
    useEffect(() => {
        DatosPrestamosxUser(uid)
    }, []);

    return (
        <div className="div-solicitud">
            <div className="container centrar">
                <div className="mis-prestamos">
                    <div className="div-h1">
                        <h1>Mis Prestamos</h1>
                    </div>
                    {PrestamosxUser.length === 0 ?
                        <div className="centar">
                            <div className='nohay'>
                                <i className="fas fa-folder-open"></i>
                                <h5>No tiene ningún prestamo</h5>
                            </div>
                        </div>
                        :
                        PrestamosxUser.map(info => (
                            <div className="div-prestamos" key={info.id}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <b>Información:</b>
                                        <p>Id: <label>{info.id}</label></p>
                                        <p>Nombre: <label>{info.nombre}</label></p>
                                        <p>Profesión: <label>{info.profesión}</label></p>
                                        <p>DNI: <label>{info.dni}</label></p>
                                        {info.ruc ? <p>RUC: <label>{info.ruc}</label></p> : <></>}
                                        <p>Ingresos: <label>S/{info.ingresos}</label></p>
                                        <p>Prestamo: <label>S/{info.monto}</label></p>
                                    </div>
                                    <div className="col-sm-6 out-div-estado">
                                        <div className='in-div-estado'>
                                            <div className="titulo-Estado">
                                                <b>Estado:</b>
                                            </div>
                                            <div className="Estado-Pago">
                                                <b className={info.estado}>{info.estado} {info.pago ? <><label className='guion'>-</label> <label className={info.estado}>{info.pago}</label></> : <></>}</b>
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

export default MisPrestamos;
