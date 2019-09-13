import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getLatLong,createMarker,readMarkers,addStatus,saveMarkers,getAllMarkers} from '../actions/markerActions';

class AddMarker extends Component{

    constructor(props){
        super(props);
        this.state={
            location:props.elementToEdit||"",
            searchResults:[]
        }
    }
    createMarkers(selectedlatlongs){
        //create Markers
        this.props.dispatch(saveMarkers([]));
        this.clearAllMarkers();
            this.props.dispatch(createMarker(selectedlatlongs)).then((res)=>{
                this.props.dispatch(readMarkers()).then((latLongResponse)=>{
                    this.props.dispatch(getAllMarkers(latLongResponse.data))
                    this.props.addMarkerProp(this.props.map,this.props.latLongsArray);
                    this.props.dispatch({type:"Notification",message:"marker created successfully"});
                    if(this.props.status==="add"){
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
                this.setState({searchResults:latlongs});
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