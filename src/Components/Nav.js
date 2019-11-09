import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = (props) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(userActions.logoutUser());
      props.history.push('/')
    };

    const username = useSelector(state => state.username);
    // const text = username ? <h1>{username} is currently logged in</h1> : <h1>Nobody is logged in</h1>
    // const text = username ? username : null
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="fixed">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/" style={{ color: 'white', textDecoration: 'none'}}>Home</Link>
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              {username ? <Button color="inherit"><Link to="/profile" style={{ color: 'white', textDecoration: 'none'}}>{username}'s Profile</Link></Button> : null}
            </Typography>
            {!username ? <Button color="inherit"><Link to="/login" style={{ color: 'white', textDecoration: 'none'}} >Login</Link></Button> : null}
            {username ? <Button color="inherit" onClick={handleLogout}>Logout</Button> : null}
            </Toolbar>
        </AppBar>
        <br/><br/><br/>
        </div>

        // <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        // {text}
        // <Link to="/">Home</Link>
        // {username ? <Link to="/profile">Profile</Link> : null}
        // {!username ? <Link to="/signup">Signup</Link> : null}
        // {!username ? <Button color="#FFFFFF" onClick={handleLoginClick}>Login</Button> : null}
        // {username ? <Button color="#FFFFFF" onClick={handleLogout}>Logout</Button> : null}
        // </nav>
    );
}
export default withRouter(Nav);