import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight} from 'react-native';
import {APIRoot} from './../constants/config_path';
import {LoginButton,AccessToken,LoginManager, GraphRequest,
    GraphRequestManager} from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../actions/SessionActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-redux-router';
import _                      from 'underscore';
import Icon from 'react-native-vector-icons/Ionicons';
class Subscribe extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.state = {
            email: '',
            isValidEmail: false,
            password: '',
            isValidPasswd: false,
            lastName: '',
            isValidLastName: false,
            firstName: '',
            isValidFistName: false,
        }
    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.token !== null && nextProps.form_skiped !== null && nextProps.form_skiped == 0) {

            Actions.formSubscribe();
            /*            nextProps.navigator.push({
             component: FormSubscribe,
             type: 'default_img',
             });
             */
        }
        else {

        }
    }

    onPrev() {

            Actions.pop();

    }

    validateEmail(text) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(text);
    }

    isEmpty(value) {
        return !_.isEmpty(value);
    }

    handleEmailChange(text) {
        this.setState({
            email: text,
            isValidEmail: this.validateEmail(text),
        });
    }

    handlePasswdChange(text) {
        this.setState({
            password: text,
            isValidPasswd: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleLastNameChange(text) {
        this.setState({
            lastName: text,
            isValidLastName: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleFirstNameChange(text) {
        this.setState({
            firstName: text,
            isValidFistName: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleSubscribe(event) {
        if (this.state.isValidEmail && this.state.isValidPasswd && this.state.isValidEmail && this.state.isValidPasswd) {
            var data_send = {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password,
                last_name: this.state.lastName.trim(),
                first_name: this.state.firstName.trim(),

            }
            this.props.actions.subscribeUser(data_send);
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (
        nextProps.token !== this.props.token ||
        nextState.email !== this.state.email
        || nextState.isValidEmail !== this.state.isValidEmail
        || nextState.lastName !== this.state.lastName
        || nextState.isValidFistName !== this.state.isValidFistName
        || nextState.firstName !== this.state.firstName
        || nextState.isValidLastName !== this.state.isValidLastName
        || nextState.password !== this.state.password
        || nextState.isValidPasswd !== this.state.isValidPasswd)
    }

    render() {
       /* var leftButtonConfig = {
                title: 'Retour',
                tintColor: '#fff',
                handler: this.onPrev.bind(this)
                //       Actions.login
            }
            ;*/
        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.onPrev.bind(this)}/>)
        var titleConfig = {
            title: "Inscription",
            tintColor: '#000',
            fontSize:13,

        };

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#ccd1b5',
            },
            view: {
                flex: 1,
                position: 'relative',
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 20,
                paddingTop: 20,
            },
            beer: {
                flex: 1,
            },
            text: {
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
            },
            textInput: {
                fontSize: 13,
                height: 40,

                color: 'white',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            }, hr: {
                borderColor: '#838182',
                borderWidth: 1,
            },
            viewInput: {
                borderColor: '#fff',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewFacebook: {
                height: 40,
                marginBottom: 20,

                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 30,
            }, btnFacebook: {
                height: 40,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignSelf: 'stretch',
                alignItems: 'center'


            },
            viewOr: {
                height: 16,
                marginBottom: 20,
                marginTop: 20,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',

            },
            viewLogin: {
                height: 36,
                marginBottom: 40,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#ccd1b5',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 20,

            },
            textLogin: {
                fontSize: 13,
                color: '#fff'
            },
            viewSubscribe: {
                height: 40,
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
                left: 0, right: 0,
                alignSelf: 'center',
                flexDirection: 'row',
            },
            textbtnSubscribe: {
                fontSize: 17,
                position: 'absolute',
                flex: 1,
                color: "#fff",
            },
            btnSubscribe: {}

        });
        var back = APIRoot + "/image/login3.jpg";
//  <Image source={require('./../../img/login3.jpg')} style={styles.bg}>

        var tickEmail = null;
        if (this.state.isValidEmail) {
            tickEmail = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;
        }
        var tickPass = null;
        if (this.state.isValidPasswd) {
            tickPass = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;
        }

        var tickLastName = null;
        if (this.state.isValidLastName) {
            tickLastName = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;
        }
        var tickFirstName = null;
        if (this.state.isValidFistName) {
            tickFirstName = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;
        }
        return (


            <ScrollView style={styles.bg}>
                <NavigationBar
                    tintColor={"#fff"}
                    title={titleConfig}
                    leftButton={leftButtonConfig}/>


                <View style={styles.view}>


                    <View style={styles.viewInput}>
                        <Image source={require('./../../img/login/shape.png')} style={{marginTop:15,marginLeft:8}}/>
                        <TextInput
                            autoCorrect={false}
                            ref="first_name"
                            onChangeText={this.handleFirstNameChange.bind(this)}
                            placeholder="Prénom*"
                            placeholderTextColor="#FFFFFF"
                            style={styles.textInput}
                        />
                        {tickFirstName}
                    </View>
                    <View style={styles.viewInput}>
                        <Image source={require('./../../img/login/shape.png')} style={{marginTop:15,marginLeft:8}}/>
                        <TextInput
                            autoCorrect={false}
                            ref="last_name"
                            onChangeText={this.handleLastNameChange.bind(this)}
                            placeholder="Nom*"
                            placeholderTextColor="#FFFFFF"
                            style={styles.textInput}
                        />

                        {tickLastName}
                    </View>


                    <View style={styles.viewInput}>
                        <Image source={require('./../../img/login/email.png')} style={{marginTop:15,marginLeft:8}}/>
                        <TextInput
                            ref="email"
                            autoCorrect={false}
                            onChangeText={this.handleEmailChange.bind(this)}
                            keyboardType="email-address"
                            placeholder="E-mail*"
                            placeholderTextColor="#FFFFFF"
                            style={styles.textInput}
                        />
                        {tickEmail}
                    </View>
                    <View style={styles.viewInput}>
                        <Image source={require('./../../img/login/passwd.png')} style={{marginTop:10,marginLeft:10}}/>
                        <TextInput
                            autoCorrect={false}
                            ref="password"
                            onChangeText={this.handlePasswdChange.bind(this)}
                            secureTextEntry={true}
                            placeholder="Mot de passe*"
                            placeholderTextColor="#FFFFFF"
                            style={styles.textInput}
                        />
                        {tickPass}
                    </View>
                    <TouchableHighlight style={styles.viewLogin} underlayColor='#ccd1b5' onPress={this.handleSubscribe.bind(this)}>
                        <Text style={styles.textLogin}>
                            S'inscrire
                        </Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    activated: state.session.activated,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
