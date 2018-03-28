import React, { Component } from 'react';

class Results extends Component {
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
    if (this.props.data.length > 0) {
      tableHeaders = (
        <tr>
          {/* <th>license number</th> */}
          <th>business name</th>
          <th>address zip</th>
          <th>address borough</th>
          <th>address city</th>
          <th>action</th>
        </tr>
      );

      const data = this.props.data;

      tableRows = data.map((value, mapIndex) => {
        return (
          <tr key={mapIndex}>
            {/* <td>{value.license_nbr}</td> */}
            <td>{value.business_name}</td>
            <td>{value.address_zip}</td>
            <td>{value.address_borough}</td>
            <td>{value.address_city}</td>
            <td>
              <button
                onClick={() =>
                  this.props.handleSave(mapIndex, value.licenseNumber)
                }
              >
                Save
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h2>Business Results</h2>
        <table>
          <tbody>
            {tableHeaders ? tableHeaders : loading}
            {tableRows ? tableRows : loading}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Results;
