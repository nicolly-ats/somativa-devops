import React, {Component} from 'react';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      contador: 0
    }
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  }

  aumentar(){
    let state = this.state;
    state.contador += 1;
    this.setState(state);
  }

  diminuir(){
    let state = this.state;
    state.contador -= 1;
    this.setState(state);
  }

  render(){
    return(
      <div>
        <button onClick={this.aumentar}> Adicionar </button> &nbsp;
        <button onClick={this.diminuir}> Subtrair </button> <br/><br/>
        Valor: {this.state.contador}
      </div>
    )
  }

}

export default App;