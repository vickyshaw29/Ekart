import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loading from '../stuff/Loader'
import { register } from '../../actions/user'
import FormContainer from './FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
const Register = ({location,history}) => {
    const [name, setname] = React.useState("")
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [confirmPassword, setconfirmPassword] = React.useState("")
    const [message, setmessage] = React.useState(null)
    const dispatch=useDispatch()

    const userRegister=useSelector(state=>state.userRegister)

    const {loading,error,userInfo}=userRegister

    const redirect=location.search ? location.search.split('=')[1] :'/'    
    useEffect(()=>{
        if(userInfo){
            history.push('/login')
        }
    },[history,userInfo,redirect])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setmessage("passwords do not match")
        }else{
            dispatch(register(name,email,password))
        }
    }
    return (
        <FormContainer>
            {loading && <Loading/>}
            {error&& <Message variant="danger">{error}</Message>}
            {message&& <Message variant="danger">{message}</Message>}
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
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
                            Password
                    </Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>
                            confirm Password
                    </Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    
                    
                    
                   <Button
                     type="submit" variant="primary">
                        Sign Up
                    </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already Have Account ?
                    <Link to={redirect?`/login?redirect=${redirect}`:'/register'}>login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
