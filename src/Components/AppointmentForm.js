import React from 'react'

class AppointmentForm extends React.Component{
    state = {
        notes: "",
        dateTime: ""
    }

    handleChange = (e) => {
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
                date_time: this.state.dateTime,
                location: this.props.detailState.location

            })
        }).then(res => res.json())
            // .then(console.localStorage)
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Make an appointment</h1>
                    <input
                        type="text" 
                        name="notes"
                        value={this.state.notes}
                        onChange={this.handleChange}
                        placeholder="Notes"
                    />
                    <input 
                        type="text"
                        onChange={this.handleChange}
                        id="datetime24"
                        data-format="DD-MM-YYYY HH:mm"
                        data-template="DD / MM / YYYY     HH : mm"
                        name="dateTime"
                        placeholder="Date/Time"
                        value={this.state.dateTime}
                    />
                <input type="submit" />
                </form>
                

            </div>
      )}
}

export default AppointmentForm;