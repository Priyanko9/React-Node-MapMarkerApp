import React,{Component} from 'react';
import '../App.css';
import Map from '../util/map';
import { connect } from 'react-redux';
import {MAP_OPTIONS} from '../util/constant';
import {readMarkers,saveMarkers,saveMap,addStatus,getAllMarkers} from '../actions/markerActions';
import AddMarker from './AddMarkers';
import EditDelete from './EditDelete';
class Marker extends Component{

    constructor(props){
        super(props)
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllMarkers(res.data));
            this.props.dispatch(addStatus("display"));
            this.addMarker(this.props.map);
        });
    }
    
    newMarker(map,lat,lng){
        if(window.google){
            return new window.google.maps.Marker({
                    position: { lat,lng },
                    map: map
                })
        }
    }
    
    addMarker=(map,latlongsArray)=>{
        let latLongs=latlongsArray||this.props.latLongsArray;
        let markers=[];
        if(latLongs){
            for(let ele of latLongs){
                const markerEle= this.newMarker(map,Number(ele.lat),Number(ele.long));
                markers.push(markerEle);
            }
        }
        if(!this.props.map){
            this.props.dispatch(saveMap(map));
        }
        this.props.dispatch(saveMarkers(markers));
    }
    
    render(){
        return(
            <div className="marker">
                <Map
                    id="markerMap"
                    options={MAP_OPTIONS}
                    onMapLoad={(map)=>this.addMarker(map)}
                />
                <div className="markerPane">
                    {this.props.status==="add" && <AddMarker addMarkerProp={this.addMarker} elementToEdit={this.props.elementToEdit}/>}
                    {this.props.status==="display" && 
                    <div className="displayList">
                        <div>
                            <button className="addMarker" onClick={(e)=>this.props.dispatch(addStatus("add"))}>Add Marker</button>
                        </div>
                        <div className="markersList">
                            {this.props.latLongsArray && this.props.latLongsArray.map((ele,index)=>{
                                return(
                                    <div key={index}>
                                        <EditDelete placeObject={ele}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
} 

const mapStateToProps=(state)=>{
    return {...state}
}

export default connect(mapStateToProps)(Marker);