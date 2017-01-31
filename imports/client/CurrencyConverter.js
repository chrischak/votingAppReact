import React, { Component } from 'react';

const entryNames = {
  a: 'Type in amount and select currency:',
  b: 'Converted amount:'
}

function toInputA(a, rate) {
  return a / rate;
}

function toInputB(b, rate) {
  return b * rate;
}

function tryConvert(value, convert, rate) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input, rate);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class CurrencyInput extends Component{
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    return (
        <input value={value} title="enter a number"
               onChange={this.handleChange} />
    );
  }
}

export class ConverterBox extends Component {
  constructor(props) {
    super(props);
    this.handleInputAChange = this.handleInputAChange.bind(this);
    this.handleInputBChange = this.handleInputBChange.bind(this);
    this.handleRateAChange = this.handleRateAChange.bind(this);
    this.handleRateBChange = this.handleRateBChange.bind(this);
    this.state = {value: '', entry: 'a', currencyA:'USD', currencyB:'CAD', exchangeRate:'' };
  }

  handleInputAChange(value) {
    this.setState({entry: 'a', value});
  }

  handleInputBChange(value) {
    this.setState({entry: 'b', value});
  }

  handleRateAChange(event) {
    this.setState({currencyA:event.target.value});
     if(event.target.value === this.state.currencyB ){
       this.setState({exchangeRate: 1})
     }
     else{
       var xhrObject = new XMLHttpRequest();
       xhrObject.open(
          "GET",
          "https://api.fixer.io/latest?base="+event.target.value+"&symbols=CAD,USD,EUR",
          true
        );
       xhrObject.onreadystatechange = function() {
          if (xhrObject.readyState === 4) {
            if (xhrObject.status === 200 || xhrObject.status === 304) {
              const rateObject =  JSON.parse(xhrObject.responseText);
              this.setState({exchangeRate: rateObject.rates[this.state.currencyB]})
            }
          }
        }.bind(this);
       xhrObject.send();
     }
  }

  handleRateBChange(event) {
    this.setState({currencyB:event.target.value});
     if(this.state.currencyA === event.target.value){
       this.setState({exchangeRate: 1})
     }
     else{
       var xhrObject = new XMLHttpRequest();
       xhrObject.open(
          "GET",
          "https://api.fixer.io/latest?base="+this.state.currencyA+"&symbols=CAD,USD,EUR",
          true
        );
       xhrObject.onreadystatechange = function() {
          if (xhrObject.readyState === 4) {
            if (xhrObject.status === 200 || xhrObject.status === 304) {
              const rateObject =  JSON.parse(xhrObject.responseText);
              this.setState({exchangeRate: rateObject.rates[this.state.currencyB]})
            }
          }
        }.bind(this);
       xhrObject.send();
     }
  }

  componentDidMount(){
     var xhrObject = new XMLHttpRequest();
        xhrObject.open(
          "GET",
          "https://api.fixer.io/latest?base=USD&symbols=CAD,USD,EUR",
          true
        );
        xhrObject.onreadystatechange = function() {
          if (xhrObject.readyState === 4) {
            if (xhrObject.status === 200 || xhrObject.status === 304) {
              const rateObject =  JSON.parse(xhrObject.responseText);
              this.setState({exchangeRate: rateObject.rates["CAD"]})
            }
          }
        }.bind(this);
        xhrObject.send();
  }

  render(){
    const entry = this.state.entry;
    const currencyA = this.state.currencyA;
    const currencyB = this.state.currencyB;
    const value = this.state.value;
    const test = this.state.exchangeRate;
    const ratesList = ['CAD', 'USD', 'EUR'];
    const entryA = entry === 'b' ? tryConvert(value, toInputA, this.state.exchangeRate) : value;
    const entryB = entry === 'a' ? tryConvert(value, toInputB, this.state.exchangeRate) : value;

    return(
      <div className="currency-converter">
        <h2>Currency converter</h2>
        <div>
          <p>{entryNames["a"]}</p>
          <CurrencyInput
            entry="a"
            value={entryA}
            onChange={this.handleInputAChange} />
          <select value={currencyA} onChange={this.handleRateAChange} title="choose a currency">
            {ratesList.map( rate => <option value={rate}>{rate}</option>)}
          </select>
        </div>
        <div>
          <p>{entryNames["b"]}</p>
          <CurrencyInput
            entry="b"
            value={entryB}
            onChange={this.handleInputBChange} />
          <select value={currencyB} onChange={this.handleRateBChange}>
            {ratesList.map( rate => <option value={rate}>{rate}</option>)}
          </select>
        </div>
        <a className="disclaimer" href="http://fixer.io/">Disclaimer</a>
      </div>
    )
  }
}
