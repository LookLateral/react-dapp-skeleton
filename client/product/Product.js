import React, {Component} from 'react'
import Card, {CardHeader, CardMedia, CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {read, listRelated} from './api-product.js'
import {Link} from 'react-router-dom'
import Suggestions from './../product/Suggestions'
import AddToCart from './../cart/AddToCart'
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import fractPic from '../assets/images/fractPic.png';
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    //margin: '24px',
    color: theme.palette.openTitle,
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: 400,
    display: 'inline-block',
    width: '50%',
    textAlign: 'center',
    color: 'white',
  },
  divider: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #fff',
    margin: '20px auto',
  },
  title: {
    fontWeight: 800,
    marginTop: 20,
    fontSize: '1.8em',
  },
  artist: {
    marginTop: 50,
    fontSize: '1.3em',
  },
  price: {
    fontSize: '1.3em',
    marginTop: 20,
  },
  fractPic: {
    width: 32,
    height: 32,
    marginRight: 5,
    //backgroundImage: `url(${fractPic})`, backgroundSize: 'cover',
  },
  fractPerc: {
    fontSize: '3.0em',
    color: 'blue',
    marginRight: 15,
    fontWeight: 'bold',
  },
  fractText: {
    fontSize: '1.0em',
  },
  fullBtn: {
    fontSize: 15, /*marginTop:40,*/
    borderStyle: 'solid', borderRadius: 4,
    width: 150, padding: 10,
  },
  btnorange: {
    backgroundColor: 'orange', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnpurple: {
    backgroundColor: 'purple', color: '#fff', opacity: 0.9,
  },
  btnround: {
    borderRadius: 16, /*width: 200, */
  },
  boxDetail: {
    float: 'left',
    padding: 20,
  },
  boxLeft: {
    borderRight: '1px solid blue',
  },
  titleInfo: {
    fontSize: '1.8em',
    color: 'blue',
    marginBottom: 10,
  },
  textInfo: {
    fontSize: '1.3em',
  },
  media: {
    height: 400,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
})

class Product extends Component {
  constructor({match}) {
    super()
    this.state = {
      product: {shop: {}},
      suggestions: [],
      suggestionTitle: 'Related Products'
    }
    this.match = match
  }
  loadProduct = (productId) => {
    read({productId: productId}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({product: data})
        listRelated({
          productId: data._id}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.setState({suggestions: data})
          }
        })
     }
    })
  }
  componentDidMount = () => {
    this.loadProduct(this.match.params.productId)
  }
  componentWillReceiveProps = (props) => {
    this.loadProduct(props.match.params.productId)
  }

  render() {
    const imageUrl = this.state.product._id
          ? `/api/product/image/${this.state.product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'
    const {classes} = this.props
    return (
        <div className={classes.root}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card}>
                {/*<CardHeader
                  title={this.state.product.name}
                  subheader={this.state.product.quantity > 0? 'In Stock': 'Out of Stock'}
                  action={
                    <span className={classes.action}>
                      <AddToCart cartStyle={classes.addCart} item={this.state.product}/>
                    </span>
                  }
                />*/}
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={this.state.product.name}
                  />
                  <Typography component="p" type="subheading" className={classes.subheading}>
                    <div className={classes.artist}>Artist Name</div><br/>
                    <div className={classes.title}>{this.state.product.name}</div><br/>
                    <div className={classes.price}>Estimate: $ {this.state.product.price}</div>
                    <div className={classes.divider}></div>
                    <div style={{marginBottom: '20px'}}>
                      <span className={classes.fractPic}><img src={fractPic}/></span>
                      <span className={classes.fractPerc}>0%</span>
                      <span className={classes.fractText}>FRACT ON SALE</span>
                    </div>
                    {/*<Link to={'/shops/'+this.state.product.shop._id} className={classes.link}>
                      <span>
                        <Icon className={classes.icon}>shopping_basket</Icon> {this.state.product.shop.name}
                      </span>
                    </Link>*/}

                    {/* SIMONOTE: this button only if user=owner*/}
                    <Link to={"/seller/"+this.state.product.shop._id+"/"+this.state.product._id+"/edit"}>
                      <Button 
                          className={classes.fullBtn+' '+classes.btnorange+' '+classes.btnround} 
                      >Edit Artwork</Button>
                    </Link>
                    
                    {/* SIMONOTE: otherwise this button must be show
                    <Link to={?????}>
                      <Button 
                          className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                      >Reserve</Button>
                    </Link>*/}

                  </Typography>
                  

                </div>
                  <CardContent>
                    <Grid item xs={7} sm={7} className={classes.boxDetail +' '+ classes.boxLeft}>
                      <div className={classes.titleInfo}>Artwork details</div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Size: </span> 192 by 83 by 33 cm.
                      </div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Markings: </span> signed and numbered by David Lachapelle on verso.
                      </div>
                      <div className={classes.textInfo}>
                        <span style={{fontWeight:'bold'}}>Description: </span> {this.state.product.description}
                      </div>  
                    </Grid>

                    <Grid item xs={5} sm={5} className={classes.boxDetail}>
                      <div className={classes.titleInfo}>Bio</div>
                    </Grid>
                  </CardContent>

                  {/* SIMONOTE: provenance, news and documents are missing*/}

              </Card>
            </Grid>
            {/*this.state.suggestions.length > 0 &&
              (<Grid item xs={5} sm={5}>
                <Suggestions  products={this.state.suggestions} title='Related Products'/>
              </Grid>)*/}
          </Grid>

          <Grid container spacing={40}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card}> 
              
                 {/* SIMONOTE: these buttons only if user=owner; also what path?? */}
                 <Link to={"/"}>
                    <Button 
                        className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                    >Ask TAG</Button>
                  </Link>

                  <Link to={"/"}>
                    <Button 
                        className={classes.fullBtn+' '+classes.btnpurple+' '+classes.btnround} 
                    >TOKENIZE</Button>
                  </Link>
              
              </Card>
            </Grid>
          </Grid>
        </div>)
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Product)
