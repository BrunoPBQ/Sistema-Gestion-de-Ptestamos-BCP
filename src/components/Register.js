import React from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import { useAuth } from '../Firebase/AuthContext';
import NavbarFrom from './navbarFrom';

const Register = () => {
    const { registro } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.inputNombre.value;
        const apellido = e.target.inputApellido.value;
        const email = e.target.inputEmail.value;
        const password = e.target.inputPassword.value;
        const fecha = e.target.InputDate.value;
        const sexo = e.target.inputSexo.value;

        registro(nombre, apellido, email, password, fecha, sexo);
    }

    return (
        <main>
            <NavbarFrom />
            <div className="div-form">
                <div className="seccion1">
                    <div className="div-mensaje-bienvenida">
                        <h3 className='titulo-1'>Bienvenido a</h3>
                        <h3 className='titulo-2'>Banca por internet</h3>
                        <p className='eslogan'>Registrare para acceder a todos nuestros servicios</p>
                    </div>
                </div>
                <div className="seccion2">
                    <div className="out-form text-center" >
                        <div className="form-signin">
                            <h1>Crea tu cuenta</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control"
                                                id="inputNombre"
                                                placeholder="Nombre"
                                                required
                                            />
                                            <label htmlFor="inputNombre">Nombre</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                name="apellido"
                                                className="form-control"
                                                id="inputApellido"
                                                placeholder="Apellido"
                                                required
                                            />
                                            <label htmlFor="inputApellido">Apellido</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="name@example.com"
                                        required
                                    />
                                    <label htmlFor="inputEmail">Correo electrónico</label>
                                </div>
                                <div className="form-floating ">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                        autoComplete='on'
                                        required
                                    />
                                    <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                                <div className="form-floating ">
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control"
                                        id="InputDate"
                                        placeholder="date"
                                        required
                                    />
                                    <label htmlFor="InputDate">Fecha de nacimiento</label>
                                </div>
                                <select
                                    name="sexo"
                                    placeholder="date"
                                    className="form-control"
                                    id="inputSexo"
                                    required
                                >
                                    <option value="">Selecciona el sexo</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Hombre">Hombre</option>
                                    <option value="Otros">Otros</option>
                                </select>
                                <div className='div-links'>
                                    <Link to="/login" className='centrar boton-cancelar btn btn-primary link-form1'>Cancelar</Link>
                                    <button className="centrar boton-login boton-login2 btn btn-primary" type="submit">Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
