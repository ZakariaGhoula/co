import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import LoadingOverlay from 'react-native-loading-overlay';
import _ from "underscore";
import {Actions} from 'react-native-redux-router';
class FormLogin extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
        this.handleConnexion = this.handleConnexion.bind(this);
        this.state = {
            email: '',
            isValidEmail: false,
            password: '',
            isValidPasswd: false,
            connexionPress: false
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.token !== this.props.token
        || nextProps.statusText !== this.props.statusText
        || nextState.email !== this.state.email
        || nextState.isValidEmail !== this.state.isValidEmail
        || nextState.password !== this.state.password
        || nextState.connexionPress !== this.state.connexionPress
        || nextProps.isRequesting !== this.props.isRequesting
        || nextState.isValidPasswd !== this.state.isValidPasswd)
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
            email: text.toLowerCase().trim(),
            isValidEmail: this.validateEmail(text),
        });
    }

    handlePasswdChange(text) {
        this.setState({
            password: text.trim(),
            isValidPasswd: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleConnexion(event) {

        if (this.state.isValidEmail && this.state.isValidPasswd) {
            this.setState({connexionPress: true})
            this.props.actions.loginUser(this.state.email, this.state.password);
        }
        else{

            if (this.validateEmail(this.state.email) && (this.isEmpty(this.state.password) && this.state.password.trim().length > 2)) {
                this.setState({connexionPress: true})
                this.props.actions.loginUser(this.state.email, this.state.password);
            }
        }

    }

    componentWillUpdate(nextProps, nextState) {

        if(nextProps.isAuthenticated){
           Actions.moncookout();
        }
        if (nextState.connexionPress && !nextProps.isRequesting) {

            this.setState({connexionPress: false})
        }
    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var p =( width * 0.1)/2;
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                width:width-(5*p),

                backgroundColor: "transparent"
            },
            viewTextStatut: {
                marginTop:10,
                marginBottom:0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }, textInput: {
                fontSize: 14,
                height: 40,

                color: '#20201e',
                borderWidth: 0,
                paddingLeft: 5,
                textAlign: 'left',
                left: 10,
                top: 0,
                alignSelf: 'stretch',
                flex: 1,
            },
            txt_btn: {
                fontSize: 15,
            },
            viewLogin: {
                height: 36,
                marginBottom: 20,
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: (this.state.connexionPress) ? "#fdaa69" : '#dbd0cd',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 30
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            }

        });


        return (


            <View style={styles.bg}>
                {this.props.statusText != null
                && this.props.statusText != "You have been successfully logged in."
                && this.props.statusText != "Vous avez été correctement déconnecté" &&
                <View style={[styles.viewTextStatut,{flex:1,flexWrap: 'wrap',width:width-(5*p)}]}>
                    <Text style={{flex:1,textAlign:"center",color:"#a91d31"}}>{this.props.statusText}</Text>
                </View>
                }
                {!this.props.isRequesting &&
                <View style={[styles.viewInput,{marginTop:20}]}>
                    <Icon name="ios-mail-outline" size={30} color="#20201e" style={{marginTop:5,marginLeft:8}}/>
                    <TextInput
                        autoCorrect={false}
                        ref="email"
                        value={this.state.email}
                        defaultValue={this.state.email}
                        onChangeText={this.handleEmailChange.bind(this)}
                        keyboardType="email-address"
                        placeholder="Adresse e-mail"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                    />
                </View>
                }
                {!this.props.isRequesting &&
                <View style={[styles.viewInput,{marginTop:5}]}>
                    <Icon name="ios-lock-outline" size={30} color="#20201e" style={{marginTop:5,marginLeft:8}}/>
                    <TextInput
                        autoCorrect={false}
                        ref="password"
                        onChangeText={this.handlePasswdChange.bind(this)}
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                    />
                </View>
                }
                {!this.props.isRequesting &&
                <TouchableHighlight style={styles.viewLogin} underlayColor='transparent'
                                    onPress={this.handleConnexion.bind(this)}>
                    <Text style={styles.textLogin}>
                        Valider
                    </Text>
                </TouchableHighlight>

                }
                {this.props.isRequesting && this.state.connexionPress &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <LoadingOverlay visible={true} text=""/>
                </View>
                }
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    isAuthenticated: state.session.isAuthenticated,
    token: state.session.token,
    user_id: state.session.user_id,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    activated: state.session.activated,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
