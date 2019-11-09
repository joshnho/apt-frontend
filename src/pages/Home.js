import React from 'react';
import Listings from '../Components/Listings'
import Button from '@material-ui/core/Button';

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
                <div className='homepage-banner'>
                    <div className='banner-text'>
                        <h1>Book your listing today!</h1><br/>
                        <Button color='primary' ><span className='banner-button'>View Listings</span></Button>
                    </div>
                    <img src="https://www.highconstruction.com/imagevault/publishedmedia/te2ww9d3r6hmjuo71o15/Madison_Banner.jpg" class="banner-img" alt="banner 2 bedroom superior" />
                </div>
                {/* <h1>All Available Listings</h1> */}
                <div className='listings-box'>
                    <Listings className='listing-component' allListings={this.state.allListings}/>
                </div>
            </div>
        )
    }
};

export default Home;