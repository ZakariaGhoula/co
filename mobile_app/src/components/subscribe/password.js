import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GiftedSpinner from 'react-native-gifted-spinner';
import _ from "underscore";
export default class Password extends React.Component {
    constructor(props) {
        super(props);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            password: '',
            conf_password: '',
            connexionPress: false,
            isValidPasswd: false,
            isValidConfPasswd: false,
            textToShow: null,
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (  nextState.password !== this.state.password
            || nextState.conf_password !== this.state.conf_password
            || nextState.isValidPasswd !== this.state.isValidPasswd
            || nextState.isValidConfPasswd !== this.state.isValidConfPasswd
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    isEmpty(value) {

        return !_.isEmpty(value);
    }

    handlePasswordChange(text) {
        this.setState({
            password: text,
            isValidPasswd: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleConfPasswordChange(text) {
        this.setState({
            conf_password: text,
            isValidConfPasswd: (this.isEmpty(text) && text.trim().length > 2)
        });
    }

    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.password.toLowerCase().trim().length == 0 && this.state.conf_password.toLowerCase().trim().length == 0) {
            this.setState({textToShow: "Veuillez renseigner un mot de passe et le confirmer."})
        }

        else if (this.state.password.toLowerCase().trim().length <= 2 && this.state.conf_password.toLowerCase().trim().length > 2) {
            this.setState({textToShow: "Veuillez renseigner un mot de passe correct."})
        }
        else if (this.state.password.toLowerCase().trim().length > 2 && this.state.conf_password.toLowerCase().trim().length <= 2) {
            this.setState({textToShow: "Veuillez renseigner la confirmation de mot de passe."})
        }
        else if (this.state.password.toLowerCase().trim().length <= 2 && this.state.conf_password.toLowerCase().trim().length <= 2) {
            this.setState({textToShow: "Veuillez renseigner un mot de passe et le confirmer."})
        }
        else {
            if ((this.isEmpty(this.state.conf_password) && this.state.conf_password.trim().length > 2) && (this.isEmpty(this.state.password) && this.state.password.trim().length > 2) && this.state.password.trim() == this.state.conf_password.trim()) {

                this.props.handlePassword(this.state.password);
            } else if (this.state.isValidConfPasswd && !this.state.isValidPasswd) {
                this.setState({textToShow: "Le mot de passe est incorrecte"})
            } else if (!this.state.isValidConfPasswd && this.state.isValidPasswd || (this.state.isValidConfPasswd && this.state.isValidPasswd && this.state.password.trim() !== this.state.conf_password.trim())) {
                this.setState({textToShow: "La confirmation de mot de passe ne correspond pas au mot de passe."})
            } else if (!this.state.isValidConfPasswd && !this.state.isValidPasswd) {
                this.setState({textToShow: "Veuillez renseigner un mot de passe correct et le confirmer."})
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: padding,
                paddingRight: padding,
            },
            viewTextStatut: {
                marginTop: 10,
                marginBottom: 0,
                flexDirection: 'row',
                position: 'relative'
            },
            viewInput: {
                borderColor: '#20201e',
                borderBottomWidth: 1,
                height: 40,
                marginBottom: 5,
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
                borderColor: '#b8b0aa',
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                marginTop: 70
            }, textLogin: {
                color: (this.state.connexionPress) ? "#fff" : '#000',
                fontSize: 15,

            }

        });


        return (


            <View style={styles.bg}>

                <View style={[styles.viewInput,{marginTop:20}]}>

                    <TextInput
                        autoCorrect={false}
                        ref="password"
                        value={this.state.password}
                        defaultValue={this.state.password}
                        onChangeText={this.handlePasswordChange.bind(this)}
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                    />
                </View>
                <View style={[styles.viewInput,{marginTop:10}]}>

                    <TextInput
                        autoCorrect={false}
                        ref="conf_password"
                        value={this.state.conf_password}
                        defaultValue={this.state.conf_password}
                        onChangeText={this.handleConfPasswordChange.bind(this)}
                        secureTextEntry={true}
                        placeholder="Confirmer le mot de passe"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                    />
                </View>
                {this.state.textToShow != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text style={{flex:1,textAlign:"center",color:"red"}}>{this.state.textToShow}</Text>
                </View>
                }
                <View
                    style={{alignItems:"center", justifyContent:'center',flex:1,flexDirection: 'row'}}>
                    <TouchableHighlight style={[styles.viewLogin,{marginRight:10}]} underlayColor='transparent'
                                        onPress={this.props.handlePrev.bind(this,2)}>
                        <Image source={require('image!./../../img/subscribe/back.png')}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.viewLogin,{marginLeft:10}]} underlayColor='transparent'
                                        onPress={this.handleClick.bind(this)}>
                        <Image source={require('image!./../../img/subscribe/next.png')}/>
                    </TouchableHighlight>

                </View>


            </View>

        );
    }
}
