import { useState } from 'react';

export function MascotaComponent({ dataMascota }) {

    const [filtroNombre, setFiltroNombre] = useState('');

    const filtrarMascotas = () => {
        return dataMascota.data.filter(mascota => mascota.nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
    };

    const handleFiltroChange = (event) => {
        setFiltroNombre(event.target.value);
    };


    const [detalle, setDetalle] = useState({});
    const Descrive = (res) => {
        setDetalle(res)
    }

    const car = {
        width: "18rem",
    }


    return (
        <div>
            <h2 className="text-center">Mascotas</h2>

            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-md">
                        <input 
                            type="text" value={filtroNombre}
                            onChange={handleFiltroChange} 
                            className="form-control" 
                            placeholder='Filtrado por el nombre de la mascota' 
                        />
                    </div>
                </nav>
            </div>

            {Array.isArray(dataMascota.data) && dataMascota.data.length > 0 ? (
                <div className="row">
                    {filtrarMascotas().map((mascota) => {

                        return (
                            <div key={mascota.id} className="col-md-4 mb-4">
                                <div className="card" style={car}>
                                    <img
                                        src={`http://localhost:3001/public/files/${((mascota.avatar).replace(/\\/g, '/')).split("/")[2]}`} // Ruta relativa desde el directorio 'public'
                                        className="card-img-top"
                                        alt={`Imagen de ${mascota.nombre}`}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{mascota.nombre}</h5>
                                        <p className="card-text">{mascota.raza}</p>
                                        <a href="#" onClick={() => Descrive(mascota)} data-bs-toggle="modal" data-bs-target="#descripcion" className="btn btn-primary">
                                            Ver más
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            ) : (
                <p>No hay mascotas disponibles.</p>
            )}


            {/* MODA DESCRIPCION */}
            <div className="modal fade" id="descripcion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Descripcion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2>Detalles de la Mascota</h2>
                            {detalle && detalle.avatar && (
                                <img
                                    src={`http://localhost:3001/public/files/${((detalle.avatar).replace(/\\/g, '/')).split("/")[2]}`}
                                    className="card-img-top"
                                    alt="img"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                            )}
                            <p>ID: {detalle.id}</p>
                            <p>Nombre: {detalle.nombre}</p>
                            <p>Raza: {detalle.raza}</p>
                            <p>Descripción: {detalle.descripcion}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
