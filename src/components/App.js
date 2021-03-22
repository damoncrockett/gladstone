import React, { Component } from 'react';
import Table from './Table';
import { select } from 'd3-selection';
import orderBy from 'lodash/orderBy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { // global state
      data: null,
      creatorD: false,
      dateD: false,
      creatorA: false,
      dateA: true,
      sortVar: 'dateA'
    };

    this.getData = this.getData.bind(this);
    this.handleCreatorD = this.handleCreatorD.bind(this);
    this.handleDateD = this.handleDateD.bind(this);
    this.handleCreatorA = this.handleCreatorA.bind(this);
    this.handleDateA = this.handleDateA.bind(this);
  }

  getData() {
    //fetch('http://localhost:8888/gladstone.json')
    fetch('gladstone.json')
      .then(response => response.json())
      .then(data => this.setState({ data: orderBy(data, 'sdate', 'asc') }))
    }

  handleCreatorD() {
    this.setState({ creatorD: true, dateD: false, creatorA: false, dateA: false, sortVar: 'creatorD' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'creator', 'desc')
    }));
  }

  handleDateD() {
    this.setState({ creatorD: false, dateD: true, creatorA: false, dateA: false, sortVar: 'dateD' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'sdate', 'desc')
    }));
  }

  handleCreatorA() {
    this.setState({ creatorD: false, dateD: false, creatorA: true, dateA: false, sortVar: 'creatorA' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'creator', 'asc')
    }));
  }

  handleDateA() {
    this.setState({ creatorD: false, dateD: false, creatorA: false, dateA: true, sortVar: 'dateA' });

    this.setState(state => ({
      data: orderBy(this.state.data, 'sdate', 'asc')
    }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const bkgd = 'white';
    const stroke = '#909090';

    const creatorStyleD = {
      backgroundColor: this.state.creatorD ? stroke : bkgd,
    };

    const creatorStyleA = {
      backgroundColor: this.state.creatorA ? stroke : bkgd,
    };

    const dateStyleD = {
      backgroundColor: this.state.dateD ? stroke : bkgd,
    };

    const dateStyleA = {
      backgroundColor: this.state.dateA ? stroke : bkgd,
    };

    return (
      <div className='app'>
        <div className='buttonStrip'>
          <button onClick={this.handleCreatorD} style={creatorStyleD}>CREATOR ⭣</button>
          <button onClick={this.handleCreatorA} style={creatorStyleA}>CREATOR ⭡</button>
          <button onClick={this.handleDateD} style={dateStyleD}>DATE ⭣</button>
          <button onClick={this.handleDateA} style={dateStyleA}>DATE ⭡</button>
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
