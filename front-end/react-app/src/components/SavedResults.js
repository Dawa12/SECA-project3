import React, { Component } from 'react';

class SavedResults extends Component {
  render() {
    let tableHeaders;
    let tableRows = [];
    let filteredRows = [];
    let loading = (
      <tr>
        <td>Loading...</td>
      </tr>
    );

    let loadingCell = <td>Loading...</td>;

    // prevent errors by checking state fetched data and has content
    if (this.props.saved.length > 0) {
      tableHeaders = (
        <tr>
          {/* <th>license number</th> */}
          <th>id</th>
          <th>business name</th>
          <th>address zip</th>
          <th>address borough</th>
          <th>address city</th>
          <th>action</th>
        </tr>
      );

      const data = this.props.saved;

      // filter results by user's search term
      filteredRows = data.filter((value, mapIndex) => {
        return value.businessName
          .toLowerCase()
          .includes(this.props.searchTerm.toLowerCase());
      });

      // return table row of filtered results
      tableRows = filteredRows.map((value, mapIndex) => {
        return (
          <tr key={mapIndex}>
            <td>{value.id}</td>
            <td>{value.businessName}</td>
            <td>{value.addressZip}</td>
            <td>{value.addressBorough}</td>
            <td>{value.addressCity}</td>

            <td>
              <button
                onClick={() => this.props.handleDelete(mapIndex, value.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
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

export default SavedResults;
