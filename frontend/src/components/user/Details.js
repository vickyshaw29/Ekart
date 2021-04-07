import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loading from '../stuff/Loader'
import { getUserDetails, register,updateUserDetails } from '../../actions/user'
import { Button, Col, Form, Row } from 'react-bootstrap'
const Details = ({  history }) => {
    const [name, setname] = React.useState("")
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [confirmPassword, setconfirmPassword] = React.useState("")
    const [message, setmessage] = React.useState(null)
    const dispatch = useDispatch()
    // details of user
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    // login details
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    // update details
    const userUpdate=useSelector(state=>state.userUpdate)
    const {success}=userUpdate
    useEffect(() => {
       if(!userInfo){
           history.push("/login")
       }else{
           console.log(user)
           if(!user){
               dispatch(getUserDetails(userInfo.user._id,userInfo.token))
           }else{
               setname(userInfo.user.name)
               setemail(userInfo.user.email)
           }
       }
    }, [dispatch,history, userInfo,user,success])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setmessage("passwords do not match")
        }else{
            console.log(name,email,password)
            dispatch(updateUserDetails({id:user._id,name:name||undefined,email:email||undefined,password:password||undefined}))
            setpassword("")
            setconfirmPassword("")
        }
    }
    const handleChange=()=>{
        setmessage("")
    }
    return (
        <Row>
            <Col md={3}>
                {loading?<Loading/>:""}
                {error?<Message>{error}</Message>:""}
                {message ?<Message>{message}</Message>:""}
                {success ?<Message>User updated</Message>:""}
                <h1>Profile</h1>
                <Form onSubmit={submitHandler} onChange={handleChange}>
                    <Form.Group controlId="name">
                        <Form.Label>
                            Name
                    </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>
                            Email Address
                    </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Change Password
                    </Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>
                            
                            Confirm Password
                    </Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>



                    <Button
                        type="submit" variant="primary">
                        Update
                    </Button>
                   </Form>
          </Col>
                <Col md={9}>
                    <h3>Orders</h3>
                </Col>
      </Row>
    )
}

export default Details
