import React, { Component } from 'react';
import {Text,TextInput,View,StyleSheet,TouchableHighlight,Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GiftedSpinner from 'react-native-gifted-spinner';
import {OPTIONS_CIVILITE} from './../../constants/config';
export default class Sexe extends React.Component {
    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            sexe: this.props.sexe,
            connexionPress: false,
            textToShow: null

        }
    }

    componentDidMount() {
        this.setState({
            sexe: this.state.sexe,
connexionPress:typeof this.state.sexe !== "undefined" && this.state.sexe.trim() != ""
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (  nextState.sexe !== this.state.sexe
            || nextState.connexionPress !== this.state.connexionPress
            || nextState.textToShow !== this.state.textToShow
        )
    }


    handleNext() {
        if (typeof this.state.sexe !== "undefined" && this.state.sexe.trim() != ""){
           this.props.handleSexe(this.state.sexe);
        }
        else{
            this.setState({
                textToShow: "Veuillez selectionner votre civilité."

            });
        }

    }

    handleClick(event) {
        this.setState({textToShow: null, connexionPress: true, sexe: event});

    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.07) );
        var margin_top_logo = height * 0.2;
        var margin_bottom_logo = height * 0.12;
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: "transparent",
                paddingLeft: padding,
                paddingRight: padding,
            },
            viewTextStatut: {
                marginTop: 0,
                marginBottom: 10,
                flexDirection: 'row',
                backgroundColor: "transparent",
                position: 'relative'
            },
            textQuestion: {
                color: "#fff",
                fontSize: 15.5,
                fontFamily: 'OratorStd',
            },
            view_logo: {
                marginTop: margin_top_logo,
                marginBottom: margin_bottom_logo,
                alignItems: "center",
                backgroundColor: "transparent",
                justifyContent: 'center'
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
            btn_sexe: {
                height: 36,
                marginBottom: 10,
                flexDirection: 'row',
                position: 'relative',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: 10,
                backgroundColor: '#dbd0cd',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
            }, viewLogin: {
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
                marginTop: margin_top_logo

            }, textLogin: {
                color: '#000',
                fontSize: 15,

            }

        });

        var list_btn = null;
        list_btn = <View style={{flex:1}}>{OPTIONS_CIVILITE.map(function (v, i) {
            return ( <TouchableHighlight
                key={i}
                style={[styles.btn_sexe,{ backgroundColor: (this.state.connexionPress &&  v.value==this.state.sexe)?"#fdaa69":'#dbd0cd',}]}
                underlayColor='transparent'
                onPress={this.handleClick.bind(this,v.value)}>
                <Text
                    style={{color:(this.state.connexionPress  &&  v.value==this.state.sexe) ? "#fff" : '#000',}}>{v.label}</Text></TouchableHighlight>)

        }, this)}<TouchableHighlight style={styles.viewLogin}
                                     underlayColor='transparent'
                                     onPress={this.handleNext.bind(this)}>
            <Icon name="ios-arrow-round-forward-outline" size={50} color="#fff"/>
        </TouchableHighlight></View>;


        return (


            <View style={styles.bg}>


                <View style={styles.view_logo}>
                    <Text
                        style={styles.textQuestion}
                    >Quel cuisinier êtes-vous ?</Text>
                </View>
                {this.state.textToShow != null
                &&
                <View style={styles.viewTextStatut}>
                    <Text style={{flex:1,textAlign:"center", fontFamily: 'OratorStd',color:"#fff",fontSize:16,}}>{this.state.textToShow}</Text>
                </View>
                }
                {list_btn}


            </View>

        );
    }
}
