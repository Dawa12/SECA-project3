import React, { Component } from 'react';
import Results from './components/Results';
import './App.css';
// import SavedResults from './components/SavedResults';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      saved: []
    };
  }

  componentDidMount() {
    const url = `https://data.cityofnewyork.us/resource/h5tz-kn86.json?$limit=10`;

    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Successful fetch to CityData API:', response);

        if (response) {
          const data = this.state.data.slice();
          this.setState({ data: response });
        }
      });

    // view all saved users
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        // if (!response) return; // if undefined then return function
        console.log('Success:', response);
        console.log(this.state);
        if (this.state.saved) {
          const saved = this.state.saved.slice();
          this.setState({ saved: response });
        }
      });
  }

  handleSave = index => {
    const url = `http://localhost:8080/users`;

    const saved = this.state.saved.slice();
    // }
    // const saved = this.saved.slice();
    // filter data for index at which user clicked "save"
    const result = this.state.data[index];

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        // remove string from DCA license
        businessName: result.business_name,
        addressZip: result.address_zip,
        addressBorough: result.address_borough,
        addressCity: result.address_city,
        notes: ''
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
          id: response.id,
          businessName: result.business_name,
          addressZip: result.address_zip,
          addressBorough: result.address_borough,
          addressCity: result.address_city
        });

        this.setState({ saved });
      });
  };

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
    // delete saved[id];  ==> will return null on deleted element

    saved.splice(index, 1);

    // delete saved[Object.values(...saved).indexOf(id)];
    this.setState({ saved });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Businesses in Queens</h1>
        <Results handleSave={this.handleSave} {...this.state} />
        <Search handleDelete={this.handleDelete} saved={this.state.saved} />
      </div>
    );
  }
}

export default App;
