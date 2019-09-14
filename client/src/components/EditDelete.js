import React,{Component} from 'react';
import { connect } from 'react-redux';
import {deleteMarker,readMarkers,getAllMarkers,addStatus,editMarker} from '../actions/markerActions';

class AddMarker extends Component{

    componentDidMount(){
        let markersList=document.getElementsByClassName("markersList")[0];
        let {map,placeObject,newMarker}=this.props;
        markersList.addEventListener("click",(event)=>{
            event.preventDefault();
            let location=event.target.textContent;
            this.clearMarker({location});
            let marker=newMarker(map,Number(placeObject.lat),Number(placeObject.long));
            let infowindow = new window.google.maps.InfoWindow({
                content:placeObject.location
              });
              infowindow.open(map,marker);  
        });
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
    //     let {latLongsArray}=this.props;
    //     latLongsArray=latLongsArray.map((ele,index)=>{
    //         if(ele.location===latLongElement.location){
    //             ele.edit=true;
    //         } else{
    //             ele.edit=false;
    //         }
    //         return ele
    //    })
       this.props.dispatch(editMarker(latLongElement));
       this.props.dispatch(addStatus("add",latLongElement.location));
    }
    render(){
        let {placeObject}=this.props;
        return(
            <div className="editDeleteCard">
                {placeObject.location}
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