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
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div className={classes.root}>
          <AppBar position="fixed">
              <Toolbar>
                {username ? <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'white', textDecoration: 'none'}}><MenuIcon /></Button> : null}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={handleClose}><Link to="/profile" style={{ color: 'black', textDecoration: 'none'}}>My Profile</Link></MenuItem>  
                </Menu>
              <Typography variant="h5" className={classes.title}>
                <Button color="inherit"><Link to="/" style={{ color: 'white', textDecoration: 'none'}}>Home</Link></Button>
              </Typography>
              {!username ? <Button color="inherit"><Link to="/login" style={{ color: 'white', textDecoration: 'none'}} >Login</Link></Button> : null}
              {!username ? <Button color="inherit"><Link to="/signup" style={{ color: 'white', textDecoration: 'none'}} >Signup</Link></Button> : null}
              {username ? <Button color="inherit" onClick={handleLogout}>{username} Logout</Button> : null}
              </Toolbar>
          </AppBar>
          <br/><br/><br/>
        </div>
    );
}
export default withRouter(Nav);