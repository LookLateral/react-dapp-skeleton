{/* SIMONOTE: need to style completely */}
import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import FileUpload from 'material-ui-icons/FileUpload'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {read, update} from './api-product.js'
import {Link, Redirect} from 'react-router-dom'
import {initPaintingForUpload} from '../../server/bigchain/uploadPainting.js'

const styles = theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class Tokenize extends Component {
  constructor({match}) {
    super()
    this.state = {
      id: '',
      name: '',
      artist: '', 
      tokenqty: '',
      price: '',
      redirect: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    this.productData = new FormData()
    read({
      productId: this.match.params.productId
    }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({id: data._id, name: data.name, description: data.description, category: data.category, quantity:data.quantity, price: data.price})
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    initPaintingForUpload(this.state.id, this.state.name, this.state.artist, jwt.user._id, this.state.tokenqty, this.state.price, (this.state.price/2000) );
    /* SIMONOTES:
        here we need to 
        call initTokanization() for the tokenLaunch 
        then transferTokens() to the owner? do he already own them
    */
    }

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value) //SIMONOTES: can't write on artist field because of this?
    this.setState({ [name]: value })
  }

  render() {
    const imageUrl = this.state.id
          ? `/api/product/image/${this.state.id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'
    if (this.state.redirect) {
      return (<Redirect to={'/product/'+this.state.id}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Tokenize Artwork
          </Typography><br/>
          <Avatar src={imageUrl} className={classes.bigAvatar}/><br/>
          <TextField id="name" label="Artwork Title" className={classes.textField} value={this.state.name} readonly margin="normal"/><br/>
          <TextField id="artist" label="Artist" className={classes.textField} value={this.state.artist} margin="normal"/><br/>
          <TextField id="tokenqty" label="Qty of tokens availables" className={classes.textField} value={this.state.tokenqty} onChange={this.handleChange('tokenqty')} type="number" margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={this.state.price} onChange={this.handleChange('price')} type="number" margin="normal"/><br/>
          {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Update</Button>
          <Link to={'/product/'+this.state.id} className={classes.submit}>
            <Button variant="raised">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>)
  }
}

Tokenize.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tokenize)
