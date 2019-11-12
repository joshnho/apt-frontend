import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AppointmentForm extends React.Component{
    state = {
        notes: "",
        date: "",
        time: ""
    }

    handleChange = (e) => {
        console.log(this.state)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }    

    handleSubmit = (e) => {
        e.preventDefault()
        const listingId = this.props.listingInfo.match.params.id
        const token = localStorage.token
        
        fetch('http://localhost:3000/appointments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `bearer ${token}`
            },
            body: JSON.stringify({
                listing_id: listingId,
                notes: this.state.notes,
                date: this.state.date,
                time: this.state.time,
                location: this.props.detailState.location

            })
        }).then(res => res.json())
            // .then(console.localStorage)
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
        return (
            <div>
                {console.log(maxDate)}
                <h1>Schedule an appointment</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required 
                        label="Select Date within next 60days"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name='date'
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
                        label="Add notes"
                        type="text" 
                        name="notes"
                        multiline
                        rows="7"
                        value={this.state.notes}
                        onChange={this.handleChange}
                        placeholder="Notes"
                    /><br/>
                    <input type="submit" />
                </form>
            </div>
      )}
}

export default AppointmentForm;