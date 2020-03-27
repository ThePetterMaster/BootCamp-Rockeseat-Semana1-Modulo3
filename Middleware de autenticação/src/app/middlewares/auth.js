import jwt from 'jsonwebtoken';
//serve para transformar uma função de callback em async e await
import {promisify} from 'util';

import authConfig from '../../config/auth';

export default async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error:'Token not provided'});
    }

    const[,token]=authHeader.split(' ');

    try{
        //compara o token com o secret
        //caso o secret tenha gerado o token, irá seguir ocm next
        const decode =await promisify(jwt.verify)(token,authConfig.secret);
        req.userid=decode.id;
        return next();
    }catch(err){
        return res.status(401).json({error:'Token invalid'});
    }
};
