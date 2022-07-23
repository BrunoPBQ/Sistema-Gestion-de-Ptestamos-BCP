import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import '../css/login.css';
import { useAuth } from '../Firebase/AuthContext';
import NavbarFrom from './navbarFrom';
const Login = () => {
    const { login } = useAuth()
    return (
        <main>
            <NavbarFrom/>
            <div className="div-form">
                <div className="seccion1">
                    <div className="div-mensaje-bienvenida">
                        <h3 className='titulo-1'>Bienvenido a tu nueva</h3>
                        <h3 className='titulo-2'>Banca por internet</h3>
                        <p className='eslogan'>Tus operaciones de siempre con una nueva imagen</p>
                    </div>
                </div>
                <div className="seccion2">
                    <div className="out-form text-center" >
                        <div className="form-signin">
                            <h1>Banca por Internet</h1>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validate={(valores => {
                                    let errores ={};

                                    //validacion Correo
                                    if (!valores.email) {
                                        errores.email = '*Por favor ingresa el correo*'
                                    }else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(valores.email)) {
                                        errores.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guión bajo*'
                                    }
                                    
                                    //validación Contraseña
                                    if (!valores.password) {
                                        errores.password = '*Por favor ingresa la contraseña*'
                                    }else if (!/^(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(valores.password)) {
                                        errores.password = 'La contraseña debe tener al entre 8 y 16 caracteres*'
                                    }
                                    
                                    return errores
                                })}
                                onSubmit={(valores) => {
                                    login(valores.email, valores.password)
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label htmlFor="floatingInput">Correo electrónico</label>
                                        </div>
                                            {errors.email && touched.email && <div className="error">{errors.email}</div>}
                                        <div className="form-floating ">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                autoComplete='on'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label htmlFor="floatingPassword">Contraseña</label>
                                        </div>
                                        {errors.password && touched.password && <div className="error">{errors.password}</div>}
                                        <div className='div-links'>
                                        <Link to="/registrar" className='nav-link link-form'>¿Aún no tienes cuenta en  BCP?</Link>                                        </div>
                                        <button className="centrar boton-login w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
