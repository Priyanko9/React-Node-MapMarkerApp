import React from 'react';
import {shallow,render} from 'enzyme';
import moxios from 'moxios'
import {TestEditDelete} from './EditDelete';
import {findByTestAtrr} from '../util/helpers';


const setUp=(props={})=>{
  const wrapper=shallow(<TestEditDelete {...props}/>);
  return wrapper;
};

describe('App Component',()=>{

  let props;
  let mockReadMarkers;
  let mockAddStatus;
  beforeEach(()=>{
    const mockSaveMarkers=jest.fn();
    const mockDeleteMarker=jest.fn();
    const mockGetAllLatLongs=jest.fn();
    const mockEditMarker=jest.fn();
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
    })
    const latLongsArray=[{
        lat:"22",
        lon:"88",
        location:"abc",
        edit:false
      }]
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
        window.infowindow={
            close:()=>{},
            open:(map,marker)=>{}
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
        addStatus:mockAddStatus
    };
  })

  it('Should render without errors', () => {
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, 'editDeleteComponent');
    expect(component.length).toBe(1);
  });
  it('Simulate Click for displaying info window', () => {
    
        window.google={
            maps:{
                InfoWindow:function(obj){
                    this.open=(map,marker)=>{};
                    this.close=()=>{};
                }
            }
        };
    
    const wrapper=setUp(props);
    const component = findByTestAtrr(wrapper, 'editDeleteComponent');
    component.simulate('click',{preventDefault:()=>{}});
    const callback = props.map.setCenter;
    expect(callback).toBeCalled();
  });
  it('Simulate Click for delete Marker', () => {
      
    const wrapper=setUp(props);
    const component = findByTestAtrr(wrapper, 'deleteButton');
    component.simulate('click',{stopPropagation:()=>{}});
    const callback = mockReadMarkers.mock.calls.length;
    expect(callback).toBe(1);
  });
  it('Simulate Click for editing Marker', () => {
      
    const wrapper=setUp(props);
    const component = findByTestAtrr(wrapper, 'editButton');
    component.simulate('click',{stopPropagation:()=>{}});
    const callback = mockAddStatus.mock.calls.length;
    expect(callback).toBe(1);
  });
  
})

