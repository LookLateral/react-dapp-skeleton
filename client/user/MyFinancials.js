import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import config from './../../config/config'
import stripeButton from './../assets/images/stripeButton.png'
import MyOrders from './../order/MyOrders'

import {listByOwner} from '../shop/api-shop.js'
import {listByShop} from '../product/api-product.js'
import Products from './../product/Products'


const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }),
  spacer: { minHeight: 100, clear:'both', },
  blu: {color: 'blue',},
  fullBtn: {
    fontSize: 12, marginTop:10,
    borderStyle: 'solid', borderRadius: 4,
    width: 120, padding: 5,
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnFloat: {
    float: 'left', marginLeft: 20,
  },
  boxTopRight: {
    width:300, height:400,
    backgroundColor: 'pink', color: 'black', 
    margin: 'auto', fontSize: 20,
  },
  section: {

  },
  sectionContainer: {
    
  },
 
  sectionTitle: {
    color: 'blue', fontSize: 22, marginLeft: 20, marginBottom: 10, fontWeight: 800,  },
  sectionText: {
    fontSize: 20, width: '75%', float: 'left',
  }, 
  divFloat25: {
    float: 'left',
    width: '25%',
  },
  smTitleBlue: {
    color: 'blue',
    fontWeight: 'bold',
  },
  paymentType: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '2.2em',
  },
  inputWallet: {
      float: 'left',
      width: '60%',
      height: 30,
      border: 'none',
      backgroundColor: '#ddd',
      marginRight: '12%',
      paddingLeft: '3%',
      marginTop: 10,
  },
  resumeFinancial: {
      color: 'green',
      fontSize: '1.5em',
      marginLeft: '30px',
  },
  tdTitle: { color: 'blue',},
  tdRow0: {backgroundColor: '#ddd',},
  tdLeft: { width: '40%',  height:30, paddingLeft:'3%', fontSize: '1.2em', borderRight: '1px solid #bbb',},
  tdRight: { width: '60%',height:30, paddingLeft:'3%', fontSize: '1.2em',},

})

class MyFinancials extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      shopId: '',
      //shops:[],
      products:[],
      redirectToSignin: false
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
      }
    })
  }
  loadShops = () => {
    const jwt = auth.isAuthenticated()
    listByOwner({
      userId: jwt.user._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        data.map((shop, i) => {
          this.setState({shopId: shop._id})
          this.loadProducts(shop._id)
          
        })      
      }
    })
  }
  loadProducts = (shopId) => {
    console.log('check error:\n' + shopId)
    listByShop({
      shopId: shopId
    }).then((data)=>{
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({products: data})
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
    this.loadShops()
  }
  render() {
    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    
    return (

      <Paper className={classes.root} elevation={4}>
        
        <div className={classes.section}>
          
          <div className={classes.sectionTitle}>PAYMENT</div>
          
          <div className={classes.sectionContainer}>
            <div className={classes.paymentType +' '+ classes.divFloat25}>VISA</div>
            <div className={classes.code +' '+ classes.divFloat25}>
                <div className={classes.smTitleBlue}>CARD NUMBER</div>
                <div>xxxx xxxx xxxx 3456</div>
            </div>
            <div className={classes.expire +' '+ classes.divFloat25}>
                <div className={classes.smTitleBlue}>EXPIRE DATE</div>
                <div>12 / 18</div>
            </div>
            <div className={classes.btnEdit +' '+ classes.divFloat25}>
                <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>EDIT</Button>
            </div>
          </div>
        </div>
     
        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>WALLET</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>Add your personal wallet to begin to Buy Art</div>
            <input type='text' id="wallet" className={classes.inputWallet} value="0x18w1BgMUnFQEZjydP52CnhwNGuPwQ7aYN4"/>
            <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>EDIT</Button>
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>MY FINANCIALS <span className={classes.resumeFinancial}>+7.8%</span></div>
          <div style={{width:'75%', float:'left'}}>
            <table style={{width:'84%'}}>
            <tbody>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow0+' '+classes.tdTitle+' '+classes.tdLeft}>N° Artworks</td>
                    <td className={classes.tdRow0+' '+classes.tdTitle+' '+classes.tdRight}>2</td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow1+' '+classes.tdLeft}>Total USD value</td>
                    <td className={classes.tdRow1+' '+classes.tdRight}>6784.65</td>
                </tr>
                <tr style={{width:'100%'}}>
                    <td className={classes.tdRow0+' '+classes.tdLeft}>Total Loyalty Points</td>
                    <td className={classes.tdRow0+' '+classes.tdRight}>19250.98256</td>
                </tr>
            </tbody>
            </table>
          </div>
          <div style={{width:'25%', float:'left'}}>
            <Button className={classes.fullBtn+' '+classes.btnblu} style={{marginLeft: 20}}>BUY LP</Button>
          </div>

        </div>

        <div className={classes.spacer}></div>

        <Products products={this.state.products} searched={false}/>


        <div className={classes.spacer}></div>
      </Paper>
      
    )
  }
}
MyFinancials.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyFinancials)
