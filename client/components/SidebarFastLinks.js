import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//SIMON ADDED
import auth from './../auth/auth-helper'
import Button from 'material-ui/Button'

const styles = {   
    fastLinkContainer: {
        marginTop: 20,
        textAlign: 'center',
    },
    fastLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#fff !important',
        padding: '0 !important',
        minWidth: '0 !important',
        minHeight: '0 !important',
        marginTop: '20px !important'
    },
    fastLinkImage: {
        margin: '0 8px',
    },
    fullBtn: {
        fontSize: '15px !important', marginTop: '40px !important',
        borderStyle: 'solid', borderRadius: '0px !important',
        width: '100px !important', padding: '6px !important',
        marginLeft: '20px !important',
    },
    btnblu: {
        backgroundColor: 'blue !important', color: '#fff !important', opacity: 0.9,
    },
}

const SidebarFastLink = (props) => {  
    const { classes/*, history*/ } = props; 

    return (
        <div>
            { 
            //props.cognitoLogged ?  (
            auth.isAuthenticated() && auth.isAuthenticated().user ? null /*(
                
                <div className={classes.fastLinkContainer}>       
                    <Link to={"/user/" + auth.isAuthenticated().user._id} className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'user']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/notification" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'bell']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/search" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'search']}  className={classes.fastLinkImage} />
                    </Link>
                    <Button color="inherit" className={classes.fastLink} onClick={() => {
                        auth.signout(() => history.push('/'))
                    }}><FontAwesomeIcon icon={['fas', 'sign-out-alt']}  className={classes.fastLinkImage} /></Button>
                </div>
            
            )*/ : /* ( 

                <div className="sidebar-fast-links">   
                    <Link to="/signin" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'sign-in-alt']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/search" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'search']}  className={classes.fastLinkImage} />
                    </Link>
                </div>

            ) */
            (
                <div className="fastLink">   
                    <Link to="/signin">
                        <Button className={classes.fullBtn+' '+classes.btnblu}>Sign In</Button>
                    </Link>  
                </div>
            )}

        </div>
    )
}
SidebarFastLink.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarFastLink) 
