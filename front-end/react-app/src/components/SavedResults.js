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
      isUpdating: false
    };
  }

  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notes != prevState.notes) {
      this.setState({ notes: nextProps.notes });
    }
  }

  // handleChange(e) {
  handleChange = e => {
    const notes = [];
    notes[0] = e.target.value;
    this.setState({ notes });
  };

  handleButtonClick = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  handleDoneClick = id => {
    this.handleButtonClick();
    const url = `http://localhost:8080/users/${id}`;

    // debugger;
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        businessName: this.props.saved[0].businessName,
        addressZip: this.props.saved[0].addressZip,
        addressBorough: this.props.saved[0].addressBorough,
        addressCity: this.props.saved[0].addressCity,
        notes: this.state.notes[0]
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      // mode: 'no-cors'
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Successful PATCH update:', response);
      });
    //   saved.push({
    //     id: response.id,
    //     businessName: result.business_name,
    //     addressZip: result.address_zip,
    //     addressBorough: result.address_borough,
    //     addressCity: result.address_city
    //   });

    //   this.setState({ saved });
  };
  // // };

  // componentWillMount() {
  //   this.setState({ notes: this.props.saved[0].notes });
  // }

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
    // let toggleButton = <button onClick={this.handleButtonClick}>Update</button>;
    let textAreaToggle = (
      <div className="textPlaceholder">{this.state.notes}</div>
      // <div className="textPlaceholder">{this.props.saved[0].notes}</div>
    );

    if (this.state.isUpdating) {
      console.log('is updating: true');
      textAreaToggle = (
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          // value={this.state.notes[mapIndex]}
          // value={this.state.notes[0]}
          value={this.state.notes}
          // value={this.props.saved[0].notes}
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
            {this.state.isUpdating ? (
              <button onClick={() => this.handleDoneClick(value.id)}>
                Done
              </button>
            ) : (
              <button onClick={this.handleButtonClick}>Update</button>
            )}

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
