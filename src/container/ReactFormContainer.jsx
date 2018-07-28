import React, { Component } from 'react';
import SingleInput from '../components/SingleInput/SingleInput'
import SelectDropdown from '../components/Select/SelectDropdown';

const accessToken = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
class ReactFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            applications_close_date: '',
            earliest_start_date: '',
            latest_end_date: '',
            description: '',
            backgrounds: [],
            skills: [],
            selection_process: '',
            salary: '',
            city: '',
            editMode: false
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.dataset.stateName]: e.target.value
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        fetch('http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/6124?access_token=' + accessToken, {
            method: 'PATCH',
            body: data
        })
    }

    toggleEditMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    componentDidMount() {
        fetch('http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/6124?access_token=' + accessToken)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    applications_close_date: data.applications_close_date,
                    earliest_start_date: data.earliest_start_date,
                    latest_end_date: data.latest_end_date,
                    description: data.description,
                    backgrounds: data.backgrounds,
                    skills: data.skills,
                    selection_process: data.role_info.selection_process,
                    salary: data.specifics_info.salary,
                    city: data.role_info.city,
                });
            });
    }

    render() {
        return (
            <div className="form-wrapper">
                <form className="aiesec-form" onSubmit={this.handleFormSubmit}>
                    <h5>AISEC Organization Form</h5>
                    <SingleInput inputType="text" data-stateName="title" title="Title" handlerFunction={this.handleChange} value={this.state.title} name="opportunity[title]" editMode={this.state.editMode} />
                    <SingleInput inputType="text" data-stateName="salary" title="Salary" handlerFunction={this.handleChange} value={this.state.salary} name="opportunity[salary]" editMode={this.state.editMode} />
                    <SingleInput inputType="text" data-stateName="selection_process" title="Selection Process" handlerFunction={this.handleChange} value={this.state.selection_process} name="opportunity[selection_process]" editMode={this.state.editMode} />
                    <SingleInput inputType="text" data-stateName="city" title="City" handlerFunction={this.handleChange} value={this.state.city} name="opportunity[role_info][city]" editMode={this.state.editMode} />
                    <SelectDropdown title="Backgrounds" name="backgrounds" handlerFunction={this.handleBackgroundChange} value={this.state.backgrounds[0] && this.state.backgrounds[0].name} options={this.state.backgrounds && this.state.backgrounds} />
                    <input type="submit" value="Submit" />
                </form>
                <button name="editButton" onClick={this.toggleEditMode}>Edit</button>
            </div>
        );
    }
}
function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}
export default ReactFormContainer;