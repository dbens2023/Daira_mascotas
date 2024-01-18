import { Link } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from 'react';
import { SqlContext } from "../context/SqlMetodos";
import log from "../asesst/login1.png";
import logprin from "../asesst/log.jpg";
import "../css/nav.css";
import Swal from 'sweetalert2';

export function Nav() {

    const { dataAuth, login } = useContext(SqlContext);
    const [dataauth, setDataAuth] = useState({})
    const [sesion, setSesionData] = useState({})
    const formRef = useRef(null);
    const Loginfun = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const userLogin = {}
        try {
            formData.forEach((value, key) => {
                userLogin[key] = value
            });
            if (!userLogin) {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "EMERGANCIA ERROR EN LA PETICION USUARIO O CONTRACEÑA ERRORNEO!",
                    footer: '<a href="#">Error?</a>'
                });
            }
            setSesionData(userLogin)
            login(userLogin);
            Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img className="logop" src={logprin} width="50" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mascotas">Mascotas</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">  Login</a>
                            </li>
                            <li className="nav-item">
                                {
                                    sesion && sesion.email && sesion.email.toLowerCase() === "daira@gmail.com" ? (
                                        <Link className="nav-link" to="/admin">Administrador</Link>
                                    ) : (
                                        <Link className="nav-link" to="#">Administrador</Link>
                                    )
                                }
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>

                    {/* MODAL PARA HACER EL LOGIN */}
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    {
                                        sesion.email ? (
                                            <div>
                                                <h4>Usuario: {sesion.email} </h4>
                                            </div>
                                        ) : ( 
                                            <form ref={formRef}>
                                                <div className="imgcontainer">
                                                    <img src={log} width="300px" alt="Avatar" className="avatar" />
                                                </div>
                                                <br /><br />
                                                <div className="div_con">
                                                    <label htmlFor="email"><b>Usuario</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input className='inpu' type="text" placeholder="Daira@gmail.com" name="email" required />
                                                    <br /><br />
                                                    <label htmlFor="password"><b>Contraseña</b></label>
                                                    <input className='inpu' type="password" placeholder="Insertar Contraseña" name="password" required />
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    <button type="button" onClick={Loginfun} className="btn btn-primary">Login</button>
                                                </div>
                                            </form>
                                        )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>














                </div>
            </nav>
        </>
    )
}
