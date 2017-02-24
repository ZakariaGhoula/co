import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-redux-router';

import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import {connect}            from 'react-redux';

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;
class SharingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        }
        console.log(this.props.user);
        this._responseInfoCallback = this._responseInfoCallback.bind(this);
        const infoRequest = new GraphRequest(
            '/me/friends?fields=installed',
            null,
            this._responseInfoCallback,
        );
// Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
    }


    _responseInfoCallback(error, result) {
        if (error) {
            console.log('Error fetching data: ' + error.toString());
        } else {
            console.log( result);
        }
    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var w_btn = width - (width * 0.25);

        ;
        return (


            <View style={{flex: 1,}}>
                <Text>Facebook</Text>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    token: state.session.token,
    user_id: state.session.user_id,
    user: state.session.user,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    activated: state.session.activated,
    data_fb: state.session.data_fb,

    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SharingApp);
