import React from 'react'

class UserApptList extends React.Component {
    state = {
        dateTime: this.props.apptInfo.date_time,
        notes: this.props.apptInfo.notes
    }
    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/appointments/${this.props.apptInfo.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                date_time: this.state.dateTime,
                notes: this.state.notes

            })
        }).then(res => res.json())
            .then(updatedObj => {
                this.setState({
                    dateTime: updatedObj.date_time,
                    notes: updatedObj.notes
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    buttonClick = () => {
        fetch(`http://localhost:3000/appointments/${this.props.apptInfo.id}`, {
            method: "DELETE"
        })
        this.props.handleDelete(this.props.apptInfo.id)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>When:
                    <input
                        type="text" 
                        name="dateTime"
                        value={this.state.dateTime}
                        onChange={this.handleChange}
                    /></label><br/>
                    <label>Notes:
                    <input 
                        type="text"
                        onChange={this.handleChange}
                        id="datetime24"
                        data-format="DD-MM-YYYY HH:mm"
                        data-template="DD / MM / YYYY     HH : mm"
                        name="notes"
                        value={this.state.notes}
                    /></label><br/>
                Where: {this.props.apptInfo.location}<br/>
                Listing ID: {this.props.apptInfo.id}<br/>
                <input type="submit" value="Save changes"/>
                </form>
                <button onClick={this.buttonClick}>Cancel this appointment</button><br/><br/>
            </div>
        )
    }
}

export default UserApptList