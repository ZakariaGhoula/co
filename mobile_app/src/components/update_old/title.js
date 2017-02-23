import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from "underscore";


export default class Title extends React.Component {
    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            title: this.props.title,
            isValidTitle: false,
            connexionPress: false,
            textToShow: null
        }
    }

    componentDidMount() {
        this.setState({
            title: this.state.title.trim(),
            isValidTitle: this.validateTitle(this.state.title),
        });
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.title !== this.state.title
            || nextState.isValidTitle !== this.state.isValidTitle
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    validateTitle(text) {
        return (  text.trim().length > 2)
    }

    isEmpty(value) {

        return !_.isEmpty(value);
    }

    handleTitleChange(text) {
        this.setState({
            title: text,
            isValidTitle: this.validateTitle(text),
        });
    }


    handleClick(event) {
        this.setState({textToShow: null});
        if (this.state.title.trim().length == 0) {
            this.setState({textToShow: "Veuillez renseigner un titre"})
        }
        else {
            if (this.state.isValidTitle) {
                this.setState({connexionPress: true})
                this.props.handleTitle(this.state.title);
            } else if (!this.state.isValidTitle) {
                this.setState({textToShow: "Veuillez renseigner un titre"})
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
                <View style={{ paddingLeft: padding,marginTop:padding,
                paddingRight: padding,width:width,flexDirection:"row"}}>
                    <Text style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:12*(width/320), marginRight:7,fontFamily: 'Guardi-Roman'}}>Ajouter
                        un titre à votre
                        recette</Text><Text
                    style={{color:(this.state.textToShow != null)?"#c41e26":"#000",fontSize:11*(width/320),marginTop:4*(width/320),  fontFamily: 'GuardiLTStd-BlackItalic'}}>(Obligatoire)</Text></View>
                <View style={[styles.viewInput,{marginTop:20}]}>

                    <TextInput
                        autoCorrect={true}
                        ref="email"
                        value={this.state.title}
                        defaultValue={this.state.title}
                        onChangeText={this.handleTitleChange.bind(this)}
                        placeholder="ex : Tarte au citron"
                        placeholderTextColor="#20201e"
                        style={styles.textInput}
                        returnKeyType="next"

                    />
                </View>


                <TouchableHighlight style={styles.viewLogin} underlayColor='transparent'
                                    onPress={this.handleClick.bind(this)}>
                    <Image source={require('image!./../../img/subscribe/next.png')}/>
                </TouchableHighlight>


            </View>

        );
    }
}

