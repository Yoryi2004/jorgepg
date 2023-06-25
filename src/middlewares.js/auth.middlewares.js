import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config";

export const auth=function (req, res, next) {
    let token=null;

    if(req.headers.authorization){
        //sabemos que el req llega en este formato
        // Bearer abc.xyz.xxx
        //token = req.headers.authorization.split("")[1];
        
        token = req.headers['x-access-token'] || req.headers['authorization']
        token = token.split(" ")[1]
    }
        if(!token){
            res.status(403).send({
            auth:false,
            mensaje:"No se proporciono el token de seguridad"
            })
        }
        jwt.verify(token,JWT_SECRET, (error,decoded)=>{
        if (error){
            return res.status(401).send({
                auth: false,
                mensaje: "Error de autenticacion o tokken es incorrecto"
            })
        }
        next()
        })

}