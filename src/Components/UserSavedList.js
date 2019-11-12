import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class UserSavedList extends React.Component {
    // state = {
    //     dateTime: this.props.apptInfo.date_time,
    //     notes: this.props.apptInfo.notes
    // }
    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     fetch(`http://localhost:3000/appointments/${this.props.apptInfo.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             date_time: this.state.dateTime,
    //             notes: this.state.notes

    //         })
    //     }).then(res => res.json())
    //         .then(updatedObj => {
    //             this.setState({
    //                 dateTime: updatedObj.date_time,
    //                 notes: updatedObj.notes
    //             })
    //         })
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    handleDelete = () => {
        fetch(`http://localhost:3000/saved_listings/${this.props.savedListing.id}`, {
            method: "DELETE"
        })
        this.props.handleDelete(this.props.savedListing.id)
    }


    render(){
        return(
            <React.Fragment>
                <Grid container spacing={4} className='listings-container'>
                    {console.log(this.props.allAppointments)}
                    <Grid item xs={12} sm={6} md={4} className='listing'>
                    <Card className='listing-card'>
                        <CardContent >
                            <Typography>
                                {console.log(this.props.savedListing)}
                                {this.props.savedListing.img}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" color="primary" onClick={this.handleDelete}>
                            Remove from saved list<br/><br/>
                        </Button>
                        </CardActions>
                        {/* <Button size="small" color="primary" onClick={this.handleRedirect}>
                            <Link to={`/aptdetails/${this.props.apptInfo.listing_id}`}>Go to Listing</Link><br/><br/>
                        </Button> */}
                    </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default UserSavedList;