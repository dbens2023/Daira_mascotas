const mascot = require('../models').mascota_model;


module.exports = {
    listMascota: async (req, res) => {
        try {
            const data = await mascot.findAll({})
            return res.status(200).send({
                data,
                message: 'product list successfully'
            });
        }catch(error){
            return res.status(500).send(error);
        }
    },
    searchMascota: async(req, res) =>{
        try {
            const id = req.params.id; //captura e ide que viaja por el protocolo http
            const data = await mascot.findOne({
                where:{
                    id:id
                }
            });
            if (!data){
                res.status(400).json({
                    status: 'error',
                    name: error.name,
                    message: "not found product",
                    path: error.path
                })
            }
            return res.status(200).send({
                data,
                message: 'product search one object successfully'
            });
        } catch (error) {

            return res.status(500).json({
                status: 'error',
                name: error.name,
                message: error.message,
                path: error.path
            })
            
        }
    },
    postMascota: async (req, res) => {
        try {
            const data = await mascot.create({
                nombre: req.body.nombre,
                raza: req.body.raza,
                avatar: req.file.path,
                descripcion: req.body.descripcion

            });
            if (!data){
                res.status(400).json({
                    status: 'error',
                    name: error.name,
                    message: error.message,
                    path: error.path
                })
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                name: error.name,
                message: error.message,
                path: error.path
            })
        }

    },
    updateMascota: async (req, res) => {
        try {
            const id = req.params.id;
            const data= await mascot.findOne({
                where:{
                    id: id
                }    
                
            });
            if (!data){
                return res.status(400).send({
                    message: 'product Not Found',
                });
            }

            const resp = await data.update({
                where:{ id: id },
                nombre: req.body.nombre || data.nombre,
                raza: req.body.raza || data.raza,
                avatar: req.body.avatar || data.avatar

            })
            if (!resp){
                return res.status(400).send({
                    message: 'product Not Found',
                });
            }
            return res.status(200).send({
                data,
                message: 'product update successfully'
            });

        } catch (error) {
            return res.status(500).json({
                status: 'error',
                name: error.name,
                message: error.message,
                path: error.path
            })
        }
    },
    deleteMascota: async(req,res)=>{
        try {
            const id = req.params.id;
            const data= await mascot.findOne({
                where:{
                    id: id
                }    
                
            });

            if (!data){
                return res.status(400).send({
                    message: 'product Not Found',
                });
            }
            const del = await data.destroy();
            if (!del){
                throw Error("Cannot delete");
            }
            return res.status(200).json(del);

        } catch (error) {
            return res.status(500).json({
                status: 'error',
                name: error.name,
                message: error.message,
                path: error.path
            })
        }
    }
};