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
    ),
    notes: ['hello'],
    isUpdating: false
  };

  // handleChange(e) {
  handleChange = e => {
    const notes = [];
    notes[0] = e.target.value;
    this.setState({ notes });
  };

  handleButtonClick = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  handleDoneClick = () => {
    this.handleButtonClick();
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
          <th>notes</th>
          <th>action</th>
        </tr>
      )
    });
  }

  render() {
    const data = this.props.saved;
    let toggleButton = <button onClick={this.handleButtonClick}>Update</button>;
    let textAreaToggle = (
      <div className="textPlaceholder">{this.state.notes}</div>
    );

    if (this.state.isUpdating) {
      console.log('is updating: true');
      toggleButton = <button onClick={this.handleDoneClick}>Done</button>;
      textAreaToggle = (
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          // value={this.state.notes[mapIndex]}
          value={this.state.notes[0]}
          onChange={this.handleChange}
        />
      );
    }

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
            {/* notes  */}
            {toggleButton}
            {textAreaToggle}
          </td>

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
            {tableRows ? tableRows : this.state.loading}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SavedResults;
