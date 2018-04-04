import React, { Component } from 'react';

class SavedResults extends Component {
  state = {
    tableHeaders: undefined,
    tableRows: [],
    // filteredRows: [],
    loading: (
      <tr>
        <td>Loading...</td>
      </tr>
    )
  };

  componentDidMount() {
    let tableRows;
    let loadingCell = <td>Loading...</td>;
    console.log('mounting saved results component');
    console.log('updating tableheaders state!');
    this.setState({
      tableHeaders: (
        <tr>
          <th>id</th>
          <th>business name</th>
          <th>address zip</th>
          <th>address borough</th>
          <th>address city</th>
          <th>action</th>
        </tr>
      )
    });
  }

  render() {
    const data = this.props.saved;

    // filter results by user's search term
    const filteredRows = data.filter((value, mapIndex) => {
      return value.businessName
        .toLowerCase()
        .includes(this.props.searchTerm.toLowerCase());
    });

    let tableRows = filteredRows.map((value, mapIndex) => {
      return (
        <tr key={mapIndex}>
          <td>{value.id}</td>
          <td>{value.businessName}</td>
          <td>{value.addressZip}</td>
          <td>{value.addressBorough}</td>
          <td>{value.addressCity}</td>

          <td>
            <button onClick={() => this.props.handleDelete(mapIndex, value.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table>
          <tbody>
            {this.state.tableHeaders
              ? this.state.tableHeaders
              : this.state.loading}
            {/* {this.state.tableRows ? this.state.tableRows : this.state.loading} */}

            {tableRows ? tableRows : this.state.loading}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SavedResults;
