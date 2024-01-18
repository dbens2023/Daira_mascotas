import tienda from "../asesst/tienda.jpg"

export function HomeComponent() {

    return (
        <div className="container">
            <h3 className="text-center">Tienda de mascotas el paraíso</h3>
            <div className="row">
                <div className="col-7">
                    <img src={tienda} width="600px" height="530px" />
                </div>
                <div className="col-5">
                    <p>
                        ¡Bienvenido a nuestra tienda de mascotas, el paraíso para amantes de los animales y sus fieles compañeros! 
                        En nuestro acogedor rincón, nos enorgullece ofrecerte una experiencia única en el mundo de las mascotas, 
                        donde la alegría y el afecto de los peludos se fusionan con la calidad y la atención excepcional.<br/>
                        Explora nuestro amplio surtido de productos diseñados y mascotas unica, 
                        para satisfacer las necesidades y caprichos de tus adorables amigos de cuatro patas.<br/> 
                        Desde alimentos premium hasta juguetes cautivadores, 
                        pasando por accesorios elegantes, aquí encontrarás todo lo que tu mascota necesita para vivir una vida feliz y saludable.<br/>
                        Nuestro compromiso con la calidad se refleja en cada rincón de la tienda. <br/>
                        Trabajamos con marcas reconocidas y proveedores de confianza para garantizar que cada producto cumpla con los más altos estándares de seguridad y nutrición.<br/> 
                        Además, nuestro equipo de expertos está siempre dispuesto a ofrecerte orientación y asesoramiento personalizado para asegurarnos de que encuentres exactamente lo que buscas.<br/>
                    </p>
                </div>
            </div>
        </div>
    )
}
