import React,{Component} from 'react';
import { connect } from 'react-redux';
import {deleteMarker,readMarkers,getAllMarkers,addStatus,editMarker} from '../actions/markerActions';

class AddMarker extends Component{

    
    addInfoWindow(event){
        event.preventDefault();
        if(this.infowindow){
            this.infowindow.close();
        }
        let {map,placeObject,newMarker}=this.props;
        let location=event.target.textContent;
        this.clearMarker({location});
        let marker=newMarker(map,Number(placeObject.lat),Number(placeObject.long));
        this.infowindow = new window.google.maps.InfoWindow({
            content:placeObject.location
          });
        this.infowindow.open(map,marker);  
        map.setCenter({lat: Number(placeObject.lat), lng: Number(placeObject.long)})
    }
    clearMarker(selectedElement){
        let {latLongsArray,markers}=this.props;
        latLongsArray.forEach((ele,index)=>{
            if(ele.location===selectedElement.location){
                markers[index].setMap(null);
            } 
       })
    }
    deleteMarker(ele){
        this.props.dispatch(deleteMarker(ele));
        this.props.clearMarker(ele);
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllMarkers(res.data));
        });
    }
    editMarker(latLongElement){
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
                    <span><button className="editMarker" onClick={(e)=>this.editMarker(placeObject)}>Edit</button></span>
                    <span><button className="deleteMarker" onClick={(e)=>this.deleteMarker(placeObject)}>Delete</button></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps)(AddMarker);