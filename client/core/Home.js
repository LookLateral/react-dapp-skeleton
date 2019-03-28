import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

/* DEPRECATED
import {listLatest, listCategories} from './../product/api-product.js'
import Suggestions from './../product/Suggestions'
import Search from './../product/Search'
import Categories from './../product/Categories'
*/

// SIMON: added
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import WPContent from '../components/WPcontent';
import auth from './../auth/auth-helper'
import { Link } from 'react-router-dom'
//import Button from '@material-ui/core/Button'
import Button from 'material-ui/Button'

/* DEPRECATED
const styles = theme => ({
  card: {
    maxWidth: 'auto',
    maxHeight: 'auto',
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
      ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})*/

const styles = {
  root: { flexGrow: 1, marginTop: -150 },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, 
    padding: 0,
    textAlign: 'center',
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },
  spacer: { minHeight: 100, },
  subtitle: {
    fontSize: 36, marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
    lineHeight: 1,
  },
  textNormal: {
    fontSize: 24, marginBottom: 30, fontWeight: 600,
  },
  blu: {
    color: '#0000FF',   
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
  //linkAroundBtn: { textDecoration: 'none', }, 
  /*borderedBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },*/
  fullBtn: {
    fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderRadius: 4,
    width: 150, padding: 15,
  },
  btnpurple: {
    backgroundColor: 'purple', color: '#fff', opacity: 0.9,
  },
  btnblu: {
    backgroundColor: 'blue', color: '#fff', opacity: 0.9,
  },
  btngreen: {
    backgroundColor: 'green', color: '#fff', opacity: 0.9,
  },
  btnround: {
    borderRadius: 16, width: 200, 
  },
  linkTandC: {
    color: '#bbb5b5',
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: 20,
  },
}

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
/*const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}*/

class Home extends Component {
//const Menu = withRouter(({history}) => (
  
  state={
    wpcategories: []
  }
  
  componentDidMount = () => { /* deprecated */ }

  componentWillMount () {     
    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ wpcategories: res }); 
      }) 
  }


  render() {
    const {classes, history, mainState} = this.props
    
    //console.log("style in home component\n"+ JSON.stringify(classes))
    return (
      <div className={classes.root}>

        <Grid container spacing={0}>
         
         { /*SIMON: probably need to remove height prop later*/ }
         <Grid item xs={12} sm={12} md={6} style={{ height: mainState.viewport.height + 'px'}}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent1} >
                 
                 <div className={classes.spacer}></div>
             
                   <Typography className={classes.subtitle}>
                       THE POWER OF ART<br/>FOR EVERYONE
                   </Typography>

                   <Typography className={classes.textNormal+' '+classes.blu}>
                       Blockchain-Powered Art
                   </Typography>   

                    <div>
                    <Link to="/how-it-works">
                      <Button 
                          className={classes.fullBtn+' '+classes.btngreen+' '+classes.btnround} 
                      >How it works</Button>
                    </Link>      
                    </div>

                   { 
                    !auth.isAuthenticated() && (<span>
                      <div>
                      <Link to="/signup">
                        <Button 
                            className={classes.fullBtn+' '+classes.btnpurple} 
                            style={isActive(history, "/signup")}
                        >Sign up</Button>
                      </Link>
                      </div>

                      <div>
                      <Link to="/signin">
                        <Button 
                            className={classes.fullBtn+' '+classes.btnblu} 
                            style={isActive(history, "/signin")}
                        >Sign In</Button>
                      </Link>
                      </div>
                    </span>)
                  }         


                  <div style={{ marginTop: 40}}>
                  <Link to="/terms-conditions" className={classes.linkTandC}>
                    Terms and conditions
                  </Link>
                  </div>        
                 
               </CardContent>
             </Card>
         </Grid>
        
         <Grid item xs={12} sm={12} md={6}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent2}>                  
                 <WPContent wpCategories={this.state} mainState={mainState} />       
               </CardContent>
             </Card>
         </Grid>
     
     </Grid>


      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
