import React, { Component } from 'react';
import Results from './components/Results';
import './App.css';
import SavedResults from './components/SavedResults';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      saved: []
    };
  }

  componentWillMount() {
    const url = `https://data.cityofnewyork.us/resource/h5tz-kn86.json?$limit=10`;
    // 'https://data.cityofnewyork.us/resource/jff5-ygbi.json?$limit=10';

    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        const data = this.state.data.slice();
        this.setState({ data: response });
      });

    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        const saved = this.state.saved.slice();
        this.setState({ saved: response });
      });
  }

  handleDelete = (index, id) => {
    const url = `http://localhost:8080/users/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Successful Delete! ', response);
      });

    // create copy of values of array this.props.saved
    const saved = this.state.saved.slice();
    // delete saved[id];
    delete saved[Object.values(...saved).indexOf(id)];
    // debugger;
    this.setState({ saved });
  };

  handleSave = index => {
    const url = 'http://localhost:8080/users';

    // create copy of values of array this.props.saved
    const saved = this.state.saved.slice();
    // filter data for index at which user clicked "save"
    const result = this.state.data[index];

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        businessName: result.business_name,
        addressZip: result.address_zip,
        addressBorough: result.address_borough,
        addressCity: result.address_city
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        saved.push({
          // licenseNumber: result.license_nbr,
          businessName: result.business_name,
          addressZip: result.address_zip,
          addressBorough: result.address_borough,
          addressCity: result.address_city
        });

        this.setState({ saved });
      });
  };

  render() {
    return (
      <div className="App">
        <Results handleSave={this.handleSave} {...this.state} />
        <SavedResults
          handleDelete={this.handleDelete}
          saved={this.state.saved}
        />
      </div>
    );
  }
}

export default App;
