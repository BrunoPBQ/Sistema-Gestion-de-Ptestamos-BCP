import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import ConsultaPrestamos from '../components/consultaPrestamos';
import Menu from '../components/Menu';
import MisPrestamos from '../components/misPrestamos';
import Navbar from '../components/navbar';
import SolicitudPrestamo from '../components/solicitudPrestamo';
import SolicitudCapital from '../components/solicitudCapital';
import AumentoCapital from '../components/aumentoCapital';
const SystemRouter = () => {
    return (
        <main className='menu'>
            <Navbar />
            <Routes>
                    <Route path="" element={<Menu />}></Route>
                    <Route path="solicitud/prestamo" element={<SolicitudPrestamo />}></Route>
                    <Route path="prestamos/:uid" element={<MisPrestamos />}></Route>
                    <Route path="consulta/prestamos" element={<ConsultaPrestamos />}></Route>
                    <Route path="solicitud/capital" element={<SolicitudCapital />}></Route>
                    <Route path="consulta/capital" element={<AumentoCapital />}></Route>
            </Routes>
        </main>
    );
}

export default SystemRouter;
