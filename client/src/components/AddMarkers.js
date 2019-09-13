import React,{Component} from 'react';
import {getLatLong,createMarker,readMarkers,saveMarkers,getAllMarkers} from '../actions/markerActions';

class AddMarker extends Component{

    constructor(props){
        this.state={
            location:"",
            searchResults:[]
        }
    }
    createMarkers(event,selectedlatlongs){
        //create Markers
        this.props.dispatch(saveMarkers([]));
        this.props.clearAllMarkers();
            this.props.dispatch(createMarker(selectedlatlongs)).then((res)=>{
                this.props.dispatch(readMarkers()).then((res)=>{
                    this.props.dispatch(getAllMarkers(res.data))
                    this.props.addMarker(this.props.map,this.props.latLongsArray);
                    this.props.dispatch({type:"Notification",message:"marker created successfully"});
                    if(this.props.add){
                        this.props.dispatch(addStatus("display"));
                    }
                });
            });
        //})
    }
    clearAllMarkers(){
        let {markers}=this.props;
        for(let i=0;i<markers.length;i++){
            markers[i].setMap(null);
        }
    }
    searchResults(){
        let place=this.state.location;
        this.props.dispatch(getLatLong(place)).then((response)=>{
                let latlongs=response.data.map((ele)=>{
                    return {
                        lat:ele.lat,
                        long:ele.lon,
                        location:ele.display_name,
                        edit:false
                    }
                })
                this.setState({searchResults});
            })
    }
    setlocation(event){
        let location=event.target.value;
        this.setState({location});
    }
    render(){
        return(
            <div className="addMarker">
                 <div><input type="text" className="location"  value={this.state.location} onChange={(e)=>this.setlocation(e)}/></div>
                 <span><button className="saveMarker" onClick={(e)=>this.searchResults(e)}>Search</button></span>
                    {this.state.searchResults && this.state.searchResults.map((ele)=>{
                        return (
                            <div key={ele.location} className="blockLevelCard">
                                <div><button onClick={(e)=>this.createMarkers(ele)}>Add To Map</button></div>
                                <div>{ele.location}</div>
                            </div>
                            )
                        })
                    }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps)(AddMarker);