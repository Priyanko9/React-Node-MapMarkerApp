import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import markerReducer from '../reducers/markerReducer';

const middlewares = [thunk];

export const testStore =(initialState)=>{
    const createStoreWithMiddlewares=applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddlewares(markerReducer,initialState);
} 

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};