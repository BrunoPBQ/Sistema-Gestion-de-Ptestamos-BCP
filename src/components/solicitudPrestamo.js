import React from 'react';
import '../css/solicitud.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../Firebase/AuthContext';

const SolicitudPrestamo = () => {
    const { subirSolicitudPrestamo } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();
        const Nombre = e.target.inputNombre.value;
        const Profesión = e.target.inputProfesion.value;
        const DNI = e.target.inputDNI.value;
        const RUC = e.target.inputRUC.value;
        const Ingresos = e.target.inputIngresos.value;
        const NombreComprobante = e.target.inputComprobante.files[0].name;
        const Comprobante = e.target.inputComprobante.files[0];
        const Celular = e.target.inputCelular.value;
        const Monto = e.target.inputMonto.value;

        subirSolicitudPrestamo(Nombre, Profesión, DNI, RUC, Ingresos, NombreComprobante, Comprobante, Celular, Monto)

    }
    return (
        <div className="div-solicitud">
            <div className="container centrar">
                <div className="div-form-solicitud">
                    <div className="div-h1">
                        <h1>Solicitud Prestamo</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="Nombre"
                                        className="form-control"
                                        id="inputNombre"
                                        placeholder="Nombre Completo"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Nombre Completo*</label>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="Profesión"
                                        className="form-control"
                                        id="inputProfesion"
                                        placeholder="Profesión"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Cargo u Ocupación*</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="dni"
                                        className="form-control"
                                        id="inputDNI"
                                        placeholder="DNI"
                                        required
                                    />
                                    <label htmlFor="floatingInput">DNI*</label>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        name="RUC"
                                        className="form-control"
                                        id="inputRUC"
                                        placeholder="RUC"
                                    />
                                    <label htmlFor="floatingInput">RUC</label>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        name="Ingresos"
                                        className="form-control"
                                        id="inputIngresos"
                                        placeholder="Ingresos"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Ingreso*</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="floatingInput" className='ml-1'>Comprobante de ingresos*</label>
                                <div className="input-group mb-4">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputComprobante"
                                        placeholder="Comprobante"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        name="Celular"
                                        className="form-control"
                                        id="inputCelular"
                                        placeholder="Celular"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Celular*</label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        name="Monto"
                                        className="form-control"
                                        id="inputMonto"
                                        placeholder="Monto"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Monto S/.*</label>
                                </div>
                            </div>
                        </div>
                        <div className='div-links'>
                            <Link to="/" className='centrar boton-cancelar btn btn-primary link-form1'>Cancelar</Link>
                            <button className="centrar boton-login boton-login2 btn btn-primary" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SolicitudPrestamo;
