let initialState={};

export default function markerReducer(state=initialState,action){
    switch(action.type){
        case "getAllLatLongs":
            return {
                ...state,
                latLongsArray:action.latLongs
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
                status:action.status,
                elementToEdit:action.elementToEdit
            }; 
        case "saveMap":
            return {
                ...state,
                map:action.map
            };          
        default: return state;       
    }
}
