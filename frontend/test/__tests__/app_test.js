import App from '../../components/app';
import React from 'react';
test('App component', () => {
    const wrapper =shallow(<app/>);
    expect(wrapper).toMatchSnapshot();

});