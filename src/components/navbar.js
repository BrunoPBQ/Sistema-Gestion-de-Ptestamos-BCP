import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'
import { useAuth } from '../Firebase/AuthContext';
const Navbar = () => {
    const { logOut, Capital, Tipo } = useAuth()
    function CerrarSesión() {
        logOut()
    }
    return (
        <header>
            <div className="div-nav">
                <div className="container">
                    <div className="div-img">
                        <Link to={"/"}>
                            <img alt="bcp-logo" className="login-header-logo" height="25" src="https://stbcpzonasegura.viabcp.com/assets/img/logo.svg" />
                        </Link>
                    </div>
                    <div className="div-btn">
                        <div className="div-in-btn">
                            {Tipo === "Usuario" ? <></> : <p ><b>Capital:</b> {Capital}</p>}
                            <button onClick={CerrarSesión} className='btn-logout'><i className="fas fa-door-open"></i> </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
