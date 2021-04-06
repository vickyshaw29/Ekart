import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/index'
import Loading from '../stuff/Loader'
import Message from '../stuff/Message'
const Homescreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    return (
        <>
            {loading ? <Loading/> : error ? <Message variant={'danger'}>{error}</Message> : (
                <>
                    <h3>Latest Products</h3>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

export default Homescreen
