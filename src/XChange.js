import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';



class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      amount: '',
      convert: '',
      currencies: [],
      result: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
  }

  componentDidMount() {
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        currencies: Object.keys(data).map(symbol => ({ symbol, name: data[symbol] }))
      });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  handleChange(event) {
    const { name, value } = event.target;
    
    
    this.setState({
      [name]: value
    }); 
  }

  handleSubmit(event) {
    event.preventDefault();
    const { base, amount, convert } = this.state;
    //base = base.trim();
    console.log(`base: ${base}\namount: ${amount}\nconvert: ${convert}`);
    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}&to=${convert}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log('json data', data);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  calculateTotal = () => {
    const {base, amount, result, convert } = this.state;
    console.log(`base: ${base}\namount: ${amount}\nconvert: ${convert}`);
    
    if(amount === isNaN) {
      return;
    } else {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/latest?from=${this.state.base}&to=${this.state.convert}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const result = (data.rates[this.state.convert] * amount).toFixed(2);
        this.setState({
          result
        });
      });
    
    }
  };

  render () {
    const { currencies, base, amount, convert, result } = this.state;
    

    return (
      <div className="row">
        <div className="col-4 my-3 ms-5 text-center" id="coin">
          <span>Base Currency:</span>
          <form onSubmit={this.handleSubmit} className="form-inline">
            <select name="base" value={base} onChange={this.handleChange} className="form-control select-menu">
              {this.state.currencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>
                {currency.symbol} - {currency.name}
              </option>
              ))}
            </select>
            <label>
              Amount:
              <input type="number" name="amount" value={amount} onChange={this.handleChange} className="form-control" />
            </label>
            <button type="submit" className="btn btn-primary">Convert</button>
          </form>
        </div>
        <div className="col-3"></div>
        <div className="col-4 my-3 me-3 text-center" id="coin">
          <span>Convert to: </span>
          <p>
          <select name="base" value={base} onChange={this.handleChange} className="form-control select-menu">
              {this.state.currencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>
                {currency.symbol} - {currency.name}
              </option>
              ))}
            </select>
          </p>
          <p>
            <span>Total: </span>
            <span>${amount} * (currencies.rates)</span>
          </p>
        </div>
      </div>
      )
  }
}



export default CurrencyConverter;