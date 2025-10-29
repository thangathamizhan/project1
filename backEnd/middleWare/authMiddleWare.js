import jwt from 'jsonwebtoken'




export const verify =(req,res,next)=>{

try {
    const authHeader =req.headers.authorization

    if(! authHeader ||!authHeader.startsWith('Bearer ')){

        return res.status(401).json({message:"token missing or invalid token"})
    }
    const token =authHeader.split(" ")[1]
    const decoded =jwt.verify(token,process.env.JWT_SECRET)
    req.user =decoded

    next()
} catch (error) {
    console.error('something error',error.message)
 return   res.status(403).json({message:'invalid or expired'})
}




}

export const isteacher =(req,res,next)=>{

if(req.user.role !=='teacher'){

return res.status(403).json({message:"access denied:only teacher"})

}
next()

}