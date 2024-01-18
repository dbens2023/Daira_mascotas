import { useContext,useEffect } from 'react';
import { SqlContext } from "../context/SqlMetodos";
import { MascotaComponent }from "../conponent/MascotaComponent";

export function Mascota() {
    const { dataMascota, GetMascota, GetAuth } = useContext(SqlContext);

    useEffect(() => {
        GetMascota();
        GetAuth();
    }, [])
   
    return (
        <div className="container">
            <MascotaComponent 
                dataMascota={dataMascota}
            />
    
        </div>
    )
}
