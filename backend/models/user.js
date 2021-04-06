const mongoose = require('mongoose')
const uuidv1=require('uuidv1')
const crypto=require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    salt: String,
    hashed_password: {
        type: String,
        required: true
    },
    updated:Date,
    isAdmin:{
        type:Boolean,
        required:true,
        default:false

    }
})
userSchema.virtual('password')
.set(function(password){
    // create a temporary variable
    this._password=password
    // generating a salt to create a random string
    this.salt=uuidv1()
    // encrypt the incming password coming from the client
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})
userSchema.methods={
    encryptPassword:function(password){
        if(!password)return ""
        try {
            return crypto
            .Hmac('sha256',this.salt)
            .update(password)
            .digest('hex')
        } catch (error) {
            return ""
        }
    },
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }
}
module.exports = mongoose.model('User', userSchema)