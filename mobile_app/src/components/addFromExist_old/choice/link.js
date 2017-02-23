import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";


export default class Link extends React.Component {
    constructor(props) {
        super(props);

        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            link: this.props.link,
            isValidLink: false,
            connexionPress: false,
            textToShow: null
        }
    }

    componentDidMount() {
        this.setState({
            link: this.state.link.toLowerCase().trim(),
            isValidLink: this.validateLink(this.state.link),
        });
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.link !== this.state.link
            || nextState.isValidLink !== this.state.isValidLink
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    validateLink(text) {

        if(text.trim().length>0){
            var re = /(?:http[s]?\/\/)?(?:[\w\-]+(?::[\w\-]+)?@)?(?:[\w\-]+\.)+(?:[a-z]{2,4})(?::[0-9]+)?(?:\/[\w\-\.%]+)*(?:\?(?:[\w\-\.%]+=[\w\-\.%!]+&?)+)?(#\w+\-\.%!)?/;
            return (re.test(text));
        }
        else
        return true;

    }

    isEmpty(value) {

        return !_.isEmpty(value);
    }

    handleLinkChange(text) {
        this.setState({
            link: text.toLowerCase().trim(),
            isValidLink: this.validateLink(text),
        });
    }


    handleClick(event) {
        this.setState({textToShow: null});
        if(!this.state.isValidLink) {
            this.setState({textToShow: "Veuillez renseigner un lien url valide"})
        }else {
//            this.validateLink(this.state.link);
            this.setState({textToShow: null});
            this.props.handleLink(this.state.link);
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
                marginBottom: 10,
                paddingTop: 0,
                flexDirection: 'row',
                position: 'relative'
            }, textInput: {
                fontSize: 14,
                height: 40,
                fontFamily: 'Guardi-Roman',
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

                fontSize: 15,

            }

        });


        return (
            <View style={styles.bg}>
                <View style={[styles.viewInput,{marginTop:20}]}>
                    <Icon name="ios-link" size={18} style={{marginRight:7,marginLeft:3,marginTop:11}}/>
                    <TextInput
                        autoCorrect={false}
                        ref="email"
                        returnKeyType="next"
                        value={this.state.link}
                        defaultValue={this.state.link}
                        onChangeText={this.handleLinkChange.bind(this)}
                        placeholder="Lien Url (facultatif)"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                        onSubmitEditing={
    this.handleClick.bind(this)
  }
                    />
                </View>
                {this.state.textToShow != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text
                        style={{flex:1,textAlign:"center",color:"#c41e26", fontFamily: 'Guardi-Roman'}}>{this.state.textToShow}</Text>
                </View>
                }

                <View
                    style={{alignItems:"center",marginTop:0, justifyContent:'center',flex:1,flexDirection: 'row'}}>

                    <TouchableOpacity style={[styles.viewLogin,{marginTop:35,marginLeft:10}]} underlayColor='transparent'
                                      onPress={this.handleClick.bind(this)}>
                       <Text style={{fontFamily: 'OratorStd',
                fontSize: 14,
                lineHeight: 15,
                textAlign: "center",
                backgroundColor: "transparent",
                color: "#000",

                textDecorationLine:"underline"}}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

