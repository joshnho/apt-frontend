import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './Routes'
import Nav from './Components/Nav'
import userActions from './redux/actions';
import "./style.css";

class App extends Component {
  // state = {
  //   loggedIn: false
  // }

  componentDidMount(){
    if(localStorage.token){
      this.props.persistUser()
      // this.setState({
      //   loggedIn: true
      // })
    }
  }
  render(){
    return (
      <Router>
        <Nav />
        <Routes />
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  persistUser: userActions.persistUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)