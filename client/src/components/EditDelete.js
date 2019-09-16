import React,{Component} from 'react';
import { connect } from 'react-redux';
import {deleteMarker,readMarkers,getAllLatLongs,addStatus,editMarker,saveMarkers} from '../actions/markerActions';

class EditDelete extends Component{

    //add the info Window when clicked on the display card 
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
    //delete a particular marker from the map and save the new set of markers
    clearMarker(selectedElement){
        let {latLongsArray,markers,saveMarkers}=this.props;
        latLongsArray.forEach((ele,index)=>{
            if(ele.location===selectedElement.location){
                markers[index].setMap(null);
                markers.splice(index,1);
            } 
       })
       saveMarkers(markers);
    }
    //calls the delete action for deleting a marker and retrieving with the new set of latlongs array
    deleteMarker(event,ele){
        event.stopPropagation();
        if(window.infowindow){
            window.infowindow.close();
        }
        this.props.deleteMarker(ele);
        this.clearMarker(ele);
        this.props.readMarkers().then((res)=>{
            this.props.getAllLatLongs(res.data);
        });
    }
    //calls the edit action and move to the add marker view
    editMarker(event,latLongElement){
        event.stopPropagation();
        if(window.infowindow){
            window.infowindow.close();
        }
       latLongElement.edit=true;
       this.props.editMarker(latLongElement);
       this.props.addStatus("add",latLongElement.location);
    }
    render(){
        let {placeObject}=this.props;
        return(
            <div className="editDeleteCard" data-test="editDeleteComponent" onClick={(e)=>this.addInfoWindow(e)}>
                <div className="location">{placeObject.location}</div>
                <div>
                    <span><button className="editMarker" data-test="editButton" onClick={(e)=>this.editMarker(e,placeObject)}>Edit</button></span>
                    <span><button className="deleteMarker" data-test="deleteButton" onClick={(e)=>this.deleteMarker(e,placeObject)}>Delete</button></span>
                </div>
            </div>
        )
    }
}

export {EditDelete as TestEditDelete}

const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps,{
    deleteMarker,
    readMarkers,
    getAllLatLongs,
    addStatus,
    editMarker,
    saveMarkers
})(EditDelete);