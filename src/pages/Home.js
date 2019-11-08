import React from 'react';
import Listings from '../Components/Listings/Listings'

class Home extends React.Component {
    state = {
        allListings: [],
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

    render(){
        return(
            <div>

                <div className='listings-box'>
                    <h1>All Apartments</h1>
                    <Listings className='listing-component' allListings={this.state.allListings}/>
                </div>
            </div>
        )
    }
};

export default Home;