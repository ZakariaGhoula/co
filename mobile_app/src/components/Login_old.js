import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Navigator,AlertIOS} from 'react-native';
import {APIRoot} from './../constants/config_path';
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    GraphRequest,GraphRequestManager
    } = FBSDK;
/*
import {LoginButton,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
*/import {Actions} from 'react-native-redux-router';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../actions/SessionActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';
import FormSubscribe from './FormSubscribe';
import _                      from 'underscore';

import Storage from 'react-native-storage';
import Newsfeed from './newsfeed/Newsfeed';
import Icon from 'react-native-vector-icons/FontAwesome';
var {FBLogin,FBLoginManager} = require('react-native-facebook-login');
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.facebookLogin = this.facebookLogin.bind(this);
        this.responseInfoCallback = this.responseInfoCallback.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
        this.handleConnexion = this.handleConnexion.bind(this);
        this.state = {
            email: '',
            isValidEmail: false,
            password: '',
            isValidPasswd: false,
        }
    }


    responseInfoCallback(error2, result2) {
        if (error2) {
            alert('Error fetching data: ' + error2.toString());
        } else {
            var data_send = {
                email: result2.email,
                gender: result2.gender,
                last_name: result2.last_name,
                first_name: result2.first_name,
                locale: result2.locale,
                provider: 'facebook',
                uid: result2.id
            }


            this.props.actions.loginFbUser(data_send);

        }
    }

    componentDidMount() {


        global.storage.load({
            key: 'loginState',
        }).then(ret => {
                // found data goes to then()
                console.log(ret);

                if (ret.token !== null && ret.userid != null) {

                    this.props.actions.reconnect(ret.token, ret.userid, ret.form_skiped);
                    if (ret.form_skiped == 1) {

                        Actions.seasonproducts();
                    }
                    else if (ret.form_skiped == 0) {

                        Actions.formSubscribe();
                    }
                }

            }
        ).catch(err => {
            // any exception including data not found
            // goes to catch()
            //console.warn(err);
        });

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.token == null && nextProps.statusText !== null){
          /*  AlertIOS.alert(
                'Connexion',
                nextProps.statusText,null
            );
            alert('ok');
            console.log(nextProps.statusText);*/
        }
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
            Actions.formSubscribe();
            /*            nextProps.navigator.push({
             component: FormSubscribe,
             type: 'default_img',
             });
             */
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

            Actions.seasonproducts();
            //Actions.updaterecipe({id_recipe:27});
            //Actions.settingpassword();
            //Actions.myprofile();
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.token !== this.props.token
        || nextProps.statusText !== this.props.statusText
        || nextState.email !== this.state.email
        || nextState.isValidEmail !== this.state.isValidEmail
        || nextState.password !== this.state.password
        || nextState.isValidPasswd !== this.state.isValidPasswd)
    }


    facebookLogin(e, r) {
        alert('ok');

        var infoRequest = new GraphRequest(
            '/v2.6/me?fields=id,name,email,first_name,last_name,locale,location,birthday,age_range,gender',
            null,
            this.responseInfoCallback.bind(this)
        );

        //      new GraphRequestManager().addRequest(infoRequest).start();
        /*
         LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
         function (result) {
         if (result.isCancelled) {
         alert('Login cancelled');
         } else {

         }
         },
         function (error) {
         alert('Login fail with error: ' + error);
         }
         );
         /*
         LoginManager.logInWithReadPermissions(['public_profile']).then(
         function(result) {
         if (result.isCancelled) {
         alert('Login was cancelled');
         } else {
         alert('Login was successful with permissions: '
         + result.grantedPermissions.toString());
         }
         },
         function(error) {
         alert('Login failed with error: ' + error);
         }
         );*/
         FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
            if (!error) {
                console.log("Login data: ", data);
                new GraphRequestManager().addRequest(infoRequest).start();
            } else {
                console.log("Error: ", data);
            }
        })

        /*
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    alert('Login success with permissions: '
                        +result.grantedPermissions.toString());
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );*/


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

    handleConnexion(event) {
        if (this.state.isValidEmail && this.state.isValidPasswd) {

            this.props.actions.loginUser(this.state.email, this.state.password);
        }

    }

    render() {
        var rightButtonConfig = {
            title: "Mes recettes",
            tintColor: '#fff',

            handler: function onNext() {
                alert('Mode Hors ligne (en dev)')
            }
        };

        var titleConfig = {
            title: 'Hello, world',
        };

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#ccd1b5',


            },
            view: {
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 20,
                paddingTop: 20,

                /* bottom: 0,
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,*/
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
                height: 36,
                marginBottom: 40,
                borderColor: '#000',
                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#ccd1b5',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                borderWidth: 1
            }, secondViewFacebook: {
                height: 34,
                marginBottom: 20,
                borderColor: '#000',
                flexDirection: 'row',
                position: 'relative',
                /*backgroundColor: '#2d609b',
                 */backgroundColor: '#ccd1b5',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,

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
                marginBottom: 20,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#ccd1b5',
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30
            },
            viewSignup: {
                height: 36,
                marginBottom: 20,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: '#ccd1b5',
                borderColor: "#000",
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30
            },
            textLogin: {
                fontSize: 13,
                color: '#fff'
            }, textSignup: {
                fontSize: 13,
                color: '#000'
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
        var tickEmail = null;

        if (this.state.isValidEmail) {
            tickEmail = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;

        }
        var tickPass = null;

        if (this.state.isValidPasswd) {
            tickPass = <Image source={require('./../../img/login/tick.png')} style={{marginTop:15,marginLeft:8}}/>;
        }


        return (


            <View style={styles.bg}>
                <Image source={require('image!./../../img/login/back.png')}
                       style={{flex:1,width:null,height:null}}>
                    <View style={styles.view}>
                        <View style={{ flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',marginBottom:40}}>
                            <Image
                                source={require('./../../img/logo/cookout-full.png')}
                            />
                        </View>
                        <TouchableHighlight style={styles.viewSignup} underlayColor='#ccd1b5'
                                            onPress={Actions.subscribe}>
                            <Text style={styles.textSignup}>
                                S'inscrire
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.viewFacebook} underlayColor='#ccd1b5'
                                            onPress={this.facebookLogin.bind(this)}>
                            <View style={styles.secondViewFacebook}>
                                <Icon name="facebook" size={18} style={{marginRight:6}} color="#000"/>


                                <Text style={{color:'#000',fontSize:13}}> Poursuivre avec Facebook
                            </Text>
                            </View>
                        </TouchableHighlight>

                        {this.props.statusText!=null && this.props.statusText!="Vous avez été correctement déconnecté" &&
                            <View style={{ height: 50,
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'}}>
                        <Text style={{flex:1,textAlign:"center",color:"red"}}>{ this.props.statusText}</Text>
                                </View>
                        }

                        <View style={styles.viewInput}>
                            <Image source={require('./../../img/login/email.png')} style={{marginTop:15,marginLeft:8}}/>
                            <TextInput
                                autoCorrect={false}
                                ref="email"
                                onChangeText={this.handleEmailChange.bind(this)}
                                keyboardType="email-address"
                                placeholder="E-mail"
                                placeholderTextColor="#FFFFFF"
                                style={styles.textInput}
                            />
                            {tickEmail}
                        </View>
                        <View style={styles.viewInput}>
                            <Image source={require('./../../img/login/passwd.png')}
                                   style={{marginTop:10,marginLeft:10}}/>


                            <TextInput
                                autoCorrect={false}
                                ref="password"
                                onChangeText={this.handlePasswdChange.bind(this)}
                                secureTextEntry={true}
                                placeholder="Mot de passe"
                                placeholderTextColor="#FFFFFF"
                                style={styles.textInput}
                            />

                            {tickPass}
                        </View>

                        <TouchableHighlight style={styles.viewLogin} underlayColor='#ccd1b5'
                                            onPress={this.handleConnexion.bind(this)}>
                            <Text style={styles.textLogin}>
                                Se connecter
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.viewLogin} underlayColor='#ccd1b5'
                                            onPress={Actions.myoffrecipes}>
                            <Text style={styles.textLogin}>
                                Mon Cookbook
                            </Text>
                        </TouchableHighlight>

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
    activated: state.session.activated,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
