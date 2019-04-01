import React, {Component} from 'react'
import Card, {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
//import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {read} from './api-shop.js'
import Products from './../product/Products'
import {listByShop} from './../product/api-product.js'
import Icon from 'material-ui/Icon'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: theme.palette.openTitle
  },
  addButton:{
    float:'right',
    marginRight: "40px"
  },
  leftIcon: {
    marginRight: "8px"
  },
  /*bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },*/
  productTitle: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  },
  divider: {
    height: 40,
    clear: 'both',
  },
})

class Shop extends Component {
  constructor({match}) {
    super()
    this.state = {
      shop: '',
      products:[]
    }
    this.match = match
  }

  loadProducts = () => {
    listByShop({
      shopId: this.match.params.shopId
    }).then((data)=>{
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({products: data})
      }
    })
  }

  componentDidMount = () => {
    this.loadProducts()
    read({
      shopId: this.match.params.shopId
    }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({shop: data})
      }
    })
  }

  render() {
    /*const logoUrl = this.state.shop._id
          ? `/api/shops/logo/${this.state.shop._id}?${new Date().getTime()}`
          : '/api/shops/defaultphoto'*/
    const {classes} = this.props
    /*return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                {this.state.shop.name}
              </Typography>
              <br/>
              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
                <Typography type="subheading" component="h2" className={classes.subheading}>
                  {this.state.shop.description}
                </Typography><br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography type="title" component="h2" className={classes.productTitle}>Products</Typography>
            <Products products={this.state.products} searched={false}/>
          </Card>
        </Grid>
      </Grid>
    </div>)*/

    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card>
            <Typography type="title" component="h2" className={classes.productTitle}>
              The art I own
              <span className={classes.addButton}>
                <Link to={"/seller/"+this.match.params.shopId+"/products/new"}>
                  <Button color="primary" variant="raised">
                    <Icon className={classes.leftIcon}>add_box</Icon>  Upload Artwork
                  </Button>
                </Link>
              </span>  
            </Typography>
            <div className={classes.divider}></div>
            <Products products={this.state.products} searched={false}/>
          </Card>
        </Grid>
      </Grid>
    </div>)
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Shop)
