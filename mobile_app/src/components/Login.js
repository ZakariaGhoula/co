import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions} from 'react-native';
import {APIRoot} from './../constants/config_path';
import {Actions} from 'react-native-redux-router';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../actions/SessionActions';
import { connect }            from 'react-redux';
import _                      from 'underscore';
import Storage from 'react-native-storage';
import Button from './login/Button';
import ButtonFb from './login/ButtonFb';

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isValidEmail: false,
            password: '',
            isValidPasswd: false,
        }
    }


    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Login Page');

    } componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (false)
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
            view_logo: {
                marginTop: margin_top_logo,
                marginBottom: margin_bottom_logo,
                alignItems: "center",
                justifyContent: 'center'
            },
            view_button: {
                alignItems: "center",
                justifyContent: 'center'
            }

        });


        return (


            <View style={styles.bg}>
                <Image source={require('image!./../../img/login/back.png')}
                       style={{flex:1,width:null,height:null,padding:padding}}>

                    <ScrollView style={{flex:1,backgroundColor:"#ebe1de",opacity:0.95}}>
                        <View style={styles.view_logo}>
                            <Image source={require('image!./../../img/login/logo.png')}/>
                        </View>
                        <View style={styles.view_button}>
                            <Button title="J'ai déja un compte" block_to_show={1}/>
                            <ButtonFb title="Poursuivre avec Facebook"  />
                            <Button title="S'inscrire" block_to_show={2}/>
                        </View>

                    </ScrollView>
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
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
