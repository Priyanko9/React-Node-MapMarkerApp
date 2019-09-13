let initialState={};

export default function markerReducer(state=initialState,action){
    switch(action.type){
        case "getAllMarkers":
            return {
                ...state,
                latLongsArray:action.latLongs
            };
        case "setLatLong":
            return {
                ...state,
                latlong:action.latlong
            }; 
        case "saveMarkers":
            return {
                ...state,
                markers:action.markers
            };     
        case "Notification":
            return {
                ...state,
                message:action.message
            }; 
        case "saveStatus":
            return {
                ...state,
                status:action.status
            }; 
        case "saveMap":
            return {
                ...state,
                map:action.map
            };          
        default: return state;       
    }
}
