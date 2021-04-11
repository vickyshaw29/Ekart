const User = require('../models/user')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const asyncHandler = require('express-async-handler')
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            return res.status(404).json({ error: "user not found" })
        }
        req.profile = user
        next()
    })
}
exports.userSignup = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(401).json({ error: 'user already exists' })
        }
        const user = await new User(req.body)
        await user.save()
        res.status(200).json({ msg: 'signup success' })
    } catch (err) {
        console.log(err)
    }
}
)
exports.userSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ error: 'user with that email does not exist please signup' })
    }
    if (!user.authenticate(password)) {
        res.status(401).json({ error: "email and password do not match" })
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.cookie('t', token, { expire: 360000 + Date.now(), httpOnly: true })
    const { _id, name, isAdmin } = user
    return res.status(200).json({ token, user: { _id, name, email, isAdmin } })

}
)
exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({ msg: "signout success" })
}
exports.requireSignin = expressJwt({
    secret: process.env.SECRET_KEY, algorithms: ['HS256']
})
exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.json(req.profile)
}
exports.updateUser = asyncHandler(async (req, res) => {
    let user = req.profile
    console.log(user)
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err, user) => {
        console.log(err)
        if (err) {
            return res.status(400).json({ error: 'User not found' })
        }
        user.hashed_password = undefined
        user.salt = undefined
        return res.status(200).json(user)
    })
}
)
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
// delete any user by the admin
exports.deleteUserByAdmin = async (req, res) => {
    const user = await User.findById(req.headers.id)
    if (user) {
        user.remove((err, user) => {
            if (err) {
                return res.status(404).json({ message: 'user not found' })
            }
            return res.status(200).json({ message: 'User deleted successfully' })
        })
    } else {
        return res.status(404).json({ message: 'User does not exist' })
    }

}
// update any user by the admin 
exports.updateUserByAdmin = asyncHandler(async (req, res) => {
    let user = await User.findById(req.headers.id)
   if(user){
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User could not be saved' })
        }
        return res.status(200).json(user)
    })
   }else{
       return res.status(404).json({message:'User does not exist'})
   }

}
)