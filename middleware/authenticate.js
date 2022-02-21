const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
    try{

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = decode

        next()
    }
    catch(error){
        if(error.name == "TokenExpiredError"){
            res.status(401).json({
                message: 'Token Expired!'
            })
        }else{
            res.json({
                message: 'Authentication Failed!'
            })
        }
        
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