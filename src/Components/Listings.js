import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Listings = (props) => {
    const viewDetails = (e) => {
      props.history.push(`/aptdetails/${e.target.dataset.id}`)
    }
  return (
      <React.Fragment>
        <Grid container spacing={4} className='listings-container'>
          {props.allListings.map(listing => (
            <Grid item key={listing.id} xs={12} sm={6} md={4} className='listing'>
              <Card className='listing-card'>
                <CardContent >
                <img src={listing.img} alt="" className='listing-img' data-id={listing.id} onClick={viewDetails}/>
                  <Typography gutterBottom variant="h5" component="h2">
                    {listing.location}
                  </Typography>
                  <Typography>
                    {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} Bedroom(s)`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" data-id={listing.id} onClick={viewDetails}>
                    <span data-id={listing.id}>View</span>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))} 
        </Grid>
      </React.Fragment>
  )
}

export default withRouter(Listings);