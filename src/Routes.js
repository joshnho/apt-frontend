import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Pages from './pages'
import Details from './pages/Details'
import Profile from './pages/Profile'

const Routes = () => {
    return (
        <Switch>
            <Route path='/signup' component={Pages.Signup} />
            <Route path='/login' component={Pages.Login} />
            <Route exact path='/aptdetails/:id' render={(renderProps)=> {
                return <Details details={renderProps} />
            }} />
            {/* <Route path='/editappt' render={(renderProps) => {return <EditAppt details={renderProps}/>}} /> */}
            <Route path='/profile' render={() => {return <Profile />}} />
            <Route exact path='/' component={Pages.Home} />
        </Switch>
    )    

}

export default Routes