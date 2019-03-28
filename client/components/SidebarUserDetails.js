import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//SIMON ADDED
import auth from './../auth/auth-helper'


const styles = {
    sidebarUserDetailContainer: { textAlign: 'center', },
    sidebarUserPic: { 
        width: 60,
        height: 60,
        backgroundColor: 'yellow',
        margin: '30px auto',
    },
    sidebarUserName: { fontSize: 16, color: 'yellow', },
    sidebarUserType: { fontSize: 12, backgroundColor: 'yellow' },
}

const SidebarUserDetail = (props) => {
    const { classes } = props; 
    return (
        //props.cognitoLogged ? 
        auth.isAuthenticated() ?
        
            <div className={classes.sidebarUserDetailContainer}>
                
                <div className={classes.sidebarUserPic}></div>
                <div className={classes.sidebarUserName}>Simone Xyzjk</div>
                <div className={classes.sidebarUserType}>Administrator</div>

            </div> 
            
        : null
    )
}
SidebarUserDetail.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarUserDetail) 
