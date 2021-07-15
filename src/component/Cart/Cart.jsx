import React from 'react'
import { Grid , Typography , Container , Button } from '@material-ui/core'
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'

const Cart = ({cartItems , handleRemoveCart ,handleUpdateQntyCart ,handleCartEmpty}) => {
    const classes = useStyles()
    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no item in your shopping cart ,
        <Link to="/" className={classes.link}> start adding some </Link></Typography>
    );
    
    const FilledCart = () => (
        <>
            <Grid container className={classes.content}>
                {cartItems.line_items.map(item => (
                    <Grid xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <CartItem item={item} updateCart={handleUpdateQntyCart} removeCart={handleRemoveCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails} >
                <Typography variant="h4" className={classes.title} gutterBottom>Subtotal: {cartItems.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() => handleCartEmpty()} >Empty cart</Button>
                    <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    if(!cartItems.line_items){
        return 'LOADING....'
    }
    console.log('CCCCCCCCCCCCCAAAAAAAAAAAAAR',cartItems)

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
            {!cartItems.line_items.length ? EmptyCart() : FilledCart() }
        </Container>
    )
}

export default Cart