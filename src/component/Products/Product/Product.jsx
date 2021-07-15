import React from 'react'
import {Card , CardMedia, CardContent, CardActions , Typography , IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import { commerce } from '../../../lib/commerce'

const Product = ({product , throwToCart}) => {
    const classes = useStyles()
    
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h9" guuterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h9">
                        {product.price.formatted}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="h5" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart" onClick={() => throwToCart(product.id , 1)}>
                    <AddShoppingCart  />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
