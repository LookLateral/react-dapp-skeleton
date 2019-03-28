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
import WPContent from './WPcontent';
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
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
  linkAroundBtn: { textDecoration: 'none', }, 
  borderedBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },
  fullBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', backgroundColor: 'purple', borderRadius: 4,
  },
}

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

class Home extends Component {
//const Menu = withRouter(({history}) => (
  
state={
    //suggestionTitle: "Latest Products",
    //suggestions: [],
    //categories: [],
    wpcategories: []
  }
  componentDidMount = () => {
    /*listLatest().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({suggestions: data})
      }
    })
    listCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({categories: data})
      }
    })*/
  }

  componentWillMount () {     

    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ wpcategories: res }); 
      }) 
  }


  render() {
    const {classes} = this.props    
    console.log("style in home component\n"+ JSON.stringify(classes))
    return (
      <div className={classes.root}>
         { /*    grid removed
            <Typography type="headline"
                        component="h2"
                        className={classes.title}>
              LOOK LATERALs HOME PAGE
            </Typography>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={8}>
            <Search categories={this.state.categories}/>
            <Categories categories={this.state.categories}/>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Suggestions products={this.state.suggestions} title={this.state.suggestionTitle}/>
          </Grid>
        </Grid> */ }

        <Grid container spacing={0}>
         
         <Grid item xs={12} sm={12} md={6}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent1} >
                 
                 <div className={classes.spacer}></div>

                 
                   <Typography className={classes.subtitle}>
                       WELCOME TO LOOK LATERAL's PLATFORM
                   </Typography>            

                   { 
                    !auth.isAuthenticated() && (<span>
                      <Link to="/signup">
                        <Button style={{color: '#ffffff'/*isActive(history, "/signup")*/}}>Sign up
                        </Button>
                      </Link>
                      <Link to="/signin">
                        <Button style={{color: '#ffffff'/*isActive(history, "/signin")*/}}>Sign In
                        </Button>
                      </Link>
                    </span>)
                  }

                   
                 
               </CardContent>
             </Card>
         </Grid>
        
         <Grid item xs={12} sm={12} md={6}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent2}>                  
                 <WPContent userState={this.state} />       
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
