import React, {Component} from 'react';
import {View, Image, StyleSheet,Dimensions} from 'react-native';
import {APIRoot} from './../constants/config_path';
import {Actions} from 'react-native-redux-router';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {bindActionCreators} from 'redux';
import * as SessionActions    from './../actions/SessionActions';

import * as NewsfeedActions    from './../actions/NewsfeedActions';
import {connect}            from 'react-redux';
import _                      from 'underscore';

import Loading from './default/Loading'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class Start extends React.Component {
    constructor(props) {
        super(props)


    }


    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Start Page');

    }

    componentDidMount() {


        global.storage.load({
            key: 'loginState',
        }).then(ret => {
                // found data goes to then()
                // console.log(ret);

                if (ret.token !== null && ret.userid != null) {

                    this.props.actions.reconnect(ret.token, ret.userid, ret.form_skiped);
                    if (ret.form_skiped == 1) {

                        Actions.moncookout();
                        //Actions.newsfeed();
                        // Actions.thecookout({id_user_external:17});
                    }
                    else if (ret.form_skiped == 0) {

                        Actions.nextForm();
                    }
                    else {

                    }
                }

            }
        ).catch(err => {
            Actions.login();

        });
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.token !== null && nextProps.form_skiped !== null && nextProps.form_skiped == 0) {
            storage.save({
                key: 'loginState',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    userid: nextProps.user_id,
                    token: nextProps.token,
                    form_skiped: 0
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });
            Actions.nextForm();
        }
        if (nextProps.token !== null && nextProps.form_skiped !== null && nextProps.form_skiped == 1) {
            storage.save({
                key: 'loginState',   // Note: Do not use underscore("_") in key!
                rawData: {
                    from: 'Cookout',
                    userid: nextProps.user_id,
                    token: nextProps.token,
                    form_skiped: 1
                },

                // if not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: null
            });

            Actions.moncookout();


        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.token !== this.props.token
        || nextProps.newsfeed_team !== this.props.newsfeed_team
        || nextProps.statusText !== this.props.statusText )
    }


    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) / 2);
        var margin_top_logo = height * 0.15;
        var margin_bottom_logo = height * 0.12;

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#ccd1b5',


            },
        });


        return (
            <View  style={{flex:1}}>
                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex:1,width:null,
                           justifyContent:'center',height:null,padding:padding}}>
                    <Loading/>
                </Image>

            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    user_id: state.session.user_id,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    activated: state.session.activated,

    newsfeed_team: state.newsfeed.newsfeed_team,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_newsfeed: bindActionCreators(NewsfeedActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
