import React from 'react';
import {shallow} from 'enzyme';
import {TestAddMarker} from './AddMarkers';
import {findByTestAtrr,testStore} from '../util/helpers';


const setUp=(props={})=>{
  const wrapper=shallow(<TestAddMarker {...props}/>);
  return wrapper;
};

describe('App Component',()=>{

  let mockgetLatLongAction;
  let mockNotification;
  let props;
    
  it('Should render without errors', () => {
    const wrapper = setUp();
    const component = findByTestAtrr(wrapper, 'addMarkerComponent');
    expect(component.length).toBe(1);
  });
  it('Simulate Click event for searchButton and checking the resolved promise', () => {
    mockgetLatLongAction=jest.fn().mockImplementation((place)=>{
        return Promise.resolve({
          data:[{
            lat:"22",
            lon:"88",
            display_name:"abc",
          }]
      });
    })
    
    const mockClearError=jest.fn();
    const mockNotifyError=jest.fn();
    props={getLatLong:mockgetLatLongAction,
      clearError:mockClearError,
      notifyError:mockNotifyError};
    const wrapper=setUp(props);
    let addMarkerInstance=wrapper.instance();
    addMarkerInstance.setState({location:"delhi"});
    const component = findByTestAtrr(wrapper, 'searchButton');
    component.simulate('click');
    const callback = mockgetLatLongAction.mock.calls.length;
    expect(callback).toBe(1);
  });
  it('Simulate Click event for searchButton and checking the rejected promise', () => {
    mockgetLatLongAction=jest.fn().mockImplementation((place)=>Promise.reject({response:{status:404}}));
    mockNotification=jest.fn();
    const mockClearError=jest.fn();
    const mockNotifyError=jest.fn();
    props={notification:mockNotification,
      getLatLong:mockgetLatLongAction,
      clearError:mockClearError,
      notifyError:mockNotifyError
    };
    const wrapper=setUp(props);
    let addMarkerInstance=wrapper.instance();
    addMarkerInstance.setState({location:"delhi"});
    const component = findByTestAtrr(wrapper, 'searchButton');
    component.simulate('click');
    wrapper.update();
    let newInstance=wrapper.instance();
    const callback = mockNotifyError.mock.calls.length;
    expect(newInstance.state.searchResults.length).toBe(0);
  });
  it('Simulate Click event for searchButton and checking empty location input text', () => {
    mockgetLatLongAction=jest.fn();
    const mockClearError=jest.fn();
    const mockNotifyError=jest.fn();
    props={
      clearError:mockClearError,
      notifyError:mockNotifyError
    };
    const wrapper=setUp(props);
    let addMarkerInstance=wrapper.instance();
    addMarkerInstance.setState({location:""});
    const component = findByTestAtrr(wrapper, 'searchButton');
    component.simulate('click');
    const callback = mockNotifyError.mock.calls.length;
    expect(callback).toBe(1);
  });
  it('Simulate Change event for the location input', () => {
    const wrapper=setUp();
    const instance=wrapper.instance();
    const component = findByTestAtrr(wrapper, 'locationInput');
    component.simulate('change',{target:{value:9}});
    expect(instance.state.location).toBe(9);
  });
  it('executing clearAllMarkers Method', () => {
    const setMapMock=jest.fn();
    props={
      markers:[{
        setMap:setMapMock
      }]
    };
    const wrapper=setUp(props);
    const classInstance = wrapper.instance();
    classInstance.clearAllMarkers();
    const callback = setMapMock.mock.calls.length;
    expect(callback).toBe(1);
  });
  it('Simulate Click event for the addToMap button', () => {
    const mockAddStatus=jest.fn().mockImplementation(status=>{});
    const mockCreateMarker=jest.fn().mockImplementation((selectedlatlongs)=>{
        return Promise.resolve({});
    })
    const mockReadMarkers=jest.fn().mockImplementation((place)=>{
        return Promise.resolve({
          data:[{
            lat:"22",
            long:"88",
            location:"abc",
            edit:false
          }]
      });
    })
    props={
      createMarker:mockCreateMarker,
      readMarkers:mockReadMarkers,
      status:"add",
      addStatus:mockAddStatus,
      notification:jest.fn(),
      addMarkerProp:jest.fn(),
      getAllLatLongs:jest.fn(),
      markers:[{
        setMap:jest.fn()
      }],
      saveMarkers:jest.fn(),
      map:{
        setCenter:jest.fn().mockImplementation((lat,lng)=>{})
      }
    };
    const searchResults=[{
      lat:"22",
      long:"88",
      location:"abc",
      edit:false
    }]
    const wrapper=setUp(props);
    wrapper.instance().setState({searchResults});
    const component = findByTestAtrr(wrapper, 'addToMap');
    component.simulate('click');
    const callback = mockCreateMarker.mock.calls.length;
    expect(callback).toBe(1);
  });
  it('Simulate Click event for the showMarkedPlaces button', () => {
    const mockAddStatus=jest.fn();
    const mockClearError=jest.fn();
    props={
      addStatus:mockAddStatus,
      clearError:mockClearError
    };
    const wrapper=setUp(props);
    const component = findByTestAtrr(wrapper, 'showMarkedPlaces');
    component.simulate('click');
    const callback = mockAddStatus.mock.calls.length;
    expect(callback).toBe(1);
  });
})

