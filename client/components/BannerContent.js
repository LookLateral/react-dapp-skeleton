import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'


const styles = {
    subtitle: {
        fontSize: '36px !important', marginBottom: 30,
        color: 'rgb(255,255,255,0.9) !important',   
        lineHeight: '1 !important',
        fontWeight: 600,
    },
    smaller: {
        fontSize: 30, 
    },
    linkBanner: {

    },
    fullBtn: {
        fontSize: '15px !important', marginTop:'40px !important',
        borderStyle: 'solid', borderRadius: '16px !important',
        width: '200px !important', padding: '15 !important',
    },
    btnred: {
        backgroundColor: 'rgb(255,0,0,0.9) !important', color: '#fff !important', 
    },
}

const BannerContent = (props) => {
  
    const { classes, mainState } = props;     
    
    return (  
        <div>

            <div style={{ height: mainState.viewport.height/2-150 }}></div>
            
            <Typography className={classes.subtitle}>
                13 16<br/>june2019<br /><br /><span className={classes.smaller}>Art|Basel</span>
            </Typography>
                   
            <a 
                href='http://www.artbasel.com' 
                target="_blank" 
                rel="noopener noreferrer"
                className={classes.linkBanner}>              
                <Button className={classes.fullBtn+' '+classes.btnred+' '+classes.btnround}> 
                    Discover More
                </Button>
            </a>
        </div>
    ) 
    
  }
  
  BannerContent.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(BannerContent);
  