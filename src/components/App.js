import React, { Component } from 'react';
import Table from './Table';
import { select } from 'd3-selection';
import orderBy from 'lodash/orderBy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { // global state
      data: null,
      creator: false,
      date: true,
      sortVar: 'date'
    };

    this.getData = this.getData.bind(this);
    this.handleCreator = this.handleCreator.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  getData() {
    fetch('http://localhost:8888/gladstone.json')
    //fetch('gladstone.json')
      .then(response => response.json())
      .then(data => this.setState({ data: orderBy(data, 'cpdate', 'desc') }))
    }

  handleCreator() {
    this.setState({ creator: true, date: false, sortVar: 'creator' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'creator', 'desc')
    }));
  }

  handleDate() {
    this.setState({ creator: false, date: true, sortVar: 'date' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'cpdate', 'desc')
    }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const bkgd = 'white';
    const stroke = '#909090';

    const creatorStyle = {
      backgroundColor: this.state.creator ? stroke : bkgd,
    };

    const dateStyle = {
      backgroundColor: this.state.date ? stroke : bkgd,
    };

    return (
      <div className='app'>
        <div className='buttonStrip'>
          <button onClick={this.handleCreator} style={creatorStyle}>CREATOR</button>
          <button onClick={this.handleDate} style={dateStyle}>DATE</button>
        </div>
        <Table
          data={this.state.data}
          sortVar={this.state.sortVar}
        />
      </div>
    );
  }
}

export default App;
