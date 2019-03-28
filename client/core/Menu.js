import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import {Link/*, withRouter*/} from 'react-router-dom'

/*SIMON: deprecated imports
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/ColorLens'
import Button from 'material-ui/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import CartIcon from 'material-ui-icons/ShoppingCart'
import Badge from 'material-ui/Badge'
import cart from './../cart/cart-helper'*/

// SIMON: new imports
import Logo from '../assets/images/Logo-Look-Lateral2.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


/*const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}*/

/* SIMON: old header
const Menu = withRouter(({history}) => (
  
  <AppBar position="static">
    <Toolbar>
      
      <Typography type="title" color="inherit">
        THE Art Marketplace
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>All Shops</Button>
        </Link>
        <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            Cart
            <Badge color="secondary" badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
              <CartIcon />
            </Badge>
          </Button>
        </Link>      
      </div>
      
       SIMON: moving SignUp and SignIn in left content in home

      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      { 
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>

))

export default Menu

*/

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  AppHeader: {
    height: 150,
    backgroundColor: '#282c34',
    opacity: 0.9,
    padding: 50,
  },
  linkLogo: {
    width:'70vw',
    paddingLeft: '15vw'
  },
  divlogo: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    maxWidth: 530,
    maxHeight: 150,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-20px',
  },
  linkMenuContainer: {
    width: '100%',
    marginTop: '-40px',
  },
  singleLinkMenu: {
    width: '32%',
    float: 'left',
    textAlign: 'center',
  },
  linkMenu: {
    color: 'white',
    fontSize: 20,
    textDecoration: 'none',
  },
};

function Menu(props) {
  
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppHeader}>
        <Toolbar>
          
          <a href="https://www.looklateral.com/" className={classes.linkLogo}>
          <div className={classes.divlogo}>
            <img src={Logo} className={classes.logo} alt="LL Logo"></img> 
          </div>
          </a>
        </Toolbar>

        <Toolbar>
          <div className={classes.linkMenuContainer}>
            <div className={classes.singleLinkMenu}>
              <Link to={"/provenance"} className={classes.linkMenu}>
                PROVENANCE
              </Link>
            </div>
            <div className={classes.singleLinkMenu}>
              <Link to={"/fimart"} className={classes.linkMenu}>
                FIMART
              </Link>
            </div>
            <div className={classes.singleLinkMenu}>
              <a href="http://blog.looklateral.com/downloads/magazine/" className={classes.linkMenu}>
                ART MAG
              </a>   
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);