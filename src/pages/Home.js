import React from 'react';
import Listings from '../Components/Listings'

class Home extends React.Component {
    state = {
        allListings: [],
        loggedIn: false
    }

    componentDidMount(){
        // const dispatch = useDispatch();
        fetch('http://localhost:3000/listings')
            .then(res => res.json())
            .then(listingArray => {
                this.setState({
                    allListings: listingArray
                })
            })
    };

    allListings = () =>{
        return this.state.allListings.map(listing => {
            return <Listings listing={listing} key={'listing ' + listing.id} id={listing.id} />
        })
    }

    render(){
        return(
            <div>
                <h1>All Apartments</h1>
                {this.allListings()}
            </div>
        )
    }
};

export default Home;