import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Provenance from './core/Provenance'
import Fimart from './core/Fimart'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShops from './shop/MyShops'
import Shop from './shop/Shop'
import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
import Cart from './cart/Cart'
import StripeConnect from './user/StripeConnect'
import ShopOrders from './order/ShopOrders'
import Order from './order/Order'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

class MainRouter extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      viewport: { width: 0, height: 0, },
      sidebarOpened: false,
    }
    this.handleSidebar = this.handleSidebar.bind(this);
  }

  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    window.addEventListener('resize', this.resize);
  }

  componentWillMount () {     

    if(this.state.viewport.width !== document.documentElement.clientWidth){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
      }); 
    }
  }

  componentWillUnmount() { window.removeEventListener('resize', this.resize); }

  resize = () => {
    if(this.state.viewport.width !== document.documentElement.clientWidth || this.state.viewport.height !== document.documentElement.clientHeight){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
      }, function () { this.forceUpdate() }); 
    }
  }

  handleSidebar = () => { 
    this.setState({ sidebarOpened: !this.state.sidebarOpened }) 
  }

  render() {
    return (<div>
      <Menu isOpen={this.state.sidebarOpened} handleSidebar={() => this.handleSidebar()} />
      <Switch>
        <Route exact path="/" render={(props) => <Home mainState={this.state} {...props} /> } />
        <Route exact path="/provenance" component={Provenance}/>
        <Route exact path="/fimart" component={Fimart}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <Route path="/cart" component={Cart}/>
        <Route path="/product/:productId" component={Product}/>
        <Route path="/shops/all" component={Shops}/>
        <Route path="/shops/:shopId" component={Shop}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>

        <PrivateRoute path="/seller/shops" component={MyShops}/>
        <PrivateRoute path="/seller/shop/new" component={NewShop}/>
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
        <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct}/>
        <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct}/>

        <Route path="/seller/stripe/connect" component={StripeConnect}/>
      </Switch>
    </div>)
  }
}

export default MainRouter
