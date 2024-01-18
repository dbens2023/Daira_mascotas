import { createContext, useState, useEffect} from 'react';

export const  SqlContext = createContext();

export function SqlContextProvider(props) {
    const [dataMascota, setDatamascota]=useState([]);
    const [dataAuth, setAuthData]=useState([]);
    const [sesion,setSesion]=useState({});

    const GetMascota = async() =>  {
        try {
            let response = await fetch("http://localhost:3001/mascotas/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer tu-token',
                },
                credentials: 'include'
            });
            let resp = await response.json();
            setDatamascota(resp);
        } catch (error) {
            console.log(error);
        }
    }
    const PostMascota = async (formData) => {
        try {
            const requerido = await fetch("http://localhost:3001/mascotas/post", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer tu-token',
                },
                body: formData,
                credentials: 'include',
            });
    
            if (requerido.ok) {
                const newMascota = await requerido.json();
                setDatamascota((newData) => {
                    // Ensure newData is an array before spreading
                    const dataArray = Array.isArray(newData) ? newData : [];
                    return [...dataArray, newMascota];
                });
    
                console.log('Solicitud POST exitosa:', requerido);
            } else {
                console.error('Error en la solicitud POST:', requerido.status, requerido.statusText);
            }
    
        } catch (error) {
            console.log('Error al enviar la solicitud:', error.toString());
        }
    };
    // const PostMascota = async(formData)=>{
    //     try {
    //         const requerido = await fetch("http://localhost:3001/mascotas/post", {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'Bearer tu-token',
    //             },
    //             body: formData,
    //             credentials: 'include',
    //         });
    //         if (requerido.ok) {
    //             const newMascota = await requerido.json();
    //             setDatamascota((newData) => [...(newData || []), newMascota]);
    //             console.log('Solicitud POST exitosa:', requerido);
    //         } else {
    //             console.error('Error en la solicitud POST:', requerido.status, requerido.statusText);
    //         }

    //     } catch (error) {
    //         console.log('Error al enviar la solicitud:', error.toString());
    //     }
    // }
    const DeleteMascota = async(id)=>{
        try {
            let response = await fetch(`http://localhost:3001/mascotas/delete/${id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer tu-token',
                },
                credentials: 'include',
            });
            
            if (response.ok) {
                setDatamascota( dataMascota.filter(user => user.id !== id))
                console.log('Solicitud DELETE exitosa:', 'ID->: ',id);
            } else {
                console.error('Error al eliminar la tarea:',id);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        
    }
    const UpdateMascota = async(id,data) =>{
        try {
            const requerido = await fetch(`http://localhost:3001/mascotas/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer tu-token',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (requerido.ok) {

                const newUser = await requerido.json();
                setDatamascota((newUser) => [...newUser, data]);
                console.log('Solicitud PUT exitosa:', requerido);
            } else {
                console.error('Error en la solicitud PUST:', requerido.status, requerido.statusText);
            }
        } catch (error) {
            console.log('Error al enviar la solicitud:', error.toString());
        }
    } 

    const GetAuth = async() =>  {
        try {
            let response = await fetch("http://localhost:3001/auth/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer tu-token',
                },
                body: JSON.stringify(),
                credentials: 'include',
            });
            let resp = await response.json();
            setAuthData(resp);
        } catch (error) {
            console.log(error);
        }
    }
    const login = async(res) =>{
        try {
            const requerido = await fetch("http://localhost:3001/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer tu-token', // O cualquier otro encabezado necesario
                },
                body: JSON.stringify(res),
                credentials: 'include', // Permite el intercambio de cookies
            });
            if (requerido.ok) {
                const newUser = await requerido.json();
                setSesion(newUser);  // Solo se establece el nuevo usuario, no se utiliza el operador spread
                console.log('Solicitud POST exitosa:', requerido);
            } else {
                console.error('Error en la solicitud POST:', requerido.status, requerido.statusText);
            }
        } catch (error) {
            console.log('Error al enviar la solicitud:',  error.message);
        }
    } 
    return (
        <SqlContext.Provider value={{
            GetMascota,
            dataMascota,
            PostMascota,
            DeleteMascota,
            UpdateMascota,
            GetAuth,
            dataAuth,
            login,
            sesion
        }}>
            {props.children}
        </SqlContext.Provider>
    )
}
