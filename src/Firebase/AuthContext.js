import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext, useState, useEffect } from 'react'
import FirebaseApp from "./FirebaseApp";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


//sweet options
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
})

const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setloading] = useState(null);
    const [Nombre, setNombre] = useState(null);
    const [Apellido, setApellido] = useState(null);
    const [Cargo, setCargo] = useState(null);
    const [Fecha, setFecha] = useState(null);
    const [Sexo, setSexo] = useState(null);
    const [Tipo, setTipo] = useState(null);
    const [Capital, setCapital] = useState(null);
    let navigate = useNavigate();


    function registro(nombre, apellido, email, password, fecha, sexo,) {
        setloading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const uid = userCredential.user.uid;
                Toast.fire({
                    icon: 'success',
                    title: 'Inicio de sesión correcto'
                })

                //agregar datos del usuario
                setDoc(doc(db, "usuarios", uid), {
                    nombre: nombre,
                    apellido: apellido,
                    fecha: fecha,
                    sexo: sexo,
                    cargo: false,
                    uid: uid,
                    tipo: "Usuario"
                });


            }).catch((error) => {
                // ..
                setloading(null)
            });
    }

    function login(email, password) {
        setloading(true)
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Inicio de sesión correcto'
                    })
                })
                .catch((error) => {
                    if (error.code === "auth/too-many-requests") {
                        Toast.fire({
                            icon: 'error',
                            title: 'La cuenta fue bloqueada, intente mas tarde'
                        })
                    } else {
                        if (error.code === "auth/user-not-found") {
                            Toast.fire({
                                icon: 'error',
                                title: 'El correo electronico no existe'
                            })
                            setloading(null)
                        }
                        else {
                            if (error.code === 'auth/wrong-password') {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'La contraseña es incorrecta'
                                })
                                setloading(null)
                            }

                        }

                    }

                });
        }
        else {
            Toast.fire({
                icon: 'warning',
                title: 'Los campos son obligatorios'
            })
            setloading(null)
        }

    }


    function logOut() {
        signOut(auth).then(() => {
            Toast.fire({
                icon: 'info',
                title: 'La sesión se cerró'
            })
        }).catch((error) => {
            Toast.fire({
                icon: 'error',
                title: 'Oops... Algo salió mal'
            })
        });
    }

    async function DatosUser(uid) {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        querySnapshot.forEach((doc) => {
            if (uid === doc.data().uid) {
                setNombre(doc.data().nombre);
                setApellido(doc.data().apellido);
                setCargo(doc.data().cargo);
                setFecha(doc.data().fecha);
                setSexo(doc.data().sexo);
                setTipo(doc.data().tipo);
                setloading(null)
            }
        });
        const querySnapshot2 = await getDocs(collection(db, "banco"));
        querySnapshot2.forEach((doc) => {
            if (doc.data().uid !== "Usuario") {
                setCapital(doc.data().capital)
            }
        });
    }

    function subirSolicitudPrestamo(Nombre, Profesión, DNI, RUC, Ingresos, NombreComprobante, Comprobante, Celular, Monto) {
        try {
            setloading(true)

            const ComprobanteRef = ref(storage, `prestamos/${NombreComprobante}`)

            console.log(Comprobante);
            uploadBytes(ComprobanteRef, Comprobante)
                .then(() => {
                    setloading(false)
                    Swal.fire({
                        title: 'Estas seguro?',
                        text: "registraras un prestamo",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#ff7800',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/', { replace: true })
                            //agregar datos de la solicitud de Prestamo
                            getDownloadURL(ref(storage, `prestamos/${NombreComprobante}`))
                                .then((url) => {

                                    addDoc(collection(db, "prestamos"), {
                                        nombre: Nombre,
                                        profesión: Profesión,
                                        dni: DNI,
                                        ruc: RUC,
                                        ingresos: Ingresos,
                                        comprobante: NombreComprobante,
                                        celular: Celular,
                                        monto: Monto,
                                        estado: "En proceso",
                                        pago: "",
                                        uid: currentUser,
                                        url: url
                                    });
                                })
                        }
                    })
                })

                .catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Algo salió mal. Intente mas tarde'
                    })
                    setloading(false)
                })

        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Oops... Algo salió mal'
            })
            setloading(false)
        }
    }

    async function CambiarCapital(capital) {
        await updateDoc(doc(db, "banco", "0E4tE9rSjE4lCUugn5KY"), {
            capital: capital
        });
    }


    function RechazarPrestamo(id) {
        Swal.fire({
            title: 'Estas seguro?',
            text: "los cambios no se podran revertir",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#dc3545',
            confirmButtonColor: '#ff7800',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                Toast.fire({
                    icon: 'warning',
                    title: 'Se rechazo el prestamo'
                })
                async function cambioestado() {
                    await updateDoc(doc(db, "prestamos", id), {
                        estado: "Rechazado",
                        pago: ""
                    });
                }
                cambioestado()
            }
        })
    }


    function cambiarEstadoPrestamo(monto, id, uid, nombre) {
        Swal.fire({
            title: 'Estas seguro?',
            text: "los cambios no se podran revertir",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#dc3545',
            confirmButtonColor: '#ff7800',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                if (Capital - monto >= 0) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Se aprobó el prestamo'
                    })
                    setCapital(Capital - parseInt(monto))
                    CambiarCapital(Capital - parseInt(monto))
                    navigate('consulta/prestamos')
                    async function cambioestado() {
                        await updateDoc(doc(db, "prestamos", id), {
                            estado: "Aprobado",
                            pago: "Activo"
                        });
                    }
                    cambioestado()
                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: 'No se cuenta con Capital suficiente'
                    })
                    async function cambioestado() {
                        await updateDoc(doc(db, "prestamos", id), {
                            estado: "En observación"
                        });
                    }
                    cambioestado()
                    setDoc(doc(db, "solicitud capital", id), {
                        uid: uid,
                        nombre: nombre,
                        monto: monto,
                        id: id,
                        estado: false
                    });
                }
            }
        })
    }

    async function SolicitudRealizada(id) {
        Toast.fire({
            icon: 'success',
            title: 'Se realizo la solicitud correctamente'
        })
        await updateDoc(doc(db, "solicitud capital", id), {
            estado: true
        });
    }

    async function AumentarCapital(id, monto) {
        Swal.fire({
            title: 'Estas seguro?',
            text: "los cambios no se podran revertir",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#dc3545',
            confirmButtonColor: '#ff7800',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Toast.fire({
                    icon: 'success',
                    title: 'Se realizo aumento el capital correctamente'
                })
                setCapital(Capital + parseInt(monto))
                CambiarCapital(Capital + parseInt(monto))
                updateDoc(doc(db, "prestamos", id), {
                    pago: "Aceptar"
                });
            }
        })
    }

    async function RechazarCapital(uid, nombre, monto, id) {
        Toast.fire({
            icon: 'warning',
            title: 'Se notificó al cobrador'
        })
        await updateDoc(doc(db, "prestamos", id), {
            pago: "Rechazar"
        });
        setDoc(doc(db, "solicitud capital", id), {
            uid: uid,
            nombre: nombre,
            monto: monto,
            id: id,
            estado: ""
        });
    }

    useEffect(() => {
        setloading(true)
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            try {
                const uid = user.uid;
                if (uid === user.uid) {
                    //validacino si el usuario entro realmente
                    setCurrentUser(uid)
                    DatosUser(uid)
                } else {
                    setCurrentUser(null)
                    setloading(null)
                }
            } catch (error) {
                setCurrentUser(null);
                setloading(null);
                setNombre(null);
                setApellido(null);
                setCargo(null);
                setFecha(null);
                setSexo(null);
                setTipo(null);
                setCapital(null);
            }
        });

        return unsuscribe
    }, []);

    const value = {
        currentUser,
        login,
        logOut,
        registro,
        Nombre,
        Apellido,
        Cargo,
        Fecha,
        Sexo,
        Tipo,
        subirSolicitudPrestamo,
        Capital,
        cambiarEstadoPrestamo,
        CambiarCapital,
        SolicitudRealizada,
        AumentarCapital,
        RechazarCapital,
        RechazarPrestamo
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && <Loader />}
            {children}
        </AuthContext.Provider>
    )
}