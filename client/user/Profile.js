import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Edit from 'material-ui-icons/Edit'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import config from './../../config/config'
import stripeButton from './../assets/images/stripeButton.png'
import MyOrders from './../order/MyOrders'

import {listByOwner} from '../shop/api-shop.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }),
  blu: {color: 'blue',},
  /*title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  },
  stripe_connect: {
    marginRight: '10px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px'
  },*/
  spacer: { minHeight: 100, },
  bigAvatar: {
    margin:20,
    width: 120, height: 120,
  },
  bigPerson: {
    width: 120, height: 120,
  },
  userName: {fontSize: 20, fontWeight: 600, },
  userDetail: {fontSize: 20,},
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
  tblTokenTdLeft: {
    padding: 20,
    borderLeft: '1px solid #dedede',
    borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede',
    fontSize: 20,
  },
  tblTokenTdRight: {
    padding: 20,
    borderRight: '1px solid #dedede',
    borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede',
    fontWeight: 600,
    fontSize: 20,
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
})

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      shopId: '',
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
        this.setState({shops: data})
        data.map((shop, i) => {
          this.setState({shopId: shop._id})
        })      
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
    /*return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id &&
             (<ListItemSecondaryAction>
               {this.state.user.seller &&
                 (this.state.user.stripe_seller
                   ? (<Button variant="raised" disabled className={classes.stripe_connected}>
                       Stripe connected
                      </Button>)
                   : (<a href={"https://connect.stripe.com/oauth/authorize?response_type=code&client_id="+config.stripe_connect_test_client_id+"&scope=read_write"} className={classes.stripe_connect}>
                       <img src={stripeButton}/>
                      </a>)
                  )
                }
               <Link to={"/user/edit/" + this.state.user._id}>
                 <IconButton aria-label="Edit" color="primary">
                   <Edit/>
                 </IconButton>
               </Link>
               <DeleteUser userId={this.state.user._id}/>
             </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={"Joined: " + (
              new Date(this.state.user.created)).toDateString()}/>
          </ListItem>
        </List>
        <MyOrders/>
      </Paper>
    )*/

    return (
      <Paper className={classes.root} elevation={4}>
        <table style={{width:'100%'}}>
          <tbody>
            <tr style={{width:'100%'}}>
              <td style={{width:'50%'}}>         
              
                  <table style={{width:'100%'}}>
                    <tbody>
                      <tr style={{width:'100%'}}>
                        <td style={{width:'50%'}}>
                          <Avatar className={classes.bigAvatar}>
                            <Person className={classes.bigPerson}/>
                          </Avatar>
                        </td>
                        <td style={{width:'50%'}}>               
                          <div className={classes.userName}>{auth.isAuthenticated().user.name}</div>
                          <div className={classes.userDetail}>Unverified User</div>
                          <Link to={"/user/edit/" + this.state.user._id}>
                            <Button className={classes.fullBtn+' '+classes.btnblu}>Edit Profile</Button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>        
                      
                  <table style={{width:'90%', margin:'auto'}}>
                    <tbody>
                      <tr>
                        <td className={classes.tblTokenTdLeft}>TOKEN HOLD</td>
                        <td className={classes.tblTokenTdRight}>35425,4523</td>
                      </tr>
                      <tr>
                        <td className={classes.tblTokenTdLeft}>HOLDING DAYS</td>
                        <td className={classes.tblTokenTdRight}>10</td>
                      </tr>
                      <tr>
                        <td className={classes.tblTokenTdLeft}>LOOK SCORE</td>
                        <td className={classes.tblTokenTdRight}>354254,523</td>
                      </tr>                    
                    </tbody>
                  </table>
                   
              </td>
              
              <td style={{width:'50%'}}>
                <div className={classes.boxTopRight}>Thinking on using it for banners, calls to action or notifications..</div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>FIMART</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>Activating Fimart, you will be able to sell and buy artwork's fracts and manage your financials in the <span className={classes.blu}>MY FINANCIALS</span></div>
            <Button className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnFloat}>ACTIVATE NOW</Button>
          </div>
        </div>
     
        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>MY ART</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>In this section lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <span className={classes.blu}>MY ART</span></div>
            <Link to={"/shops/" + this.state.shopId}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>MY ART</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>MY FINANCIALS</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>In this section lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <span className={classes.blu}>MY FINANCIALS</span></div>
            <Link to={"/user/"+this.state.user._id+"/financials"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>MY FINANCIALS</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

      </Paper>
      
    )
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
