import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Suggestions from './../product/Suggestions'
import {listLatest, listCategories} from './../product/api-product.js'
import Search from './../product/Search'
import Categories from './../product/Categories'

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
})

class Home extends Component {
  state={
    suggestionTitle: "Latest Products",
    suggestions: [],
    categories: []
  }
  componentDidMount = () => {
    listLatest().then((data) => {
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
    })
  }
  render() {
    const {classes} = this.props    
    console.log("style in home component\n"+ JSON.stringify(classes))
    return (
      <div className={classes.root}>
            <Typography type="headline"
                        component="h2"
                        className={classes.title}>
              FIMART
            </Typography>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={8}>
            <Search categories={this.state.categories}/>
            <Categories categories={this.state.categories}/>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Suggestions products={this.state.suggestions} title={this.state.suggestionTitle}/>
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
