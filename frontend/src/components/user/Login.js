import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loading from '../stuff/Loader'
import { login } from '../../actions/user'
import FormContainer from './FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
const Login = ({location,history}) => {
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const dispatch=useDispatch()

    const userLogin=useSelector(state=>state.userLogin)

    const {loading,error,userInfo}=userLogin

    const redirect=location.search ? location.search.split('=')[1] :'/'    
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            {loading && <Loading/>}
            {error&& <Message variant="danger">{error}</Message>}
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
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
                    
                   <Button
                     type="submit" variant="primary">
                        Sign In
                    </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?
                    <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
