const { encrypt } = require('../helpers/handleBcrypt');
const user = require('../models').users_model;


module.exports = {
    listUsers: async (req, res) => {
        try {
            const data = await user.findAll({})
            return res.status(200).send({
                data,
                message: 'user list successfully'
            });
        }catch(error){
            return res.status(500).send(error);
        }
    },

    searchUsersEmail: async(req, res) =>{
        try {
            const resp = req.params.g; //captura e ide que viaja por el protocolo http
            const data = await user.findOne({
                where:{
                    email: resp
                }
            });
            if (!data){
                res.status(400).json({
                    status: 'error',
                    name: "error email",
                    message: "not found users",
                    path: error.path
                })
            }
            return res.status(200).send({
                data,
                message: 'users search one object successfully'
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

    postUsers: async (req, res) => {
        try {
            const {id_roll,email,password} = req.body;
            const passwordHash= await encrypt(password);
            const data = await user.create({
                id_roll,
                email,
                password: passwordHash
            })
            if (!data){
                res.status(400).json({
                    status: 'error',
                    name: error.name,
                    message: "not found",
                    path: error.path
                })
            }
            return res.status(200).send({
                data,
                message: 'users inserted successfully'
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

    updateUsers: async (req, res) => {
        try {
            const id = req.params.id;
            const data= await user.findOne({
                where:{
                    id: id
                }    
                
            });
            if (!data){
                return res.status(400).send({
                    message: 'users Not Found',
                });
            }

            const resp = await data.update({
                where:{ id: id },
                id_roll: req.body.name || data.id_roll,
                email: req.body.date || data.email,
                password: req.body.name || data.password
            })
            if (!resp){
                return res.status(400).send({
                    message: 'users Not Found',
                });
            }
            return res.status(200).send({
                data,
                message: 'users update successfully'
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

    deleteUsers: async(req,res)=>{
        try {
            const id = req.params.id;
            const data= await user.findOne({
                where:{
                    id: id
                }    
                
            });

            if (!data){
                return res.status(400).send({
                    message: 'users Not Found',
                });
            }
            const del = await data.destroy();
            if (!del){
                throw Error("Cannot delete");
            }
            return res.status(200).send({
                data,
                message: 'user deleted successfully'
            });

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