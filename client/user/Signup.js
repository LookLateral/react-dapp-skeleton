import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-user.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'

// SIMON: added
import BackgroundLeft from '../assets/images/image-home-sx.jpg';
import BannerContent from '../components/BannerContent';
import Grid from 'material-ui/Grid'

const styles = theme => ({
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
    backgroundImage: `radial-gradient( circle at top left, white, purple );`, 
    backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { 
    padding: 0, paddingBottom: '0px !important', height: '100%', 
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
  },
  cardInner: {
    maxWidth: '80%',
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  
  spacer: { minHeight: 100, },
  subtitle: {
    fontSize: 36, marginBottom: 30,
    color: 'rgb(0,0,0,0.9)',   
    lineHeight: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  error: {
    verticalAlign: 'middle'
  },
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
  linkRegister: {
    color: '#000',
    fontWeight: 600,
    fontSize: 25,
  },
})

class Signup extends Component {
  state = {
      name: '',
      password: '',
      email: '',
      open: false,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
    const {classes, mainState} = this.props

    return (
      <div className={classes.root}>

        <Grid container spacing={0}>
         
         { /*SIMON: probably need to remove height prop later*/ }
         <Grid item xs={12} sm={12} md={6} style={{ height: mainState.viewport.height + 'px'}}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent1} >
                 
                 <div className={classes.spacer}></div>
             
                  <Card className={classes.cardInner}>
                    <CardContent>

                      <Typography type="headline" component="h2" className={classes.subtitle}>
                          Sign Up
                        </Typography>
                        <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
                        <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
                        <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
                        <br/> {
                          this.state.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {this.state.error}</Typography>)
                        }
                        <Button onClick={this.clickSubmit} className={classes.fullBtn+' '+classes.btnpurple} >Submit</Button>

                    </CardContent>
                  </Card>
                  <Dialog open={this.state.open} disableBackdropClick={true}>
                    <DialogTitle>New Account</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        New account successfully created.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Link to="/signin">
                        <Button autoFocus="autoFocus" className={classes.fullBtn+' '+classes.btnblu}>
                          Sign In
                        </Button>
                      </Link>
                    </DialogActions>
                  </Dialog>

                </CardContent>
                
             </Card>
         </Grid>
        
         <Grid item xs={12} sm={12} md={6}>
             <Card className={classes.card}>           
               <CardContent className={classes.cardContent2}>                  
                 <BannerContent mainState={mainState} />       
               </CardContent>
             </Card>
         </Grid>
     
     </Grid>


      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
