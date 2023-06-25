import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DATE } from "sequelize";
import models from "./../models";
import { JWT_EXPIRATION,JWT_SECRET } from "../config/config";

class UserController{
    async createUser(req,res){
        try {
            let passwordCifrado = await bcrypt.hash(req.body.Contraseña,10);
        
            const usuario = await models.Usuario.create({
                User: req.body.User,
                Contraseña: passwordCifrado,
                Nombre: req.body.Nombre,
                Apellido: req.body.Apellido,
                Correo: req.body.Correo,
                Telefono: req.body.Telefono
              });
            return res.json({mensaje:"Usuario Creado"})
        } catch (error) {
            res.status(500).json({
                status:500,
                mensaje: "EL SISTEMA NO PUDO REGISTRAR EL USUARIO",
                error:error
            })
        }}
        async loginUser(req,res){
        try {
            let usuario = await models.Usuario.findOne({
                where:{
                    User:req.body.User
                }
            })            
            if (usuario){
                let passwordBD = usuario.password;
                let passwordUsuario = req.body.password; 
                let respuesta = await bcrypt.compare(passwordUsuario,passwordBD);
                if (respuesta){
                        let payload = {
                        User:usuario.User,
                        id: usuario.id,
                        time: new Date()
                    }
                    let token = jwt.sign(payload,JWT_SECRET,{
                        expiresIn: JWT_EXPIRATION
                    })
                     
                    return res.json({token:token})
                  //  return res.json({mensaje: "Contraseña Correcta"})
                }
                else{
                    return res.json({mensaje: "Contraseña Incorrecta"})}}
            else{
                return res.json({mensaje: "El usuario no existe"})}
            }catch (error) {
            res.status(500).json({
                status:500,
                mensaje: "EL SISTEMA NO PUDO encontrar al USUARIO",
                error:error
            })
        }
        }
        async eliminarUsuario(req, res) {
            try {
              const usuario = await models.Usuario.findByPk(req.params.User);
              if (usuario) {
                await usuario.destroy();
                res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
              } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
              }
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          }
}
export const userController = new UserController;