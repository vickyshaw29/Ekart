import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../checkouts/Checkout'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../user/FormContainer'
import {saveShippingAddress} from '../../actions/cartActions'
const Shipping = ({history}) => {
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const [address, setaddress] = useState(shippingAddress.address)
    const [city, setcity] = useState(shippingAddress.city)
    const [postalcode, setpostalcode] = useState(shippingAddress.postalcode)
    const [country, setcountry] = useState(shippingAddress.country)
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalcode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Checkout step1 step2/>
            <Form.Group controlId="address">
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                     type="text" 
                     placeholder="Enter Address"
                      value={address} 
                      onChange={(e) => setaddress(e.target.value)}
                      required
                      />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                     type="text" 
                     placeholder="Enter City"
                      value={city} 
                      onChange={(e) => setcity(e.target.value)}
                      required
                      />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                     type="text" 
                     placeholder="Enter PostalCode"
                      value={postalcode} 
                      onChange={(e) => setpostalcode(e.target.value)}
                      required
                      />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                     type="text" 
                     placeholder="Enter Country"
                      value={country} 
                      onChange={(e) => setcountry(e.target.value)}
                      required
                      />
                </Form.Group>
                <Button variant="primary" block 
                onClick={submitHandler}
                >Continue</Button>
        </FormContainer>
    )
}

export default Shipping
