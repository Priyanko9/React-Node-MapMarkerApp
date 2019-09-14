import React,{Component} from 'react';
import { connect } from 'react-redux';
import {deleteMarker,readMarkers,getAllLatLongs,addStatus,editMarker,saveMarkers} from '../actions/markerActions';

class AddMarker extends Component{

    
    addInfoWindow(event){
        event.preventDefault();
        if(window.infowindow){
            window.infowindow.close();
        }
        let {map,placeObject,latLongsArray,markers}=this.props;
        window.infowindow = new window.google.maps.InfoWindow({
            content:placeObject.location
        });
        latLongsArray.forEach((ele,index)=>{
            if(ele.location===placeObject.location){
                window.infowindow.open(map,markers[index]);
                
            } 
        })
          
        map.setCenter({lat: Number(placeObject.lat), lng: Number(placeObject.long)})
    }
    clearMarker(selectedElement){
        let {latLongsArray,markers,dispatch}=this.props;
        latLongsArray.forEach((ele,index)=>{
            if(ele.location===selectedElement.location){
                markers[index].setMap(null);
                markers.splice(index,1);
            } 
       })
       dispatch(saveMarkers(markers));
    }
    deleteMarker(event,ele){
        event.stopPropagation();
        if(window.infowindow){
            window.infowindow.close();
        }
        this.props.dispatch(deleteMarker(ele));
        this.clearMarker(ele);
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllLatLongs(res.data));
        });
    }
    editMarker(event,latLongElement){
        event.stopPropagation();
        if(window.infowindow){
            window.infowindow.close();
        }
       latLongElement.edit=true;
       this.props.dispatch(editMarker(latLongElement));
       this.props.dispatch(addStatus("add",latLongElement.location));
    }
    render(){
        let {placeObject}=this.props;
        return(
            <div className="editDeleteCard" onClick={(e)=>this.addInfoWindow(e)}>
                <div className="location">{placeObject.location}</div>
                <div>
                    <span><button className="editMarker" onClick={(e)=>this.editMarker(e,placeObject)}>Edit</button></span>
                    <span><button className="deleteMarker" onClick={(e)=>this.deleteMarker(e,placeObject)}>Delete</button></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps)(AddMarker);