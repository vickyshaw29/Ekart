require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const cors=require('cors')
const userRoutes=require('./routes/userRoute')
const productRoutes=require('./routes/productRoute')
const orderRoutes=require('./routes/order')
const {notFound,errorHandler}=require('./errorMiddleware/error')
// app
const app=express()
// middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
if(process.env.NODE_ENV=='development'){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}))
}
app.use((err,req,res,next)=>{
    if(err.name==='UnauthorizedError'){
        res.status(401).json({err:'User not unauthorized'})
    }
    next()
})
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',orderRoutes)
app.use(notFound)
app.use(errorHandler)
app.use(function(err,req,res,next){
    if(err.name=='UnauthorizedError'||'Unauthorized'){
        res.status(401).json({err:'User not authorized'})
    }
})
// connecting with mongoose
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT),()=>console.log('running on port 8000'))
.catch(err=>console.log(err))
