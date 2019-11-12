import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class UserApptList extends React.Component {
    state = {
        date: this.props.appointment.date,
        time: this.props.appointment.time,
        notes: this.props.appointment.notes
    }

    handleSubmit = (e, id) => {
        e.preventDefault()
        fetch(`http://localhost:3000/appointments/${id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                date: this.state.date,
                time: this.state.time,
                notes: this.state.notes

            })
        }).then(res => res.json())
            .then(updatedObj => {
                this.setState({
                    date: updatedObj.date,
                    time: updatedObj.time,
                    notes: updatedObj.notes
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    handleDelete = (id) => {
        fetch(`http://localhost:3000/appointments/${id}`, {
            method: "DELETE"
        })
        this.props.handleDeleteAppt(id)
    }

    setDefaultValues = (key, value) => {
        this.setState({
            [key]: value
        })
    }




    render(){
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        let maxDate
        today = yyyy + '-' + mm + '-' + dd

        if (mm === "11"){
            maxDate = `${yyyy+1}` + '-' + '01' + "-" + dd
        } else if ( mm === "12") {
            maxDate = `${yyyy+1}` + '-' + '02' + dd
        }
        return(
            <React.Fragment>
                <form onSubmit={(event) => this.handleSubmit(event, this.props.appointment.id)}>
                    <TextField
                        required
                        label="Select Date within next 60days"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name='date'
                        value={this.state.date}
                        onChange={this.handleChange}
                        inputProps={{ min: today, max: maxDate}}
                    />
                    <FormControl required>
                        <InputLabel htmlFor="age-native-required">Time</InputLabel>
                        <Select
                        native
                        value={this.state.time}
                        onChange={this.handleChange}
                        name="time"
                        inputProps={{
                            id: 'age-native-required',
                        }}
                        >
                        <option value="" />
                        <option value={"9:00AM"}>9:00 AM</option>
                        <option value={"9:30AM"}>9:30 AM</option>
                        <option value={"10:00AM"}>10:00 AM</option>
                        <option value={"10:30AM"}>10:30 AM</option>
                        <option value={"11:00AM"}>11:00 AM</option>
                        <option value={"11:30AM"}>11:30 AM</option>
                        <option value={"12:00PM"}>12:00 PM</option>
                        <option value={"12:30PM"}>12:30 PM</option>
                        <option value={"01:00PM"}>01:00 PM</option>
                        <option value={"01:30PM"}>01:30 PM</option>
                        <option value={"02:00PM"}>02:00 PM</option>
                        <option value={"02:30PM"}>02:30 PM</option>
                        <option value={"03:00PM"}>03:00 PM</option>
                        <option value={"03:30PM"}>03:30 PM</option>
                        <option value={"04:00PM"}>04:00 PM</option>
                        <option value={"04:30PM"}>04:30 PM</option>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl><br/><br/>
                    <TextField 
                        label='notes'
                        type="text"
                        value={this.state.notes}
                        onChange={this.handleChange}
                        name="notes"
                        multiline
                        rows="4"
                    /><br/>
                    <input type='submit'></input>
                </form>
                <CardActions>
                <Button size="small" color="primary" onClick={() => this.handleDelete(this.props.appointment.id)}>
                    Cancel this appointment<br/><br/>
                </Button>
                </CardActions>
                <Button size="small" color="primary">
                    <Link to={`/aptdetails/${this.props.appointment.listing_id}`}>Go to Listing</Link><br/><br/>
                </Button>
            </React.Fragment>
        )
    }
}

export default UserApptList;