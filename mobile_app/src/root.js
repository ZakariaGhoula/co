import React, { Component } from 'react';
import {Text} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configurestore';

const store = configureStore();
import App from './containers/app'


class Root extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <Provider store={store}>
             <App/>
            </Provider>
        )
    }
}

export default Root