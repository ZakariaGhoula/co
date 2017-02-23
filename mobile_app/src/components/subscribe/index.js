import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,Dimensions,TouchableHighlight} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import _                      from 'underscore';
import Storage from 'react-native-storage'
import Icon from 'react-native-vector-icons/Ionicons';

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import Email from './email';
import Name from './name';
import Password from './password';
class Subscribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            last_name: '',
            first_name: '',
            password: "",
            to_show: 1
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }


    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Subscribe Page');
    }
    componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {

        if (nextState.to_show == 4 && !nextProps.isRequesting && nextState.password.length > 0 && nextProps.token == null) {
            var data_send = {
                email: this.state.email,
                password: nextState.password,
                password_confirmation: nextState.password,
                last_name: this.state.last_name.trim(),
                first_name: this.state.first_name.trim(),

            }
            this.setState({to_show: 5})
            this.props.actions.subscribeUser(data_send);
        }
        else if (nextState.to_show == 4 && !nextProps.isRequesting && nextProps.form_skiped == null && nextProps.token == null)
        {

            this.setState({to_show: 3})
        }

        else if (nextState.to_show == 5 && !nextProps.isRequesting && nextProps.token !== null && nextProps.form_skiped !== null && nextProps.form_skiped == 0) {
             Actions.nextForm();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.to_show !== nextState.to_show
            || this.state.last_name !== nextState.last_name
            || this.state.email !== nextState.email
            || this.state.password !== nextState.password
            || this.state.first_name !== nextState.first_name
            || this.props.token !== nextState.token
            || this.props.form_skiped !== nextState.form_skiped

        );
    }

    handleNext(next) {
        this.setState({to_show: next});
    }

    handleEmail(email) {
        this.setState({to_show: 2, email: email});
    }

    handlePassword(password) {

        this.setState({to_show: 4, password: password});
    }

    handleName(last_name, first_name) {
        this.setState({to_show: 3, last_name: last_name, first_name: first_name});
    }

    handlePrev(prev) {
        this.setState({to_show: prev});
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

        var data_to_show = null;
        if (this.state.to_show == 1) {
            data_to_show = <Email email={this.state.email} handleEmail={this.handleEmail.bind(this)}/>
        }
        else if (this.state.to_show == 2) {
            data_to_show = <Name handlePrev={this.handlePrev.bind(this)}
                                 handleName={this.handleName.bind(this)}
                                 first_name={this.state.first_name}
                                 last_name={this.state.last_name}/>
        } else if (this.state.to_show == 3) {
            data_to_show = <Password handlePrev={this.handlePrev.bind(this)}
                                     handlePassword={this.handlePassword.bind(this)}/>
        }
        return (


            <View style={styles.bg}>
                <Image source={require('image!./../../img/login/back.png')}
                       style={{flex:1,width:null,height:null,padding:padding}}>

                    <View style={{flex:1,backgroundColor:"#ebe1de",opacity:0.95}}>
                        <View style={styles.view_logo}>
                            <Image source={require('image!./../../img/login/logo.png')}/>
                        </View>
                        {this.state.to_show == 1 &&
                        <TouchableHighlight
                            underlayColor='transparent'
                            onPress={()=> (Actions.login())}
                            style={{position:"absolute",backgroundColor:"transparent",top:30,left:20}}>
                            <Image source={require('image!./../../img/subscribe/back.png')}/>
                        </TouchableHighlight>
                        }
                        {data_to_show}
                    </View>
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
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
