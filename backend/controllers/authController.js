const { compare } = require('../helpers/handleBcrypt');
const auth = require('../models').roll_model;
const { tokenSign } = require('../helpers/generateToken')


module.exports = {
    listAuth: async (req, res) => {
        try {
            const data = await auth.findAll()
            return res.status(200).json(data);

        }catch(error){
            return res.status(500).send(error);
        }
    },

    searchAuth: async(req, res) =>{
        try {
            const resp = req.params.id; //captura e ide que viaja por el protocolo http
            const data = await auth.findOne({
                where:{
                    id: resp
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

    login: async(req, res) =>{
        try {
            const {email, password} = req.body;
            const us = await user.findOne({where : {email: email}});
            if(!us){
                return res.status(404).json({
                    status: 'error',
                    name: "user",
                    message: "user not found",
                    path: error.path
                })
            }
            const checkPassword = await compare(password, us.password);
            const tokenSession = await tokenSign(us);
            console.log("token:", tokenSession)
            if(checkPassword){
                return res.send({
                    data:us,
                    token: tokenSession
                })
            }

            if(!checkPassword){
                return res.status(404).json({
                    status: 'error',
                    name: "passwor",
                    message: "password is invalid",
                    path: error.path
                })
            }


        } catch (error) {

            return res.status(500).json({
                status: 'error',
                name: "login",
                message: error.message,
                path: error.path
            })
            
        }
    },

};