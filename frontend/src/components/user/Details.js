import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loading from '../stuff/Loader'
import { getUserDetails, register, updateUserDetails } from '../../actions/user'
import { getMyOrder } from '../../actions/order'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../stuff/Loader'
const Details = ({ history }) => {
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
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // update details
    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate
    // order details
    const orderList = useSelector(state => state.orderList)
    const { loading: loadOrder, error: loadError,success:successOrder, orders } = orderList
    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            if (!user) {
                dispatch(getUserDetails(userInfo.user._id, userInfo.token))
                
            } else {
                dispatch(getMyOrder(userInfo.user._id))
                setname(userInfo.user.name)
                setemail(userInfo.user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setmessage("passwords do not match")
        } else {
            console.log(name, email, password)
            dispatch(updateUserDetails({ id: user._id, name: name || undefined, email: email || undefined, password: password || undefined }))
            setpassword("")
            setconfirmPassword("")
        }
    }
    const handleChange = () => {
        setmessage("")
    }
    return (
        <Row>
            <Col md={3}>
                {loading ? <Loading /> : ""}
                {error ? <Message>{error}</Message> : ""}
                {message ? <Message>{message}</Message> : ""}
                {success ? <Message>User updated</Message> : ""}
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
                <h1>My Orders</h1>
                {loadOrder ? <Loader /> : loadOrder ? <Message variant="danger">{loadError}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.paidAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}</td>
                                    
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button cllassName="btn-sm" variant="light">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default Details
