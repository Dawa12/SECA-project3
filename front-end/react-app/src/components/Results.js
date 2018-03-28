import React, { Component } from 'react';

class Results extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      saved: []
    };
  }

  componentWillMount() {
    const url =
      'https://data.cityofnewyork.us/resource/jff5-ygbi.json?$limit=10';

    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        const data = this.state.data;
        this.setState({ data: response });
      });

    // GET all businesses
    // fetch(`http://localhost:8080/users`)
    //   .then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => {
    //     console.log('Success:', response);
    //     const data = this.state.data;
    //     // this.setState({ data: response });
    //   });
  }

  handleSave = index => {
    const url = 'http://localhost:8080/users';

    // create copy of values of array this.state.saved
    const saved = this.state.saved.slice();

    // filter data for index at which user clicked "save"
    const result = this.state.data[index];
    saved.push(result);

    // update state of saved items
    this.setState({ saved });

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
      .then(response => console.log('Success:', response));
  };

  render() {
    let tableHeaders;
    let tableRows = [];
    let loading = (
      <tr>
        <td>Loading...</td>
      </tr>
    );

    let loadingCell = <td>Loading...</td>;

    // prevent errors by checking state fetched data and has content
    if (this.state.data.length > 0) {
      tableHeaders = (
        <tr>
          <th>business name</th>
          <th>address zip</th>
          <th>address borough</th>
          <th>address city</th>
          <th>action</th>
        </tr>
      );

      const data = this.state.data;

      tableRows = data.map((value, mapIndex) => {
        return (
          <tr key={mapIndex}>
            <td>{value.business_name}</td>
            <td>{value.address_zip}</td>
            <td>{value.address_borough}</td>
            <td>{value.address_city}</td>
            <td>
              <button onClick={() => this.handleSave(mapIndex)}>Save</button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        {/* <form> */}
        <table>
          <tbody>
            {tableHeaders ? tableHeaders : loading}
            {tableRows ? tableRows : loading}
          </tbody>
        </table>
        {/* </form> */}
      </div>
    );
  }
}

export default Results;
