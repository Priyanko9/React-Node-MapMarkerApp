import React,{Component} from 'react';
import {deleteMarker,readMarkers,getAllMarkers,editMarker} from '../actions/markerActions';

class AddMarker extends Component{

    deleteMarker(e,ele){
        this.props.dispatch(deleteMarker(ele));
        this.clearMarkers(ele);
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllMarkers(res.data));
        });
    }
    clearMarkers(selectedElement){
        let {latLongsArray,markers}=this.props;
        latLongsArray.forEach((ele,index)=>{
            if(ele.location===selectedElement.location){
                markers[index].setMap(null);
            } 
       })
    }
    editMarker(e,latLongElement){
        latLongElement.edit=true;
        let {latLongsArray}=this.props;
        latLongsArray=latLongsArray.map((ele,index)=>{
            if(ele.location===latLongElement.location){
                ele.edit=true;
            } else{
                ele.edit=false;
            }
            return ele
       })
       this.props.dispatch(editMarker(latLongElement));
       this.props.dispatch(addStatus("add"));
    }
    render(){
        let {placeObject}=this.props;
        return(
            <div className="addMarker">
                <div className="place">{placeObject.location}</div>
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