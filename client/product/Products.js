import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import {Link} from 'react-router-dom'
import AddToCart from './../cart/AddToCart'
import Grid from 'material-ui/Grid'
import fractPic from '../assets/images/fractPic.png';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  boxDetail: {
    float: 'left',
    padding: '1px 0px',
    height: 200,
    display:'flex',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  boxRight: {
    border: '1px solid #ddd',
    width: '100%',
    textAlign: 'left',
    padding: 24,
  },
  image: {
    minHeight: 200,
    display: 'inline-block',
    width: '300px',
    marginLeft: '24px'
  },
  artworkRow: {
    clear: 'both',
  },
  boxInfoArtwork:{
    //height: 200,
  },
  subheading: {
    color: theme.palette.openTitle,
    height: '100%',
    display: 'inline-block',
    //width: '50%',
    //textAlign: 'center',
    //color: 'white',
  },
  divider: {
    width: '80%',
    height: 1,
    borderBottom: '1px solid #fff',
    margin: '20px auto',
  },
  title: {
    fontWeight: 800,
    marginTop: 5,
    fontSize: '1.8em',
  },
  artist: {
    fontSize: '1.3em',
  },
  price: {
    fontSize: '1.3em',
    marginTop: 5,
  },
  fractPic: {
    width: 32,
    height: 32,
    marginRight: 5,
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
  /*gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'rgb(189, 222, 219)',
    display:'block'
  }*/
})
class Products extends Component {
  render() {
    const {classes} = this.props
    /*return (
      <div className={classes.root}>
      {this.props.products.length > 0 ?
        (<div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {this.props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id} alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
                //actionIcon={
                  //<AddToCart item={product}/>
                //}
              />
            </GridListTile>
          ))}
        </GridList></div>) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No products found! :(</Typography>)}
      </div>)*/
      
      return (
        <div className={classes.root}>
        {this.props.products.length > 0 ?
          (<div className={classes.container}>
            <Grid container spacing={40}>
              <Grid item xs={12} sm={12}>
                  {this.props.products.map((product, i) => (
                    <div className={classes.artworkRow}> 
                      <Grid item xs={6} sm={6} className={classes.boxDetail + ' ' + classes.boxLeft}>
                        {/* SIMONOTES: need to make the img verticalAlign:middle */}
                        <Link to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id} alt={product.name} /></Link> 
                      </Grid>
                      
                      <Grid item xs={6} sm={6} className={classes.boxDetail + ' ' + classes.boxRight}>
                        <div className={classes.boxInfoArtwork}>
                          <Typography component="p" type="subheading" className={classes.subheading}>
                            {/* SIMONOTES: static html */}
                            <div className={classes.artist}>Artist Name</div>
                            <div className={classes.title}>{product.name}</div>
                            <div className={classes.price}>Estimate: $ {product.price}</div>
                            <div className={classes.divider}></div>
                            <div style={{marginBottom: '20px'}}>
                              <span className={classes.fractPic}><img src={fractPic}/></span>
                              <span className={classes.fractPerc}>0%</span> 
                              <span className={classes.fractText}>FRACT ON SALE</span>
                            </div>
                          </Typography>
                        </div>  
                      </Grid>
                    </div>
                  ))}
              </Grid>
            </Grid>
          </div>) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No products found! :(</Typography>)}
        </div>
      )
  }
}
Products.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}

export default withStyles(styles)(Products)
