import React from 'react';
import AppointmentForm from '../Components/AppointmentForm'

class Details extends React.Component{
    state = {
        details: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/listings/${this.props.details.match.params.id}`)
            .then(res => res.json())
            .then(listingDetails => 
                this.setState({
                    details: listingDetails
                })
            )
    }

    noUserApptForm = () => {
        return <h1>Log in to schedule an appointment!</h1>
    }

    render(){
        return (
            
            <div>
                <h1>Apartment Details</h1>
                <img src={this.state.details.img} alt='apartment' className='listing-detail-img'/><br/>
                Bedrooms: {this.state.details.bedrooms > 0 ? this.state.details.bedrooms : "Studio"}<br/>
                ${this.state.details.rent} / month<br/>
                Location: {this.state.details.location}<br/>
                Broker fee: {this.state.details.broker_fee}<br/>
                Utils Included: {this.state.details.utilties ? this.state.details.utilties : "None"}<br/>
                {this.state.details.description}<br/>
                {localStorage.token ? <AppointmentForm listingInfo={this.props.details} detailState={this.state.details}/> : this.noUserApptForm()}
            </div>
        )
    }
}

export default Details;