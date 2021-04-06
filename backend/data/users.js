const bcrypt=require('bcryptjs')
const users=[
    {
        name:'Admin',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'vicky',
        email:'vicky@example.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Raz',
        email:'raz@example.com',
        password:bcrypt.hashSync('123456',10),
    },
]
module.exports= users