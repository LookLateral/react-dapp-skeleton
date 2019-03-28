import React from 'react';
import SidebarSingleLink from './SidebarSingleLink';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//SIMON ADDED
import auth from './../auth/auth-helper'

const styles = {
    sidebarLinkList: { marginTop: 20, }
}

const SidebarLinkList = (props) => {
    
    const { classes } = props; 
    return (
        <div className={classes.sidebarLinkList}>
            { //props.cognitoLogged && props.userType === 3 ?
            auth.isAuthenticated() ?
                <SidebarSingleLink 
                        name="SisAdmin Manager Art"
                        linkto="/admin-dashboard"
                        icon="user-shield"
                    />
            :
                null
            }
            { //props.cognitoLogged && (props.userType === 3 || props.userType === 1 || props.userType === 2 ) ?
            auth.isAuthenticated() ?
                <div>
                    <SidebarSingleLink 
                        name="Member Dashboard"
                        linkto="/"
                        icon="home" />
                    <SidebarSingleLink 
                        name="Discover Art"
                        linkto="/provenance"
                        icon="palette" />           
                    <SidebarSingleLink 
                        name="Profile"
                        linkto={"/user/" + auth.isAuthenticated().user._id}
                        icon="address-card" />
                </div>
            :
                null 
            }
            <SidebarSingleLink 
                    name="How it Works"
                    linkto="/how-it-works"
                    icon="cogs" />
            <SidebarSingleLink 
                    name="About us"
                    linkto="/about-us"
                    icon="fingerprint" />        
            <SidebarSingleLink 
                    name="Terms of service"
                    linkto="/terms-of-service"
                    icon="file-signature" />       
            <SidebarSingleLink 
                    name="Privacy Policy"
                    linkto="/privacy-policy"
                    icon="gavel" />
        </div>
    )
}
SidebarLinkList.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarLinkList) 
