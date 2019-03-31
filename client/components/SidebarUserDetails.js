import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//SIMON ADDED
import auth from './../auth/auth-helper'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui-icons/Person'
import {ListItemText} from 'material-ui/List'
import Button from 'material-ui/Button'


const styles = {
    sidebarUserDetailContainer: { textAlign: 'center', marginTop: 20, marginLeft: 20, color: '#cdcdcd !important', },
    tdInfo: {
        paddingLeft: '30px !important',
    },
    userName: {
        color: '#cdcdcd !important', marginBottom: 5,
    },
    logout: {
        backgroundColor: 'transparent',
        border: '1px solid #cdcdcd !important',
        borderRadius: '16px !important',
        fontWeight: 'normal !important',
        fontSize: '0.75rem !important',
        minWidth: '0px !important',
        minHeight: '0px !important',
        padding: '2px 4px !important',
    },
}

const SidebarUserDetail = (props) => {
    const { classes, history } = props; 
    return (
        //props.cognitoLogged ? 
        auth.isAuthenticated() ?
        
             /* <div className={classes.sidebarUserDetailContainer}>
                
                <div className={classes.sidebarUserPic}></div>
                <div className={classes.sidebarUserName}>Simone Xyzjk</div>
                <div className={classes.sidebarUserType}>Administrator</div>

            </div> 
            */ 
            
            <div className={classes.sidebarUserDetailContainer}> 
                <table>
                <tbody>
                <tr>
                <td>
                    <Avatar>
                        <Person/>
                    </Avatar>
                </td>

                <td className={classes.tdInfo}>
                    <div className={classes.userName}>{auth.isAuthenticated().user.name}</div>
                    <Button color="inherit" className={classes.logout} onClick={() => {
                        auth.signout(() => history.push('/'))
                    }}>Log Out</Button>
                </td>
                </tr>
                </tbody>
                </table>
            
            </div>
            
                
            
        : null
    )
}
SidebarUserDetail.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarUserDetail) 
