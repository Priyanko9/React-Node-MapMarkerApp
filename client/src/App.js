import React,{Component} from 'react';
import './App.css';
import Marker from './components/Marker';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Marker/>
      </div>
    );
  }
  
}

export default App;
