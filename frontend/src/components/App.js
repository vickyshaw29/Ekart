import React from 'react'
import Header from './Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import { Container } from 'react-bootstrap'
import Homescreen from './screens/Homescreen'
import Singalproduct from './screens/Singalproduct'
import Cart from './screens/Cart'
import Login from './user/Login'
import Register from './user/Register'
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <main style={{ minHeight: '80vh' }} className="py-3">
                        <Container>
                            <Route path='/register' component={Register} exact />
                            <Route path='/login' component={Login} exact />
                            <Route path='/product/:id' component={Singalproduct} />
                            <Route path='/cart/:id?' component={Cart} exact />
                            <Route path='/' component={Homescreen} exact />

                        </Container>
                    </main>
                    <Footer />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
