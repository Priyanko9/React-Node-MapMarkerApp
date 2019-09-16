import moxios from 'moxios';
import {readMarkers,createMarker,editMarker,
    deleteMarker,getLatLong,getAllLatLongs,
    saveMarkers,saveMap,notification,addStatus,notifyError,clearError} from './markerActions';
import {testStore} from '../util/helpers';
import Axios from 'axios';
import { equal } from 'assert';

describe('Marker Action', () => {
    
    const store=testStore();
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('readMarkers Action', () => {
        const expectedState = [{
            data:[{
              lat:"22",
              long:"88",
              location:"abc",
              edit:false
            }]
        }];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(readMarkers())
        .then((response) => {
            //const newState = store.getState();
            expect(response.data).toBe(expectedState);
        })
        
    });
    it('create Marker Action', () => {

      const id ="S1000"; 
      const latlongObject = {
          lat:"23",
          long:"89",
          location:"et",
          edit:false
      };
      const expectedState = [{
            data:[{
                lat:"23",
                long:"89",
                location:"et",
                edit:false
            }]
        }];

      moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
              status: 200
          }).then((res)=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
          })
      });

      return store.dispatch(createMarker(latlongObject))
      .then((res) => {
        return store.dispatch(readMarkers())
        .then((response) => {
            //const newState = store.getState();
            expect(response.data).toBe(expectedState);
        })
      })
    });
    it('edit Marker Action', () => {
        const latlong = {
            lat:"23",
            long:"89",
            location:"et",
            edit:false
        };

        moxios.withMock(function(){
            let onFulfilled=jest.fn();
            Axios.put('/marker/editMarker',latlong).then(onFulfilled);
            moxios.wait(function(){
                let request=moxios.requests.mostRecent();
                request.respondWith({
                    status:200
                }).then(()=>{
                    equal(onFulfilled.called,true)
                    store.dispatch(notification("marker edited"));
                    expect(store.getState().message).toBe("marker edited");
                    done()
                })
            })
        });
        store.dispatch(editMarker(latlong));
    });
    it('delete Marker Action', () => {
        const latlong = {
            lat:"23",
            long:"89",
            location:"et",
            edit:false
        };
            moxios.withMock(function(){
                let onFulfilled=jest.fn();
                Axios.put('/marker/deleteMarker',{data:latlong}).then(onFulfilled);
                moxios.wait(function(){
                    let request=moxios.requests.mostRecent();
                    request.respondWith({
                        status:200
                    }).then(()=>{
                        equal(onFulfilled.called,true)
                        store.dispatch(notification("marker deleted"));
                        expect(store.getState().message).toBe("marker deleted");
                        done()
                    })
                })
            });
            store.dispatch(deleteMarker(latlong));
    });  
    it('getLatLong for a particular place Action', () => {

        const expectedState = [{
            data:[{
                lat:"22",
                lon:"88",
                display_name:"delhi",
            }]
        }];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(getLatLong("delhi"))
        .then((response) => {
            expect(response.data).toBe(expectedState.data);
        })
        
    });
    it('save markers Action',()=>{
        let markers=[{map:"1"}]
        store.dispatch(saveMarkers(markers));
        let state=store.getState();
        expect(state.markers).toBe(markers);
    })
    it('getAllLatLongs Array Action',()=>{
        let latlongs=[{
            lat:"22",
            long:"88",
            location:"abc",
            edit:false
          }]
          store.dispatch(getAllLatLongs(latlongs));
          let state=store.getState();
        expect(state.latLongsArray).toBe(latlongs);
    })
    it('add Status Action',()=>{
        let latlong={
            lat:"22",
            long:"88",
            location:"abc",
            edit:false
          }
          store.dispatch(addStatus("add",latlong));
        let status=store.getState().status;
        expect(status).toBe("add");
    })
    it('Saving the map instance action',()=>{
        let map={
            setCenter:(lat,long)=>{}
          }
          store.dispatch(saveMap(map));
        let statemap=store.getState().map;
        expect(statemap).toBe(map);
    })
    it('notification Action',()=>{
        let message="actions test";
        store.dispatch(notification(message));
        let stateMessage=store.getState().message;
        expect(stateMessage).toBe(message);
    })
    it('notifyError action',()=>{
        let error="error";
        store.dispatch(notifyError(error));
        let stateError=store.getState().error;
        expect(stateError).toBe(error);
    })
    it('clearError Action',()=>{
        store.dispatch(clearError());
        let stateError=store.getState().error;
        expect(stateError).toBeUndefined();
    })
});
