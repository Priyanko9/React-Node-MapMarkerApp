import React from 'react';
import {shallow,mount} from 'enzyme';
import moxios from 'moxios';
import Map from './Map';
import MAP_OPTIONS from '../util/constant';
import {findByTestAtrr} from '../util/helpers';


const setUp=(props={})=>{
  const wrapper=shallow(<Map {...props}/>);
  return wrapper;
};

describe('Map Component',()=>{

    let props;
    let onMapLoad=jest.fn().mockImplementation((map)=>{});
    let id="markerMap";
    let options=MAP_OPTIONS;
    

  beforeEach(()=>{
    props={
        onMapLoad,id,options
    };
  })

  it('Should render when google map is not loaded', () => {
    let dummyScript=document.createElement("script");
    document.body.appendChild(dummyScript);
    const wrapper=mount(<Map {...props}/>);
    //wrapper.getDOMNode().findByTestAtrr()
    const component=findByTestAtrr(wrapper,"mapComponent");
    expect(component.length).toBe(1);
  });
  it('Should render when google map is loaded', () => {
    window.google={
      maps:{
          Map:function(domElement,optionObject){
              this.domElement=domElement;
              this.optionObject=optionObject;
          }
      }
  };
    let dummyScript=document.createElement("script");
    document.body.appendChild(dummyScript);
    const wrapper=mount(<Map {...props}/>);
    const callback=onMapLoad.mock.calls.length;
    expect(callback).toBe(1);
  });

})

