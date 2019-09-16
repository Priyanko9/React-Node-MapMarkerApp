import React,{Component} from 'react';
import './App.css';
import Marker from './components/Marker';

class App extends Component {
  render(){
    return (
      <div className="App" data-test="appComponent">
        <Marker/>
      </div>
    );
  }
  
}

export default App;
