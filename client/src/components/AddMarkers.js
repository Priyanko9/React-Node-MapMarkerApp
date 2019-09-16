import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getLatLong,createMarker,readMarkers,addStatus,saveMarkers,getAllLatLongs,notification,notifyError,clearError} from '../actions/markerActions';

class AddMarker extends Component{

    constructor(props){
        super(props);
        this.state={
            location:props.elementToEdit||"",
            searchResults:[],
            loading:false
        }
    }
    //add new markers to map
    createMarkers(selectedlatlongs){
        
        this.props.saveMarkers([]);//removing all the markers from store before adding new
        this.clearAllMarkers();
        this.props.map.setCenter({lat: Number(selectedlatlongs.lat), lng: Number(selectedlatlongs.long)})//recentering for the new location
        //Finally creating new markers and saving them to store and changing to display view    
        this.props.createMarker(selectedlatlongs).then((res)=>{
                this.props.readMarkers().then((latLongResponse)=>{
                    this.props.getAllLatLongs(latLongResponse.data)
                    this.props.addMarkerProp(this.props.map,this.props.latLongsArray);
                    this.props.notification("marker created successfully");
                    if(this.props.status==="add"){
                        this.props.addStatus("display");
                    }
                });
            });
    }
    //removing all markers from map
    clearAllMarkers(){
        let {markers}=this.props;
        for(let i=0;i<markers.length;i++){
            markers[i].setMap(null);
        }
    }
    //search results for the entered text in loaction input
    searchResults(){
        this.props.clearError();
        let place=this.state.location;
        this.setState({loading:true});
        if(place===""){
            this.setState({searchResults:[],location:"",loading:false});
            this.props.notifyError("Please enter location to search");
        } else {
            this.props.getLatLong(place).then((response)=>{
                    let latlongs=response.data.map((ele)=>{
                        return {
                            lat:ele.lat,
                            long:ele.lon,
                            location:ele.display_name,
                            edit:false
                        }
                    })
                    this.setState({searchResults:latlongs,location:"",loading:false});
                }).catch(error=>{
                    this.setState({searchResults:[],location:"",loading:false});
                    if(error.response.status===404){
                        this.props.notifyError("Location Not Found");
                    }
                })
        }    
    }
    //set the location on Change event
    setlocation(event){
        let location=event.target.value;
        this.setState({location});
    }
    //take to the display view
    showMarkedPlaces(event){
        this.props.clearError();
        this.props.addStatus("display")
    }
    render(){
        return(
            <div className="addMarkerSection" data-test="addMarkerComponent">
                 <div className="searchBox"><input type="text" className="locationInput" data-test="locationInput"  value={this.state.location} onChange={(e)=>this.setlocation(e)}/></div>
                 <div className="saveMarker"><button data-test="searchButton" onClick={(e)=>this.searchResults(e)}>Search</button></div>
                 <div className="showMarkedPlaces"><button data-test="showMarkedPlaces"  onClick={(e)=>this.showMarkedPlaces(e)}>Show Marked Places</button></div>
                 <div className="searchResults">
                    {this.state.searchResults && this.state.searchResults.map((ele)=>{
                        return (
                            <div key={ele.location} className="blockLevelCard">
                                <div className="searchedLocations">{ele.location}</div>
                                <div><button data-test="addToMap" onClick={(e)=>this.createMarkers(ele)}>Add To Map</button></div>
                            </div>
                            )
                        })
                    }
                    {this.props.error && <div><b>{this.props.error}</b></div>}
                    {this.state.loading && <div>Loading....</div>}
                </div>    
            </div>
        )
    }
}

export { AddMarker as TestAddMarker };
const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps,{
    getLatLong,
    createMarker,
    readMarkers,
    addStatus,
    saveMarkers,
    getAllLatLongs,
    notification,
    notifyError,
    clearError
})(AddMarker);