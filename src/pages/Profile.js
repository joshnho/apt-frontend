import React from 'react';
import UserApptList from '../Components/UserApptList'
import UserSavedList from '../Components/UserSavedList'
import ProfileTabs from '../Components/ProfileTabs'
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';


import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Profile extends React.Component {
    state = {
        userAppointments: [],
        savedListings: []
    }
    componentDidMount(){
        const token = localStorage.token

        fetch('http://localhost:3000/userappts', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `bearer ${token}`
            }
        }).then(res => res.json())
            .then(apptsArray => {
                this.setState({
                    userAppointments: apptsArray
                })
            })

        fetch('http://localhost:3000/userlistings', {
            mehtod: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        }).then(res => res.json())
            .then(savedArray => {
                console.log(savedArray)
                this.setState({
                    savedListings: savedArray
                })
            })
    }

    handleDeleteAppointment = (id) => {
        const updatedAppointments = this.state.userAppointments.filter(appointment => appointment.id !== id)
        this.setState({
            userAppointments: updatedAppointments
        })
    }

    handleDeleteSaved = (id) => {
        const updatedSavedListings = this.state.savedListings.filter(saved => saved.id !== id)
        this.setState({
            savedListings: updatedSavedListings
        })
    }

    renderAppointments = () => {
        return (<React.Fragment>
            <Grid container spacing={4} className='listings-container'>
                {this.state.userAppointments.map(appointment => (
                <Grid key={appointment.id} item xs={12} sm={6} md={4} className='listing'>
                    <Card className='listing-card'>
                        <CardContent >
                            <Typography>
                                <h1>{appointment.location}</h1>
                                <UserApptList appointment={appointment} handleDeleteAppt={this.handleDeleteAppointment}/>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </React.Fragment>)
    }

    renderSavedList = () => {
        return this.state.savedListings.map(saved => {
            return <UserSavedList savedListings={this.state.savedListings} handleDelete={this.handleDeleteSaved} savedListing={saved} key={`key ${saved.id}`} />
        })
    }

    render(){
        return (
            <div>
                <img src="https://www.lasrias.com.au/wp-content/themes/las-rias/lib/image_resize.php?src=https://www.lasrias.com.au/wp-content/uploads/2017/10/lr-unit-13-banner-resized-1920x663.jpg&w=2000&h=663&zc=1" className="banner-img" alt="banner 2 bedroom superior" />
                <ProfileTabs allAppointments={this.state.userAppointments}
                            handleDeleteAppt={this.handleDeleteAppointment}
                            renderSavedList={this.renderSavedList} 
                            renderAppointments={this.renderAppointments}
                            />
            </div>
        )
    }
}

export default Profile