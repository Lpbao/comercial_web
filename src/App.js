import React, { useEffect } from 'react'
import { useState } from 'react'

import {Navbar , Products , Cart , Checkout} from './component'
import { commerce } from './lib/commerce'
import{BrowserRouter as Router , Switch , Route} from 'react-router-dom'

function App() {
    const [products , setproducts] = useState([])
    const [cart , setcart] = useState({})
    const [order , setOrder] = useState({})
    const [errorMessage , setErrorMessage] = useState('')

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setproducts(data)
    }

    const fetchCart = async () => {
        setcart(await commerce.cart.retrieve())
      };

    const handleAddToCart = async (productId , quantity) =>  {
        const item = await commerce.cart.add( productId , quantity)
        setcart(item.cart)
    }

    const handleRemoveCart = async (productId ) => {
        const {cart} = await commerce.cart.remove(productId)
        setcart(cart)
    }

    const handleUpdateQntyCart = async (productId , quantity) => {
        const item = await commerce.cart.update(productId , {quantity})
        setcart(item.cart)
    }

    const handleCartEmpty = async () => {
        const {cart} = await commerce.cart.empty()
        setcart(cart)
    }

    const handleCaptureCheckout = async (checkoutTokenId , newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId , newOrder)
            setOrder(incomingOrder)
            refreshCart()
        }
        catch(error){
            setErrorMessage(error.data.error.errorMessage)
        }
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()

        setcart(newCart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    },[])

    console.log('AAAAAAAAA',cart)

    return (
        <Router>
            <div class="App">
                <Navbar cartTotal={cart.total_items}></Navbar>
                
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddtoCart={handleAddToCart}></Products>
                    </Route>
                    <Route exact path="/cart">
                        <Cart cartItems={cart}
                            handleRemoveCart={handleRemoveCart}
                            handleUpdateQntyCart={handleUpdateQntyCart}
                            handleCartEmpty={handleCartEmpty} 
                        />
                    </Route>
                    <Router exact path="/checkout">
                        <Checkout cart={cart}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        order={order}
                        ></Checkout>
                    </Router>
                </Switch>
                
            </div>
        </Router>
    )
}

export default App
