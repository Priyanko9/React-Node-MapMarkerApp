import axios from "axios";
import {GEO_CODE_URL,ACCESS_TOKEN} from '../util/constant';

export function readMarkers(){
    return(dispatch)=>{
        return axios.get('/marker/getMarkers')
    }
}

export function createMarker(latlongs){
    return(dispatch)=>{
        return axios.post('/marker/addMarker',latlongs)
    }       
}
export function saveMarkers(markers){
    return {
        markers,type:"saveMarkers"
    }
}
export function getAllLatLongs(latLongs){
    return {type:"getAllLatLongs",latLongs}
}
export function editMarker(latlongs){
    return(dispatch)=>{
        axios.put('/marker/editMarker',latlongs).then((res)=>{
            dispatch(notification("marker edited successfully"));
        })
    }      
}

export function deleteMarker(latlongs){
    return(dispatch)=>{
        axios.delete('/marker/deleteMarker',{data:latlongs}).then((res)=>{
            dispatch(notification("marker deleted successfully"));
        })
    }      
}

export function getLatLong(place){
    let url=GEO_CODE_URL+'?key='+ACCESS_TOKEN+'&q='+place+'&format=json'
    return(dispatch)=>{
        return axios.get(url);
    }
}

export function addStatus(status,elementToEdit){
    return {
        status,
        elementToEdit,
        type:"saveStatus"
    }
}

export function saveMap(map){
    return {
        map,
        type:"saveMap"
    }
}

export function notification(message){
    return {
        type:"Notification",
        message
    }
}

