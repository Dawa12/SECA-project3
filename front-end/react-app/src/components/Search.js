import React, { Component } from 'react';
import SavedResults from './SavedResults';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputText: ''
    };
  }

  handleChange = e => {
    // const state = this.state.input
    const inputText = e.target.value;
    this.setState({ inputText });
  };

  render() {
    return (
      <div className="search-container">
        <h2>Saved Results</h2>
        <form>
          <input className="search" onChange={this.handleChange} type="text" />
        </form>
        <SavedResults searchTerm={this.state.inputText} {...this.props} />
      </div>
    );
  }
}

export default Search;
