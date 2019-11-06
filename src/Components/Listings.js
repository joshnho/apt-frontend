import React from 'react';
import { withRouter } from 'react-router-dom';

class Listings extends React.Component{

    viewDetails = () => {
        this.props.history.push(`/aptdetails/${this.props.listing.id}`)
    }

    render(){
        return (
            <div>
                <img src={this.props.listing.img} alt='apartment' onClick={this.viewDetails} /><br/>
                ${this.props.listing.rent} / month<br/>
                {this.props.listing.location}<br/><br/>
            </div>
        )
    }
}

export default withRouter(Listings);