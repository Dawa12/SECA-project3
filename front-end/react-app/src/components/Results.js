import React, { Component } from 'react';

class Results extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    const url = 'https://data.cityofnewyork.us/resource/jff5-ygbi.json';

    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        const data = this.state.data;
        this.setState({ data: response });
      });
  }

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
              <input type="submit" value="Save" />
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <form>
          <table>
            <tbody>
              {tableHeaders ? tableHeaders : loading}
              {tableRows ? tableRows : loading}
            </tbody>
          </table>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Results;
