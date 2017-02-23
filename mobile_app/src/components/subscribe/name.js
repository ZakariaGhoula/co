import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GiftedSpinner from 'react-native-gifted-spinner';
import _                      from 'underscore';
export default class Name extends React.Component {
    constructor(props) {
        super(props);

        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            last_name: this.props.last_name,
            first_name: this.props.first_name,
            connexionPress: false,
            textToShow: null,
            isValidLastName: false,
            isValidFistName: false,
        }
    }
    componentDidMount(){
        this.setState({
            last_name: this.state.last_name,
            first_name: this.state.first_name,
            isValidLastName: (this.isEmpty(this.state.last_name) && this.state.last_name.trim().length > 0),
            isValidFistName: (this.isEmpty(this.state.first_name) && this.state.first_name.trim().length > 0)
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (  nextState.last_name !== this.state.last_name
            || nextState.first_name !== this.state.first_name
            || nextState.isValidLastName !== this.state.isValidLastName
            || nextState.isValidFistName !== this.state.isValidFistName
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    isEmpty(value) {

        return !_.isEmpty(value);
    }

    handleLastNameChange(text) {
        this.setState({
            last_name: text,
            isValidLastName: (this.isEmpty(text) && text.trim().length > 0)
        });
    }

    handleFirstNameChange(text) {
        this.setState({
            first_name: text,
            isValidFistName: (this.isEmpty(text) && text.trim().length > 0)
        });
    }

    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.last_name.toLowerCase().trim().length == 0 && this.state.first_name.toLowerCase().trim().length == 0) {
            this.setState({textToShow: "Veuillez renseigner un nom et un prénom."})
        }

        else if (this.state.last_name.toLowerCase().trim().length <= 0 && this.state.first_name.toLowerCase().trim().length > 0) {
            this.setState({textToShow: "Veuillez renseigner un nom correct."})
        }
        else if (this.state.last_name.toLowerCase().trim().length > 0 && this.state.first_name.toLowerCase().trim().length <= 0) {
            this.setState({textToShow: "Veuillez renseigner un prénom correct."})
        }
        else if (this.state.last_name.toLowerCase().trim().length <= 0 && this.state.first_name.toLowerCase().trim().length <= 0) {
            this.setState({textToShow: "Veuillez renseigner un nom et un prénom corrects."})
        }
        else {
            if (this.state.isValidLastName && this.state.isValidFistName) {
                this.props.handleName(this.state.last_name,this.state.first_name);
            } else if (this.state.isValidLastName && !this.state.isValidFistName) {
                this.setState({textToShow: "Veuillez renseigner un prénom correct."})
            } else if (!this.state.isValidLastName && this.state.isValidFistName) {
                this.setState({textToShow: "Veuillez renseigner un nom correct."})
            } else if (!this.state.isValidLastName && !this.state.isValidFistName) {
                this.setState({textToShow: "Veuillez renseigner un nom et un prénom corrects."})
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
                        ref="last_name"
                        value={this.state.last_name}
                        defaultValue={this.state.last_name}
                        onChangeText={this.handleLastNameChange.bind(this)}

                        placeholder="Nom"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                    />
                </View>
                <View style={[styles.viewInput,{marginTop:10}]}>

                    <TextInput
                        autoCorrect={false}
                        ref="first_name"
                        value={this.state.first_name}
                        defaultValue={this.state.first_name}
                        onChangeText={this.handleFirstNameChange.bind(this)}

                        placeholder="Prénom"
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
                                        onPress={this.props.handlePrev.bind(this,1)}>
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
