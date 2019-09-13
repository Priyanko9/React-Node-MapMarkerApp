import React,{Component} from 'react';
import './App.css';
import Marker from './components/Marker';

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="App">
        <Marker/>
      </div>
    );
  }
  
}

export default App;
