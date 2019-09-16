import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import {findByTestAtrr} from './util/helpers';

const setUp=(props={})=>{
  const wrapper=shallow(<App {...props}/>);
  return wrapper;
}

describe('App Component',()=>{
  
  it('renders without crashing', () => {
    const wrapper = setUp();
    const component = findByTestAtrr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });
})

