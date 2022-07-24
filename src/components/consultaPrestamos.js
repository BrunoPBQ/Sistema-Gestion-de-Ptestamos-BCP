import React, { useEffect, useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import FirebaseApp from "../Firebase/FirebaseApp";
const db = getFirestore(FirebaseApp);

const ConsultaPrestamos = () => {
    const { cambiarEstadoPrestamo, RechazarPrestamo } = useAuth()

    const [PrestamosPendientes, setPrestamosPendientes] = useState([]);

    function Aprobar(monto, id, uid, nombre) {
        cambiarEstadoPrestamo(monto, id, uid, nombre)
    }
    function Rechazar(id) {
        RechazarPrestamo(id)
    }


    useEffect(() => {

        function listarPrestamosPendientes() {
            const info = [];

            onSnapshot(collection(db, "prestamos"), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if ("En proceso" === doc.data().estado) {
                        info.push({ ...doc.data(), id: doc.id })
                    }
                    if ("En observación" === doc.data().estado) {
                        info.push({ ...doc.data(), id: doc.id })
                    }
                });
                setPrestamosPendientes(info);
            })
        }

        listarPrestamosPendientes()

    }, []);


    return (
        <div className="div-solicitud">
            <div className="container centrar">
                <div className="mis-prestamos">
                    <div className="div-h1">
                        <h1>Prestamos Pendientes</h1>
                    </div>
                    {PrestamosPendientes.length === 0 ?
                        <div className="centar">
                            <div className='nohay'>
                                <i className="fas fa-folder-open"></i>
                                <h5>No hay ningún prestamo pendiente</h5>
                            </div>
                        </div>
                        :
                        PrestamosPendientes.map(info => (
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
                                    <div className="col-sm-3 out-div-estado">
                                        <div className='in-div-estado'>
                                            <div className="titulo-Estado">
                                                <b>Estado:</b>
                                            </div>
                                            <div className="Estado-Pago">
                                                <b className=''>{info.estado} {info.pago ? <><label className=''>-</label> <label className="">{info.pago}</label></> : <></>}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 out-div-estado">
                                        <div className='in-div-estado'>
                                            <div className="titulo-Estado centrar">
                                                <button className="centrar boton-login boton-login2 btn btn-primary " onClick={() => Aprobar(info.monto, info.id, info.uid, info.nombre)}>Aprobar</button>
                                            </div>
                                            <div className="Estado-Pago centrar">
                                                <button className="centrar boton-login boton-login2 btn btn-primary mt-3" onClick={() => { Rechazar(info.id) }}>Rechazar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ConsultaPrestamos;
