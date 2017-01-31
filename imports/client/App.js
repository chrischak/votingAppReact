import React, { Component } from 'react';

let name = 'Crazy';

// let headingClick = function() {
//   console.log('hello');
// }

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  headingClick() {
    console.log('Testing Click');
    this.setState({count: this.state.count + 1});
  }

  render(){
    return (
      <header onClick={this.headingClick.bind(this)}>{name}, Welcome To wall of App!<Heading count={this.state.count}/> </header>
    );
  }
}

class Heading extends Component {
  render() {
    return (
      <h1>{this.props.count}</h1>
    )
  }
}
