import React from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import Message from '../stuff/Message'
import { useSelector } from 'react-redux'
const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    // calculate price
    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    cart.itemsPrice=addDecimals(cart.cartItems.reduce((accu,item)=>accu + item.price*item.qty,0) )
    cart.shippingPrice=addDecimals(cart.cartItems>100?0:100)
    cart.taxPrice=addDecimals(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalPrice=addDecimals(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice))
    console.log(cart.totalPrice)
    const submitHandler=()=>{
        
    }
    return (
        <>
            <Checkout step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Address:</strong>
                                {shippingAddress.address},
                             {shippingAddress.city},
                            {shippingAddress.postalCode}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>PaymentMethod</h3>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items:</h3>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, i) => (
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
                                            ${cart.itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>
                                            ${cart.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                           ${cart.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>
                                            ${cart.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Button block 
                                        disabled={cart.cartItems===0}
                                        onClick={submitHandler}
                                        >Place Order</Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
