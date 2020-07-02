import React from 'react';
import Button from './components/button';
import './App.css';
import { postCalculation, getCalcHistory } from './axiosFunctions';
import PaginationList from 'react-pagination-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      displayAnswer: false,
      answer: "",
      history: []
    };
  }

  handleValue = (calcValue) => {

    if (calcValue == "Clear") {
      // reset variables
      this.setState({
        value: "",
        answer: "",
        displayAnswer: false,
      });

    } else if (calcValue == "+" || calcValue == "-" || calcValue == "*" || calcValue == "/") {

      // Store first value and operator      
      let valuePlusOperator = this.state.value + calcValue;
      this.setState({ value: valuePlusOperator });

    } else if (calcValue == "=") {

      postCalculation(this.state.value).then(res => {
        this.setState({
          value: "",
          answer: res.answer,
          displayAnswer: true
        });

        getCalcHistory().then(res => {
          this.setState({ history: res });
        })
      });

    } else {
      //First value 

      if (this.state.displayAnswer) {
        // Clear display when starting new calculation
        this.setState({ displayAnswer: false, answer: "", value: "" });
      }

      let firstValue = this.state.value + calcValue;
      this.setState({ value: firstValue });
    }
  }

  render() {
    let history;

    if (this.state.history) {
      history = [...this.state.history].reverse();
    }
    return (
      <div className="App">
        <h1>Calculator</h1>
        <div>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button value="Clear" onButtonPress={this.handleValue} />
            <div style={{ width: 290, height: 50, padding: 25, margin: 10, borderRadius: 10, backgroundColor: '#D7D9DD' }}>
              <p style={{ fontWeight: 'bold' }}>{this.state.displayAnswer ? this.state.answer : this.state.value}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button value={7} onButtonPress={this.handleValue} />
            <Button value={8} onButtonPress={this.handleValue} />
            <Button value={9} onButtonPress={this.handleValue} />
            <Button value='/' onButtonPress={this.handleValue} />
          </div>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button value={4} onButtonPress={this.handleValue} />
            <Button value={5} onButtonPress={this.handleValue} />
            <Button value={6} onButtonPress={this.handleValue} />
            <Button value='*' onButtonPress={this.handleValue} />
          </div>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button value={1} onButtonPress={this.handleValue} />
            <Button value={2} onButtonPress={this.handleValue} />
            <Button value={3} onButtonPress={this.handleValue} />
            <Button value='-' onButtonPress={this.handleValue} />
          </div>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button value={0} onButtonPress={this.handleValue} />
            <Button value='.' onButtonPress={this.handleValue} />
            <Button value='=' onButtonPress={this.handleValue} />
            <Button value='+' onButtonPress={this.handleValue} />
          </div>
        </div>
        <div style={{ height: 400, width: 400, position: 'relative', border:"#FFFFFF solid black", borderRadius:30 }}>
          <h2>History</h2>
          <div style={{ position: 'absolute', bottom:0, left:0, right:0,  alignItems: "center" }}>
            <PaginationList
              data={history}
              pageSize={4}
              renderItem={(calc, key) => (
                <div style={{ height: 50, padding: 5, margin: 5, borderRadius: 10, backgroundColor: '#D7D9DD' }}>
                  <p key={key}>{calc.equation} = {calc.answer}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    )
  }
}