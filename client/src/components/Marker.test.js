import React from 'react';
import {shallow} from 'enzyme';
import {TestMarker} from './Marker';
import {findByTestAtrr} from '../util/helpers';


const setUp=(props={})=>{
  const wrapper=shallow(<TestMarker {...props}/>);
  return wrapper;
};

describe('App Component',()=>{

  let props;
  let mockReadMarkers;
  let mockAddStatus;
  let mockSaveMap;
  let latLongsArray;
  beforeEach(()=>{
    const mockSaveMarkers=jest.fn();
    const mockDeleteMarker=jest.fn();
    const mockGetAllLatLongs=jest.fn();
    const mockEditMarker=jest.fn();
    mockSaveMap=jest.fn().mockImplementation((map)=>{
        props.map=map
    });
    mockAddStatus=jest.fn();
    mockReadMarkers=jest.fn().mockImplementation((place)=>{
        return Promise.resolve({
          data:[{
            lat:"22",
            lon:"88",
            display_name:"abc",
            edit:false
          }]
      });
    });
     latLongsArray=[{
        lat:"22",
        lon:"88",
        location:"abc",
        edit:false
      }];
      const placeObject={
          lat:"22",
          lon:"88",
          location:"abc",
          edit:false
      }
      const map={
          setCenter:jest.fn()
      };
      const markers=[{dummy:true,setMap:(obj)=>{}}];
      window.google={
        maps:{
            InfoWindow:function(obj){
                this.open=(map,marker)=>{};
                this.close=()=>{};
            },
            Marker:function(obj){
                this.position=obj.position;
                this.map=obj.map;
            }
        }
    };
    props={
        latLongsArray,
        placeObject,
        map,
        markers,
        saveMarkers:mockSaveMarkers,
        deleteMarker:mockDeleteMarker,
        readMarkers:mockReadMarkers,
        getAllLatLongs:mockGetAllLatLongs,
        editMarker:mockEditMarker,
        addStatus:mockAddStatus,
        saveMap:mockSaveMap
    };
  })

  it('Should render marker component properly for add marker button only', () => {
    props.status="add";
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, 'markerComponent');
    expect(component.length).toBe(1);
  });
  it('check the addMarker method', () => {
    props.map=undefined;
    const wrapper = setUp(props);
    wrapper.instance().addMarker({},latLongsArray);
    expect(props.map).toBeDefined();
  });
  it('Should render display Markers view without errors', () => {
    props.status="display";
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, 'markerComponent');
    expect(component.length).toBe(1);
  });
  it('simulate click for the addMarkerButton', () => {
    props.status="display";
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, 'addMarkerButton');
    component.simulate('click');
    const callback = mockAddStatus.mock.calls.length;
    expect(callback).toBe(1);
  });
  
})

