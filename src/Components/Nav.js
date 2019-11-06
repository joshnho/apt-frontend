import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux'; 

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const username = useSelector(state => state.username);
  const text = username ? (
      <h1>{username} is currently logged in</h1>
  ) : (
      <h1>Nobody is logged in</h1>
  );
  
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {text}
      <Link to="/">Home</Link>
      {username ? <Link to="/profile">Profile</Link> : null}
      {!username ? <Link to="/signup">Signup</Link> : null}
      {!username ? <Link to="/login">Login</Link> : null}
      {username ? <Link to="/" onClick={handleLogout}>Logout</Link> : null}
    </nav>
  );
};

export default Nav;