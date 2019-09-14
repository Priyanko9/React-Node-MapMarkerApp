import React,{Component} from 'react';
import { connect } from 'react-redux';
import {deleteMarker,readMarkers,getAllMarkers,addStatus,editMarker} from '../actions/markerActions';

class AddMarker extends Component{

    
    deleteMarker(ele){
        this.props.dispatch(deleteMarker(ele));
        this.clearMarker(ele);
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllMarkers(res.data));
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
                <div className="place">{placeObject.location}</div>
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