import React ,{useEffect} from 'react'
import axios from 'axios'
import{PayPalButton} from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../stuff/Message'
import Loader from '../stuff/Loader'
import {useDispatch,useSelector} from 'react-redux'
import {getOrderDetails,payOrder} from '../../actions/order'
import {ORDER_DETAILS_RESET, ORDER_PAY_RESET} from '../../constants/order'
const OrderScreen = ({match,history}) => {
    const orderId=match.params.id
    const [sdkReady, setsdkReady] = React.useState(false)
    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    console.log(orderPay)
    // console.log(order.user.name,"these are orders")
    useEffect(()=>{
        dispatch(getOrderDetails(orderId))
    },[])
    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data:clientId}=await axios.get('http://localhost:8000/api/order/config/paypal')
            const script=document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setsdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DETAILS_RESET})
            dispatch(getOrderDetails(orderId))
            
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setsdkReady(true)
            }
        }
        
    },[dispatch,orderId,successPay,order ])
   const successPaymentHandler=(paymentResult)=>{
       console.log(paymentResult)
       dispatch(payOrder(orderId,paymentResult))
   }
    return loading ? <Loader/>:error? <Message variant="danger">{error}</Message>:
    <>
    <h1>Order {order._id}</h1>
    <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            {console.log(order.user.name)},
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p> <a href={`mailTo:${order.user.email}`}>{order.user.email}</a></p>
                            
                            <p>
                                <strong>Address:</strong>
                                {shippingAddress.address},
                             {shippingAddress.city},
                            {shippingAddress.postalCode}
                                {shippingAddress.country}
                            </p>
                            {order.isDelivered?<Message variant="success">Delivered</Message>:
                            <Message variant="danger">Not delivered</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>PaymentMethod</h3>
                            <p>
                            <strong>Method:</strong>
                            {cart.paymentMethod}Paid on {order.paidAt}
                            </p>
                            {order.isPaid? <Message variant="success">Paid</Message>:
                            <Message variant="danger">Not Paid</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items:</h3>
                            {order.orderItems.length === 0 ? <Message>Orderis empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                {/* to be remembered */}
                                                <Col md={4}>
                                                    {item.qty} x ${item.price}=${item.qty * item.price}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>
                                            ${order.itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>
                                            ${order.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                           ${order.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {/* <ListGroup.Item>
                                    {error&& <Message variant="danger">{error}</Message>}
                                </ListGroup.Item> */}
                                {/* <ListGroup.Item>
                                    <Row>
                                        <Button block 
                                        disabled={order.cartItems===0}
                                        onClick={submitHandler}
                                        >Place Order</Button>
                                    </Row>
                                </ListGroup.Item> */}
                                {!order.isPaid &&(
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {!sdkReady?<Loader/>:(
                                            <PayPalButton amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>
    </>
}

export default OrderScreen