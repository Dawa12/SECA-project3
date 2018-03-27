import React, { Component } from 'react';

class Results extends Component {
  componentWillMount() {
    const url = 'https://data.cityofnewyork.us/resource/jff5-ygbi.json';

    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  render() {
    return <div>resultsComponent</div>;
  }
}

export default Results;
