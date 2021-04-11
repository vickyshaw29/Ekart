exports.notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
exports.errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV=="production" ?null :err.stack
    })
}
exports.admin=(req,res,next)=>{
    let user=req.profile
    if(user && user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}
