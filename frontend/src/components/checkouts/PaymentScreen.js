import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../checkouts/Checkout'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../user/FormContainer'
import {savePaymentMethod} from '../../actions/cartActions'
const PaymentScreen = ({history}) => {
    const [paymentMethod, setpaymentMethod] = useState('paypal')
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    if(!shippingAddress){
        history.push("/shipping")
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <Checkout step1 step2 step3 />
              <h1>Payment</h1>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                
                <Col>
                <Form.Check type="radio"
                 label="PayPal or Credit Card"
                  id="PayPal" 
                  name="paymentMethod" 
                  value="PayPal"
                  checked
                  onChange={(e)=>setpaymentMethod(e.target.value)}
                  >
                  </Form.Check>
                </Col>
                </Form.Group>
                <Button variant="primary" block 
                onClick={submitHandler}
                >Continue</Button>
                
        </FormContainer>
    )
}

export default PaymentScreen