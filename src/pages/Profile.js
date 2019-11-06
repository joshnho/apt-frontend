import React from 'react';
import UserApptList from '../Components/UserApptList'

class Profile extends React.Component {
    state = {
        appointments: []
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
                    appointments: apptsArray
                })
            })
    }

    handleDelete = (id) => {
        const test = this.state.appointments.filter(appointment => appointment.id !== id)
        this.setState({
            appointments: test
        })
    }

    renderAppointments = () => {
        return this.state.appointments.map(appointment => {
            return <UserApptList handleDelete={this.handleDelete} apptInfo={appointment} key={'appointment ' + appointment.id} id={appointment.id} />
        })
    }

    // renderSavedList = () => {

    // }

    render(){
        return (
            <div>
                <h1>Your Appointments</h1>
                {this.renderAppointments()}
                <h1>Your Saved Listings</h1>
                {/* {this.renderSavedList()} */}
            </div>
        )
    }
}

export default Profile