import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import _ from "underscore";
import GiftedSpinner from 'react-native-gifted-spinner';
class Email extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            email: this.props.email,
            isValidEmail: false,
            connexionPress: false,
            textToShow: null
        }
    }
    componentDidMount(){
        this.setState({
            email: this.state.email.toLowerCase().trim(),
            isValidEmail: this.validateEmail(this.state.email),
        });
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.statusText !== this.props.statusText
    || nextProps.statusEmail !== this.props.statusEmail
            || nextState.email !== this.state.email
            || nextState.isValidEmail !== this.state.isValidEmail
            || nextState.connexionPress !== this.state.connexionPress
            || nextProps.isRequesting !== this.props.isRequesting
            || nextState.textToShow !== this.state.textToShow
        )
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


    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.email.toLowerCase().trim().length==0) {
            this.setState({textToShow: "Veuillez renseigner une adresse email"})
        }
        else{
            if(this.state.isValidEmail){
                this.setState({connexionPress: true})
               this.props.actions.checkEmail(this.state.email);
            }  else if(!this.state.isValidEmail){
                this.setState({textToShow: "Veuillez renseigner une adresse email correcte"})
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.statusEmail==1 && nextState.connexionPress &&!nextProps.isRequesting) {
            this.setState({textToShow: "Désolé, l'adresse email renseignée est déjà utilisée."})
        }
        else if (nextProps.statusEmail==0 && nextState.connexionPress &&!nextProps.isRequesting) {
            this.props.handleEmail(this.state.email);
        }
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
                        ref="email"
                        value={this.state.email}
                        defaultValue={this.state.email}
                        onChangeText={this.handleEmailChange.bind(this)}
                        keyboardType="email-address"
                        placeholder="Email"
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

                <TouchableHighlight style={styles.viewLogin} underlayColor='transparent'
                                    onPress={this.handleClick.bind(this)}>
                    <Image source={require('image!./../../img/subscribe/next.png')}/>
                </TouchableHighlight>


                {this.props.isRequesting &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <GiftedSpinner style={{marginTop:0}}/>
                </View>
                }
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    statusText: state.session.statusText,
    statusEmail: state.session.statusEmail,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Email);
