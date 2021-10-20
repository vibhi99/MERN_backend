const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
    try{

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'verySecretValue')

        req.user = decode

        next()
    }
    catch(error){
        res.json({
            message: 'Authentication Failed!'
        })
    }
}

const restrictTO = (roles) =>{
    return (req, res, next) =>{
        console.log(req.user)
        const userRole = req.user.role
        
        if(!roles.includes(userRole)){
            return res.status(401).json("no permission")
            
        }else{
            next()
        }
    }
}




module.exports = {authenticate, restrictTO}