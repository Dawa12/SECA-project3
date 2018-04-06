import React, { Component } from 'react';

class SavedResults extends Component {
  constructor(props) {
    super(props);
    // debugger;
    this.state = {
      tableHeaders: undefined,
      tableRows: [],
      // filteredRows: [],
      loading: (
        <tr>
          <td>Loading...</td>
        </tr>
      ),
      notes: [''],
      // notes: [props.saved[0].notes],
      // isUpdating: false
      isUpdating: [false]
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive props: ', nextProps);
    let notes = [...this.state.notes];
    if (nextProps.saved) {
      // debugger;
      // notes = nextProps.saved.notes;

      notes = nextProps.saved.map(obj => {
        return obj.notes;
      });

      this.setState({ notes });
    }
  }

  handleChange = (e, index) => {
    let notes = [...this.state.notes];
    notes[index] = e.target.value;
    this.setState({ notes });
  };

  handleButtonClick = id => {
    const isUpdating = [...this.state.isUpdating];
    isUpdating[id] = !this.state.isUpdating[id];

    this.setState({ isUpdating });
  };

  handleDoneClick = (id, index) => {
    this.handleButtonClick(index);
    const url = `http://localhost:8080/users/${id}`;

    // debugger;
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        businessName: this.props.saved[0].businessName,
        addressZip: this.props.saved[0].addressZip,
        addressBorough: this.props.saved[0].addressBorough,
        addressCity: this.props.saved[0].addressCity,
        notes: this.state.notes[index]
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Successful PATCH update:', response);
      });
  };

  componentDidMount() {
    let tableRows;
    let loadingCell = <td>Loading...</td>;

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
    let textAreaToggle;

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
          <td className="text-cell">
            {this.state.isUpdating[mapIndex] ? (
              <div className="text-container">
                <textarea
                  className="inputBox"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={this.state.notes[mapIndex]}
                  onChange={e => this.handleChange(e, mapIndex)}
                />
                <button
                  onClick={() => this.handleDoneClick(value.id, mapIndex)}
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="text-container">
                <div className="textPlaceholder inputBox">
                  {this.state.notes[mapIndex]}
                </div>

                <button onClick={() => this.handleButtonClick(mapIndex)}>
                  Update
                </button>
              </div>
            )}
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
