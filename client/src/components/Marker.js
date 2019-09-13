import React,{Component} from 'react';
import '../App.css';
import Map from '../util/map';
import { connect } from 'react-redux';
import {MAP_OPTIONS} from '../util/constant';
import {readMarkers,saveMarkers,getAllMarkers} from '../actions/markerActions';
import AddMarker from './AddMarkers';
import EditDelete from './EditDelete';
class Marker extends Component{

    constructor(props){
        super(props)
        this.props.dispatch(readMarkers()).then((res)=>{
            this.props.dispatch(getAllMarkers(res.data));
            this.addMarker();
        });
    }
    
    markers(map,lat,lng){
        if(window.google){
            return new window.google.maps.Marker({
                    position: { lat,lng },
                    map: map
                })
        }
    }
    
    addMarker(map,latlongsArray){
        let latLongs=latlongsArray||this.props.latlongsArray;
        let markers=[];
        if(latLongs){
            for(let ele of latLongs){
                const markerEle= this.markers(map,Number(ele.lat),Number(ele.long));
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
                    {this.props.status==="add" && <AddMarker addMarker={this.addMarker}/>}
                    {this.props.status==="display" && 
                    <div className="displayList">
                        <div>
                            <button className="addMarker" onClick={(e)=>this.props.dispatch(addStatus("add"))}>Add Marker</button>
                        </div>
                        <div className="markersList">
                            {this.props.latLongsArray && this.props.latLongsArray.map((ele)=>{
                                return(
                                    <div key={ele.location}>
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