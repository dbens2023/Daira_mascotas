import { useState, useContext, useEffect } from 'react';
import { SqlContext } from "../context/SqlMetodos";
import tienda from "../asesst/tienda.jpg";
import Swal from 'sweetalert2';

export function Admin() {

    const { dataMascota, DeleteMascota, GetMascota, PostMascota, GetAuth } = useContext(SqlContext);

    useEffect(() => {
        GetMascota();
        GetAuth();
    }, [])

    const eliminarMascota = (id) => {
        Swal.fire({
            title: "Esta seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar reguistro!"
        }).then((result) => {
            DeleteMascota(id);
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado!",
                    text: "Tu archivo ha sido eliminado.",
                    icon: "success"
                });
            }
        });
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleRazaChange = (e) => {
        setRaza(e.target.value);
    };

    const handleDetalleChange=(e)=>{
        setDescripcion(e.target.value);
    }
    const postMascota = async (e) => {
        e.preventDefault();
        try {
            if (selectedImage && nombre && raza && descripcion) {
                const formData = new FormData();
                formData.append('nombre', nombre);
                formData.append('raza', raza);
                formData.append('file', selectedImage);
                formData.append('descripcion', descripcion);

                await PostMascota(formData)
            }
            // alert("error");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={tienda} width="400px" />
                </div>
                <div className="col-8">
                    <table className="table table-striped table-hover  table-bordered border-primary caption-top">
                        <caption>Tabla de mascotas</caption>
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Raza</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead >
                        <tbody className="table-group-divider">
                            {Array.isArray(dataMascota.data) && dataMascota.data.length > 0 ? (
                                dataMascota.data.map((mascota) => (
                                    <tr key={mascota.id}>
                                        <th> {mascota.id}</th>
                                        <th> {mascota.nombre}</th>
                                        <th> {mascota.raza}</th>
                                        <th> <img className='rounded-circle' src={`http://localhost:3001/public/files/${((mascota.avatar).replace(/\\/g, '/')).split("/")[2]}`} width="100px" alt={mascota.avatar} /> </th>
                                        <th>
                                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModalInsertar"><i className="bi bi-file-earmark-text-fill"></i></button>
                                            <button className='btn btn-warning'><i className="bi bi-repeat"></i></button>
                                            <button onClick={() => eliminarMascota(mascota.id)} className='btn btn-danger'> <i className="bi bi-trash-fill"></i></button>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <p>No hay mascotas disponibles.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* MODAL PARA INSERTAR MASCOTA */}
            <div className="modal fade" id="exampleModalInsertar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Insertar nueva mascota</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form >
                                <div className="mb-3">
                                    <label for="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={handleNombreChange} id="nombre" />
                                </div>

                                <div className="mb-3">
                                    <label for="raza" className="form-label">Raza</label>
                                    <input type="text" className="form-control" value={raza} onChange={handleRazaChange} />
                                </div>

                                <div className="mb-3">
                                    <label for="avatar" className="form-label">Avatar</label>
                                    <input type="file" onChange={handleFileChange} className="form-control" id="avatar" />
                                </div>

                                <div className="mb-3">
                                    <label for="descripcion" className="form-label">Descripcion</label>
                                    <textarea  onChange={handleDetalleChange} value={descripcion} className="form-control" id="descripcion"></textarea>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" onClick={postMascota} className="btn btn-primary">Insertar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
