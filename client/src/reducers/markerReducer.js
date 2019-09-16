import {SAVE_MARKERS,GET_LATLONGS,ERROR,CLEAR_ERROR,SAVE_STATUS,SAVE_MAP,NOTIFY} from '../actions/actionTypes';

let initialState={};
export default function markerReducer(state=initialState,action){
    switch(action.type){
        case GET_LATLONGS:
            return {
                ...state,
                latLongsArray:action.latLongs
            };
        case SAVE_MARKERS:
            return {
                ...state,
                markers:action.markers
            };     
        case NOTIFY:
            return {
                ...state,
                message:action.message
            }; 
        case SAVE_STATUS:
            return {
                ...state,
                status:action.status,
                elementToEdit:action.elementToEdit
            }; 
        case SAVE_MAP:
            return {
                ...state,
                map:action.map
            };  
        case ERROR:
            return {
                ...state,
                error:action.error,
            };
        case CLEAR_ERROR:
            delete state.error;
            return {...state}                 
        default: return state;       
    }
}
