import React, { Component } from 'react';
import SingleInput from '../components/SingleInput/SingleInput';
import SelectDropdown from '../components/Select/SelectDropdown';
import TextArea from '../components/TextArea/TextArea';
import ListOptions from '../components/Listoptions/listoptions';
import PlacesSearch from '../components/PlacesSearch/placesSearch';

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
      backgroundLists: [],
      skillsLists: [],
      selection_process: '',
      salary: '',
      city: '',
      editMode: false,
      selectedBackground: '',
      selectedSkill: '',
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.dataset.setname]: e.target.value,
    });
  }

  handleLocationChange(e) {
    let autocomplete, 
place;
    autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('city'), {
      types: ['(regions)'],
    });

    window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
      place = autocomplete.getPlace();
      this.setState({
        city: place.formatted_address,
      });
    });
    this.setState({
      city: e.target.value,
    });
  }

  handleBackgroundChange(e) {
    const backgroundObj = this.state.backgroundLists.filter((item) => {
            return item.id.toString() === e.target.value
        });
    this.setState({
      backgrounds: backgroundObj,
      selectedBackground: e.target.value,
    });
  }

  handleSkillChange(e) {
    const skillObj = this.state.skillsLists.filter((item) => {
            return item.id.toString() === e.target.value
        });
    this.setState({
      skills: skillObj,
      selectedSkill: e.target.value,
    });

  }

  handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append('opportunity[backgrounds[]][id]', this.state.backgrounds[0].id);
    data.append('opportunity[backgrounds[]][option]', this.state.backgrounds[0].option ? this.state.backgrounds[0].option : 'preferred');
    data.append('opportunity[skills[]][id]', this.state.skills[0].id);
    data.append('opportunity[skills[]][option]', this.state.skills[0].option ? this.state.skills[0].option : 'preferred');
    data.append('opportunity[skills[]][level]', this.state.skills[0].level ? this.state.skills[0].level : 0);
    fetch(`https://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/6124?access_token=${  accessToken }`, {
      method: 'PATCH',
      body: data,
    });
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  componentDidMount() {
    fetch(`https://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/6124?access_token=${  accessToken}`)
      .then(res => res.json())
      .then((data) => {
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
          selectedBackground: data.backgrounds[0].id,
          selectedSkill: data.skills[0].id,
        });
      });


    if (!this.state.backgroundLists.length && !this.state.skillsLists.length) {
      fetch(`https://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/backgrounds?access_token=${  accessToken}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            backgroundLists: data,
          });
        });
      fetch(`https://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/skills?access_token=${  accessToken}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            skillsLists: data,
          });
        });
    }
  }

  render() {
    return (
          <div className="form-wrapper container">
              <div className="row">
                  <span className="col-sm-11 col-md-11 col-lg-11" />
                  <button name="editButton" className="btn btn-default col-sm-1 col-md-1 col-lg-1" onClick={this.toggleEditMode}>
Edit
</button>
                </div>
              <form className="aiesec-form" onSubmit={this.handleFormSubmit}>
                  <br />
                  <h3 className="text-center">
AISEC Organization Form
</h3>
                  <br />
                  <SingleInput inputType="text" title="Title" handlerFunction={this.handleChange} value={this.state.title} name="title" editMode={this.state.editMode} />
                  <SingleInput inputType="number" title="Salary" handlerFunction={this.handleChange} value={this.state.salary} name="salary" editMode={this.state.editMode} />
                  <SingleInput inputType="text" title="Selection Process" handlerFunction={this.handleChange} value={this.state.selection_process} name="selection_process" editMode={this.state.editMode} />
                  <SingleInput inputType="date" title ="Starting Date" handlerFunction={this.handleChange} value={this.state.earliest_start_date} name="earliest_start_date" editMode={this.state.editMode} />
                  <SingleInput inputType="date" title= "End Date" handlerFunction={this.handleChange} value={this.state.latest_end_date} name="latest_end_date" editMode={this.state.editMode} />
                  <SingleInput inputType="date" title= "Application Closing Date" handlerFunction={this.handleChange} value={this.state.applications_close_date} name="applications_close_date" editMode={this.state.editMode} />
                  {this.state.editMode ? <PlacesSearch name="citySearch" inputType="text" id="city" value={this.state.city} handlerFunction={this.handleLocationChange} title="City" /> : <SingleInput inputType="text" title="City" handlerFunction={this.handleLocationChange} value={this.state.city} name="city" editMode={this.state.editMode} /> }
                  {this.state.editMode && this.state.backgroundLists ? <SelectDropdown title="Backgrounds" handlerFunction={this.handleBackgroundChange} value={this.state.selectedBackground} options={this.state.backgroundLists && this.state.backgroundLists} /> : <ListOptions title="Backgrounds" name="backgroundLists" options={this.state.backgrounds && this.state.backgrounds} />}
                  <TextArea title="Description" rows={5} resize={false} handlerFunction={this.handleChange} value={this.state.description} editMode={this.state.editMode} name="description" />
                  {this.state.editMode && this.state.skillsLists ? <SelectDropdown title="Skills" handlerFunction={this.handleSkillChange} value={this.state.selectedSkill} options={this.state.skillsLists && this.state.skillsLists} /> : <ListOptions title="Skills" name="skillsLists" options={this.state.skills && this.state.skills} />}

                  <div className="row">
                      <span className="col-sm-4 col-md-4 col-lg-4" />
                      <input type="submit" value="Submit" className="btn btn-primary " />
                    </div>
                </form>

            </div>
    );
  }
}

export default ReactFormContainer;
