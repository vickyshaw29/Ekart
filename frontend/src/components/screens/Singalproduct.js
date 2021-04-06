import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from './Rating'
import { listProducts, detailsProduct } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../stuff/Loader'
import Message from '../stuff/Message'
const Singalproduct = ({ match,history}) => {
    const [qty, setqty] = React.useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailsProduct(match.params.id))
    }, [match,dispatch])
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, products } = productDetails
    const addToCart=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? <Loading /> : products.error ? <Message variant="danger">{products.error}</Message> : (
                <>
                        <Row>
                            <Col md={6}>
                                <Image src={products.image} alt={products.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{products.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item><Rating value={products.rating} text={`${products.numReviews} reviews`} /></ListGroup.Item>
                                    <ListGroup.Item>
                                        price:{products.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description:{products.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    price
                                         </Col>
                                                <Col>
                                                    <strong>${products.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    status
                                         </Col>
                                                <Col>
                                                    {products.countInStock ? 'in Stock' : 'out of stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {products.countInStock>0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as="select" value={qty} onChange={(e)=>setqty(e.target.value)}>
                                                         {[...Array(products.countInStock).keys()].map((x)=>(
                                                           <option key={x+1} value={x+1}>
                                                               {x+1}
                                                           </option>
                                                         ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroupItem>
                                            <Button
                                            onClick={addToCart} 
                                            className="btn btn-block" disabled={products.countInStock === 0}>
                                                Add to cart
                                     </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                </>
            )}



        </>
    )
}

export default Singalproduct
