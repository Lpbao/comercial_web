import React from 'react'
import { Divider , Button , Typography } from '@material-ui/core'
import {Elements , CardElement , ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {useForm , FormProvider} from 'react-hook-form'
import Review from './Review'

const stripePromise = loadStripe('pk_test_51J3fwGAlGX1muNN2Wg0dYFRbxZX5J3Xf2ajhRpZ0xdQ0LldFvDx6e1MbfnwJMG2L9MQlrWEjBP5JPvMzjEzd99Wn00Zw21qFp1');

const PaymentForm = ({shippingData , checkoutToken , backStep , onCaptureCheckout , nextStep}) => {
    console.log('SSSSSSSSSHHHHHHHHHHHHHH',shippingData)
    const handleSubmit = async (event , elements , stripe) => {
        event.preventDefault()
        
        if(!stripe || !elements){
            return
        }

        const cardElement = elements.getElement(CardElement)
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        console.log('SHIPPING DATA:' , shippingData.firstname)
        if(error){
            console.log(error)
        }
        else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstname , lastname: shippingData.lastname , email: shippingData.email},
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {shipping_methods: shippingData.shippingOption},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id , orderData)
            nextStep()
        }
    }
    return(
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" style={{margin: '20px 0'}} gutterBottom>Payment methods</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e , elements , stripe)}>
                            <CardElement />
                            <br /><br />
                            <div style={{display:"flex" , justifyContent:"space-between"}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>

        </>
    )
}

export default PaymentForm