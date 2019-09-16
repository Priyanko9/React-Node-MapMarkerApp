import axios from "axios";
import {GEO_CODE_URL,GEOCODE_ACCESS_TOKEN} from '../util/constant';
import {SAVE_MARKERS,GET_LATLONGS,ERROR,CLEAR_ERROR,SAVE_STATUS,SAVE_MAP,NOTIFY} from './actionTypes';

//save the markers array to the store
export function saveMarkers(markers){
    return {
        markers,type:SAVE_MARKERS
    }
}
//get all the latlongs series and save it to the store
export function getAllLatLongs(latLongs){
    return {type:GET_LATLONGS,latLongs}
}

export function notifyError(error){
    return {
        type:ERROR,
        error
    }
}

export function clearError(){
    return {
        type:CLEAR_ERROR,
    }
}

export function addStatus(status,elementToEdit){
    return {
        status,
        elementToEdit,
        type:SAVE_STATUS
    }
}

export function saveMap(map){
    return {
        map,
        type:SAVE_MAP
    }
}

export function notification(message){
    return {
        type:NOTIFY,
        message
    }
}

// Async Actions
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
//read all the places from the search string
export function getLatLong(place){
    let url=GEO_CODE_URL+'?key='+GEOCODE_ACCESS_TOKEN+'&q='+place+'&format=json'
    return(dispatch)=>{
        return axios.get(url);
    }
}
//read all the available latlongs
export function readMarkers(){
    return(dispatch)=>{
        return axios.get('/marker/getMarkers')
    }
}
//Add a new latlong object to the existing set
export function createMarker(latlongs){
    return(dispatch)=>{
        return axios.post('/marker/addMarker',latlongs)
    }       
}


